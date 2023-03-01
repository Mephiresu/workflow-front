<template>
  <div class="w-screen h-screen overflow-hidden bg-gray-200 flex flex-col">
    <AppHeader />
    <RouterView class="flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  components: { AppHeader },
})
</script>

<style scoped></style>
