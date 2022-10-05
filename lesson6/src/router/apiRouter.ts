import { Router } from 'express';
import { userRouter } from './userRouter';

const router = Router();
router.use('/users', userRouter);

export const apiRouter = router;
