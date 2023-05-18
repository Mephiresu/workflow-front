import { defineStore } from 'pinia'
import { api } from '../../api'
import { Project } from '../../types/project'
import { BoardFull } from '../../types/board-full'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
    project: undefined as Project | undefined,
    board: undefined as BoardFull | undefined,
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
    // async togglePermission(
    //   roleName: string,
    //   permissionName: string,
    //   enabled: boolean
    // ) {
    //   try {
    //     const payload = {
    //       permissionsNames: [permissionName],
    //     }
    //     const url = `/roles/${roleName}/permissions`

    //     if (enabled) {
    //       await api.put(url, payload)
    //     } else {
    //       await api.delete(url, {
    //         data: payload,
    //       })
    //     }
    //   } catch (e: unknown) {
    //     this.$toaster.error(e as string)
    //   }
    // },
    // async create(data: { name: string; isGlobal: boolean }) {
    //   try {
    //     const role = (
    //       await api.post<Role>('/roles/', {
    //         name: data.name,
    //         isGlobal: data.isGlobal,
    //       })
    //     ).data

    //     this.$router.push({ name: 'role', params: { roleName: role.name } })
    //   } catch (e: unknown) {
    //     this.$toaster.error(e as string)
    //   }
    // },
    // async delete(roleName: string) {
    //   try {
    //     await api.delete(`/roles/${roleName}`)

    //     this.$router.push({ name: 'roles' })
    //   } catch (e: unknown) {
    //     this.$toaster.error(e as string)
    //   }
    // },
  },
})
