import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';
import { authRouter } from './authRouter';

const router = Router();
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/auth', authRouter);

export const apiRouter = router;
