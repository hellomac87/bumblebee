import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => {
  res.send("hello express!!");
});

app.get("/test", (req: Request, res: Response) => {
  res.json({
    success: true,
    test: "test",
  });
});

app.listen(port, () => {
  console.log(`express start on ${port}`);
});
