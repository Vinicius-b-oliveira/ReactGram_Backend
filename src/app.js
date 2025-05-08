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

const allowedOrigins = [
    process.env.LOCAL_CORS_ORIGIN,
    process.env.PROD_CORS_ORIGIN,
    "https://react-gram-rouge.vercel.app",
    "http://localhost:5000",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(router);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
