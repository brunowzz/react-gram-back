import "dotenv/config";
import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import mongoose, { Types } from "mongoose";
import { hashPassword } from "../utils/hashPassword";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

function generateToken(id: Types.ObjectId) {
  return jwt.sign({ id }, jwtSecret!, {
    expiresIn: "7d",
  });
}

export async function register(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(422).json({ errors: ["Please use a different email."] });
      return;
    }

    const passwordHash = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: ["An error occurred during registration."] });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ errors: ["User not found."] });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password as string
    );

    if (!isPasswordValid) {
      res.status(422).json({ errors: ["Email and password do not match."] });
      return;
    }

    res.status(200).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ errors: ["An error occurred during login."] });
  }
}

export async function getCurrentUser(
  req: Request,
  res: Response
): Promise<void> {
  const user = req.user;

  res.status(200).json(user);
}

export async function update(req: Request, res: Response): Promise<void> {
  const { name, password, bio } = req.body;
  const profileImage = req.file ? req.file.filename : null;
  const reqUser = req.user;

  try {
    const user = await User.findById(
      new mongoose.Types.ObjectId(reqUser)
    ).select("-password");

    if (!user) {
      res.status(404).json({ errors: ["User not found."] });
      return;
    }

    const updates: { [key: string]: any } = {};
    if (name) updates.name = name;
    if (password) updates.password = await hashPassword(password);
    if (bio) updates.bio = bio;
    if (profileImage) updates.profileImage = profileImage;

    Object.assign(user, updates);
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errors: ["An error occurred during the update."] });
  }
}
