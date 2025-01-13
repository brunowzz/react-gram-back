import { Request, Response } from "express";
import { getUser } from "../utils/getUser";
import Photo from "../models/Photo";
import mongoose from "mongoose";

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
    res.status(500).json({ errors: ["Internal error server"] });
  }
}
