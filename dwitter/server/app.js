import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import tweetRouter from './router/tweets.js'

const app = express();
const corsOptions = {
    origin: ['http://127.0.0.1:5500'],
    optionSucessStatus: 200,
    credentials: true,
}

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', tweetRouter);

// Error Handler
app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.get('/', (error, req, res) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(8080);