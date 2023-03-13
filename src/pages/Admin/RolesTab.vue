<template>
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
      <div class="text-sm font-light text-gray-500">{{ role.description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import { useRolesSettingsStore } from '../../stores/settings/roles'

export default defineComponent({
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
  },
})
</script>
