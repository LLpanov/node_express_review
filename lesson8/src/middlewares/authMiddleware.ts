import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
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
        } catch (err: any) {
            res.json({
                status: 401,
                message: err.message,
            });
        }
    }

    public async checkUserRefreshToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('no token');
            }
            const { userId } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenFromDB) {
                throw new Error('no token in base');
            }
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                throw new Error('non valid token');
            }
            req.user = userFromToken;

            next();
        } catch (err: any) {
            res.json({
                status: 401,
                message: err.message,
            });
        }
    }
}
export const authMiddleware = new AuthMiddleware();
