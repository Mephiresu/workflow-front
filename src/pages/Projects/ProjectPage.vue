<template>
  <div class="flex flex-col p-8">PROJECT: {{ $route.params.projectId }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
})
</script>
