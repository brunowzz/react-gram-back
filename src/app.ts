import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log("App Rodando na porta " + port);
});
