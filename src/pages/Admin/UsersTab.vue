<template>
  <div>
    <ModalWindow
      v-if="showCreateUserModal"
      @close="showCreateUserModal = false">
      <div
        class="w-1/3 min-w-max rounded-lg border border-gray-400 bg-white p-2 shadow-md">
        <form
          class="flex flex-col items-stretch space-y-6 p-8"
          @submit.prevent="createUser">
          <h1 class="text-center text-2xl text-gray-800">New user</h1>
          <TextBox v-model="userForm.username" placeholder="User username" />
          <TextBox v-model="userForm.email" placeholder="User email" />
          <TextBox v-model="userForm.fullName" placeholder="User full name" />

          <div class="flex flex-row justify-center space-x-6">
            <AppButton type="submit" variant="primary" class="w-32"
              >Create</AppButton
            >
            <AppButton
              type="button"
              variant="secondary"
              class="w-32"
              @click="showCreateUserModal = false"
              >Cancel</AppButton
            >
          </div>
        </form>
      </div>
    </ModalWindow>

    <ModalWindow v-if="createdUser">
      <div
        class="w-1/3 min-w-max rounded-lg border border-gray-400 bg-white p-2 shadow-md">
        <div class="flex flex-col items-stretch space-y-6 p-8">
          <h1 class="text-center text-2xl text-gray-800">User created</h1>
          <p class="text-center text-gray-600">
            Account has been created. Send those credentials to the user.
          </p>
          <p class="text-center font-bold text-gray-600">
            WARNING! This is the only time you will see it!
          </p>
          <div class="grid grid-cols-2 border-y border-gray-300 px-8 py-4">
            <div>Username:</div>
            <span class="font-bold">{{ createdUser.username }}</span>
            <div>Email:</div>
            <span class="font-bold">{{ createdUser.email }}</span>
            <div>One-time password:</div>
            <span class="font-bold">{{ createdUser.password }}</span>
          </div>

          <p>Save those credentials before closing</p>
          <AppButton variant="secondary" @click="createdUser = undefined"
            >Close</AppButton
          >
        </div>
      </div>
    </ModalWindow>

    <div>
      <AppButton class="mb-4 w-32" @click="showCreateUserModal = true">
        New user
      </AppButton>
    </div>
    <div class="divide-y divide-gray-300">
      <div
        v-for="user in usersSettingsStore.users"
        :key="user.fullName"
        class="flex cursor-pointer flex-row items-center justify-between p-4 transition-colors hover:bg-purple-200 active:bg-purple-300"
        @click="editUser(user.username)">
        <div class="flex flex-col items-start justify-start">
          <span class="font-bold text-gray-800">
            {{ user.username }}
            <span class="text-sm font-normal text-gray-600">{{
              user.roleName
            }}</span>
          </span>
          <span class="text-sm text-gray-700">
            {{ user.fullName }} {{ user.email }}
          </span>
          <span class="text-sm text-gray-700"> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useUsersSettingsStore } from '../../stores/settings/users'

import ModalWindow from '../../components/ModalWindow.vue'
import { CreateUserResponse } from '../../types/create-user-response'

export default defineComponent({
  components: { ModalWindow },
  data: () => ({
    showCreateUserModal: false,
    userForm: {
      username: '',
      email: '',
      fullName: '',
    },
    createdUser: undefined as CreateUserResponse | undefined,
  }),
  computed: {
    ...mapStores(useUsersSettingsStore),
  },
  async mounted() {
    await this.usersSettingsStore.load()
  },
  methods: {
    reset() {
      this.showCreateUserModal = false

      this.userForm = {
        username: '',
        email: '',
        fullName: '',
      }
    },
    editUser(username: string) {
      this.$router.push({ name: 'user', params: { username } })
    },
    async createUser() {
      const created = await this.usersSettingsStore.create(this.userForm)
      this.reset()
      this.createdUser = created
    },
  },
})
</script>
