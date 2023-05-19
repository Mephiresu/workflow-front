<template>
  <div
    v-if="board"
    class="flex flex-row items-stretch justify-center divide-x divide-gray-300 py-4">
    <div v-for="stage in board.stages" :key="stage.id" class="flex-1 px-2 pb-4">
      <h1 class="mb-4 text-lg">{{ stage.name }}</h1>
      <div class="flex flex-col"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import { mapState } from 'pinia'

export default defineComponent({
  computed: {
    ...mapStores(useProjectsStore),
    ...mapState(useProjectsStore, ['board']),
  },
})
</script>
