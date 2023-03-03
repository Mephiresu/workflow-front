<template>
  <div
    class="w-96 mx-auto -mt-24 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
    <form
      class="flex flex-col items-stretch p-8 space-y-6"
      @submit.prevent="changeOtp">
      <h1 class="text-center text-2xl text-gray-800">Change password</h1>
      <h1 class="text-center text-md text-gray-500">
        You are required to change your one-time password
      </h1>
      <TextBox
        v-model="newPassword"
        placeholder="New Password"
        type="password" />
      <AppButton type="submit">Continue</AppButton>
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
      newPassword: '',
    }
  },
  computed: {
    ...mapStores(useAuthStore),
  },
  methods: {
    async changeOtp() {
      await this.authStore.changeOtp(this.newPassword)
    },
  },
})
</script>

<style scoped></style>
