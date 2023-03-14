<template>
  <input
    class="block p-2 border border-gray-300 rounded outline-none focus:ring-purple-600 focus:ring-2 focus:border-transparent transition-colors duration-200"
    :class="{
      'text-gray-500 hover:text-gray-400': disabled,
      'text-purple-600 hover:text-purple-500 active:text-purple-400': !disabled,
    }"
    type="checkbox"
    :checked="modelValue"
    :disabled="disabled"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).checked)
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
})
</script>
