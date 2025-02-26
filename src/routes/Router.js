import express from "express";
import userRoutes from "./UserRoutes.js";
import photoRoutes from "./PhotoRoutes.js";

const router = express.Router();

router.use("/api/users", userRoutes);
router.use("/api/photos", photoRoutes);

// Rota de teste
router.get("/", (req, res) => {
    res.send("API Working");
});

export default router;
