import { Router } from 'express';
import { postController } from '../controller/postController';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/:userId', postController.getPostByUser);
router.patch('/:id', postController.updatePostbyId);

export const postRouter = router;
