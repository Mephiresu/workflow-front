<template>
  <div>
    <ModalWindow
        v-if="showCreateUserModal"
        @close="showCreateUserModal = false">
        <div
          class="p-2 rounded-lg bg-white border border-gray-400 shadow-md w-1/3 min-w-max">
          <form
          class="flex flex-col items-stretch p-8 space-y-6"
          @submit.prevent="createUser">
            <h1 class="text-center text-2xl text-gray-800">New user</h1>
            <TextBox v-model="userForm.fullname" placeholder="User fullname" />
            <TextBox v-model="userForm.email" placeholder="User email" />
            <TextBox v-model="userForm.username" placeholder="User username" />
            
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
    <div><AppButton class="w-32"
      @click="showCreateUserModal = true">New user</AppButton></div>
      <div class="divide-y divide-gray-300">
      <div
        v-for="user in usersSettingsStore.users"
        :key="user.fullName"
        class="p-4 hover:bg-purple-200 active:bg-purple-300 cursor-pointer transition-colors"
        @click="editUser(user.fullName)">
        <div class="font-bold text-gray-800 flex items-center">
          {{ user.username }}
        </div>
        <div class="text-sm font-light text-gray-700 flex justify-around">
          {{ user.fullName }} {{ user.email }}
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

export default defineComponent({
  components: { ModalWindow },
  data: () => ({
    showCreateUserModal: false,
    userForm: {
      fullname: '',
      email: '',
      username: '',
    },
  }),
  computed: {
    ...mapStores(useUsersSettingsStore),
  },
  async mounted() {
    await this.usersSettingsStore.load()
  },
  methods: {
    editUser(username: string) {
      this.$router.push({ name: 'user', params: { username } })
    },
    async createUser() {
      await this.usersSettingsStore.create(this.userForm)
    },
  },
})
</script>
