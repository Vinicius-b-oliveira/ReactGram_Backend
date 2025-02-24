import express from "express";
const router = express.Router();

// Controller
import { register, login } from "../controllers/UserController.js";

// Middlewares
import validate from "../middlewares/handleValidation.js";

import {
    userCreateValidation,
    loginValidation,
} from "../middlewares/userValidations.js";

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", loginValidation(), validate, login);

export default router;
