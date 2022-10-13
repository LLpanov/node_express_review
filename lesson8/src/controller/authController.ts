import { Request, Response } from 'express';
import { authService, tokenService, userService } from '../services';
import { COOKIE } from '../constans';
import { IRequestExtended, ITokenData } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthController {
    public async registration(req:Request, res:Response):Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            {
                maxAge: COOKIE.maxAgeRefreshToken,
                httpOnly: true,
            },
        );
        return res.json(data);
    }

    public async logout(req:IRequestExtended, res:Response):Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteTokenPair(id);

        return res.json('OK');
    }

    public async login(req:IRequestExtended, res:Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;

            const { password } = req.body;

            await userService.compareUserPassword(password, hashPassword);

            const { refreshToken, accessToken } = await

            tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'OK',
            });
        } catch (err:any) {
            res.status(400);
        }
    }

    public async refreshToken(req:IRequestExtended, res:Response) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenDelete = req.get('Authorization');
            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenDelete });

            const { accessToken, refreshToken } = await tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            return res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'OK',
            });
        } catch (err:any) {
            res.status(400)
                .json(err.message);
        }
    }
}

export const authController = new AuthController();
