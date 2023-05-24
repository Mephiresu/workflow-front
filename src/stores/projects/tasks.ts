import { defineStore } from 'pinia'
import { api } from '../../api'
import { FullTask } from '../../types/task'
import { useProjectsStore } from './projects'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    task: undefined as FullTask | undefined,
  }),
  actions: {
    async openTask(taskId: number) {
      const projectsStore = useProjectsStore()

      if (!projectsStore.board) return

      try {
        const task = (await api.get<FullTask>(`/tasks/${taskId}`)).data

        this.task = task

        this.$router.push({
          query: { ...this.$router.currentRoute.value.query, task: taskId },
        })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async closeTask() {
      this.task = undefined
      this.$router.push({
        query: { ...this.$router.currentRoute.value.query, task: undefined },
      })
    },
    async createTask(stageId: number) {
      const projectsStore = useProjectsStore()

      try {
        if (!projectsStore.project || !projectsStore.board) return

        const task = (
          await api.post<FullTask>(`/tasks`, {
            title: '',
            stageId,
            boardId: projectsStore.board.id,
            projectId: projectsStore.project.id,
          })
        ).data

        this.task = task

        projectsStore.board.tasks.push({
          id: task.id,
          description: task.description,
          index: task.index,
          number: task.number,
          stageId: task.stageId,
          title: task.title,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
        })

        projectsStore.board = { ...projectsStore.board }

        this.openTask(task.id)
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async deleteTask(taskId: number) {
      const projectsStore = useProjectsStore()

      try {
        if (!projectsStore.project || !projectsStore.board) return

        const task = projectsStore.board.tasks.find((t) => t.id === taskId)
        if (!task) return

        await api.delete(`/tasks/${task.id}`)

        const index = projectsStore.board.tasks.findIndex(
          (t) => t.id === taskId
        )
        projectsStore.board.tasks.splice(index, 1)

        projectsStore.board = { ...projectsStore.board }

        this.closeTask()
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async moveTask(taskId: number, toStageId?: number, leadingTaskId?: number) {
      const projectsStore = useProjectsStore()

      try {
        if (!projectsStore.project || !projectsStore.board) return

        const task = projectsStore.board.tasks.find((t) => t.id === taskId)
        if (!task) return

        const updated = (
          await api.patch<FullTask>(`/tasks/${taskId}/move`, {
            stageId: toStageId,
            leadingTaskId,
          })
        ).data
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async saveTask() {
      const projectsStore = useProjectsStore()

      try {
        if (!projectsStore.project || !projectsStore.board || !this.task) return

        const updated = (
          await api.patch<FullTask>(`/tasks/${this.task.id}`, {
            title: this.task.title,
            description: this.task.description,
          })
        ).data
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
  },
})
