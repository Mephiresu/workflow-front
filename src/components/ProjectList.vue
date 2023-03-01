<template>
  <div class="space-y-2">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Project } from '../types/project'
import ProjectCard from './ProjectCard.vue'

const projects: Project[] = [
  {
    id: 1,
    name: 'Main Project',
    description: 'This is Main Project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 1,
    name: 'Second Project',
    description: 'This is Second Project',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export default defineComponent({
  components: { ProjectCard },
  data() {
    return {
      projects,
    }
  },
})
</script>
