import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { api, clearToken, setToken } from '../api'
import { TOKEN_KEY } from '../const'
import { ApiError } from '../types/error'
import { Me } from '../types/me'
import { TokenResponse } from '../types/token-response'
import { User } from '../types/user'

export const useAuthStore = defineStore('auth', {
  state() {
    return {
      token: window.localStorage.getItem(TOKEN_KEY) as string | undefined,
      me: undefined as Me | undefined,
      userDataTemp: {
        username: '',
        password: '',
      },
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
          return
        }
        setToken(this.token)

        const me = (await api.get<User>('/auth/me')).data
        this.me = me
      } catch (error) {
        console.error(error)
        console.error('Cannot reach backend?')
      }
    },
    async logout() {
      window.localStorage.removeItem(TOKEN_KEY)
      clearToken()
      this.token = undefined
      this.me = undefined

      await this.$router.push({ name: 'auth' })
    },
    async signIn(username: string, password: string) {
      try {
        const { me, token } = (
          await api.post<TokenResponse>('/auth/sign-in', {
            username,
            password,
          })
        ).data

        this.me = me
        this.token = token

        localStorage.setItem(TOKEN_KEY, token)
        setToken(token)

        this.$router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
        if (error instanceof ApiError) {
          if (error.code === 303) {
            this.userDataTemp.username = username
            this.userDataTemp.password = password
            this.$router.push({ name: 'change-otp' })

            return
          }

          this.$toaster.error(error.message)
        }
      }
    },
    async changeOtp(newPassword: string) {
      try {
        await api.post('/auth/change-one-time-password', {
          username: this.userDataTemp.username,
          password: this.userDataTemp.password,
          newPassword,
        })

        this.$router.push({ name: 'auth' })
      } catch (error) {
        console.log(error)
      }
    },
  },
})
