import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const classController = {
  // Create a new class
  async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body;
      
      // Validate required fields
      if (!name) {
        return res.status(400).json({ 
          error: 'Class name is required' 
        });
      }

      const newClass = await prisma.class.create({
        data: { name, description },
        include: {
          students: true,
        },
      });
      res.status(201).json(newClass);
    } catch (error) {
      console.error('Error creating class:', error);
      res.status(500).json({ 
        error: 'Failed to create class',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Get all classes
  async getAll(req: Request, res: Response) {
    try {
      console.log('Fetching all classes...');
      const classes = await prisma.class.findMany({
        include: {
          students: true,
        },
        orderBy: {
          name: 'asc',
        },
      });
      console.log(`Found ${classes.length} classes`);
      res.json(classes);
    } catch (error) {
      console.error('Error fetching classes:', error);
      res.status(500).json({ 
        error: 'Failed to fetch classes',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Get a single class by ID
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(id) },
        include: {
          students: true,
        },
      });
      if (!classData) {
        return res.status(404).json({ error: 'Class not found' });
      }
      res.json(classData);
    } catch (error) {
      console.error('Error fetching class:', error);
      res.status(500).json({ 
        error: 'Failed to fetch class',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Update a class
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      // Validate required fields
      if (!name) {
        return res.status(400).json({ 
          error: 'Class name is required' 
        });
      }

      const updatedClass = await prisma.class.update({
        where: { id: parseInt(id) },
        data: { name, description },
        include: {
          students: true,
        },
      });
      res.json(updatedClass);
    } catch (error) {
      console.error('Error updating class:', error);
      res.status(500).json({ 
        error: 'Failed to update class',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  // Delete a class
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      // Check if class exists
      const classData = await prisma.class.findUnique({
        where: { id: parseInt(id) },
      });
      
      if (!classData) {
        return res.status(404).json({ error: 'Class not found' });
      }

      await prisma.class.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting class:', error);
      res.status(500).json({ 
        error: 'Failed to delete class',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },
}; 