import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbuser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(
            `mongodb+srv://${dbuser}:${dbPassword}@cluster0.afn2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log("Conectou ao banco! ");

        return dbConn;
    } catch (error) {
        console.log(error);
    }
};

conn();

export default conn;
