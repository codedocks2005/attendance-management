<template>
  <div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900 ml-2 mt-10">Attendance Management</h1>
        <p class="mt-2 text-sm text-gray-700 ml-2">Manage and track student attendance across all classes.</p>
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

    <!-- Quick Actions -->
    <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ml-2">
      <!-- Mark Attendance Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Mark Attendance</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">Quick Entry</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <NuxtLink to="/attendance/mark" class="font-medium text-indigo-600 hover:text-indigo-500">
              Mark attendance for a class
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- View Reports Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">View Reports</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">Analytics</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <NuxtLink to="/attendance/reports" class="font-medium text-indigo-600 hover:text-indigo-500">
              View attendance reports
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Export Data Card -->
      <div class="bg-white overflow-hidden shadow rounded-lg ">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Export Data</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">Download</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-5 py-3">
          <div class="text-sm">
            <button
              @click="exportAttendanceData"
              :disabled="attendanceStore.loading"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Export attendance data
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Attendance -->
    <div class="mt-8 ml-2  mt-10">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h2 class="text-xl font-semibold text-gray-900">Recent Attendance</h2>
          <p class="mt-2 text-sm text-gray-700">A list of recently marked attendance records.</p>
        </div>
        <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <NuxtLink
            to="/attendance/reports"
            class="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            View all
          </NuxtLink>
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
              <h3 class="text-sm font-medium text-red-800">Error loading attendance records</h3>
              <div class="mt-2 text-sm text-red-700">
                <p>{{ attendanceStore.error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance Table -->
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
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                  <tr v-for="attendance in attendanceStore.attendances.slice(0, 5)" :key="attendance.id">
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
  </div>
</template>

<script setup lang="ts">
import { useAttendanceStore } from '~/stores/attendanceStore'

const attendanceStore = useAttendanceStore()

const exportAttendanceData = async () => {
  try {
    // TODO: Implement export functionality
    console.log('Exporting attendance data...')
  } catch (error) {
    console.error('Failed to export attendance data:', error)
  }
}

// Fetch recent attendance records on mount
onMounted(async () => {
  await attendanceStore.fetchAttendances()
})
</script> 