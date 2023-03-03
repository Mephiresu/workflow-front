import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export function setToken(token: string) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export function clearToken() {
  api.defaults.headers.common['Authorization'] = undefined
}
