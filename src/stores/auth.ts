import { defineStore } from 'pinia'
import { api, clearToken, setToken } from '../api'
import { TOKEN_KEY } from '../const'
import { router } from '../router'
import { User } from '../types/user'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: window.localStorage.getItem(TOKEN_KEY) as string | undefined,
      user: undefined as User | undefined,
    }
  },
  getters: {
    loggedIn(): boolean {
      return !!this.token
    },
  },
  actions: {
    async load() {
      try {
        if (!this.token) {
          window.localStorage.setItem(
            TOKEN_KEY,
            'sid.H3x9A6oKYLnw8hMHQqb-KV2TRA8KZGfAn04vJHT_uXg7ERB5uNkVfFhJACy3YIlo4tDAJ1teqaylMjXJVS1WkueJLiQFD32mr33tcbNgud2LjY37rRPmddT-zO8K3YQc2X2glgVRsDw7mvoccnYO5F7Pszh2SQAdD2SsqGtassE'
          )
          return
        }
        setToken(this.token)

        const user = (await api.get('/auth/me')).data as User
        this.user = user
      } catch (error) {
        console.error(error)
        console.error('Cannot reach backend?')
      }
    },
    async logout() {
      window.localStorage.removeItem(TOKEN_KEY)
      clearToken()
      ;(this.token = undefined), (this.user = undefined)

      await router.push({ name: 'auth' })
    },
  },
})
