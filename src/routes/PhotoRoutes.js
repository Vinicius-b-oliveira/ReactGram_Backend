import express from "express";

// Controller
import {
    commentPhoto,
    deletePhoto,
    getAllPhotos,
    getPhotoByid,
    getUserPhotos,
    insertPhoto,
    likePhoto,
    searchPhotos,
    updatePhoto,
} from "../controllers/PhotoController.js";

// Middlewares
import {
    photoCommentValidation,
    photoIsertValidation,
    photoUpdateValidation,
} from "../middlewares/photoValidation.js";

import authGuard from "../middlewares/authGuard.js";
import validate from "../middlewares/handleValidation.js";
import {
    imageUpload,
    handleImageUploadErrors,
} from "../middlewares/imageUpload.js";

// Routes
const router = express.Router();

router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    handleImageUploadErrors,
    photoIsertValidation(),
    validate,
    insertPhoto
);

router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhotos);

router.get("/:id", authGuard, getPhotoByid);
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);
router.put("/like/:id", authGuard, likePhoto);

router.put(
    "/comment/:id",
    authGuard,
    photoCommentValidation(),
    validate,
    commentPhoto
);

export default router;
