import { Router } from 'express';
import { postController } from '../controller';

const router = Router();

router.get('/', postController.getAllPosts);
router.get('/pagination', postController.getPostPagination);
router.get('/:userId', postController.getPostByUser);
router.patch('/:id', postController.updatePostbyId);

export const postRouter = router;
