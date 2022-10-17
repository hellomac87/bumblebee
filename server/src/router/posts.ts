import express, { Request, Response } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

const router = express.Router();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
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

router.use(function (req, res, next) {
    console.log('posts router');
    next();
});

router.post('/', upload.single('image'), (req: Request, res: Response) => {
    // 업로드한 주소와 body data db 에 저장
    // 정보 리스폰스
    console.log({ file: req.file });
});

router.get('/', (req: Request, res: Response) => {
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

export default router;
