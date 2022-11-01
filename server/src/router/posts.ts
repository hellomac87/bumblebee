import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import * as postValidator from "../middleware/validator";
import * as postController from "../controller/post";

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get("/", postController.getPosts);
// GET /posts/:id
router.get("/:id", postController.getPost);
// POST /posts
router.post("/", postValidator.createPost, postController.createPost);
// PUT /posts/:id
router.put("/:id", postValidator.updatePost, postController.updatePost);
// DELETE /posts/:id
router.delete("/:id", postController.deletePost);

export default router;
