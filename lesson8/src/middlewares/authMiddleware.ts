import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction)
        :Promise<void> {
        try {
            const accessToken = req.get('Authorization');
            if (!accessToken) {
                throw new Error('no token');
            }

            const { userId } = await tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                throw new Error('token invalid');
            }

            const userFromToken = await userService.getUserById(userId);
            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e:any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
