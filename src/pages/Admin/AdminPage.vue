<template>
  <div class="flex flex-col p-8">
    <h1 class="text-3xl font-bold mb-4">Settings</h1>
    <div class="w-full p-4 space-x-6 border-b border-gray-300 mb-4">
      <RouterLink
        v-for="tab in menu"
        :key="tab.path"
        :to="tab.path"
        :active-class="'bg-purple-300 hover:bg-purple-400 text-gray-900'"
        class="text-lg text-gray-600 px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-100 transition-colors">
        <i class="fas mr-1" :class="`fa-${tab.icon}`" />
        {{ tab.title }}
      </RouterLink>
    </div>
    <RouterView class="flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      menu: [
        { title: 'Instance', icon: 'house', path: '/admin/instance' },
        { title: 'Users', icon: 'users', path: '/admin/users' },
        {
          title: 'Access Management',
          icon: 'key',
          path: '/admin/access-management',
        },
      ],
    }
  },
})
</script>
