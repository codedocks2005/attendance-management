<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Mark Attendance</h3>
          <p class="mt-1 text-sm text-gray-600">
            Mark attendance for students in a class.
          </p>
        </div>
      </div>

      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
              <!-- Class Selection -->
              <div>
                <label for="classId" class="block text-sm font-medium text-gray-700">
                  Class
                </label>
                <div class="mt-1">
                  <select
                    id="classId"
                    name="classId"
                    v-model="form.classId"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a class</option>
                    <option v-for="classItem in classStore.classes" :key="classItem.id" :value="classItem.id">
                      {{ classItem.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Date -->
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div class="mt-1">
                  <input
                    type="date"
                    name="date"
                    id="date"
                    v-model="form.date"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <!-- Students List -->
              <div v-if="selectedClassStudents.length > 0">
                <h4 class="text-sm font-medium text-gray-700 mb-4">Students</h4>
                <div class="space-y-4">
                  <div v-for="student in selectedClassStudents" :key="student.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ student.firstName }} {{ student.lastName }}</p>
                      <p class="text-xs text-gray-500">{{ student.email }}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                      <div class="flex items-center">
                        <input
                          type="radio"
                          :id="`present-${student.id}`"
                          :name="`status-${student.id}`"
                          value="present"
                          v-model="form.attendance[student.id]"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label :for="`present-${student.id}`" class="ml-2 block text-sm text-gray-900">
                          Present
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="radio"
                          :id="`absent-${student.id}`"
                          :name="`status-${student.id}`"
                          value="absent"
                          v-model="form.attendance[student.id]"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label :for="`absent-${student.id}`" class="ml-2 block text-sm text-gray-900">
                          Absent
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="radio"
                          :id="`late-${student.id}`"
                          :name="`status-${student.id}`"
                          value="late"
                          v-model="form.attendance[student.id]"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label :for="`late-${student.id}`" class="ml-2 block text-sm text-gray-900">
                          Late
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="form.classId" class="text-center py-4 text-gray-500">
                No students found in this class.
              </div>
            </div>

            <!-- Error Alert -->
            <div v-if="attendanceStore.error" class="rounded-md bg-red-50 p-4 mx-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Error marking attendance</h3>
                  <div class="mt-2 text-sm text-red-700">
                    <p>{{ attendanceStore.error }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <NuxtLink
                to="/attendance"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </NuxtLink>
              <button
                type="submit"
                :disabled="attendanceStore.loading || !form.classId || !form.date || selectedClassStudents.length === 0"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  v-if="attendanceStore.loading"
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {{ attendanceStore.loading ? 'Saving...' : 'Save Attendance' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '~/stores/attendanceStore'
import { useClassStore } from '~/stores/classStore'
import { useStudentStore } from '~/stores/studentStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const attendanceStore = useAttendanceStore()
const classStore = useClassStore()
const studentStore = useStudentStore()

const form = ref({
  classId: '',
  date: new Date().toISOString().split('T')[0],
  attendance: {} as Record<number, 'present' | 'absent' | 'late'>,
})

// Computed property to get students of the selected class
const selectedClassStudents = computed(() => {
  if (!form.value.classId) return []
  return studentStore.students.filter(student => student.classId === Number(form.value.classId))
})

// Watch for class selection to initialize attendance status
watch(() => form.value.classId, (newClassId) => {
  if (newClassId) {
    // Initialize all students as present by default
    form.value.attendance = {}
    selectedClassStudents.value.forEach(student => {
      form.value.attendance[student.id] = 'present'
    })
  }
})

const handleSubmit = async () => {
  try {
    // Create attendance records for each student
    const attendanceRecords = Object.entries(form.value.attendance).map(([studentId, status]) => ({
      studentId: Number(studentId),
      classId: Number(form.value.classId),
      date: form.value.date,
      status,
    }))

    await attendanceStore.markAttendance(attendanceRecords)
    router.push('/attendance')
  } catch (error) {
    console.error('Failed to mark attendance:', error)
  }
}

// Fetch classes and students on mount
onMounted(async () => {
  await Promise.all([
    classStore.fetchClasses(),
    studentStore.fetchStudents(),
  ])
})
</script> 