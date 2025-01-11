import express from "express";
import path from "path";

export const uploadDirectory = express.static(path.join(__dirname, "/uploads"));
