<template>
  <div
    class="absolute inset-0 z-50 flex flex-row items-center justify-center bg-black bg-opacity-50"
    @click.self="$emit('close')">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['close'],
})
</script>
