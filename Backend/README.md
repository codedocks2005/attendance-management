# Student Attendance Management System - Backend

This is the backend service for the Student Attendance Management System. It provides REST APIs for managing classes, students, and attendance records.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database named `attendance_system`

4. Update the `.env` file with your database credentials:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/attendance_system"
   PORT=3000
   ```

5. Run database migrations:
   ```bash
   npm run prisma:migrate
   ```

6. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

## Development

To run the server in development mode:
```bash
npm run dev
```

## Production

To build and run in production:
```bash
npm run build
npm start
```

## API Endpoints

### Classes
- `POST /api/classes` - Create a new class
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get a specific class
- `PUT /api/classes/:id` - Update a class
- `DELETE /api/classes/:id` - Delete a class

### Students
- `POST /api/students` - Create a new student
- `GET /api/students` - Get all students
- `GET /api/students/class/:classId` - Get students by class
- `GET /api/students/:id` - Get a specific student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/class/:classId/date/:date` - Get attendance by class and date
- `GET /api/attendance/student/:studentId` - Get attendance by student
- `GET /api/attendance/report/class/:classId/start/:startDate/end/:endDate` - Get attendance report
- `PUT /api/attendance/:id` - Update attendance record

## Database Management

To open Prisma Studio (database GUI):
```bash
npm run prisma:studio
``` 