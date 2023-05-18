<template>
  <input
    class="rounded border border-gray-300 p-2 text-gray-800 outline-none focus:border-transparent focus:shadow-sm focus:ring-2 focus:ring-purple-600"
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
