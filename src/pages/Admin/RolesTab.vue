<template>
  <div>
    <ModalWindow
      v-if="showCreateRoleModal"
      @close="showCreateRoleModal = false">
      <div
        class="p-2 rounded-lg bg-white border border-gray-400 shadow-md w-1/3 min-w-max">
        <form
          class="flex flex-col items-stretch p-8 space-y-6"
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
      <AppButton class="w-32" @click="showCreateRoleModal = true"
        >New role</AppButton
      >
    </div>
    <div class="divide-y divide-gray-300">
      <div
        v-for="role in rolesSettingsStore.roles"
        :key="role.id"
        class="p-4 hover:bg-purple-200 active:bg-purple-300 cursor-pointer transition-colors"
        @click="editRole(role.id)">
        <div class="font-bold text-gray-800 flex items-center">
          {{ role.name }}
          <span
            v-if="role.isGlobal"
            class="border-purple-400 border ml-2 text-sm text-purple-400 font-light px-2 rounded-md"
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
    ...mapStores(useRolesSettingsStore),
  },
  async mounted() {
    await this.rolesSettingsStore.load()
  },
  methods: {
    editRole(roleId: number) {
      this.$router.push({ name: 'role', params: { roleId } })
    },
    async createRole() {
      await this.rolesSettingsStore.create(this.roleForm)
    },
  },
})
</script>
