import { useRouter } from 'vue-router'
import { useState } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Get access to the router
  const router = useRouter()
  const refreshStores = useState('refreshStores', () => false)
  
  // Mark stores for refresh when navigating away from pages that modify data
  router.beforeEach((to, from) => {
    // If navigating from pages that modify data (add/edit students, classes)
    if (
      from.path.includes('/students/new') || 
      from.path.includes('/classes/new') ||
      (from.path.includes('/students/') && from.path !== '/students') ||
      (from.path.includes('/classes/') && from.path !== '/classes')
    ) {
      // Mark that stores need refreshing on next dashboard visit
      refreshStores.value = true
    }

    return true
  })

  return {
    provide: {
      shouldRefreshStores: () => refreshStores.value,
      markStoresRefreshed: () => refreshStores.value = false
    }
  }
}) 