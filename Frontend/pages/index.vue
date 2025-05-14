<template> 

<!-- Main page content -->


  


<!-- Hero section -->

<section class="bg-white dark:bg-gray-900 max-w-screen-xl flex items-center justify-center rounded-3xl ml-20 mt-10">
    <div class="grid max-w-screen-lg px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
            <h1 class="max-w-xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white ">Smart Attendance Seamless Productivity</h1>
            <p class="max-w-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Say goodbye to paper registers and manual errors.
Track, manage, and report attendance—all in one place.
Built for teachers, students, and institutions alike.</p>

            <NuxtLink to="/classes" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 opacity-100 hover:rotate-6 transform transition duration-300">
                Get started
                <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </NuxtLink>
          <NuxtLink to="/attendance" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 hover:scale-105 transform transition duration-300">
                Attendance
           </NuxtLink>
        </div>
        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex lg-flex justify-end mr-20">
            <img src="/images /mockup.png" alt="mockup" class="transform transition-all duration-500 ease-in-out hover:scale-105 hover:rotate-2 hover:translate-y-1 h-110 w-60 mb-30 ml-10" />
        </div>                
    </div>
</section>



  <div class="mt-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-semibold text-gray-900 ml-20">Dashboard</h1>
      
      <!-- Refresh button -->
      <button 
        @click="refreshDashboard" 
        class="mr-20 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :disabled="loading"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        {{ loading ? 'Refreshing...' : 'Refresh Dashboard' }}
      </button>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="mt-6">
      <div class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="space-y-3 mt-6">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="i in 3" :key="i" class="bg-white overflow-hidden shadow rounded-lg">
              <div class="p-5">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <div class="h-6 w-6 bg-gray-200 rounded"></div>
                  </div>
                  <div class="ml-5 w-0 flex-1">
                    <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div class="mt-2 h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="mt-6">
      <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading dashboard data</h3>
            <div class="mt-2 text-sm text-red-700">
              <p>{{ error }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Stats Overview -->
      <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ml-20">
        <!-- Total Classes -->
        <div class="bg-white overflow-hidden shadow rounded-lg transition-transform duration-500 hover:scale-105 transform hover:shadow-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Classes</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ classStore.classes?.length || 0 }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Total Students -->
        <div class="bg-white overflow-hidden shadow rounded-lg transition-transform duration-500 hover:scale-105 transform hover:shadow-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ studentStore.students?.length || 0 }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <!-- Today's Attendance -->
        <div class="bg-white overflow-hidden shadow rounded-lg transition-transform duration-500 hover:scale-105 transform hover:shadow-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Today's Attendance</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ attendanceStore.attendances?.length || 0 }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8 ml-20">
        <h2 class="text-lg font-medium text-gray-900">Quick Actions</h2>
        <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NuxtLink
            to="/classes/new"
            class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">Add New Class</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/students/new"
            class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">Add New Student</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/attendance/mark"
            class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
          >
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">Mark Attendance</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
<AppFooter /> 



  

</template>

<script setup>
import { useClassStore } from '~/stores/classStore'
import { useStudentStore } from '~/stores/studentStore'
import { useAttendanceStore } from '~/stores/attendanceStore'
import AppFooter from '~/components/ui/AppFooter.vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { ref, onMounted, onActivated } from 'vue'

const classStore = useClassStore()
const studentStore = useStudentStore()
const attendanceStore = useAttendanceStore()
const { $shouldRefreshStores, $markStoresRefreshed } = useNuxtApp()

const loading = ref(true)
const error = ref(null)

// Function to refresh all dashboard data
const refreshData = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Fetch all required data in parallel
    await Promise.all([
      classStore.fetchClasses(),
      studentStore.fetchStudents(),
      attendanceStore.fetchAttendances()
    ])
    
    // Mark stores as refreshed after updating data
    if ($markStoresRefreshed) $markStoresRefreshed()
  } catch (err) {
    console.error('Error loading dashboard data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
}

// Refresh data when component mounts
onMounted(async () => {
  await refreshData()
})

// Add a refresh button to manually reload dashboard data
const refreshDashboard = async () => {
  await refreshData()
}

// Add a route watcher to refresh data when returning to this page
const route = useRoute()
const router = useRouter()

// Use activated lifecycle hook (for keep-alive components)
onActivated(() => {
  // Check if stores should be refreshed
  if ($shouldRefreshStores && $shouldRefreshStores()) {
    refreshData()
  }
})
</script>


