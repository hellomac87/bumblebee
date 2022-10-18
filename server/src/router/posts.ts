import express from "express";
import "express-async-errors";

let posts = [
  {
    id: "1",
    text: "dobby fighting!",
    createdAt: Date.now().toString(),
    name: "Dobby",
    username: "dobby",
    url: "https://avatars.githubusercontent.com/u/32426091?v=4",
  },
  {
    id: "2",
    text: "Kimmy fighting!",
    createdAt: Date.now().toString(),
    name: "Kimmy",
    username: "kimmy",
  },
];
const router = express.Router();

// GET /posts
// GET /posts?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? posts.filter((post) => post.username === username)
    : posts;
  res.status(200).json(data);
});
// GET /posts/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const post = posts.find((post) => post.id === id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post ${id} not found` });
  }
});
// POST /posts
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;
  const post = {
    id: Date.now().toString(),
    text,
    createdAt: Date.now().toString(),
    name,
    username,
  };
  posts = [post, ...posts];
  res.status(202).json(post);
});
// PUT /posts/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.text = text;
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: `Post ${id} not found` });
  }
});
// DELETE /posts/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  posts = posts.filter((post) => post.id !== id);
  res.sendStatus(204);
});

export default router;
