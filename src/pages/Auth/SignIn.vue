<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<template>
  <div
    class="w-96 mx-auto -mt-24 bg-gray-50 border border-gray-300 rounded-lg shadow-sm">
    <form class="flex flex-col items-stretch p-8 space-y-6">
      <h1 class="text-center text-2xl text-gray-800">Sign in</h1>
      <TextBox />
      <TextBox />
      <AppButton />
    </form>
  </div>
</template>

<style scoped></style>
