import { defineStore } from 'pinia'
import { api } from '../../api'
import { Project } from '../../types/project'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as Project[],
  }),
  actions: {
    async load() {
      try {
        const projects = (await api.get<Project[]>('/projects')).data

        this.projects = projects
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async getProject(projectId: number) {
      try {
        const project = (await api.get<Project>(`/projects/${projectId}`)).data

        return project
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
