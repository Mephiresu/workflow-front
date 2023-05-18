<template>
  <div class="flex flex-col p-8">
    <h1 class="mb-4 text-3xl font-bold">Projects</h1>
    <div class="max-w-md flex-1">
      <div class="space-y-2">
        <ProjectCard
          v-for="project in projectsStore.projects"
          :key="project.id"
          :project="project" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'

import ProjectCard from '../../components/ProjectCard.vue'

export default defineComponent({
  components: {
    ProjectCard,
  },
  data() {
    return {}
  },
  computed: {
    ...mapStores(useProjectsStore),
  },
  async mounted() {
    await this.projectsStore.load()
  },
})
</script>
