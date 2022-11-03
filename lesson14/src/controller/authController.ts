import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import {
    authService, emailService, s3Service, tokenService, userService,
} from '../services';
import { constants, COOKIE, EmailActionEnum } from '../constans';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';
import { ActionTokenTypes } from '../enums/actionTokenTypes.enums';

class AuthController {
    // eslint-disable-next-line consistent-return
    public async registration(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const createdUser = await userService.createUser(req.body);

            const avatar = req.files?.avatar as UploadedFile;

            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);
                const locationAvatar = sendData.Location as string;
                console.log(locationAvatar);
                await userService.updateByObject(createdUser.id, { avatar: locationAvatar });
            }

            const tokenData = await authService.registration(createdUser);

            res.cookie(
                COOKIE.nameRefreshToken,
                tokenData.refreshToken,
                {

                    maxAge: COOKIE.maxAgeRefreshToken,
                    httpOnly: true,
                },
            );
            return res.json(tokenData);
        } catch (e: any) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        await tokenService.deleteTokenPair(id);

        return res.json('OK');
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const {
                id, email, password: hashPassword, firstName,
            } = req.user as IUser;

            const { password } = req.body;

            await emailService
                .sendEmail(email, EmailActionEnum.WELCOME_UTENOK, { userName: firstName });
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

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
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

    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { email, id, firstName } = req.user as IUser;

            const actionToken = tokenService.generateActionToken({ userId: id, userEmail: email });

            await actionTokenRepository
                .createActionToken({
                    actionToken, type: ActionTokenTypes.forgotPassword, userId: id,
                });

            await emailService.sendEmail(email, EmailActionEnum.FORGOT_PASSWORD, {
                actionToken,
                userName: firstName,
            });

            res.json({
                actionToken,
                user: req.user,
                Result: 'generate new action token',
            });
        } catch (e: any) {
            next(e);
        }
    }

    public async setNewPassword(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const { id } = req.user as IUser;

            const actionToken = req.get(constants.AUTHORIZATION);

            await userService.updateByObject(id, req.body);
            await actionTokenRepository.deleteByParams({ actionToken });

            res.json('password changed').status(200);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
