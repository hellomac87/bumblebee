import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import postsRouter from './router/posts';
import authRouter from './router/auth';

const app = express();

const port = 8080;

//cors option
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('tiny'));

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((error: any, req: any, res: { sendStatus: (arg0: number) => void }, next: any) => {
    console.log(error);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`express start on ${port}`);
});
