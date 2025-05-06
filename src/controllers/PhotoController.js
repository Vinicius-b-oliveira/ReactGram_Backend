import Photo from "../models/Photo.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file; // Agora recebe o objeto completo do Cloudinary

    const reqUser = req.user;
    const user = await User.findById(reqUser._id);

    const newPhoto = await Photo.create({
        image: image.path, // Usa a URL do Cloudinary
        imagePublicId: image.filename, // Salva o public_id para possível deleção
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

const deletePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(422).json({ errors: ["Foto não encontrada"] });
            return;
        }

        if (!photo.userId.equals(reqUser._id)) {
            res.status(422).json({ errors: ["Acesso não autorizado"] });
            return;
        }

        // Remove a imagem do Cloudinary
        if (photo.imagePublicId) {
            await cloudinary.uploader.destroy(photo.imagePublicId);
        }

        await Photo.findByIdAndDelete(photo._id);

        res.status(200).json({
            id: photo._id,
            message: "Foto excluída com sucesso.",
        });
    } catch {
        res.status(404).json({ errors: ["Foto não encontrada"] });
    }
};

const getAllPhotos = async (req, res) => {
    const photos = await Photo.find({})
        .sort([["createdAt", -1]])
        .exec();

    return res.status(200).json(photos);
};

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

const likePhoto = async (req, res) => {
    const { id } = req.params;
    const reqUser = req.user;

    try {
        const photo = await Photo.findById(id);

        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada"] });
            return;
        }

        const userIndex = photo.likes.indexOf(reqUser._id);

        if (userIndex !== -1) {
            photo.likes.splice(userIndex, 1);
            await photo.save();

            res.status(200).json({
                photoId: id,
                userId: reqUser._id,
                message: "Like removido com sucesso.",
            });
        } else {
            photo.likes.push(reqUser._id);
            await photo.save();

            res.status(200).json({
                photoId: id,
                userId: reqUser._id,
                message: "A foto foi curtida.",
            });
        }
    } catch {
        res.status(404).json({
            errors: ["Foto não encontrada"],
        });
    }
};

const commentPhoto = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;

    try {
        const user = await User.findById(reqUser._id);

        const photo = await Photo.findById(id);

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrada"] });
            return;
        }

        if (!photo) {
            res.status(404).json({ errors: ["Foto não encontrada"] });
            return;
        }

        const userComment = {
            comment,
            userName: user.name,
            userImage: user.profileImage,
            userId: user._id,
        };

        photo.comments.push(userComment);

        await photo.save();

        res.status(200).json({
            comment: userComment,
            message: "O comentário foi adicionado com sucesso",
        });
    } catch {
        res.status(404).json({
            errors: ["Ocorreu um erro, tente novamente mais tarde"],
        });
    }
};

const searchPhotos = async (req, res) => {
    const { q } = req.query;

    const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

    res.status(200).json(photos);
};

export {
    insertPhoto,
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    getPhotoByid,
    updatePhoto,
    likePhoto,
    commentPhoto,
    searchPhotos,
};
