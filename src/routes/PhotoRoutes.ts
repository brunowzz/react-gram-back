import express from "express";
import { photoValidation } from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import {
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
} from "../controllers/PhotoController";
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
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/:id", authGuard, getPhotoById);

export default router;
