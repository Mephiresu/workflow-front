import { defineStore } from 'pinia'
import { api } from '../api'
import { Instance } from '../types/instance'

export const appStore = defineStore('app', {
  state() {
    return {
      name: '',
      administratorEmail: '',
    }
  },
  actions: {
    async loadInstance() {
      try {
        const instance = (await api.get('/instance')).data as Instance

        this.name = instance.name
        this.administratorEmail = instance.administratorEmail
      } catch (error) {
        console.error('Cannot reach backend?')
      }
    },
  },
})
