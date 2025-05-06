import dotenv from "dotenv";
import "./config/db.js";

import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { readFileSync } from "fs";

import router from "./routes/Router.js";

dotenv.config();

const port = process.env.PORT;

const app = express();

const swaggerDocument = JSON.parse(readFileSync("./src/swagger.json", "utf-8"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
