import express, { Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import multer from "multer";

const app = express();
const port = 3003;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//cors option
const corsOptions: CorsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/static", express.static(__dirname + "/public"));
console.log(__dirname + "/public");
app.get("/", (req: Request, res: Response) => {
  res.send("hello express!!");
});

app.post(
  "/api/posts",
  upload.single("image"),
  (req: Request, res: Response) => {
    // 업로드한 주소와 body data db 에 저장
    // 정보 리스폰스
    console.log(req.file);
    res.json({
      imageUrl: `http://localhost:3003/static/uploads/${req.file?.filename}`,
    });
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
