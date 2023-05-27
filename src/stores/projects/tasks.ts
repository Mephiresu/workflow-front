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
            title: 'New task',
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
          stageId: task.stage.id,
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
    async addUserToTask(username: string): Promise<void> {
      const projectsStore = useProjectsStore()

      try {
        if (!this.task || !projectsStore.project) return

        const projectUser = projectsStore.project.users.find(
          (pu) => pu.user.username === username
        )
        if (!projectUser) return

        await api.put<void>(`/tasks/${this.task.id}/assignees`, {
          username,
        })

        this.task.assignees.push(projectUser.user)
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async removeUserFromTask(username: string): Promise<void> {
      try {
        if (!this.task) return

        await api.delete<void>(`/tasks/${this.task.id}/assignees/${username}`)

        this.task.assignees = this.task.assignees.filter(
          (u) => u.username !== username
        )
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
  },
})
