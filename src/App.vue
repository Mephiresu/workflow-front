<script lang="ts">
import { defineComponent } from 'vue'

import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  components: { AppHeader },
})
</script>

<template>
  <div class="w-screen h-screen overflow-hidden bg-gray-200">
    <AppHeader />
    <router-view class="flex-1" />
  </div>
</template>

<style scoped></style>
