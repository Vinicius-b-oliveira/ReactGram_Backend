import express from "express";
const router = express.Router();

// Controller
import { register } from "../controllers/UserController.js";

// Middlewares
import validate from "../middlewares/handleValidation.js";

// Routes
router.post("/register", validate, register);

export default router;
