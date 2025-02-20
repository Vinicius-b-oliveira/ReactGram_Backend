import dotenv from "dotenv";

import express from "express";
import path from "path";
import cors from "cors";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
