import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';

class UserMiddleware {
    public async checkIsUserExist(req:IRequestExtended, res:Response, next:NextFunction)
        :Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                res.status(404).json('user not found');
                return;
            }
            req.user = userFromDB;
        } catch (e) {
            res.status(400)
                .json(e);
        }
        next();
    }
}

export const userMiddleware = new UserMiddleware();
