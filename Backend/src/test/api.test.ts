import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testClassAPI() {
  try {
    // Create a test class
    console.log('Creating test class...');
    const testClass = await prisma.class.create({
      data: {
        name: 'Test Class 1',
        description: 'Test Description'
      }
    });
    console.log('Created test class:', testClass);

    // Fetch all classes
    console.log('\nFetching all classes...');
    const classes = await prisma.class.findMany();
    console.log('All classes:', classes);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testClassAPI(); 