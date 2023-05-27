<template>
  <div
    class="flex w-full flex-col items-stretch rounded border border-gray-300 bg-white p-2 shadow-lg">
    <div v-if="roles.length === 0" class="text-center text-gray-500">
      No options available
    </div>
    <div
      v-for="role in roles"
      :key="role.name"
      class="flex cursor-pointer flex-row items-center p-1 px-2 text-sm transition-all duration-300 hover:border-purple-300 hover:bg-purple-200"
      @click="$emit('selected', role.name)">
      <h1 class="flex-1">{{ role.name }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Role } from '../types/role'

export default defineComponent({
  props: {
    roles: {
      type: Array as PropType<Role[]>,
      required: true,
    },
  },
  emits: ['selected'],
})
</script>
