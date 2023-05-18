<template>
  <div v-if="project" class="flex flex-col">
    <div class="flex flex-row items-center justify-items-center">
      <div class="px-4"><AppButton>BOARD</AppButton></div>
      <div class="flex-grow">{{ project.name }}</div>
      <div class="px-4">
        <RouterLink
          :to="{ name: 'settings' }"
          class="text-gray-400 transition-colors hover:text-gray-500 active:text-gray-600">
          <i class="fas fa-gear fa-lg" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Project } from '../../types/project'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'

export default defineComponent({
  data() {
    return {
      project: undefined as Project | undefined,
    }
  },
  computed: {
    ...mapStores(useProjectsStore),
  },
  async mounted() {
    const data = await this.projectsStore.getProject(
      Number(this.$route.params.projectId)
    )
    this.project = data
  },
})
</script>
