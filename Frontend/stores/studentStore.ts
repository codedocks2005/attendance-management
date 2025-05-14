import { defineStore } from 'pinia'

interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  classId: number
  class: any
  createdAt: string
  updatedAt: string
}

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: [] as Student[],
    currentStudent: null as Student | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchStudents() {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/students`)
        if (!response.ok) throw new Error('Failed to fetch students')
        this.students = await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async fetchStudentsByClass(classId: number) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/students/class/${classId}`)
        if (!response.ok) throw new Error('Failed to fetch students')
        this.students = await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async createStudent(studentData: {
      firstName: string
      lastName: string
      email: string
      classId: number
    }) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        console.log('Creating student with data:', studentData)
        const response = await fetch(`${config.public.apiBase}/students`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            classId: studentData.classId,
          }),
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create student')
        }
        
        const newStudent = await response.json()
        this.students.push(newStudent)
        return newStudent
      } catch (err) {
        console.error('Error creating student:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateStudent(
      id: number,
      studentData: {
        firstName: string
        lastName: string
        email: string
        classId: number
      }
    ) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/students/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(studentData),
        })
        if (!response.ok) throw new Error('Failed to update student')
        const updatedStudent = await response.json()
        const index = this.students.findIndex(s => s.id === id)
        if (index !== -1) {
          this.students[index] = updatedStudent
        }
        return updatedStudent
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteStudent(id: number) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/students/${id}`, {
          method: 'DELETE',
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to delete student: ${response.status} ${errorData.error || response.statusText}`)
        }
        // Remove the student from the local state
        this.students = this.students.filter(s => s.id !== id)
        return true
      } catch (err) {
        console.error('Error deleting student:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentStudent(studentData: Student | null) {
      this.currentStudent = studentData
    },
  },
}) 