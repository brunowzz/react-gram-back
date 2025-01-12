import express from "express";
import { photoValidation } from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import { insertPhoto } from "../controllers/PhotoController";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

router.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoValidation(),
  validate,
  insertPhoto
);

export default router;
