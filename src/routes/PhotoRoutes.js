import express from "express";

// Controller

// Middlewares
import { photoIsertValidation } from "../middlewares/photoValidation";
import authGuard from "../middlewares/authGuard";
import validate from "../middlewares/handleValidation";

// Routes
const router = express.Router();

export default router;
