<template>
  <div class="h-screen w-screen overflow-hidden bg-gray-200">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="flex h-screen w-screen flex-col">
      <AppHeader />
      <RouterView class="flex-1 overflow-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import AppHeader from './components/AppHeader.vue'
import { useAppStore } from './stores/app'
import { useAuthStore } from './stores/auth'

export default defineComponent({
  components: { AppHeader },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapStores(useAppStore, useAuthStore),
  },
  async created() {
    await this.appStore.load()
    await this.authStore.load()
    this.isLoading = false
  },
})
</script>

<style scoped></style>
