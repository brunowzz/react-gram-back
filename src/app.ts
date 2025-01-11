import express from "express";
import path from "path";
import cors from "cors";

const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log("App Rodando na porta 5000");
});
