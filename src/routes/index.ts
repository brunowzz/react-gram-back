import express, { Request, Response } from "express";
import UserRoutes from "./UserRoutes";
import "dotenv/config";

const router = express();

router.get("/", (req: Request, res: Response) => {
  res.send("Api is working");
});
router.use("/api/users", UserRoutes);

export default router;
