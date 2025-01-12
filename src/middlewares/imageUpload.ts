import multer from "multer";
import path from "path";

const folders = {
  users: "users",
  photos: "photos",
};

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder =
      Object.keys(folders).find((key) => req.baseUrl.includes(key)) || "users";

    cb(null, `src/uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please upload only PNG or JPG files."));
    }

    cb(null, true);
  },
});
