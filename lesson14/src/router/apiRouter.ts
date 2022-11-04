import { Router } from 'express';
import { authRouter } from './authRouter';
import { commentRouter } from './commentRouter';
import { postRouter } from './postRouter';
import { userRouter } from './userRouter';
import { studentsRouter } from './studentsRouter';
import {teacherRouter} from "./teacherRoter";

const router = Router();
router.use('/auth', authRouter);
router.use('/comments', commentRouter);
router.use('/posts', postRouter);
router.use('/users', userRouter);
router.use('/students', studentsRouter);
router.use('/teachers', teacherRouter);

export const apiRouter = router;
