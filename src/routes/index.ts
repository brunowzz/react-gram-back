import express, { Request, Response } from "express";
import UserRoutes from "./UserRoutes";
import PhotoRoutes from "./PhotoRoutes";
import "dotenv/config";

const router = express();

router.use("/api/users", UserRoutes);
router.use("/api/photos", PhotoRoutes);

export default router;
