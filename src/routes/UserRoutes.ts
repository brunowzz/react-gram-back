import express from "express";
import { login, register } from "../controllers/UserController";
import { validate } from "../middlewares/handleValidation";
import {
  userCreateValidation,
  userLoginValidation,
} from "../middlewares/userValidations";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);

export default router;
