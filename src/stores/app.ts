import { defineStore } from 'pinia'
import { api } from '../api'
import { Instance } from '../types/instance'
import { ApiError } from '../types/error'
import { CreateInstanceResponse } from '../types/create-instance-response'
import { useAuthStore } from './auth'

export const useAppStore = defineStore('app', {
  state() {
    return {
      needsSetup: false,
      name: '',
      administratorEmail: '',
      createdInstance: undefined as CreateInstanceResponse | undefined,
    }
  },
  actions: {
    async load() {
      try {
        const instance = (await api.get<Instance>('/instance')).data

        this.name = instance.name
        this.administratorEmail = instance.administratorEmail
      } catch (error: unknown) {
        if (error instanceof ApiError && error.code === 404) {
          this.needsSetup = true
          this.$router.push({ name: 'setup' })
          return
        }
        this.$toaster.error('Cannot connect to the server')
      }
    },
    async createInstance(
      name: string,
      administratorEmail: string
    ): Promise<void> {
      try {
        this.createdInstance = (
          await api.post<CreateInstanceResponse>('/instance', {
            name,
            administratorEmail,
          })
        ).data

        this.name = this.createdInstance.instance.name
        this.administratorEmail =
          this.createdInstance.instance.administratorEmail
      } catch (error: unknown) {
        if (error instanceof ApiError) {
          this.$toaster.error(error.message)
        }

        this.$toaster.error('Unknown error')
      }
    },
    async signInAdministrator() {
      if (!this.createdInstance) {
        return
      }

      this.needsSetup = false

      const authStore = useAuthStore()
      await authStore.signIn(
        this.createdInstance.administrator.username,
        this.createdInstance.administrator.password
      )
    },
  },
})
