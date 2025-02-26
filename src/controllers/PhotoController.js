import Photo from "../models/Photo.js";
import User from "../models/User.js";

// Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);

    // Create a photo
    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name,
    });

    if (!newPhoto) {
        res.status(422).json({
            errors: ["Houve um problema, por favor tente novamente mais tarde"],
        });
        return;
    }

    res.status(201).json(newPhoto);
};

// Remove a photo from DB
const deletePhoto = async (req, res) => {
    const { id } = req.params;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(id);

        // Check if photo exists
        if (!photo) {
            res.status(422).json({
                errors: ["Foto não encontrada"],
            });
            return;
        }

        // Check if photo belongs to user
        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: [
                    "Ocorreu um erro, por favor tente novamente mais tarde",
                ],
            });
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({
            id: photo._id,
            message: "Foto exluída com sucesso.",
        });
    } catch {
        res.status(404).json({
            errors: ["Foto não encontrada"],
        });
    }
};

// Get all photos
const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos);
};

// Get user photos
const getUserPhotos = async (req, res) => {
    const { id } = req.params;

    try {
        const photos = await Photo.find({ userId: id }).sort([
            ["createdAt", -1],
        ]);

        res.status(200).json(photos);
    } catch {
        res.status(404).json({
            errors: ["Fotos não encontradas"],
        });
    }
};

// Get photo by id
const getPhotoByid = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada."] });
            return;
        }

        res.status(200).json(photo);
    } catch {
        res.status(404).json({
            errors: ["Foto não encontradas"],
        });
    }
};

// Update a photo
const updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada"] });
            return;
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({
                errors: [
                    "Ocorreu um erro, por favor tente novamente mais tarde",
                ],
            });
            return;
        }

        if (title) {
            photo.title = title;
        }

        await photo.save();

        res.status(200).json({ photo, message: "Foto atualizada com sucesso" });
    } catch {
        res.status(404).json({
            errors: ["Foto não encontrada"],
        });
    }
};

export {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoByid,
    updatePhoto,
};
