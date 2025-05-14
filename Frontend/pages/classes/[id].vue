<template>
  <div>
    <!-- Loading State -->
    <div v-if="classStore.loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="classStore.error" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading class</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ classStore.error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Class Details -->
    <div v-else-if="classStore.currentClass" class="space-y-6">
      <!-- Header -->
      <div class="md:flex md:items-center md:justify-between">
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {{ classStore.currentClass.name }}
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Created on {{ new Date(classStore.currentClass.createdAt).toLocaleDateString() }}
          </p>
        </div>
        <div class="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            @click="isEditing = !isEditing"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ isEditing ? 'Cancel Edit' : 'Edit Class' }}
          </button>
        </div>
      </div>

      <!-- Edit Form -->
      <div v-if="isEditing" class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <form @submit.prevent="handleSubmit">
            <div class="space-y-6">
              <!-- Class Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700">
                  Class Name
                </label>
                <div class="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    v-model="form.name"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    :class="{ 'border-red-300': errors.name }"
                    required
                  />
                </div>
                <p v-if="errors.name" class="mt-2 text-sm text-red-600">{{ errors.name }}</p>
              </div>

              <!-- Description -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div class="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    v-model="form.description"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="classStore.loading"
                  class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg
                    v-if="classStore.loading"
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
                  {{ classStore.loading ? 'Saving...' : 'Save Changes' }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <!-- Class Description -->
      <div v-else class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-2xl leading-6 font-medium text-gray-900">Description</h3>
          <div class="mt-2 max-w-xl text-sm text-gray-500">
            <p>{{ classStore.currentClass.description || 'No description provided.' }}</p>
          </div>
        </div>
      </div>

      <!-- Students List -->
      <div class="bg-white shadow sm:rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Students</h3>
              <p class="mt-2 text-sm text-gray-700">
                A list of all students enrolled in this class.
              </p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <NuxtLink
                :to="`/students/new?classId=${classStore.currentClass.id}`"
                class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto mr-2"
              >
                Add Student
              </NuxtLink>
              <button
                @click="refreshClassData"
                class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                :disabled="classStore.loading"
              >
                <svg v-if="classStore.loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <div class="mt-6">
            <div class="flex flex-col">
              <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table v-if="classStore.currentClass.students && classStore.currentClass.students.length > 0" class="min-w-full divide-y divide-gray-300">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                          <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                          <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span class="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="student in classStore.currentClass.students" :key="student.id">
                          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {{ student.firstName }} {{ student.lastName }}
                          </td>
                          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.email }}</td>
                          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <NuxtLink
                              :to="`/students/${student.id}`"
                              class="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </NuxtLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <!-- Empty state when no students -->
                    <div v-else class="text-center py-12 bg-white">
                      <div class="mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-medium text-gray-900 mb-1">No Students Yet</h3>
                      <p class="text-sm text-gray-500 max-w-md mx-auto mb-4">
                        There are no students enrolled in this class yet. Add your first student to get started.
                      </p>
                      <NuxtLink
                        :to="`/students/new?classId=${classStore.currentClass.id}`"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Add First Student
                      </NuxtLink>
                    </div>
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
import { useClassStore } from '~/stores/classStore'
import { useRoute } from 'vue-router'

const route = useRoute()
const classStore = useClassStore()
const isEditing = ref(false)

const form = ref({
  name: '',
  description: '',
})

const errors = ref({
  name: '',
})

// Initialize form with current class data
watch(() => classStore.currentClass, (newClass) => {
  if (newClass) {
    form.value = {
      name: newClass.name,
      description: newClass.description || '',
    }
  }
}, { immediate: true })

const validateForm = () => {
  let isValid = true
  errors.value = { name: '' }

  if (!form.value.name.trim()) {
    errors.value.name = 'Class name is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await classStore.updateClass(Number(route.params.id), {
      name: form.value.name,
      description: form.value.description,
    })
    isEditing.value = false
  } catch (error) {
    console.error('Failed to update class:', error)
  }
}

const refreshClassData = async () => {
  try {
    await classStore.fetchClass(Number(route.params.id))
  } catch (error) {
    console.error('Failed to refresh class data:', error)
  }
}

// Fetch class data on mount
onMounted(async () => {
  await classStore.fetchClass(Number(route.params.id))
})
</script> 