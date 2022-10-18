import express, { ErrorRequestHandler, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import helmet from "helmet";
import "express-async-errors";

import postsRouter from "./router/posts";

const app = express();

const port = 8080;

//cors option
const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

app.use("/posts", postsRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use(
  (
    error: any,
    req: any,
    res: { sendStatus: (arg0: number) => void },
    next: any
  ) => {
    console.log(error);
    res.sendStatus(500);
  }
);

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
