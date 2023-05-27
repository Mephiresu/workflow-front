import { defineStore } from 'pinia'
import { Role } from '../../types/role'
import { api } from '../../api'
import { Permission } from '../../types/permission'

export const useRolesSettingsStore = defineStore('rolesSettings', {
  state: () => ({
    roles: [] as Role[],
  }),
  getters: {
    localRoles(): Role[] {
      return this.roles.filter((r) => !r.isGlobal)
    },
    globalRoles(): Role[] {
      return this.roles.filter((r) => r.isGlobal)
    },
  },
  actions: {
    async load() {
      try {
        const roles = (await api.get<Role[]>('/roles')).data

        this.roles = roles
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async getRoleWithPermissions(roleName: string) {
      try {
        const role = (await api.get<Role>(`/roles/${roleName}`)).data

        const permissions = (
          await api.get<Permission[]>(`/roles/${roleName}/permissions`)
        ).data

        return {
          role,
          permissions,
        }
      } catch (e: unknown) {
        this.$toaster.error(e as string)
        this.$router.push({ name: 'settings' })
      }
    },
    async togglePermission(
      roleName: string,
      permissionName: string,
      enabled: boolean
    ) {
      try {
        const payload = {
          permissionsNames: [permissionName],
        }
        const url = `/roles/${roleName}/permissions`

        if (enabled) {
          await api.put(url, payload)
        } else {
          await api.delete(url, {
            data: payload,
          })
        }
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async create(data: { name: string; isGlobal: boolean }) {
      try {
        const role = (
          await api.post<Role>('/roles/', {
            name: data.name,
            isGlobal: data.isGlobal,
          })
        ).data

        this.$router.push({ name: 'role', params: { roleName: role.name } })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async delete(roleName: string) {
      try {
        await api.delete(`/roles/${roleName}`)

        this.$router.push({ name: 'roles' })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
  },
})
