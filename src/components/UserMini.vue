<template>
  <div
    class="hover:shadow-ms flex h-14 w-44 cursor-pointer flex-row items-center justify-between rounded-md border border-gray-200 p-2 transition-colors hover:border-gray-300">
    <div class="flex flex-col">
      <span class="text-sm font-bold text-gray-800">{{ user?.fullName }}</span>
      <span class="text-xs text-gray-400">{{ user?.email }}</span>
    </div>

    <a
      class="h-7 w-7 cursor-pointer rounded p-1 text-center text-sm text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-500 active:text-gray-600"
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
