import { defineStore } from 'pinia'
import { User } from '../../types/user'

export const useUsersSettingsStore = defineStore('usersSettings', {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    load() {
      this.users = []
    },
    create() {
      console.log('create user')
    },
  },
})
