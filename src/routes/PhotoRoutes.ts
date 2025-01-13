import express from "express";
import {
  photoUpdateValidation,
  photoValidation,
} from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import {
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
  updatePhoto,
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
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto);

export default router;
