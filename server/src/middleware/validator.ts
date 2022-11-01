import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

const validateText = body("text")
  .trim()
  .isLength({ min: 2 })
  .withMessage("text should be at least 3 characters");

export const createPost = [
  validateText,
  body("name").trim().notEmpty().withMessage("need name!"),
  body("username").trim().notEmpty().withMessage("need username!"),
  validate,
];

export const updatePost = [validateText, validate];
