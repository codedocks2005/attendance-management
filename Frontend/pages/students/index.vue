<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900 ml-20 mt-10">Students</h1>
        <p class="mt-2 text-sm text-gray-700 ml-20">A list of all students in the system.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <NuxtLink
          to="/students/new"
          class="inline-flex items-center justify-center mr-10 mt-10 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Add Student
        </NuxtLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="studentStore.loading" class="mt-6">
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="studentStore.error" class="mt-6">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading students</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ studentStore.error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Students Table -->
    <div v-else class="mt-6 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Class</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="student in studentStore.students" :key="student.id">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ student.firstName }} {{ student.lastName }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.phone || 'N/A' }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ student.class?.name || 'Not assigned' }}
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <NuxtLink
                      :to="`/students/${student.id}`"
                      class="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      View
                    </NuxtLink>
                    <button
                      @click="deleteStudent(student.id)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from '~/stores/studentStore'

const studentStore = useStudentStore()

// Fetch students on mount
onMounted(async () => {
  await studentStore.fetchStudents()
})

// Delete student function
const deleteStudent = async (id: number) => {
  if (confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
    try {
      await studentStore.deleteStudent(id)
      // Show success message
      alert('Student deleted successfully')
    } catch (error) {
      console.error('Failed to delete student:', error)
      // Show error message
      alert(error instanceof Error ? error.message : 'Failed to delete student')
    }
  }
}
</script> 