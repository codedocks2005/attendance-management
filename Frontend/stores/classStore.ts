import { defineStore } from 'pinia'

interface Class {
  id: number
  name: string
  description: string | null
  students: any[]
  createdAt: string
  updatedAt: string
}

export const useClassStore = defineStore('class', {
  state: () => ({
    classes: [] as Class[],
    currentClass: null as Class | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchClasses() {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const apiUrl = `${config.public.apiBase}/classes`
        console.log('Fetching classes from:', apiUrl)
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const responseData = await response.json()
        console.log('Response from classes API:', { status: response.status, data: responseData })

        if (!response.ok) {
          throw new Error(responseData.error || `Failed to fetch classes: ${response.status} ${response.statusText}`)
        }

        this.classes = responseData
        console.log('Successfully loaded classes:', this.classes)
      } catch (err) {
        console.error('Error fetching classes:', err)
        this.error = err instanceof Error ? err.message : 'Failed to load classes. Please try again.'
        this.classes = []
      } finally {
        this.loading = false
      }
    },

    async createClass(classData: { name: string; description?: string }) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const apiUrl = `${config.public.apiBase}/classes`
        console.log('Creating class:', classData, 'at URL:', apiUrl)
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(classData),
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to create class: ${response.status} ${errorData.error || response.statusText}`)
        }
        const newClass = await response.json()
        this.classes.push(newClass)
        return newClass
      } catch (err) {
        console.error('Error creating class:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateClass(id: number, classData: { name: string; description?: string }) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const apiUrl = `${config.public.apiBase}/classes/${id}`
        console.log('Updating class:', id, classData, 'at URL:', apiUrl)
        const response = await fetch(apiUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(classData),
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to update class: ${response.status} ${errorData.error || response.statusText}`)
        }
        const updatedClass = await response.json()
        const index = this.classes.findIndex(c => c.id === id)
        if (index !== -1) {
          this.classes[index] = updatedClass
        }
        return updatedClass
      } catch (err) {
        console.error('Error updating class:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteClass(id: number) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const apiUrl = `${config.public.apiBase}/classes/${id}`
        console.log('Deleting class:', id, 'at URL:', apiUrl)
        const response = await fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to delete class: ${response.status} ${errorData.error || response.statusText}`)
        }
        this.classes = this.classes.filter(c => c.id !== id)
      } catch (err) {
        console.error('Error deleting class:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    async getClassById(id: number) {
      this.loading = true
      this.error = null
      try {
        const config = useRuntimeConfig()
        const apiUrl = `${config.public.apiBase}/classes/${id}`
        console.log('Fetching class:', id, 'at URL:', apiUrl)
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(`Failed to fetch class: ${response.status} ${errorData.error || response.statusText}`)
        }
        const classData = await response.json()
        this.currentClass = classData
        return classData
      } catch (err) {
        console.error('Error fetching class:', err)
        this.error = err instanceof Error ? err.message : 'An error occurred'
        throw err
      } finally {
        this.loading = false
      }
    },

    setCurrentClass(classData: Class | null) {
      this.currentClass = classData
    },

    async fetchClass(id: number) {
      this.loading = true
      this.error = null
      try {
        if (this.classes.length) {
          const foundClass = this.classes.find(c => c.id === id)
          if (foundClass) {
            this.currentClass = foundClass
            return foundClass
          }
        }
        
        return await this.getClassById(id)
      } catch (err) {
        console.error('Error fetching class:', err)
        this.error = err instanceof Error ? err.message : 'Failed to load class data'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
}) 