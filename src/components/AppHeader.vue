<template>
  <div
    class="relative flex h-16 w-full flex-row items-center justify-between border-b border-gray-300 bg-gray-100 p-4">
    <div
      class="-z-100 absolute inset-0 flex flex-row items-center justify-center">
      <span class="mr-2 text-2xl font-extralight text-gray-800">{{
        appStore.name
      }}</span>
    </div>

    <RouterLink
      :to="{ name: 'home' }"
      class="group z-50 flex flex-row text-3xl">
      <span
        class="transform font-bold decoration-4 transition-all duration-300 group-hover:text-purple-800 group-hover:underline"
        >Work</span
      ><span
        class="transform transition-transform delay-100 duration-300 group-hover:translate-x-4"
        >flow</span
      >
    </RouterLink>

    <div
      v-if="authStore.loggedIn"
      class="z-50 flex flex-row items-center justify-center space-x-4">
      <RouterLink
        :to="{ name: 'settings' }"
        class="text-gray-400 transition-colors hover:text-gray-500 active:text-gray-600">
        <i class="fas fa-gear fa-lg" />
      </RouterLink>
      <UserMini />
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'
import { useAuthStore } from '../stores/auth'
import UserMini from './UserMini.vue'

export default defineComponent({
  components: { UserMini },
  computed: {
    ...mapStores(useAppStore, useAuthStore),
  },
})
</script>

<style scoped></style>
