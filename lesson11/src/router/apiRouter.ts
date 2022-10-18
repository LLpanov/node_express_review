import { Router } from 'express';
import { authRouter } from './authRouter';
import { commentRouter } from './commentRouter';
import { postRouter } from './postRouter';
import { userRouter } from './userRouter';

const router = Router();
router.use('/auth', authRouter);
router.use('/comments', commentRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);

export const apiRouter = router;
