<template>
  <button
    :type="type"
    :disabled="disabled"
    class="text-base text-gray-50 rounded-lg hover:shadow-md"
    :class="{
      'bg-gray-100 hover:bg-gray-50 text-gray-700': variant === 'secondary',
      'bg-purple-500 hover:bg-purple-600 ': variant === 'primary',
      'text-sm p-1': size === 'sm',
      'text-base p-2': size === 'md',
    }"
    @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'AppButton',
  props: {
    disabled: {
      type: Boolean,
    },
    variant: {
      type: String as PropType<'primary' | 'secondary'>,
      default: 'primary',
    },
    size: {
      type: String as PropType<'sm' | 'md' | 'lg'>,
      default: 'md',
    },
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button',
    },
  },
  emits: ['click'],
})
</script>
