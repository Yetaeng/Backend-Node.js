import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import tweetRouter from './router/tweets.js'
import authRouter from './router/auth.js';
import { config } from './config.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());

app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);

// Error Handler
app.get('/', (req, res) => {
    res.sendStatus(404);
})

app.get('/', (error, req, res) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(config.host.port);