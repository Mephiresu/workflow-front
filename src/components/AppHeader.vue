<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div
    class="w-full h-16 bg-gray-100 border-b border-gray-300 flex flex-row items-center p-4">
    <RouterLink :to="{ name: 'home' }" class="flex flex-row text-3xl group">
      <span
        class="font-bold group-hover:underline decoration-4 group-hover:text-purple-800 transition-all transform duration-300"
        >Work</span
      ><span
        class="group-hover:translate-x-4 transform transition-transform duration-300 delay-100"
        >flow</span
      >
    </RouterLink>
    <div class="ml-auto space-x-2">
      <a
        href="https://hoenn.club"
        target="_blank"
        rel="noreferrer"
        class="text-sm text-gray-400 hover:underline"
        >HoennTeam</a
      >
      <a
        href="https://github.com/HoennTeam"
        target="_blank"
        rel="noreferrer"
        class="text-sm text-gray-400 hover:underline"
        >GitHub</a
      >
    </div>
  </div>
</template>

<style scoped></style>
