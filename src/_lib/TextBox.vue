<template>
  <input
    class="p-2 border border-gray-300 rounded outline-none text-gray-800 focus:ring-purple-600 focus:ring-2 focus:border-transparent focus:shadow-sm"
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    " />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    type: {
      type: String as PropType<'text' | 'password'>,
      default: 'text',
    },
  },
  emits: ['update:modelValue'],
})
</script>
