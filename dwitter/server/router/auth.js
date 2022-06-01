import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, param } from 'express-validator';
import * as authController from '../controller/auth.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();

// 사용자 목록 저장소
const users = [];
const secret = 'aZqd4ywpfX*&';

// signup
router.post('/signup', validate, (req, res) => {
    const {
        username,
        password,
        email,
        url
    } = req.body;
    const user = users.find(user => user.username = username);

    // 가입된 사용자가 아니라면 토큰 발급
    if (user) {
        return res.status(409).json({message: '이미 존재하는 사용자 이름 입니다.'})
    } else {
        const hashed = bcrypt.hashSync(password, 10);
        const newUser = {
            uid: users.length + 1,
            username: username,
            password: hashed,
            email: email,
            url: url
        }

        users.push(newUser);
        const newUserToken = jwt.sign({username: username}, secret)

        return res.status(201).json({message: '회원가입 성공', token: newUserToken});
    }

})

// signin
router.post('/signin', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = users.find(user => user.username = username);

    // 가입되지 않은 사용자라면
    if (!user) {
        return res.status(404).json({message: '가입되지 않은 사용자입니다.'});
    }

    // 비번 검사
    const compared = bcrypt.compareSync(password, user.password);
    if (!compared) {
        return res.status(401).json({message: '로그인 실패'})
    }
    
    // 토큰 검사
    const accessToken = req.headers.authorization.split('Bearer ')[1];

    if (!accessToken) {
        return res.status(401).json({message: "토큰이 존재하지 않습니다."})
    } else {
        jwt.verify(accessToken, secret, (error, decoded) => {
            if (error) {
                console.error(error);
                return res.status(401).json({message: "유효하지 않은 토큰입니다."})
            } else {
                console.log('decoded: ', decoded);
                return res.status(200).json({message: '로그인 성공'})
            }
        })
    }
}) 

export default router;