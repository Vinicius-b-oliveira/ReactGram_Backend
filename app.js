import dotenv from "dotenv";
import "./config/db.js";

import express from "express";
import path from "path";
import cors from "cors";

import { fileURLToPath } from "url";
import { dirname } from "path";

import router from "./routes/Router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const port = process.env.PORT;

const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// BD connection

// routes
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
