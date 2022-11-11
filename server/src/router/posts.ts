import express from "express";
import "express-async-errors";
import * as validator from "../middleware/validator";
import * as postController from "../controller/post";
import { isAuth } from "../middleware/auth";

const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get("/", postController.getPosts);
// GET /posts/:id
router.get("/:id", postController.getPost);
// POST /posts
router.post("/", isAuth, validator.createPost, postController.createPost);
// PUT /posts/:id
router.put("/:id", isAuth, validator.updatePost, postController.updatePost);
// DELETE /posts/:id
router.delete("/:id", isAuth, postController.deletePost);

export default router;
