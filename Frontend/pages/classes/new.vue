<template>
  <div>
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900 mt-10 ml-10">Create New Class</h3>
          <p class="mt-1 text-sm text-gray-600 mt-10 ml-10">
            Add a new class to the system. Fill in the details below.
          </p>
        </div>
      </div>

      <div class="mt-5 md:mt-0 md:col-span-2">
        <form @submit.prevent="handleSubmit" class="mt-10 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
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
            </div>

            <!-- Error Alert -->
            <div v-if="classStore.error" class="rounded-md bg-red-50 p-4 mx-4">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Error creating class</h3>
                  <div class="mt-2 text-sm text-red-700">
                    <p>{{ classStore.error }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <NuxtLink
                to="/classes"
                class="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3"
              >
                Cancel
              </NuxtLink>
              <button
                type="submit"
                :disabled="classStore.loading"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                {{ classStore.loading ? 'Creating...' : 'Create Class' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { useClassStore } from '~/stores/classStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const classStore = useClassStore()

const form = ref({
  name: '',
  description: '',
})

const errors = ref({
  name: '',
})

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
    await classStore.createClass({
      name: form.value.name,
      description: form.value.description,
    })
    router.push('/classes')
  } catch (error) {
    console.error('Failed to create class:', error)
  }
}
</script> 