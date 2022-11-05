import { Router } from 'express';
import { studentsController } from '../controller';

const router = Router();

router.get('/', studentsController.getAll);
router.post('/', studentsController.addNewStudent);
router.patch('/:student_id', studentsController.setTeacher);

export const studentsRouter = router;
