<template>
  <div v-if="project" class="flex flex-col">
    <div class="flex flex-row items-center p-2">
      <div class="w-48 px-4">
        <div
          title="Switch board"
          class="w-full rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 active:text-gray-600"
          @click="showBoardsSelector = true">
          <i class="fas fa-border-all fa-lg" />
          <span class="ml-2 font-bold">
            {{ board?.name }}
          </span>
        </div>
      </div>
      <h1 class="flex-grow text-center text-2xl">
        {{ project.name }}
      </h1>
      <div class="flex w-48 flex-row-reverse px-4">
        <RouterLink
          :to="
            $route.name !== 'project-settings-project' &&
            $route.name !== 'project-settings-board'
              ? `/projects/${project.id}/settings`
              : `/projects/${project.id}`
          "
          class="block rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 active:text-gray-600"
          :class="{
            'bg-gray-100 text-gray-600':
              $route.name === 'project-settings-project' ||
              $route.name === 'project-settings-board',
          }">
          <i class="fas fa-sliders fa-lg" />
        </RouterLink>
      </div>
    </div>

    <div class="flex-grow">
      <RouterView />
    </div>

    <ModalWindow v-if="showBoardsSelector" @close="showBoardsSelector = false">
      <BoardSelector
        :project="project"
        @switched="(boardId: number) => switchBoard(boardId)" />
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import BoardSelector from '../../components/BoardSelector.vue'
import ModalWindow from '../../components/ModalWindow.vue'
import { mapState } from 'pinia'
import { useTasksStore } from '../../stores/projects/tasks'

export default defineComponent({
  components: { BoardSelector, ModalWindow },
  data() {
    return {
      showBoardsSelector: false,
    }
  },
  computed: {
    ...mapStores(useProjectsStore, useTasksStore),
    ...mapState(useProjectsStore, ['project', 'board']),
  },
  async mounted() {
    await this.projectsStore.loadProject(this.$route.params.projectId as string)
    await this.projectsStore.loadBoard(this.$route.query.board as string)

    if (this.$route.query.task) {
      await this.tasksStore.openTask(Number(this.$route.query.task))
    }
  },
  methods: {
    async switchBoard(boardId: number) {
      this.showBoardsSelector = false

      await this.projectsStore.loadBoard(boardId.toString())
    },
  },
})
</script>
