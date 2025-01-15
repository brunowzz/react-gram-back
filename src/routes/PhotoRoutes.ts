import express from "express";
import {
  commentValidation,
  photoUpdateValidation,
  photoValidation,
} from "../middlewares/photoValidation";
import { authGuard } from "../middlewares/authGuard";
import { validate } from "../middlewares/handleValidation";
import {
  commentPhoto,
  deletePhoto,
  getAllPhotos,
  getPhotoById,
  getUserPhotos,
  insertPhoto,
  likePhoto,
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
router.put("/like/:id", authGuard, likePhoto);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentPhoto
);

export default router;
