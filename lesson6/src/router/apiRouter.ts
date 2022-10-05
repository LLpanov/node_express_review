import { Router } from 'express';
import { userRouter } from './userRouter';
import { postRouter } from './postRouter';
import { commentRouter } from './commentRouter';

const router = Router();
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);

export const apiRouter = router;
