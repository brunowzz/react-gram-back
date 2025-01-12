import { body } from "express-validator";

export function userCreateValidation() {
  return [
    body("name")
      .exists()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string."),
    body("email")
      .exists()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Email must be valid."),
    body("password")
      .exists()
      .withMessage("Password is required.")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("profileImage")
      .optional()
      .isString()
      .withMessage("Profile image must be a string."),
    body("bio").optional().isString().withMessage("Bio must be a string."),
  ];
}
