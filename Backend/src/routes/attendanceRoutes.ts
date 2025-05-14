import { Router } from 'express';
import { attendanceController } from '../controllers/attendanceController';

const router = Router();

// Attendance routes
router.get('/', attendanceController.getAll);
router.post('/', attendanceController.markAttendance);
router.get('/class/:classId/date/:date', attendanceController.getByClassAndDate);
router.get('/student/:studentId', attendanceController.getByStudent);
router.get('/report/class/:classId/start/:startDate/end/:endDate', attendanceController.getClassReport);
router.put('/:id', attendanceController.update);

export default router; 