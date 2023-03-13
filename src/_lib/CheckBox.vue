<template>
  <input
    class="block p-2 border border-gray-300 rounded outline-none text-purple-600 focus:ring-purple-600 focus:ring-2 focus:border-transparent transition-colors duration-200"
    type="checkbox"
    :checked="modelValue"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    " />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
})
</script>
