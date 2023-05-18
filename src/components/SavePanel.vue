<template>
  <div
    class="fixed bottom-0 left-0 right-0 space-x-4 border-t border-gray-300 bg-gray-200 p-4">
    <AppButton class="w-20" size="sm" @click="$emit('save')">Save</AppButton>
    <AppButton
      class="w-20"
      size="sm"
      variant="secondary"
      @click="$emit('revert')"
      >Revert</AppButton
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ emits: ['save', 'revert'] })
</script>
