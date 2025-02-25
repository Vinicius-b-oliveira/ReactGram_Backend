import express from "express";
const router = express.Router();

// Controller
import {
    register,
    login,
    getCurrentUser,
    update,
} from "../controllers/UserController.js";

// Middlewares
import validate from "../middlewares/handleValidation.js";
import authGuard from "../middlewares/authGuard.js";

import {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation,
} from "../middlewares/userValidations.js";
import imageUpload from "../middlewares/imageUpload.js";

// Routes
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
    "/",
    authGuard,
    userUpdateValidation(),
    validate,
    imageUpload.single("profileImage"),
    update
);

export default router;
