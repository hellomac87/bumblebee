import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";

type Post = {
  id: number;
  title: string;
  imageUrl: string;
  body: string;
};

const app = express();
const port = 8080;

//cors option
const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("hello express!!");
});

app.get("/api/posts", (req: Request, res: Response) => {
  res.json({
    success: true,
    posts: [
      {
        id: 1,
        title: "post1",
        imageUrl: "https://avatars.githubusercontent.com/u/32426091?v=4",
        body: "asdf1",
      },
      {
        id: 2,
        title: "post2",
        imageUrl: "https://avatars.githubusercontent.com/u/32426091?v=4",
        body: "asdf2",
      },
      {
        id: 3,
        title: "post3",
        imageUrl: "https://avatars.githubusercontent.com/u/32426091?v=4",
        body: "asdf3",
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`express start on ${port}`);
});
