<template>
  <div class="flex flex-col p-8">
    <h1 class="text-3xl font-bold mb-4">Projects</h1>
    <div class="flex-1 max-w-md">
      <ProjectList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProjectList from '../components/ProjectList.vue'

export default defineComponent({ components: { ProjectList } })
</script>

<style scoped></style>
