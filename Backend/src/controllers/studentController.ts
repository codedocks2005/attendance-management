import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const studentController = {
  // Create a new student
  async create(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, classId } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email || !classId) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          details: {
            firstName: !firstName ? 'First name is required' : null,
            lastName: !lastName ? 'Last name is required' : null,
            email: !email ? 'Email is required' : null,
            classId: !classId ? 'Class is required' : null,
          }
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          error: 'Invalid email format' 
        });
      }

      // Check if class exists
      const classExists = await prisma.class.findUnique({
        where: { id: parseInt(classId) }
      });

      if (!classExists) {
        return res.status(400).json({ 
          error: 'Selected class does not exist' 
        });
      }

      const newStudent = await prisma.student.create({
        data: {
          firstName,
          lastName,
          email,
          classId: parseInt(classId),
        },
        include: {
          class: true,
        },
      });
      res.status(201).json(newStudent);
    } catch (error) {
      console.error('Error creating student:', error);
      res.status(500).json({ 
        error: 'Failed to create student',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Get all students
  async getAll(req: Request, res: Response) {
    try {
      const students = await prisma.student.findMany({
        include: {
          class: true,
        },
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  },

  // Get students by class
  async getByClass(req: Request, res: Response) {
    try {
      const { classId } = req.params;
      const students = await prisma.student.findMany({
        where: {
          classId: parseInt(classId),
        },
        include: {
          class: true,
        },
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  },

  // Get a single student by ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
        include: {
          class: true,
          attendances: true,
        },
      });
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student' });
    }
  },

  // Update a student
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, classId } = req.body;
      const updatedStudent = await prisma.student.update({
        where: { id: parseInt(id) },
        data: {
          firstName,
          lastName,
          email,
          classId: parseInt(classId),
        },
        include: {
          class: true,
        },
      });
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update student' });
    }
  },

  // Delete a student
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Check if student exists
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id) },
      });
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Delete the student
      await prisma.student.delete({
        where: { id: parseInt(id) },
      });
      
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting student:', error);
      res.status(500).json({ 
        error: 'Failed to delete student',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
}; 