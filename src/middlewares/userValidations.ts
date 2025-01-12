import { body } from "express-validator";

export function userCreateValidation() {
  return [
    body("name")
      .exists()
      .withMessage("Name is required.")
      .isString()
      .withMessage("Name must be a string.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
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

export function userLoginValidation() {
  return [
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
  ];
}

export function userUpdateValidation() {
  return [
    body("name")
      .optional()
      .isString()
      .withMessage("Name must be a string.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("email").optional().isEmail().withMessage("Email must be valid."),
    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("profileImage")
      .optional()
      .isString()
      .withMessage("Profile image must be a string."),
    body("bio").optional().isString().withMessage("Bio must be a string."),
  ];
}
