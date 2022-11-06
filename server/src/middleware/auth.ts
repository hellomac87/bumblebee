import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as userRepository from '../data/auth';
import { jwtSecretKey } from '../controller/auth';

// TODO: type recapsulation
export type MyResponseLocals = {
    userId: string;
    token: string;
};

// TODO: type recapsulation
export type MyJwtDecodePayload = {
    id: string;
};

// TODO: constant recapsulation
const AUTH_ERROR = {
    message: 'Authentication Error',
};

export async function isAuth(req: Request, res: Response<any, MyResponseLocals>, next: NextFunction) {
    const authHeader = req.get('Authorization');

    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, jwtSecretKey, async (error, decoded) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        // user exist verify
        // 유저 확인은 생략해도 된다.
        // 확인이 필요한 경우 필요한 api 에 한하여 컨트롤러에서 확인한다.
        const user = await userRepository.findById((decoded as MyJwtDecodePayload).id);
        if (!user) {
            return res.status(401).json(AUTH_ERROR);
        }
        res.locals.userId = user.id;
        res.locals.token = token;
        next();
    });
}
