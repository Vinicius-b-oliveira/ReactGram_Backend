import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ errors: ["Por favor, utilize outro e-mail"] });
        return;
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    if (!newUser) {
        res.status(422).json({
            errors: ["Houve um erro, por favor tente mais tarde"],
        });
        return;
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(404).json({ errors: ["Usuário não encontrado"] });
        return;
    }

    if (!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({ errors: ["Senha inválida"] });
        return;
    }

    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
};

const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
};

const update = async (req, res) => {
    const { name, password, bio } = req.body;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id).select("-password");

    if (name) user.name = name;
    if (password) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
    }
    if (bio) user.bio = bio;

    if (req.file) {
        if (user.profileImagePublicId) {
            await cloudinary.uploader.destroy(user.profileImagePublicId);
        }

        user.profileImage = req.file.path;
        user.profileImagePublicId = req.file.filename;
    }

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json(userResponse);
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado."] });
            return;
        }

        res.status(200).json(user);
    } catch {
        res.status(404).json({ errors: ["Usuário não encontrado."] });
    }
};

export { register, login, getCurrentUser, update, getUserById };
