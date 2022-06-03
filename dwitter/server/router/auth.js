import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();
const credentials =
    [   
        body('username').trim().notEmpty().withMessage('유저이름을 입력해주세요'),
        body('password').trim().isLength({min: 4, max: 12}).withMessage('비밀번호를 입력해주세요'),
        validate
    ];

const validateSignUp = 
    [
        credentials,
        body('name').notEmpty().withMessage('이름을 입력해주세요'),
        body('email').isEmail().normalizeEmail().withMessage('이메일을 다시 입력해주세요'),
        body('url').isURL().withMessage('url을 다시 입력해주세요').optional({nullable: true, checkFalsy: true}),
        validate
    ];

// signup
router.post('/signup', validateSignUp, authController.register);

// signin
router.post('/signin', credentials, authController.login);

router.get('/me', isAuth, authController.me);

export default router;