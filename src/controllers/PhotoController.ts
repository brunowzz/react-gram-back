import { Request, Response } from "express";
import { getUser } from "../utils/getUser";
import Photo from "../models/Photo";
import mongoose from "mongoose";
import User from "../models/User";

export async function insertPhoto(req: Request, res: Response): Promise<void> {
  const { title } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const user = await getUser(req);

    const newPhoto = await Photo.create({
      image,
      title,
      userId: user?.id,
      userName: user?.name,
    });

    res.send(newPhoto);
  } catch (error) {
    res.status(500).send({ errors: ["Failed to upload photo"] });
  }
}

export async function deletePhoto(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const reqUser = req.user;

    const photo: any = await Photo.findById(new mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res
        .status(403)
        .json({ errors: ["You do not have permission to delete this photo."] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);

    res.status(200).json({ id: photo._id, message: "Photo was deleted" });
  } catch (error) {
    res.status(500).json({ errors: ["Failed to delete photo"] });
  }
}

export async function getAllPhotos(req: Request, res: Response): Promise<void> {
  try {
    const photos = await Photo.find({})
      .sort([["createdAt", -1]])
      .exec();
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error."] });
  }
}

export async function getUserPhotos(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const photos = await Photo.find({ userId: id })
      .sort([["createdAt", -1]])
      .exec();

    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ errors: ["Failed to retrieve user photos"] });
  }
}

export async function getPhotoById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  try {
    const photo = await Photo.findById(new mongoose.Types.ObjectId(id));
    res.status(200).json(photo);
  } catch (error) {
    res.status(404).json({ errors: ["Photo is not found."] });
  }
}

export async function updatePhoto(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { title } = req.body;
  const reqUser = req.user;

  try {
    const photo: any = await Photo.findById(new mongoose.Types.ObjectId(id));

    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    if (!photo.userId.equals(reqUser._id)) {
      res.status(403).json({
        errors: ["You do not have permission to delete this photo."],
      });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json(photo);
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error."] });
  }
}

export async function likePhoto(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Photo not found."] });
      return;
    }

    if (photo.likes.includes(reqUser._id)) {
      res.status(422).json({ errors: ["You have already liked this photo."] });
      return;
    }

    photo.likes.push(reqUser._id);

    photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "Photo has been liked.",
    });
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error."] });
  }
}

export async function commentPhoto(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const { comment } = req.body;
  const reqUser = req.user;

  try {
    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    if (!photo) {
      res.status(404).json({ errors: ["Photo is not found."] });
      return;
    }

    const userComment = {
      comment,
      userName: user?.name,
      userImage: user?.profileImage,
      userId: user?._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "Comment has been successfully saved.",
    });
  } catch (error) {
    res.status(500).json({ errors: ["Internal server error."] });
  }
}
