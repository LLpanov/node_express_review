import { Router } from 'express';
import { userController } from '../controller';

const router = Router();

router.get('/', userController.getAlluser);
router.get('/pagination', userController.getUserPagination);
router.get('/email', userController.getUsersByEmail);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export const userRouter = router;
