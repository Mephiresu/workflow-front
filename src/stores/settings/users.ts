import { defineStore } from 'pinia'
import { User } from '../../types/user'
import { api } from '../../api'
export const useUsersSettingsStore = defineStore('usersSettings', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async load() {
        this.users = []
        try {
        const users = (await api.get<User[]>('/users')).data
        this.users = users
      } catch (e: unknown){
        this.$toaster.error(e as string)
      }
    },
    async getUser(username: string) {
      try {
          return (await api.get<User>(`/users/${username}`)).data 
        } catch (e: unknown) {
          this.$toaster.error(e as string)
          this.$router.push({ name: 'settings' })
        }
    },
    async updateUser(
      user: User,
      changed: boolean
    ) {
      try {
      const url = `/users/${user.username}`

        if (changed) {
          await api.put(url, user)
        } else {
          return
        }
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
    async create(data: { fullname: string; email: string; username: string}) {
      try {
            const user = (
              await api.post<User>('/users/', {
                username: data.username,
                email: data.email,
                fullname: data.fullname,
              })
            ).data
    
            this.$router.push({ name: 'user', params: { userName: user.username } })
          } catch (e: unknown) {
            this.$toaster.error(e as string)
          }
    },
    async delete(username: string) {
      try {
        await api.delete(`/users/${username}`)

        this.$router.push({ name: 'users' })
      } catch (e: unknown) {
        this.$toaster.error(e as string)
      }
    },
  },
})
