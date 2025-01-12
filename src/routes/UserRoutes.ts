import express from "express";
import { register } from "../controllers/UserController";
import { validate } from "../middlewares/handleValidation";
import { userCreateValidation } from "../middlewares/userValidations";

const router = express.Router();

router.post("/register", userCreateValidation(), validate, register);

export default router;
