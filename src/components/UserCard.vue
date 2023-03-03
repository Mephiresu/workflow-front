<template>
  <div
    class="h-14 w-44 p-2 border hover:shadow-ms transition-colors cursor-pointer hover:border-gray-300 border-gray-200 rounded-md flex flex-row items-center justify-between">
    <div class="flex flex-col">
      <span class="text-sm text-gray-800 font-bold">{{ user?.fullName }}</span>
      <span class="text-xs text-gray-400">{{ user?.email }}</span>
    </div>

    <a
      class="text-sm text-center p-1 w-7 h-7 cursor-pointer text-gray-400 hover:text-gray-500 active:text-gray-600 hover:bg-gray-200 rounded transition-colors"
      @click.prevent="logout">
      <i class="fas fa-right-from-bracket" />
    </a>
  </div>
</template>

<script lang="ts">
import { mapState, mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, { user: 'user' }),
  },
  methods: {
    async logout() {
      await this.authStore.logout()
    },
  },
})
</script>
