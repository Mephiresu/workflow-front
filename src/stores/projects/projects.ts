import { defineStore } from 'pinia'
import { api } from '../../api'
import { Project } from '../../types/project'
import { BoardFull } from '../../types/board-full'
import { Task } from '../../types/task'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    project: undefined as Project | undefined,
    board: undefined as BoardFull | undefined,
    task: undefined as Task | undefined,
  }),
  actions: {
    async loadProjects() {
      try {
        const projects = (await api.get<Project[]>('/projects')).data

        this.projects = projects
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async loadProject(projectId: string) {
      try {
        const project = (await api.get<Project>(`/projects/${projectId}`)).data

        this.project = project
      } catch (e: unknown) {
        this.$toaster.error(e as string)
        this.$router.push({ name: 'projects' })
      }
    },
    async loadBoard(boardId?: string) {
      try {
        if (!boardId) {
          const defaultBoard = this.project?.boards.find((b) => b.isDefault)
          if (!defaultBoard) {
            return
          }

          boardId = defaultBoard.id.toString()
        } else {
          this.$router.push({
            query: { ...this.$router.currentRoute.value.query, board: boardId },
          })
        }

        const board = (
          await api.get<BoardFull>(
            `/projects/${this.project?.id}/boards/${boardId}`
          )
        ).data

        this.board = board
      } catch (e: unknown) {
        this.$toaster.error(e as string)
        this.$router.push({ name: 'projects' })
      }
    },
    async create(data: { name: string; description?: string }) {
      try {
        const project = (await api.post<Project>('/projects', data)).data

        this.$router.push({
          name: 'project',
          params: { projectId: project.id },
        })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async delete(projectId: number) {
      try {
        await api.delete(`/projects/${projectId}`)

        this.$router.push({ name: 'projects' })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async createStage(data: { name: string }) {
      try {
        if (!this.project || !this.board) return

        const stage = (
          await api.post<Project>(
            `/projects/${this.project.id}/boards/${this.board.id}/stages`,
            data
          )
        ).data

        this.board.stages.push(stage)
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async deleteStage(stageId: number) {
      try {
        if (!this.project || !this.board) return

        await api.delete(
          `/projects/${this.project.id}/boards/${this.board.id}/stages/${stageId}`
        )

        const index = this.board.stages.findIndex((s) => s.id === stageId)
        this.board.stages.splice(index, 1)
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async openTask(taskId: number) {
      if (!this.board) return

      const task = this.board.tasks.find((t) => t.id === taskId)
      if (!task) return

      this.task = task

      this.$router.push({
        query: { ...this.$router.currentRoute.value.query, task: taskId },
      })
    },
    async closeTask() {
      this.task = undefined
      this.$router.push({
        query: { ...this.$router.currentRoute.value.query, task: undefined },
      })
    },
    async createTask(stageId: number) {
      try {
        if (!this.project || !this.board) return

        const task = (
          await api.post<Task>(`/tasks`, {
            title: '',
            stageId,
            boardId: this.board.id,
          })
        ).data

        this.task = task

        this.board.tasks.push(task)

        this.board = { ...this.board }

        this.openTask(task.id)
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async deleteTask(taskId: number) {
      try {
        if (!this.project || !this.board) return

        const task = this.board.tasks.find((t) => t.id === taskId)
        if (!task) return

        await api.delete(`/tasks/${task.id}`)

        const index = this.board.tasks.findIndex((t) => t.id === taskId)
        this.board.tasks.splice(index, 1)

        this.board = { ...this.board }

        this.closeTask()
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async moveTask(taskId: number, toStageId: number) {
      try {
        if (!this.project || !this.board) return

        const task = this.board.tasks.find((t) => t.id === taskId)
        if (!task) return

        const updated = (
          await api.patch<Task>(`/tasks/${taskId}`, {
            stageId: toStageId,
          })
        ).data
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async saveTask() {
      try {
        if (!this.project || !this.board || !this.task) return

        const updated = (
          await api.patch<Task>(`/tasks/${this.task.id}`, {
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
