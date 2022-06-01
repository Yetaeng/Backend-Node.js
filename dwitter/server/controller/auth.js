import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as authRepository from '../data/auth.js';

const jwtSecretKey = 'aZqd4ywpfX*&';
const jwtExpiresInDays = '3d';

export async function register(req, res) {
    const {
        username,
        password,
        email,
        url
    } = req.body;
    const user = await authRepository.findUser(username);

    // 가입된 사용자가 아니라면 토큰 발급
    if (user) {
        return res.status(409).json({message: '이미 존재하는 사용자 이름 입니다.'})
    }

    const hashed = bcrypt.hashSync(password, 10);
    const newUser = await authRepository.createUser(username, hashed, email, url);
    const newUserToken = jwt.sign({username: newUser.username}, jwtSecretKey, {expiresIn: jwtExpiresInDays});

    res.status(201).json({message: '회원가입 성공', token: newUserToken});      
}

export async function login(req, res) {
    const {
        username,
        password
    } = req.body;
    const user = await authRepository.findUser(username);

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
        jwt.verify(token, secret, (error) => {
            if (error) {
                console.error(error);
                return res.status(401).json({message: "유효하지 않은 토큰입니다."})
            } else {
                return res.status(200).json({message: '로그인 성공'})
            }
        })
    }           
}