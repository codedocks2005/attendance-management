<template>
  <div>
    <Navigation />
    <main>
      <KeepAlive>
        <slot />
      </KeepAlive>
    </main>

  </div>
</template>

<script setup lang="ts">
import Navigation from '~/components/ui/Navigation.vue'
import AppFooter from '~/components/ui/AppFooter.vue'

// Add any necessary setup logic here
</script> 