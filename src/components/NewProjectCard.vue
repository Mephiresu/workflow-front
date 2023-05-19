<template>
  <RouterLink
    :to="`/projects/new`"
    class="block rounded-lg border border-gray-300 from-purple-200/50 to-purple-200/100 p-6 text-center text-gray-500 transition-all duration-300 hover:border-purple-300 hover:bg-gradient-to-b">
    <i class="fas fa-plus fa-xl" />
  </RouterLink>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
