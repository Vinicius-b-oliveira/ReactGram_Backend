import express from "express";

// Controller
import {
    deletePhoto,
    getAllPhotos,
    getPhotoByid,
    getUserPhotos,
    insertPhoto,
    updatePhoto,
} from "../controllers/PhotoController.js";

// Middlewares
import {
    photoIsertValidation,
    photoUpdateValidation,
} from "../middlewares/photoValidation.js";

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
router.get("/:id", authGuard, getPhotoByid);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

export default router;
