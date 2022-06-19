import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
    const value = process.env[key] || defaultValue;
    // 키 값이 부재일 때
    if (value == null) {
        throw new Error(`The key ${key} is undefined.`);
    }
    return value;
};

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInDays: parseInt(required('JWT_EXPIRES_IN_DAYS', 1)),
    },
    bcrypt: {
        saltRound: parseInt(required('BCRYPT_SALT', 12)),
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080)),
    },
    db: {
        uri: required('DB_URI'),
    }
};
