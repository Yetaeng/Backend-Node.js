import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const jwtSecretKey = 'aZqd4ywpfX*&';
const authErrorMsg = { message: "유효하지 않은 토큰입니다." };

export const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(authErrorMsg);
    }

    const token = authHeader.split(' ')[1]; // 공백으로 구분하면 굳이 'Bearer '까지 안해도됨!
    jwt.verify(token, jwtSecretKey, async (error, decoded) => {
        if (error) {
            return res.status(401).json(authErrorMsg);
        } else {
            const user = await userRepository.findUserById(decoded.uid);

            if (!user) {
                return res.status(401).json({message: "유효한 사용자가 아닙니다."});
            }

            req.uid = user.uid; // 검증이 끝난 사용자에게는 req에 id전달. 나중에 이 아이디로 사용자 정보를 가져오기 위함
            next(); // 주의! 미들웨어이니까 res.send()로 해서 끝나게하면 안됨
        }
    })
} 