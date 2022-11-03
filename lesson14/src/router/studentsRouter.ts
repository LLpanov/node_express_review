import { Router } from 'express';
import { studentsController } from '../controller';

const router = Router();

router.get('/', studentsController.getAll);
router.post('/', studentsController.addNewStudent);

export const studentsRouter = router;
