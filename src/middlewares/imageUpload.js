import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getFolder = (req) => {
    if (req.baseUrl.includes("users")) {
        return "users";
    } else if (req.baseUrl.includes("photos")) {
        return "photos";
    }
    return "misc";
};

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req) => {
        return {
            folder: getFolder(req),
            format: "jpg",
            public_id: Date.now() + "-" + Math.round(Math.random() * 1e9),
            allowed_formats: ["jpg", "png", "jpeg"],
            transformation: [{ width: 800, height: 800, crop: "limit" }],
        };
    },
});

const imageUpload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
            return cb(new Error("Por favor, envie apenas png, jpg ou jpeg!"));
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default imageUpload;
