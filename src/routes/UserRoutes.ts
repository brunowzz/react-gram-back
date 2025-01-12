import express from "express";
import {
  getCurrentUser,
  login,
  register,
  update,
} from "../controllers/UserController";
import { validate } from "../middlewares/handleValidation";
import {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
router.put(
  "/update-profile",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  update
);

export default router;
