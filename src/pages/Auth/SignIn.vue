<template>
  <div
    class="mx-auto -mt-24 w-96 rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
    <form
      class="flex flex-col items-stretch space-y-6 p-8"
      @submit.prevent="signIn">
      <h1 class="text-center text-2xl text-gray-800">Sign in</h1>
      <TextBox v-model="username" placeholder="Username" />
      <TextBox v-model="password" placeholder="Password" type="password" />
      <AppButton type="submit">Log in</AppButton>
    </form>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async signIn() {
      await this.authStore.signIn(this.username, this.password)
    },
  },
})
</script>

<style scoped></style>
