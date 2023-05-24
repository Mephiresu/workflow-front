<template>
  <div
    v-if="task"
    class="flex h-4/6 w-9/12 flex-row items-stretch justify-center divide-x divide-gray-300 rounded-md bg-gray-50 p-4">
    <div class="mr-4 flex flex-1 flex-col items-stretch">
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
        <AppButton variant="danger" @click="tasksStore.deleteTask(task!.id)">
          Delete
        </AppButton>

        <AppButton variant="secondary" @click="tasksStore.closeTask()">
          Close
        </AppButton>
      </div>
    </div>

    <div class="flex w-4/12 max-w-xs flex-col items-stretch space-y-2 pl-4">
      <div class="text-gray-600">
        <span>ID </span>
        <span>{{ task.number }}</span>
      </div>
      <div class="grid grid-cols-2 text-sm text-gray-800">
        <span class="font-bold">Stage: </span>
        <span>{{ task.stage.name }}</span>

        <span class="font-bold">Created at: </span>
        <span>{{ new Date(task.createdAt).toDateString() }}</span>

        <span class="font-bold">Updated at: </span>
        <span>{{ new Date(task.updatedAt).toDateString() }}</span>
      </div>
      <div>
        <div class="mb-1 font-bold">Assignees</div>
        <div class="relative ml-2">
          <div
            v-if="showAssigneesSelector"
            class="fixed inset-0 cursor-pointer"
            @click="showAssigneesSelector = false"></div>
          <UsersSelector
            v-if="projectsStore.project && showAssigneesSelector"
            class="absolute z-50"
            :users="usersToAssign"
            @selected="(username: string) => addUserToTask(username)" />

          <div
            v-for="assignee in task.assignees"
            :key="assignee.username"
            class="group flex cursor-pointer flex-row items-center px-2 py-1 hover:bg-gray-200">
            <span>{{ assignee.fullName }}</span>
            &nbsp;
            <span class="text-gray-500">({{ assignee.username }})</span>
            <div
              class="ml-auto h-6 w-6 rounded text-center text-transparent transition-colors group-hover:text-gray-400"
              @click="tasksStore.removeUserFromTask(assignee.username)">
              <i
                class="fas fa-trash fa-sm transition-colors hover:text-red-500" />
            </div>
          </div>
          <div
            class="group flex cursor-pointer flex-row items-center justify-center px-2 py-1 hover:bg-gray-200"
            @click="showAssigneesSelector = true">
            <div
              class="h-6 w-6 rounded text-center text-transparent transition-colors hover:text-gray-500 group-hover:text-gray-400">
              <i class="fas fa-plus fa-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { useTasksStore } from '../../stores/projects/tasks'
import UsersSelector from '../../components/UsersSelector.vue'
import { useProjectsStore } from '../../stores/projects/projects'
import { User } from '../../types/user'

export default defineComponent({
  components: { UsersSelector },
  data() {
    return {
      showAssigneesSelector: false,
    }
  },
  computed: {
    ...mapStores(useTasksStore, useProjectsStore),
    ...mapState(useTasksStore, ['task']),
    usersToAssign(): User[] {
      if (!this.projectsStore.project) return []

      return this.projectsStore.project.users
        .map((pu) => pu.user)
        .filter(
          (u) => !this.task?.assignees.find((tu) => tu.username === u.username)
        )
    },
  },
  methods: {
    save() {
      this.tasksStore.saveTask()
    },
    addUserToTask(username: string) {
      this.showAssigneesSelector = false
      this.tasksStore.addUserToTask(username)
    },
  },
})
</script>
