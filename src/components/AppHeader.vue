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

    <div class="space-x-2 z-50">
      <RouterLink
        :to="{ name: 'auth' }"
        class="text-sm text-gray-400 hover:underline"
        >Log out</RouterLink
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { appStore } from '../stores/app'

export default defineComponent({
  computed: {
    ...mapStores(appStore),
  },
})
</script>

<style scoped></style>
