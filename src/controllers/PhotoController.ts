import { Request, Response } from "express";
import { getUser } from "../utils/getUser";
import Photo from "../models/Photo";

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
