<template>
  <div
    v-if="task"
    class="flex h-4/6 w-9/12 flex-col items-stretch rounded-md bg-gray-50 p-4">
    <div>
      <input
        v-model="task.title"
        type="text"
        class="w-full rounded border-none bg-gray-50 p-1 text-lg font-bold text-gray-800 outline-none hover:bg-gray-200 hover:ring-0 focus:ring-0 active:ring-0"
        @change="save" />
    </div>
    <div class="flex-1">
      <textarea
        v-model="task.description"
        class="h-full w-full rounded border-none bg-gray-50 p-1 text-gray-800 outline-none hover:bg-gray-200 hover:ring-0 focus:ring-0 active:ring-0"
        @change="save" />
    </div>
    <div class="mt-4 flex flex-row justify-between">
      <AppButton variant="danger" @click="tasksStore.deleteTask(task!.id)"
        >Delete</AppButton
      >

      <AppButton variant="secondary" @click="tasksStore.closeTask()"
        >Close</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { Stage } from '../../types/stage'
import { useTasksStore } from '../../stores/projects/tasks'

export default defineComponent({
  data() {
    return {
      stages: [] as Stage[],
    }
  },
  computed: {
    ...mapStores(useTasksStore),
    ...mapState(useTasksStore, ['task']),
  },
  methods: {
    save() {
      this.tasksStore.saveTask()
    },
  },
})
</script>

<style scoped>
.task-ghost {
  @apply opacity-30 shadow-md ring-2 ring-purple-600;
}
</style>
