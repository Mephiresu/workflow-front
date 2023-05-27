<template>
  <div
    class="flex flex-col items-stretch rounded border border-gray-300 bg-white p-2 shadow-lg">
    <div class="mb-2 text-center">Add users</div>
    <div v-if="users.length === 0" class="text-center text-gray-500">
      No options available
    </div>
    <div
      v-for="user in users"
      :key="user.username"
      class="flex cursor-pointer flex-row items-center p-1 px-2 text-sm transition-all duration-300 hover:border-purple-300 hover:bg-purple-200"
      @click="$emit('selected', user.username)">
      <h1 class="flex-1">{{ user.fullName }}</h1>
      <span class="flex-1 text-gray-500">[{{ user.username }}]</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { User } from '../types/user'

export default defineComponent({
  props: {
    users: {
      type: Array as PropType<User[]>,
      required: true,
    },
  },
  emits: ['selected'],
})
</script>
