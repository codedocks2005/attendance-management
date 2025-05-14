<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Create New Student</h3>
          <p class="mt-1 text-sm text-gray-600">
            Add a new student to the system. Fill in the details below.
          </p>
          
          <!-- Show selected class info when coming from class page -->
          <div v-if="selectedClass" class="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
            <h4 class="font-medium text-blue-700">Adding to Class:</h4>
            <p class="text-blue-800 text-sm mt-1">{{ selectedClass.name }}</p>
            <p v-if="selectedClass.description" class="text-blue-600 text-xs mt-1 italic">{{ selectedClass.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
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
                    :class="{ 'border-red-300': errors.classId }"
                    :disabled="classStore.loading || !!selectedClass"
                  >
                    <option value="">Select a class</option>
                    <option v-if="classStore.loading" disabled>Loading classes...</option>
                    <template v-else>
                      <option v-for="classItem in classStore.classes" :key="classItem.id" :value="classItem.id">
                        {{ classItem.name }}
                      </option>
                    </template>
                  </select>
                </div>
                <p v-if="errors.classId" class="mt-2 text-sm text-red-600">{{ errors.classId }}</p>
                <p v-if="classStore.error" class="mt-2 text-sm text-red-600">Error loading classes: {{ classStore.error }}</p>
              </div>
            </div>

            <!-- Error Alert -->
            <div v-if="studentStore.error" class="rounded-md bg-red-50 p-4 mx-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Error creating student</h3>
                  <div class="mt-2 text-sm text-red-700">
                    <p>{{ studentStore.error }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <NuxtLink
                to="/students"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </NuxtLink>
              <button
                type="submit"
                :disabled="studentStore.loading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                {{ studentStore.loading ? 'Creating...' : 'Create Student' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '~/stores/studentStore'
import { useClassStore } from '~/stores/classStore'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const studentStore = useStudentStore()
const classStore = useClassStore()

// Get the classId from the route query parameters
const initialClassId = route.query.classId ? Number(route.query.classId) : null

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  classId: initialClassId || '',
})

const errors = ref({
  firstName: '',
  lastName: '',
  email: '',
  classId: '',
})

// Track the selected class for display
const selectedClass = ref(null)

// Fetch classes immediately when component is created
await classStore.fetchClasses()

// Set the selected class details if classId is provided
onMounted(() => {
  if (initialClassId && classStore.classes.length) {
    const foundClass = classStore.classes.find(c => c.id === initialClassId)
    if (foundClass) {
      selectedClass.value = foundClass
    }
  }
})

// Watch for classes to update if they load after component mount
watch(() => classStore.classes, (newClasses) => {
  if (initialClassId && newClasses.length && !selectedClass.value) {
    const foundClass = newClasses.find(c => c.id === initialClassId)
    if (foundClass) {
      selectedClass.value = foundClass
    }
  }
}, { deep: true })

const validateForm = () => {
  let isValid = true
  errors.value = { firstName: '', lastName: '', email: '', classId: '' }

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

  if (!form.value.classId) {
    errors.value.classId = 'Please select a class'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    const studentData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      classId: form.value.classId ? Number(form.value.classId) : undefined,
    }

    await studentStore.createStudent(studentData)
    
    // If we came from a specific class page, return to that class
    if (initialClassId) {
      router.push(`/classes/${initialClassId}`)
    } else {
      router.push('/students')
    }
  } catch (error) {
    console.error('Failed to create student:', error)
  }
}
</script> 