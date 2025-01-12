import express from "express";
import { getCurrentUser, login, register } from "../controllers/UserController";
import { validate } from "../middlewares/handleValidation";
import {
  userCreateValidation,
  userLoginValidation,
} from "../middlewares/userValidations";
import { authGuard } from "../middlewares/authGuard";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

export default router;
