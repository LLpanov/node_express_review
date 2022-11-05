import { NextFunction, Response } from 'express';
import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { constants } from '../constans';
import { ErrorHandler } from '../error/ErorrHandler';
import { authValidator } from '../validators';
import { actionTokenRepository } from '../repositories/actionToken/actionTokenRepository';
import { IUser } from '../entity';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const accessToken = req.get(constants.AUTHORIZATION);
            if (!accessToken) {
                next(new ErrorHandler('no token', 404));
                return;
            }

            const { userId } = await tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({ accessToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('no token', 404));
                return;
            }

            const userFromToken = await userService.getUserById(userId);
            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserRefreshToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const refreshToken = req.get(constants.AUTHORIZATION);

            if (!refreshToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }
            const { userId } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenFromDB = await tokenRepository.findByParams({ refreshToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('no token in base', 401));
                return;
            }
            const userFromToken = await userService.getUserById(userId);

            if (!userFromToken) {
                next(new ErrorHandler('token non valid', 401));
                return;
            }
            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public loginJoi(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = authValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async registrationJoi(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { email } = req.body as IUser;
            const userFromDb = await userService.getUserByEmail(email);
            if (userFromDb) {
                next(new ErrorHandler(`User with email:${email} already exists `));
                return;
            }
            const { error, value } = authValidator.registration.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkValidEmail(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = authValidator.email.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkValidPassword(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = authValidator.password.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message, 404));
                return;
            }
            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction)
        : Promise<void> {
        try {
            const actionToken = req.get(constants.AUTHORIZATION);

            if (!actionToken) {
                next(new ErrorHandler('No token', 401));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepository.findByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('no token in base', 401));
                return;
            }
            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('token non valid', 401));
                return;
            }
            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
