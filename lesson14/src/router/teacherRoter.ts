import { Router } from 'express';
import { teacherController } from '../controller';

const router = Router();

router.get('/', teacherController.getAll);
router.post('/', teacherController.addNewTeacher);

export const teacherRouter = router;
