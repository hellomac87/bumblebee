import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("hello express!!");
});

app.listen(port, () => {
  console.log(`express start on ${port}`);
});
