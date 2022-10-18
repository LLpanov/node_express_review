import { NextFunction, Request, Response } from 'express';
import { authService, tokenService, userService } from '../services';
import { constants, COOKIE, EmailActionEnum } from '../constans';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { emailService } from '../services/emailSevice';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enums';

class AuthController {
    public async registration(req:Request, res:Response, next:NextFunction) {
        try {
            const data = await authService.registration(req.body);
            res.cookie(
                COOKIE.nameRefreshToken,
                data.refreshToken,
                {
                    maxAge: COOKIE.maxAgeRefreshToken,
                    httpOnly: true,
                },
            );
        } catch (e) {
            next(e);
        }
    }

    public async logout(req:IRequestExtended, res:Response):Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteTokenPair(id);

        return res.json('OK');
    }

    public async login(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;

            const { password } = req.body;

            await emailService.sendEmail(email, EmailActionEnum.WELCOME_UTENOK, { userName: 'Katya' });
            await userService.compareUserPassword(password, hashPassword);

            const { refreshToken, accessToken } = await

            tokenService.generateTokenPair({ userId: id, userEmail: email });

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'OK',
            });
        } catch (e) {
            next(e);
        }
    }

    public async refreshToken(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { id, email } = req.user as IUser;
            const refreshTokenDelete = req.get(constants.AUTHORIZATION);
            await tokenService.deleteTokenPairByParams({ refreshToken: refreshTokenDelete });

            const { accessToken, refreshToken } = await tokenService
                .generateTokenPair({ userId: id, userEmail: email });
            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
                Result: 'OK',
            });
        } catch (e) {
            next(e);
        }
    }

    // eslint-disable-next-line max-len
    public async sendForgotPassword(req:IRequestExtended, res:Response, next:NextFunction):Promise<void> {
        try {
            const { email, id, firstName } = req.user as IUser;
            const token = tokenService.generateActionToken({ userId: id, userEmail: email });
            // eslint-disable-next-line max-len
            await actionTokenRepository.createActionToken({ actionToken: token, type: ActionTokenTypes.forgotPassword, userId: id });
            await emailService.sendEmail(email, EmailActionEnum.FORGOT_PASSWORD, {
                token,
                userName: firstName,
            });

            res.json({
                actionToken: token,
                userName: firstName,
                Result: 'OK',
            });
        } catch (e) {
            next(e);
        }
    }

    public async setNewPassword(req:IRequestExtended, res:Response, next:NextFunction)
         :Promise<void> {
        try {
            const { id } = req.user as IUser;
            const actionToken = req.get(constants.AUTHORIZATION);

            await actionTokenRepository.deleteByParams({ actionToken });
            await userService.forgotPassword(id, req.body);

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
