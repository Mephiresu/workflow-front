<template>
  <div
    class="flex w-1/3 min-w-max flex-col items-stretch rounded-lg border border-gray-400 bg-white p-2 shadow-md">
    <div class="mb-2 border-b border-gray-300 pb-2 text-2xl">Switch Board</div>
    <div
      v-for="board in project.boards"
      :key="board.id"
      class="p-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-200"
      @click="switchBoard(board)">
      <h1 class="text-xl font-bold">{{ board.name }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '../types/project'
import { Board } from '../types/board'

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  emits: ['switched'],
  methods: {
    switchBoard(board: Board) {
      this.$router.push({
        query: { ...this.$route.query, board: board.id },
      })
      this.$emit('switched')
    },
  },
})
</script>
