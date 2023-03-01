<template>
  <div
    class="p-4 border border-gray-300 rounded-lg hover:bg-gradient-to-b hover:border-purple-300 from-purple-200/50 to-purple-200/100 transition-all duration-300">
    <h1 class="text-2xl font-bold">{{ project.name }}</h1>
    <p class="text-gray-500">{{ project.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '../types/project'

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
})
</script>
