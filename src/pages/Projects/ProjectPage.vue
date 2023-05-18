<template>
  <div v-if="project" class="flex flex-col">
    <div class="flex flex-row items-center justify-items-center p-2">
      <div class="px-4">
        <AppButton @click="switchBoard()">BOARD</AppButton>
      </div>
      <h1 class="flex-grow text-center text-2xl">
        {{ project.name }}
      </h1>
      <div class="px-4">
        <RouterLink
          :to="{ name: 'settings' }"
          class="text-gray-400 transition-colors hover:text-gray-500 active:text-gray-600">
          <i class="fas fa-gear fa-lg" />
        </RouterLink>
      </div>
    </div>

    <ModalWindow v-if="showBoardsSelector" @close="showBoardsSelector = false">
      <BoardSelector
        :project="project"
        @switched="showBoardsSelector = false" />
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Project } from '../../types/project'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import BoardSelector from '../../components/BoardSelector.vue'
import ModalWindow from '../../components/ModalWindow.vue'

export default defineComponent({
  components: { BoardSelector, ModalWindow },
  data() {
    return {
      project: undefined as Project | undefined,
      showBoardsSelector: false,
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
  methods: {
    switchBoard() {
      this.showBoardsSelector = true
    },
  },
})
</script>
