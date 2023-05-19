<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-lg text-base text-gray-50 hover:shadow-md"
    :class="{
      'bg-gray-100 text-gray-700 hover:bg-gray-50': variant === 'secondary',
      'bg-purple-500 hover:bg-purple-600 ': variant === 'primary',
      'bg-red-600 hover:bg-red-500': variant === 'danger',
      'bg-gray-300 text-gray-700 hover:bg-gray-300 hover:shadow-none': disabled,
      'p-1 text-sm': size === 'sm',
      'p-2 text-base': size === 'md',
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
      type: String as PropType<'primary' | 'secondary' | 'danger'>,
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
