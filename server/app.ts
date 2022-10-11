import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3003;

AWS.config.update({
    // accessKeyId: "AKIA2WMMVHC627EO2RBY",
    // secretAccessKey: "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",
    region: 'ap-northeast-2',
});

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3() as any,
        bucket: 'five-seconds-bucket',
        // acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },

        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

//cors option
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req: Request, res: Response) => {
    res.send('hello express!!');
});

app.post('/api/posts', upload.single('image'), (req: Request, res: Response) => {
    // 업로드한 주소와 body data db 에 저장
    // 정보 리스폰스
    console.log(req.file);
    res.json({
        imageUrl: `http://localhost:3003/static/uploads/${req.file?.filename}`,
    });
});

app.get('/api/posts', (req: Request, res: Response) => {
    res.json({
        success: true,
        posts: [
            {
                id: 1,
                title: 'post1',
                imageUrl: 'https://avatars.githubusercontent.com/u/32426091?v=4',
                body: 'asdf1',
            },
            {
                id: 2,
                title: 'post2',
                imageUrl: 'https://avatars.githubusercontent.com/u/32426091?v=4',
                body: 'asdf2',
            },
            {
                id: 3,
                title: 'post3',
                imageUrl: 'https://avatars.githubusercontent.com/u/32426091?v=4',
                body: 'asdf3',
            },
        ],
    });
});

app.listen(port, () => {
    console.log(`express start on ${port}`);
});
