import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { corsSetup } from "./constants/cors-setup";
import { uploadDirectory } from "./constants/upload-directory";

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(corsSetup);
app.use("/uploads", uploadDirectory);

app.listen(port, () => {
  console.log("App Rodando na porta " + port);
});

export default app;
