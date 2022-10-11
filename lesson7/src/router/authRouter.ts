import { Router } from 'express';
import { authController } from '../controller';
import { authMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// router.post('/login', authController.registration);
// router.post('/refresh', authController.registration);

export const authRouter = router;
