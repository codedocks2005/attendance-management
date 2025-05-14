<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Attendance System
            </router-link>
          </div>
          <div class="hidden sm:ml-10 sm:flex sm:space-x-10">
            <router-link
              to="/dashboard"
              class="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              active-class="border-blue-500 text-blue-600"
            >
              Dashboard
            </router-link>
            <router-link
              to="/students"
              class="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              active-class="border-blue-500 text-blue-600"
            >
              Students
            </router-link>
            <router-link
              to="/classes"
              class="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              active-class="border-blue-500 text-blue-600"
            >
              Classes
            </router-link>
            <router-link
              to="/attendance"
              class="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors"
              active-class="border-blue-500 text-blue-600"
            >
              Attendance
            </router-link>
          </div>
        </div>
        <div class="hidden sm:flex sm:items-center">
          <router-link
            to="/login"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
          >
            Login
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
// Add any necessary imports or logic here
</script> 