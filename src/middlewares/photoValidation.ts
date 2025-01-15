import { body } from "express-validator";

export function photoValidation() {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image file is required");
      }
      const fileExtension = req.file.mimetype.split("/")[1];
      if (fileExtension !== "jpeg" && fileExtension !== "png") {
        throw new Error("Image must be a jpg or png file");
      }
      return true;
    }),
  ];
}

export function photoUpdateValidation() {
  return [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .isString()
      .withMessage("Title must be a string")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
  ];
}

export function commentValidation() {
  return [
    body("comment")
      .notEmpty()
      .withMessage("Comment cannot be empty")
      .isString()
      .withMessage("Comment must be a string")
      .isLength({ min: 1 })
      .withMessage("Comment must be at least 1 character long"),
  ];
}
