<template>
  <div
    v-if="board"
    class="flex flex-row items-stretch justify-center divide-x divide-gray-300 py-4">
    <div v-for="stage in stages" :key="stage.id" class="group flex-1 px-2 pb-4">
      <h1 class="mb-4 text-lg">{{ stage.name }}</h1>
      <draggable
        v-model="stage.tasks"
        group="test"
        item-key="id"
        class="space-y-2 py-4"
        ghost-class="task-ghost"
        @change="(e: any) => taskDrag(stage.id, e)">
        <template #item="{ element }">
          <div
            class="flex flex-col space-y-1 rounded-md bg-gray-50 p-2 shadow-sm hover:shadow-md"
            @click="tasksStore.openTask(element.id)">
            <div class="flex flex-row content-center space-x-2">
              <span class="text-gray-900"
                >#{{ element.number }} [{{ element.index }}]
                {{ element.title }}</span
              >
            </div>
            <div class="text-gray-500">
              {{ element.description.slice(0, 80)
              }}{{ element.description.length > 80 ? '...' : '' }}
            </div>
          </div>
        </template>
      </draggable>
      <div
        class="flex h-16 flex-col items-center justify-center space-y-1 rounded-md border-4 border-gray-300/50 p-2 font-bold text-gray-300/50 opacity-0 hover:border-gray-300 hover:text-gray-300 active:border-gray-400 active:text-gray-400 group-hover:opacity-100"
        @click="tasksStore.createTask(stage.id)">
        <i class="fas fa-plus fa-2xl" />
      </div>
    </div>

    <ModalWindow v-if="tasksStore.task" @close="tasksStore.closeTask()">
      <TaskPage />
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import { mapState } from 'pinia'
import { Stage } from '../../types/stage'
import draggable from 'vuedraggable'
import ModalWindow from '../../components/ModalWindow.vue'
import TaskPage from './TaskPage.vue'
import { useTasksStore } from '../../stores/projects/tasks'

export default defineComponent({
  components: { draggable, ModalWindow, TaskPage },
  data() {
    return {
      stages: [] as Stage[],
    }
  },
  computed: {
    ...mapStores(useProjectsStore, useTasksStore),
    ...mapState(useProjectsStore, ['board']),
  },
  watch: {
    board() {
      this.updateTasks()
    },
    'board.tasks'() {
      this.updateTasks()
    },
  },
  mounted() {
    this.updateTasks()
  },
  methods: {
    updateTasks() {
      if (!this.board) return

      this.stages = this.board.stages.map((s) => ({
        ...s,
        tasks: this.board!.tasks.filter((t) => t.stageId === s.id),
      }))
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async taskDrag(stageId: number, e: any) {
      if (!e.moved && !e.added) return
      const data = e.added ?? e.moved

      const stage = this.stages.find((s) => s.id === stageId)
      if (!stage || !stage.tasks) return

      const taskId = data.element.id
      const taskIndex = data.newIndex

      const leadingTaskId =
        taskIndex > 0 ? stage.tasks[taskIndex - 1].id : undefined

      const toStageId = e.added ? stageId : undefined

      await this.tasksStore.moveTask(taskId, toStageId, leadingTaskId)
    },
  },
})
</script>

<style scoped>
.task-ghost {
  @apply opacity-30 shadow-md ring-2 ring-purple-600;
}
</style>
