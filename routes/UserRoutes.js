import express from "express";
const router = express.Router();

// Controller
import { register } from "../controllers/UserController.js";

// Middlewares
import validate from "../middlewares/handleValidation.js";
import { userCreateValidation } from "../middlewares/userValidations.js";

// Routes
router.post("/register", userCreateValidation(), validate, register);

export default router;
