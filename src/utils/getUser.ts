import { Request } from "express";
import User from "../models/User";
import mongoose from "mongoose";

export async function getUser(req: Request) {
  const reqUser = req.user;
  try {
    return await User.findById(new mongoose.Types.ObjectId(reqUser)).select(
      "-password"
    );
  } catch (error) {
    throw new Error("User not found.");
  }
}
