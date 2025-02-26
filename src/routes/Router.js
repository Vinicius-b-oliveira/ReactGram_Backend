import express from "express";
import userRoutes from "./UserRoutes.js";

const router = express.Router();

router.use("/api/users", userRoutes);

// Rota de teste
router.get("/", (req, res) => {
    res.send("API Working");
});

export default router;
