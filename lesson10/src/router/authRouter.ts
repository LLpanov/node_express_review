import { Router } from 'express';
import { authController } from '../controller';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authMiddleware.registrationJoi, authController.registration);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/login', authMiddleware.loginJoi, userMiddleware.checkIsUserExist, authController.login);
router.post('/refresh', authMiddleware.checkUserRefreshToken, authController.refreshToken);

export const authRouter = router;
