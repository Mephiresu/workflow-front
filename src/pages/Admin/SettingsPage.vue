<template>
  <div class="flex flex-col p-8">
    <h1 class="mb-4 text-3xl font-bold">Settings</h1>
    <div class="mb-4 w-full space-x-6 border-b border-gray-300 p-4">
      <RouterLink
        v-for="tab in menu"
        :key="tab.path"
        :to="tab.path"
        :active-class="'bg-purple-300 hover:bg-purple-400 text-gray-900'"
        class="rounded-md bg-gray-200 px-5 py-2 text-lg text-gray-600 transition-colors hover:bg-gray-100">
        <i class="fas mr-1" :class="`fa-${tab.icon}`" />
        {{ tab.title }}
      </RouterLink>
    </div>
    <RouterView class="flex-1" />
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  data() {
    return {}
  },
  computed: {
    ...mapStores(useAuthStore),
    menu() {
      return [
        { title: 'Instance', icon: 'house', path: '/settings/instance' },
        ...(this.authStore.hasPermission('users:read')
          ? [{ title: 'Users', icon: 'users', path: '/settings/users' }]
          : []),
        ...(this.authStore.hasPermission('roles:read')
          ? [
              {
                title: 'Roles',
                icon: 'hammer',
                path: '/settings/roles',
              },
            ]
          : []),
      ]
    },
  },
})
</script>
