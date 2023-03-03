<template>
  <div
    class="w-full h-16 bg-gray-100 border-b border-gray-300 flex flex-row justify-between items-center p-4 relative">
    <div
      class="absolute inset-0 flex flex-row justify-center items-center -z-100">
      <span class="text-2xl text-gray-800 font-extralight mr-2">{{
        appStore.name
      }}</span>
    </div>

    <RouterLink
      :to="{ name: 'home' }"
      class="flex flex-row text-3xl group z-50">
      <span
        class="font-bold group-hover:underline decoration-4 group-hover:text-purple-800 transition-all transform duration-300"
        >Work</span
      ><span
        class="group-hover:translate-x-4 transform transition-transform duration-300 delay-100"
        >flow</span
      >
    </RouterLink>

    <div
      v-if="authStore.loggedIn"
      class="space-x-4 z-50 flex flex-row justify-center items-center">
      <RouterLink
        :to="{ name: 'admin' }"
        class="text-gray-400 hover:text-gray-500">
        <i class="fas fa-gear fa-lg" />
      </RouterLink>
      <a
        class="text-sm cursor-pointer text-gray-400 hover:text-gray-500 hover:underline"
        @click.prevent="logout"
        >Log out</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'
import { useAuthStore } from '../stores/auth'

export default defineComponent({
  computed: {
    ...mapStores(useAppStore, useAuthStore),
  },
  methods: {
    async logout() {
      await this.authStore.logout()
    },
  },
})
</script>

<style scoped></style>
