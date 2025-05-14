<template>
  
  <div class="page-container animate-fade-in mt-10">
    <div class="page-header flex justify-between items-center">
      <div>
        <h1 class="page-title text-2xl ml-20">Classes</h1>
        <p class="mt-2 text-xl text-gray-900 ml-20">Manage your classes and view student enrollments</p>
      </div>
      <Button
  variant="primary"
  @click="navigateToNewClass"
  class="h-20 w-90 animate-popIn mr-20 transition-all duration-300 ease-in-out hover:scale-105 hover:ring-[10px] hover:ring-white/60 hover:text-xl"
>
  <div class="flex items-center">
    <PlusIcon class="h-5 w-5 mr-2" />
    <span class="transition-all duration-300 ease-in-out hover:text-xl">New Class</span>
  </div>
</Button>

    </div>

    <!-- Loading state -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="spinner"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
      <div class="flex">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700">{{ error }}</p>
      </div>
    </div>

    <!-- Classes grid -->
    <div v-else-if="classes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div v-for="classItem in classes" :key="classItem.id" class="custom-card animate-slide-in">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-xl font-semibold text-gray-900">{{ classItem.name }}</h2>
            <span class="status-badge bg-primary-100 text-primary-800">
              {{ classItem.students?.length || 0 }} Students
            </span>
          </div>
          
          <p class="text-gray-600 mb-4 line-clamp-2">
            {{ classItem.description || 'No description provided' }}
          </p>

          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-500">
              Created {{ formatDate(classItem.createdAt) }}
            </span>
            <div class="flex space-x-2">
              <Button variant="secondary" size="sm" @click="navigateToClass(classItem.id)">
                View Details
              </Button>
              <Button variant="primary" size="sm" @click="addStudentsToClass(classItem.id)">
                Add Students
              </Button>
              <Button variant="danger" size="sm" @click="openDeleteModal(classItem)">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <div class="mb-4">
        <DocumentIcon class="h-12 w-12 mx-auto text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No Classes Yet</h3>
      <p class="text-gray-500 mb-4">Get started by creating your first class</p>
      <Button variant="primary" @click="navigateToNewClass">Create Class</Button>
    </div>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      :is-open="deleteModalOpen"
      title="Delete Class"
      :message="`Are you sure you want to delete '${selectedClass?.name}'? This action cannot be undone and will also delete all associated attendance records.`"
      confirm-text="Delete"
      @close="closeDeleteModal"
      @confirm="deleteClass"
    />
  </div>
<!--FEatures list -->
<section class="bg-white dark:bg-gray-400">
  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
    <div class="max-w-screen-md mb-8 lg:mb-16">
  <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white animate-fadeUp">
    Attendance Made Easy – For Every Class, Every Day.
  </h2>
</div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <img src="/public/calendar.gif" alt="gif" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Daily Attendance Dashboard</h3>
              <p class="text-black-500 dark:text-black-400">View the day's attendance summary at a glance – know who's in, who's late, and who's missing.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <img src="/public/verified.gif" alt="tick" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Simple Attendance Marking</h3>
              <p class="text-black-500 dark:black-gray-400">Quickly mark students as Present, Absent, or Late with a clean, user-friendly interface.</p>
          </div>
          <div>
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <img src="/public/student.gif" alt="student" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Student Management</h3>
              <p class="text-black-500 dark:text-black-400"> Edit  or remove students and organize them into different classes or sections effortlessly.</p>
          </div>
          <div>
              <div class="flex justify-center mt-10 items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <img src="/public/hourglass.gif" alt="time" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Late Entry Logging</h3>
              <p class="text-black-500 dark:text-black-400">Easily record late comers and track their punctuality trends over time.

</p>
          </div>
          <div>
              <div class="flex justify-center mt-10 items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                 <img src="/public/classroom.gif" alt="class" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white"> Multi-Class Support</h3>
              <p class="text-black-500 dark:text-black-400">Manage multiple classes or batches under one dashboard. Perfect for schools, colleges, or tuition centers.

</p>
          </div>
          <div>
              <div class="flex justify-center mt-10 items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                  <img src="/public/computer.gif" alt="ui" class="w-15 h-15 rounded-full" />
              </div>
              <h3 class="mb-2 text-xl font-bold dark:text-white">Operations</h3>
              <p class="text-black-500 dark:text-black  -400">Keep your company's lights on with customizable, iterative, and structured workflows built for all efficient teams and individual.</p>
          </div>
      </div>
  </div>
</section>

<!--Socail proof -->


<section class="bg-white dark:bg-gray-400 py-16 mt-10">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold text-900 dark:text-black mb-8">Trusted by Schools Across the Country</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="mt-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg p-4">
        <p class="text-4xl font-extrabold text-black-600 dark:text-300">10K+</p>
        <p class="text-black-700 dark:text-black mt-5">Students Managed</p>
      </div>
      <div class="mt-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg p-4">
        <p class="text-4xl font-extrabold text-600 dark:text-300">1M+</p>
        <p class="text-700 dark:text mt-5">Attendance Logs</p>
      </div>
      <div class="mt-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg p-4">
        <p class="text-4xl font-extrabold text-600 dark:text-300">500+</p>
        <p class="text-700 dark:text mt-5">Institutions</p>
      </div>
      <div class="mt-10 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-lg p-4">
        <p class="text-4xl font-extrabold text-600 dark:text-300">99.9%</p>
        <p class="text-700 dark:text mt-5">System Uptime</p>
      </div>
    </div>
  </div>
</section>
<AppFooter />






</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PlusIcon, DocumentIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import Button from '@/components/ui/Button.vue'
import ConfirmModal from '@/components/ui/ConfirmModal.vue'
import { useClassStore } from '@/stores/classStore'
import AppFooter from '@/components/ui/AppFooter.vue'

const router = useRouter()
const classStore = useClassStore()

const classes = ref([])
const loading = ref(true)
const error = ref(null)
const deleteModalOpen = ref(false)
const selectedClass = ref(null)

onMounted(async () => {
  try {
    classes.value = await classStore.fetchClasses()
  } catch (err) {
    error.value = 'Failed to load classes. Please try again later.'
  } finally {
    loading.value = false
  }
})

const navigateToNewClass = () => {
  router.push('/classes/new')
}

const navigateToClass = (id: number) => {
  router.push(`/classes/${id}`)
}

const openDeleteModal = (classItem: any) => {
  selectedClass.value = classItem
  deleteModalOpen.value = true
}

const closeDeleteModal = () => {
  deleteModalOpen.value = false
  selectedClass.value = null
}

const deleteClass = async () => {
  if (!selectedClass.value) return
  
  try {
    await classStore.deleteClass(selectedClass.value.id)
    classes.value = classes.value.filter(c => c.id !== selectedClass.value.id)
    closeDeleteModal()
  } catch (err) {
    error.value = 'Failed to delete class. Please try again later.'
  }
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const addStudentsToClass = (classId: number) => {
  router.push({
    path: '/students/new',
    query: { classId: classId.toString() }
  })
}
</script> 

<style scoped>
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeUp {
  animation: fadeUp 1s ease-out forwards;
}
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-popIn {
  animation: popIn 0.6s ease-out forwards;
}
</style>