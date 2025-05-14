<template>
  <div>
    <!-- Loading State -->
    <div v-if="studentStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="studentStore.error" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading student</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ studentStore.error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Student Details -->
    <div v-else-if="studentStore.currentStudent" class="space-y-6">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {{ studentStore.currentStudent.firstName }} {{ studentStore.currentStudent.lastName }}
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Student ID: {{ studentStore.currentStudent.id }}
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            @click="isEditing = !isEditing"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ isEditing ? 'Cancel Edit' : 'Edit Student' }}
          </button>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-if="isEditing" class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <!-- First Name -->
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    v-model="form.firstName"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    :class="{ 'border-red-300': errors.firstName }"
                    required
                  />
                </div>
                <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
              </div>

              <!-- Last Name -->
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    v-model="form.lastName"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    :class="{ 'border-red-300': errors.lastName }"
                    required
                  />
                </div>
                <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div class="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="form.email"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    :class="{ 'border-red-300': errors.email }"
                    required
                  />
                </div>
                <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div class="mt-1">
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    v-model="form.phone"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <!-- Class -->
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
                  >
                    <option value="">Select a class</option>
                    <option v-for="classItem in classStore.classes" :key="classItem.id" :value="classItem.id">
                      {{ classItem.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="studentStore.loading"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    v-if="studentStore.loading"
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
                  {{ studentStore.loading ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Student Information -->
      <div v-else class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Student Information</h3>
          <div class="mt-5 border-t border-gray-200">
            <dl class="divide-y divide-gray-200">
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Full name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ studentStore.currentStudent.firstName }} {{ studentStore.currentStudent.lastName }}
                </dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Email address</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ studentStore.currentStudent.email }}</dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Phone number</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ studentStore.currentStudent.phone || 'N/A' }}</dd>
              </div>
              <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Class</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ studentStore.currentStudent.class?.name || 'Not assigned' }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Attendance History -->
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Attendance History</h3>
              <p class="mt-2 text-sm text-gray-700">
                A list of all attendance records for this student.
              </p>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex flex-col">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Class</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="attendance in attendanceStore.attendances" :key="attendance.id">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {{ new Date(attendance.date).toLocaleDateString() }}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ attendance.class?.name }}</td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span
                              :class="{
                                'bg-green-100 text-green-800': attendance.status === 'present',
                                'bg-red-100 text-red-800': attendance.status === 'absent',
                                'bg-yellow-100 text-yellow-800': attendance.status === 'late'
                              }"
                              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                            >
                              {{ attendance.status }}
                            </span>
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ attendance.notes || 'N/A' }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '~/stores/studentStore'
import { useClassStore } from '~/stores/classStore'
import { useAttendanceStore } from '~/stores/attendanceStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const studentStore = useStudentStore()
const classStore = useClassStore()
const attendanceStore = useAttendanceStore()
const isEditing = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  classId: '',
})

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
})

// Initialize form with current student data
watch(() => studentStore.currentStudent, (newStudent) => {
  if (newStudent) {
    form.value = {
      firstName: newStudent.firstName,
      lastName: newStudent.lastName,
      email: newStudent.email,
      phone: newStudent.phone || '',
      classId: newStudent.classId || '',
    }
  }
}, { immediate: true })

const validateForm = () => {
  let isValid = true
  errors.value = { firstName: '', lastName: '', email: '' }

  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }

  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }

  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await studentStore.updateStudent(Number(route.params.id), {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      classId: form.value.classId ? Number(form.value.classId) : undefined,
    })
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update student:', error)
  }
}

// Fetch data on mount
onMounted(async () => {
  await Promise.all([
    studentStore.fetchStudent(Number(route.params.id)),
    classStore.fetchClasses(),
    attendanceStore.fetchAttendanceByStudent(Number(route.params.id)),
  ])
})
</script> 