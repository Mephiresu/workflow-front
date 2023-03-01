<template>
  <div class="w-screen h-screen overflow-hidden bg-gray-200">
    <div v-if="isLoading">Loading...</div>
    <div v-else class="w-screen h-screen flex flex-col">
      <AppHeader />
      <RouterView class="flex-1" />
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import AppHeader from './components/AppHeader.vue'
import { appStore } from './stores/app'

export default defineComponent({
  components: { AppHeader },
  data() {
    return {
      isLoading: true,
    }
  },
  computed: {
    ...mapStores(appStore),
  },
  async created() {
    await this.appStore.loadInstance()
    this.isLoading = false
  },
})
</script>

<style scoped></style>
