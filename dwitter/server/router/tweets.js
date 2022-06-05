import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body, param } from 'express-validator';
import { validate } from '../middleware/validate.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();
const validateTweet =
[
    body('text').trim().isLength({ min: 3 }).withMessage('최소 3자를 입력해주세요'),
    validate
];

// isAuth를 추가해줌으로써 로그인한 사용자만 트윗에 대해서 액션을 취할 수 있음
// get tweets or tweet by username
router.get('/',isAuth, tweetController.getAllTweets);

// get tweet by id
router.get('/:id', 
    [
        param('id').isInt().withMessage('숫자를 입력해주세요'),
        validate
    ], isAuth, tweetController.getTweetById);

// create tweet
router.post('/', isAuth, validateTweet, tweetController.createTweet);

// update tweet
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet);    

// delete tweet
router.delete('/:id', isAuth, validate, tweetController.deleteTweet);

export default router;