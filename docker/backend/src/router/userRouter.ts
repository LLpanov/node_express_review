import { Router } from 'express';
import { userController } from '../controller/userController';

const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAlluser);
router.get('/:id', userController.getUserById);
router.get('/:email', userController.getUsersByEmail);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

export const userRouter = router;
