import { Router } from 'express';
import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authMiddleware.registrationJoi, authController.registration);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/login', authMiddleware.loginJoi, userMiddleware.checkIsUserExist, authController.login);
router.post('/refresh', authMiddleware.checkUserRefreshToken, authController.refreshToken);
router.post('/forgotPassword', authMiddleware.checkValidEmail, userMiddleware.checkIsUserExist, authController.sendForgotPassword);
router.post('/forgotPassword/set', authMiddleware.checkValidPassword, authMiddleware.checkActionToken, authController.setNewPassword);

export const authRouter = router;
