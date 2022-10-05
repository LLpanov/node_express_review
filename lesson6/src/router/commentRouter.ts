import { Router } from 'express';
import { commentController } from '../controller/commentController';

const router = Router();

router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentsById);
router.post('/action', commentController.getLikeDieslike);

export const commentRouter = router;
