<template>
  <div
    class="absolute z-50 inset-0 bg-black bg-opacity-50 flex flex-row items-center justify-center"
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
