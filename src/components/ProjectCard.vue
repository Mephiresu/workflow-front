<template>
  <RouterLink
    :to="`/projects/${project.id}`"
    class="block rounded-lg border border-gray-300 from-purple-200/50 to-purple-200/100 p-4 transition-all duration-300 hover:border-purple-300 hover:bg-gradient-to-b">
    <h1 class="text-2xl font-bold">{{ project.name }}</h1>
    <p class="text-gray-500">{{ project.description }}</p>
  </RouterLink>
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
