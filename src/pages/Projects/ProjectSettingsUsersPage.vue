<template>
  <div class="flex w-full flex-col p-8">
    <div v-if="project" class="flex flex-col">
      <div
        v-for="user in project.users"
        :key="user.user.username"
        class="flex flex-row items-center justify-between p-4 transition-colors hover:bg-purple-200">
        <div class="flex-1">
          <span>{{ user.user.fullName }}</span>
          &nbsp;
          <span class="text-sm text-gray-700">{{ user.user.username }}</span>
        </div>
        <RoleSelectorDropdown
          :roles="rolesSettingsStore.localRoles"
          :current-role="user.role.name"
          class="mr-4"
          @selected="(selectedRole: string) => changeUserRole(user.user.username, selectedRole)" />
        <div
          class="cursor-pointer rounded p-2 text-gray-400 ring-2 ring-transparent hover:text-red-600 active:text-red-700"
          @click="projectsStore.deleteUserFromProject(user.user.username)">
          <i class="fas fa-trash fa-lg" />
        </div>
      </div>

      <div class="relative">
        <div
          class="flex cursor-pointer flex-row items-center justify-center py-6 text-gray-500 transition-colors hover:bg-purple-200 hover:text-gray-600 active:text-gray-700"
          @click="showUsersSelector = true">
          <i class="fas fa-plus fa-lg" />
        </div>
        <div
          v-if="showUsersSelector"
          class="fixed inset-0 cursor-pointer"
          @click="showUsersSelector = false"></div>
        <UsersSelector
          v-if="showUsersSelector"
          class="absolute left-0 top-12 z-50 w-80"
          :users="availableUsers"
          @selected="(username) => addUserToProject(username)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import { mapState } from 'pinia'
import { useRolesSettingsStore } from '../../stores/settings/roles'
import RoleSelectorDropdown from '../../components/RoleSelectorDropdown.vue'
import UsersSelector from '../../components/UsersSelector.vue'
import { useUsersSettingsStore } from '../../stores/settings/users'
import { User } from '../../types/user'

export default defineComponent({
  components: { RoleSelectorDropdown, UsersSelector },
  data() {
    return {
      showRolesSelector: false,
      showUsersSelector: false,
    }
  },
  computed: {
    ...mapStores(
      useProjectsStore,
      useRolesSettingsStore,
      useUsersSettingsStore
    ),
    ...mapState(useProjectsStore, ['project']),
    availableUsers(): User[] {
      if (!this.project) return []
      return this.usersSettingsStore.users.filter(
        (u) =>
          !this.project!.users.find((pu) => pu.user.username === u.username)
      )
    },
  },
  async mounted() {
    await this.rolesSettingsStore.load()
    await this.usersSettingsStore.load()
  },
  methods: {
    async changeUserRole(username: string, roleName: string) {
      await this.projectsStore.changeUserRole(username, roleName)
    },
    async addUserToProject(username: string) {
      this.showUsersSelector = false
      await this.projectsStore.addUserToProject(username)
    },
  },
})
</script>
