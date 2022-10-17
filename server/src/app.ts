import express, { Request, Response } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import postsRouter from './router/posts';

dotenv.config();

const app = express();
const port = 3003;

//cors option
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/static', express.static(__dirname + '/public'));

app.use('/api/posts', postsRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('hello express!!');
});

app.listen(port, () => {
    console.log(`express start on ${port}`);
});
