import { defineStore } from 'pinia'
import { Role } from '../../types/role'
import { api } from '../../api'
import { Permission } from '../../types/permission'

export const useRolesSettingsStore = defineStore('rolesSettings', {
  state: () => ({
    roles: [] as Role[],
  }),
  actions: {
    async load() {
      try {
        const roles = (await api.get<Role[]>('/roles')).data

        this.roles = roles
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async getRoleWithPermissions(roleId: number) {
      try {
        const role = (await api.get<Role>(`/roles/${roleId}`)).data

        const permissions = (
          await api.get<Permission[]>(`/roles/${roleId}/permissions`)
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
      roleId: number,
      permissionName: string,
      enabled: boolean
    ) {
      try {
        const payload = {
          permissionsNames: [permissionName],
        }
        const url = `/roles/${roleId}/permissions`

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
    create() {
      console.log('create user')
    },
  },
})
