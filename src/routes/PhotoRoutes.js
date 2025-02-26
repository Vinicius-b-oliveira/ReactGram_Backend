import express from "express";

// Controller
import {
    deletePhoto,
    getAllPhotos,
    getUserPhotos,
    insertPhoto,
} from "../controllers/PhotoController.js";

// Middlewares
import { photoIsertValidation } from "../middlewares/photoValidation.js";
import authGuard from "../middlewares/authGuard.js";
import validate from "../middlewares/handleValidation.js";
import imageUpload from "../middlewares/imageUpload.js";

// Routes
const router = express.Router();
router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    photoIsertValidation(),
    validate,
    insertPhoto
);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);

export default router;
