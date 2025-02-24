import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const jwtSecret = process.env.JWT_SECRET;

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "7d",
    });
};

// Register user na dsign in
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });

    if (user) {
        res.status(422).json({ erros: ["Por favor, utilize outro e-mail"] });
        return;
    }

    // Generate password hash
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create User
    const newUser = await User.create({
        name,
        email,
        password: passwordHash,
    });

    // If user was create sucessfully, return the token
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

// Sign user in
const login = (req, res) => {
    res.send("Login");
};

export { register, login };
