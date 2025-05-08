import express from "express";

// Controller
import {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
} from "../controllers/UserController.js";

// Middlewares
import validate from "../middlewares/handleValidation.js";
import authGuard from "../middlewares/authGuard.js";

import {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation,
} from "../middlewares/userValidations.js";

import {
    imageUpload,
    handleImageUploadErrors,
} from "../middlewares/imageUpload.js";

// Routes
const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
    "/",
    authGuard,
    imageUpload.single("profileImage"),
    handleImageUploadErrors,
    userUpdateValidation(),
    validate,
    update
);
router.get("/:id", getUserById);

export default router;
