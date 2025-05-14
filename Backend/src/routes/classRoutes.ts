import { Router } from 'express';
import { classController } from '../controllers/classController';

const router = Router();

// Class routes
router.post('/', classController.create);
router.get('/', classController.getAll);
router.get('/:id', classController.getById);
router.put('/:id', classController.update);
router.delete('/:id', classController.delete);

export default router; 