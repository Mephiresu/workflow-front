<template>
  <div class="flex w-full flex-col p-8">
    <div class="w-full space-x-6 border-b border-gray-300 p-4">
      <RouterLink
        :to="`/projects/${project!.id}`"
        class="rounded-md bg-gray-200 px-5 py-2 text-lg text-gray-600 transition-colors hover:bg-gray-100">
        <i class="fas fa-arrow-left fa-lg" />
      </RouterLink>
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
import { mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useProjectsStore } from '../../stores/projects/projects'

export default defineComponent({
  data() {
    return {
      menu: [
        { title: 'Project settings', icon: 'house', path: 'project' },
        { title: 'Board settings', icon: 'clapperboard', path: 'board' },
        { title: 'Users', icon: 'users', path: 'users' },
      ],
    }
  },
  computed: {
    ...mapState(useProjectsStore, ['project']),
  },
})
</script>
