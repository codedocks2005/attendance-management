import { defineStore } from 'pinia'

interface Attendance {
  id: number
  date: string
  status: string
  studentId: number
  classId: number
  student: any
  class: any
  createdAt: string
  updatedAt: string
}

export const useAttendanceStore = defineStore('attendance', {
  state: () => ({
    attendances: [] as Attendance[],
    currentAttendance: null as Attendance | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAttendances() {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/attendance`)
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to fetch attendances: ${response.status} ${errorData.error || response.statusText}`)
        }
        this.attendances = await response.json()
      } catch (err) {
        console.error('Error fetching attendances:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async markAttendance(attendanceRecords: Array<{
      studentId: number
      classId: number
      date: string
      status: string
    }>) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        console.log('Marking attendance for records:', attendanceRecords)
        const response = await fetch(`${config.public.apiBase}/attendance`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendanceRecords),
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to mark attendance: ${response.status} ${errorData.error || response.statusText}`)
        }
        const newAttendances = await response.json()
        this.attendances.push(...newAttendances)
        return newAttendances
      } catch (err) {
        console.error('Error marking attendance:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async getAttendanceByClassAndDate(classId: number, date: string) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(
          `${config.public.apiBase}/attendance/class/${classId}/date/${date}`
        )
        if (!response.ok) throw new Error('Failed to fetch attendance')
        this.attendances = await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async getAttendanceByStudent(studentId: number) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(
          `${config.public.apiBase}/attendance/student/${studentId}`
        )
        if (!response.ok) throw new Error('Failed to fetch attendance')
        this.attendances = await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
      } finally {
        this.loading = false
      }
    },

    async getClassReport(classId: number, startDate: string, endDate: string) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(
          `${config.public.apiBase}/attendance/report/class/${classId}/start/${startDate}/end/${endDate}`
        )
        if (!response.ok) throw new Error('Failed to fetch report')
        return await response.json()
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateAttendance(id: number, status: string) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const response = await fetch(`${config.public.apiBase}/attendance/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        })
        if (!response.ok) throw new Error('Failed to update attendance')
        const updatedAttendance = await response.json()
        const index = this.attendances.findIndex(a => a.id === id)
        if (index !== -1) {
          this.attendances[index] = updatedAttendance
        }
        return updatedAttendance
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentAttendance(attendanceData: Attendance | null) {
      this.currentAttendance = attendanceData
    },
  },
}) 