import axios from 'axios'
import { ApiError } from './types/error'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(
      new ApiError(
        error.response.data.message,
        error.response.data.code,
        error.response.data.timestamp
      )
    )
  }
)

export function setToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearToken() {
  api.defaults.headers.common['Authorization'] = undefined
}
