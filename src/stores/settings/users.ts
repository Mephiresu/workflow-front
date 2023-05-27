import { defineStore } from 'pinia'
import { User } from '../../types/user'
import { api } from '../../api'
import { CreateUserResponse } from '../../types/create-user-response'
export const useUsersSettingsStore = defineStore('usersSettings', {
  state: () => ({
    users: [] as User[],
    user: undefined as User | undefined,
  }),
  actions: {
    async load() {
      this.users = []
      try {
        const users = (await api.get<User[]>('/users')).data
        this.users = users
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async loadUser(username: string) {
      try {
        const user = (await api.get<User>(`/users/${username}`)).data

        this.user = user
      } catch (e: unknown) {
        this.$toaster.error(e as string)
        this.$router.push({ name: 'settings' })
      }
    },
    async updateUser(data: { email: string; fullName: string }) {
      try {
        if (!this.user) return

        const updated = (
          await api.patch<User>(`/users/${this.user.username}`, {
            email: data.email,
            fullName: data.fullName,
          })
        ).data

        this.user = updated
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async updateUserRole(data: { roleName: string }) {
      try {
        if (!this.user) return

        const updated = (
          await api.patch<User>(`/users/${this.user.username}/role`, {
            roleName: data.roleName,
          })
        ).data

        this.user.roleName = data.roleName
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async create(data: { fullName: string; email: string; username: string }) {
      try {
        const created = (
          await api.post<CreateUserResponse>('/users/', {
            username: data.username,
            email: data.email,
            fullName: data.fullName,
          })
        ).data

        this.users.push(created)

        return created
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async delete() {
      try {
        if (!this.user) return

        await api.delete(`/users/${this.user.username}`)

        this.users = this.users.filter(
          (u) => u.username !== this.user?.username
        )

        this.$router.push({ name: 'users' })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
  },
})
