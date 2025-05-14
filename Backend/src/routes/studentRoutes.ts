import { Router } from 'express';
import { studentController } from '../controllers/studentController';

const router = Router();

// Student routes
router.post('/', studentController.create);
router.get('/', studentController.getAll);
router.get('/class/:classId', studentController.getByClass);
router.get('/:id', studentController.getById);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);

export default router; 