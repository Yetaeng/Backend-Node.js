import express from 'express';
import * as tweetController from '../controller/tweet.js';
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validate.js';

const router = express.Router();
const validateTweet =
[
    body('text').trim().isLength({ min: 3 }).withMessage('최소 3자를 입력해주세요'),
    validate
];
// REST APIs 구현
// get tweets or tweet by username
router.get('/',
    [
        body('name').trim().isLength({min: 2, max: 6}).withMessage('이름을 입력해주세요'), 
        validate
    ], tweetController.getAllTweets);

// get tweet by id
router.get('/:id', 
    [
        param('id').isInt().withMessage('숫자를 입력해주세요'),
        validate
    ], tweetController.getTweetById);

// create tweet
router.post('/', validateTweet, tweetController.createTweet);

// update tweet
router.put('/:id', validateTweet, tweetController.updateTweet);    

// delete tweet
router.delete('/:id', validate, tweetController.deleteTweet);

export default router;