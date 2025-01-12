import "dotenv/config";
import express from "express";
import router from "./routes";
import { corsSetup } from "./constants/cors-setup";
import { uploadDirectory } from "./constants/upload-directory";
import { connection } from "./config/db";

const port = process.env.PORT;

const app = express();

connection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(corsSetup);
app.use("/uploads", uploadDirectory);
app.listen(port);
