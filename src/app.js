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

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? [process.env.PROD_CORS_ORIGIN]
        : ["http://localhost:5173"];

app.use(
    cors({
        credentials: true,
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
    })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
