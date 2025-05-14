<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900 ml-10 mt-10">Attendance Reports</h1>
        <p class="mt-2 text-sm text-gray-700 ml-10">View and generate attendance reports for classes and students.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <NuxtLink
          to="/attendance/mark"
          class="inline-flex items-center mr-10 mt-10 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Mark Attendance
        </NuxtLink>
      </div>
    </div>

    <!-- Filters -->
    <div class="mt-6 bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <!-- Class Filter -->
          <div>
            <label for="classId" class="block text-sm font-medium text-gray-700">Class</label>
            <select
              id="classId"
              v-model="filters.classId"
              class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Classes</option>
              <option v-for="classItem in classStore.classes" :key="classItem.id" :value="classItem.id">
                {{ classItem.name }}
              </option>
            </select>
          </div>

          <!-- Date Range -->
          <div>
            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              v-model="filters.startDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              v-model="filters.endDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            type="button"
            @click="generateReport"
            :disabled="attendanceStore.loading"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            {{ attendanceStore.loading ? 'Generating...' : 'Generate Report' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="attendanceStore.loading" class="mt-6">
      <div class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="attendanceStore.error" class="mt-6">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error generating report</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ attendanceStore.error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Table -->
    <div v-else-if="attendanceStore.attendances.length > 0" class="mt-6 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Date</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Class</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Student</th>
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
                    {{ attendance.student?.firstName }} {{ attendance.student?.lastName }}
                  </td>
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

    <!-- Empty State -->
    <div v-else class="mt-6 text-center">
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by marking attendance for a class.</p>
      <div class="mt-6">
        <NuxtLink
          to="/attendance/mark"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Mark Attendance
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '~/stores/attendanceStore'
import { useClassStore } from '~/stores/classStore'

const attendanceStore = useAttendanceStore()
const classStore = useClassStore()

const filters = ref({
  classId: '',
  startDate: '',
  endDate: '',
})

const generateReport = async () => {
  try {
    if (filters.value.classId) {
      await attendanceStore.fetchAttendanceByClass(Number(filters.value.classId))
    } else {
      // If no class is selected, fetch all attendance records
      await attendanceStore.fetchAttendances()
    }
  } catch (error) {
    console.error('Failed to generate report:', error)
  }
}

// Fetch classes on mount
onMounted(async () => {
  await classStore.fetchClasses()
})
</script> 