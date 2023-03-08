<template>
  <div class="flex flex-col content-center items-center justify-center">
    <div
      v-if="stage === 0"
      class="w-2/5 mx-auto -mt-24 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
      <form
        class="flex flex-col items-stretch p-8 space-y-6"
        @submit.prevent="createInstance">
        <h1 class="text-center text-2xl text-gray-800">
          Set up your organization
        </h1>
        <p class="text-gray-600 text-center">
          Enter public information about your organization.
        </p>
        <TextBox v-model="name" placeholder="Company name" />
        <TextBox
          v-model="administratorEmail"
          placeholder="Administrator Email"
          type="email" />
        <AppButton type="submit">Continue</AppButton>
      </form>
    </div>
    <div
      v-if="stage === 1"
      class="w-2/5 mx-auto -mt-24 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
      <form
        class="flex flex-col items-stretch p-8 space-y-6"
        @submit.prevent="proceed">
        <h1 class="text-center text-2xl text-gray-800">
          Administrator account
        </h1>
        <p class="text-gray-600 text-center">
          Organization has been set up. Here are your system administrator
          credentials:
        </p>
        <div class="grid grid-cols-3 px-8 py-4 border-y border-gray-300">
          <div>Username:</div>
          <span class="font-bold col-span-2">{{
            appStore.createdInstance?.administrator.username
          }}</span>
          <div>Email:</div>
          <span class="font-bold col-span-2">{{
            appStore.createdInstance?.administrator.email
          }}</span>
        </div>
        <p>
          When you proceed, you will be asked to change your one-time password.
        </p>
        <AppButton type="submit">Proceed</AppButton>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAppStore } from '../stores/app'

export default defineComponent({
  data: () => ({
    stage: 0,
    name: '',
    administratorEmail: '',
  }),
  computed: {
    ...mapStores(useAppStore),
  },
  methods: {
    async createInstance() {
      await this.appStore.createInstance(this.name, this.administratorEmail)
      this.stage = 1
    },
    async proceed() {
      await this.appStore.signInAdministrator()
    },
  },
})
</script>

<style scoped></style>
