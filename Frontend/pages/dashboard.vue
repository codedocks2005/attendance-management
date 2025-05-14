<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <!-- Refresh button -->
        <button 
          @click="refreshDashboard" 
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Overview Cards -->
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 rounded-full bg-blue-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Total Students</h2>
          </div>
          <p class="text-3xl font-bold text-blue-600">{{ studentStore.students?.length || 0 }}</p>
          <p class="text-sm text-gray-500 mt-2">Enrolled in all classes</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 rounded-full bg-green-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Total Classes</h2>
          </div>
          <p class="text-3xl font-bold text-green-600">{{ classStore.classes?.length || 0 }}</p>
          <p class="text-sm text-gray-500 mt-2">Active classes</p>
        </div>
        
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center mb-4">
            <div class="p-2 rounded-full bg-purple-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">Today's Attendance</h2>
          </div>
          <p class="text-3xl font-bold text-purple-600">{{ attendanceStore.attendances?.length || 0 }}</p>
          <p class="text-sm text-gray-500 mt-2">Records today</p>
        </div>
      </div>
      
      <!-- Quick Actions -->
      <div class="mt-10">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link to="/classes/new" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center hover:shadow-md transition-shadow">
            <div class="p-2 rounded-full bg-blue-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span class="font-medium text-gray-800">Add New Class</span>
          </router-link>
          
          <router-link to="/students/new" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center hover:shadow-md transition-shadow">
            <div class="p-2 rounded-full bg-green-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span class="font-medium text-gray-800">Add New Student</span>
          </router-link>
          
          <router-link to="/attendance/mark" class="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center hover:shadow-md transition-shadow">
            <div class="p-2 rounded-full bg-purple-50 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span class="font-medium text-gray-800">Mark Attendance</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import stores
import { useClassStore } from '~/stores/classStore'
import { useStudentStore } from '~/stores/studentStore'
import { useAttendanceStore } from '~/stores/attendanceStore'
import { ref, onMounted, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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