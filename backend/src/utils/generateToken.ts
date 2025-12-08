import jwt from 'jsonwebtoken';
import { Response } from 'express';

const generateToken = (res: Response, userId: any) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '15m', // Access token
    });

    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
        expiresIn: '7d', // Refresh token
    });

    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { token, refreshToken };
};

export default generateToken;
