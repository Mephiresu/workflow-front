<template>
  <div>
    <ModalWindow
      v-if="showCreateRoleModal"
      @close="showCreateRoleModal = false">
      <div
        class="w-1/3 min-w-max rounded-lg border border-gray-400 bg-white p-2 shadow-md">
        <form
          class="flex flex-col items-stretch space-y-6 p-8"
          @submit.prevent="createRole">
          <h1 class="text-center text-2xl text-gray-800">New role</h1>
          <TextBox v-model="roleForm.name" placeholder="Role name" />

          <label class="flex flex-row items-center justify-start space-x-4">
            <span>Global</span>
            <CheckBox v-model="roleForm.isGlobal" />
          </label>

          <div class="flex flex-row justify-center space-x-6">
            <AppButton type="submit" variant="primary" class="w-32"
              >Create</AppButton
            >
            <AppButton
              type="button"
              variant="secondary"
              class="w-32"
              @click="showCreateRoleModal = false"
              >Cancel</AppButton
            >
          </div>
        </form>
      </div>
    </ModalWindow>
    <div class="mb-4">
      <AppButton
        v-if="authStore.hasPermission('roles:create')"
        class="w-32"
        @click="showCreateRoleModal = true"
        >New role</AppButton
      >
    </div>
    <div class="divide-y divide-gray-300">
      <div
        v-for="role in rolesSettingsStore.roles"
        :key="role.name"
        class="cursor-pointer p-4 transition-colors hover:bg-purple-200 active:bg-purple-300"
        @click="editRole(role.name)">
        <div class="flex items-center font-bold text-gray-800">
          {{ role.name }}
          <span
            v-if="role.isGlobal"
            class="ml-2 rounded-md border border-purple-400 px-2 text-sm font-light text-purple-400"
            >Global</span
          >
        </div>
        <div class="text-sm font-light text-gray-500">
          {{ role.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import { useRolesSettingsStore } from '../../stores/settings/roles'
import ModalWindow from '../../components/ModalWindow.vue'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  components: { ModalWindow },
  data: () => ({
    showCreateRoleModal: false,
    roleForm: {
      name: '',
      isGlobal: false,
    },
  }),
  computed: {
    ...mapStores(useRolesSettingsStore, useAuthStore),
  },
  async mounted() {
    await this.rolesSettingsStore.load()
  },
  methods: {
    editRole(roleName: string) {
      this.$router.push({ name: 'role', params: { roleName } })
    },
    async createRole() {
      await this.rolesSettingsStore.create(this.roleForm)
    },
  },
})
</script>
