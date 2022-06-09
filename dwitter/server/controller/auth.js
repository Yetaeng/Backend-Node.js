import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'aZqd4ywpfX*&';
const jwtExpiresInDays = '3d';
const bcryptSalt = 10;

export async function register(req, res) {
    const {
        username,
        password,
        name,
        email,
        url
    } = req.body;
    const user = await userRepository.findUserByUsername(username);

    // 가입된 사용자가 아니라면 토큰 발급
    if (user) {
        return res.status(409).json({message: '이미 존재하는 사용자 이름 입니다.'})
    }

    const hashed = await bcrypt.hash(password, bcryptSalt);
    const newUserId = await userRepository.createUser({username, password: hashed, name, email, url});
    const newUserToken = createJwtToken(newUserId);

    res.status(201).json({message: '회원가입 성공', token: newUserToken, username: username});      
}

export async function login(req, res) {
    const {
        username,
        password
    } = req.body;
    const user = await userRepository.findUserByUsername(username);

    // 가입되지 않은 사용자라면
    if (!user) {
        return res.status(404).json({message: '로그인 실패'});
    }

    // 비번 검사
    const compared = await bcrypt.compare(password, user.password);
    if (!compared) {
        return res.status(401).json({message: '로그인 실패'})
    }

    // 토큰 발급
    const token =  createJwtToken(user.uid);

    res.status(200).json({message: '로그인 성공', token: token, username: user.username});
}

export async function me(req, res) {
    const user = await userRepository.findUserById(req.uid);
    if (!user) {
        return res.status(404).json({message: "유효한 사용자가 아닙니다."});
    }
    res.status(200).json({ token: req.token, username: user.username});
}

function createJwtToken(uid) {
    return jwt.sign({uid}, jwtSecretKey, {expiresIn: jwtExpiresInDays});
}