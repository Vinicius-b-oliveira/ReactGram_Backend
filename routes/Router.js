import express from "express";
const router = express();

// test route
router.get("/", (req, res) => {
    res.send("API Working");
});

export default router;
