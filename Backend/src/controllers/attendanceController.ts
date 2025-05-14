import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type AttendanceWithRelations = {
  id: number;
  date: Date;
  status: string;
  studentId: number;
  classId: number;
  student: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    classId: number;
    createdAt: Date;
    updatedAt: Date;
  };
  class: {
    id: number;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
};

export const attendanceController = {
  // Mark attendance for multiple students
  async markAttendance(req: Request, res: Response) {
    try {
      const attendanceRecords = Array.isArray(req.body) ? req.body : [req.body];
      const createdAttendances = [];

      for (const record of attendanceRecords) {
        const { studentId, classId, date, status } = record;
        
        // Check if attendance record already exists for this student on this date
        const existingAttendance = await prisma.attendance.findFirst({
          where: {
            studentId: parseInt(studentId),
            date: new Date(date),
          },
        });

        let attendance;
        if (existingAttendance) {
          // Update existing record
          attendance = await prisma.attendance.update({
            where: { id: existingAttendance.id },
            data: { status },
            include: {
              student: true,
              class: true,
            },
          });
        } else {
          // Create new record
          attendance = await prisma.attendance.create({
            data: {
              studentId: parseInt(studentId),
              classId: parseInt(classId),
              date: new Date(date),
              status,
            },
            include: {
              student: true,
              class: true,
            },
          });
        }
        
        createdAttendances.push(attendance);
      }

      res.status(201).json(createdAttendances);
    } catch (error) {
      console.error('Error marking attendance:', error);
      res.status(500).json({ error: 'Failed to mark attendance' });
    }
  },

  // Get attendance by class and date
  async getByClassAndDate(req: Request, res: Response) {
    try {
      const { classId, date } = req.params;
      const attendance = await prisma.attendance.findMany({
        where: {
          classId: parseInt(classId),
          date: new Date(date),
        },
        include: {
          student: true,
          class: true,
        },
      });
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  },

  // Get attendance by student
  async getByStudent(req: Request, res: Response) {
    try {
      const { studentId } = req.params;
      const attendance = await prisma.attendance.findMany({
        where: {
          studentId: parseInt(studentId),
        },
        include: {
          student: true,
          class: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch attendance' });
    }
  },

  // Get attendance report by class
  async getClassReport(req: Request, res: Response) {
    try {
      const { classId, startDate, endDate } = req.params;
      const attendance = await prisma.attendance.findMany({
        where: {
          classId: parseInt(classId),
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
        include: {
          student: true,
          class: true,
        },
        orderBy: {
          date: 'asc',
        },
      });

      // Group attendance by student
      const report = attendance.reduce((acc: any, curr: AttendanceWithRelations) => {
        const studentId = curr.studentId;
        if (!acc[studentId]) {
          acc[studentId] = {
            student: curr.student,
            attendance: [],
          };
        }
        acc[studentId].attendance.push(curr);
        return acc;
      }, {});

      res.json(Object.values(report));
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch report' });
    }
  },

  // Update attendance
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const attendance = await prisma.attendance.update({
        where: { id: parseInt(id) },
        data: { status },
        include: {
          student: true,
          class: true,
        },
      });
      res.json(attendance);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update attendance' });
    }
  },

  // Get all attendances
  async getAll(req: Request, res: Response) {
    try {
      const attendances = await prisma.attendance.findMany({
        include: {
          student: true,
          class: true,
        },
        orderBy: {
          date: 'desc',
        },
      });
      res.json(attendances);
    } catch (error) {
      console.error('Error fetching attendances:', error);
      res.status(500).json({ error: 'Failed to fetch attendances' });
    }
  },
}; 