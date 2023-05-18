<template>
  <div
    class="flex w-1/3 min-w-max flex-col items-stretch rounded-lg border border-gray-400 bg-white p-4 shadow-md">
    <div class="mb-2 border-b border-gray-300 pb-2 text-2xl">Switch Board</div>
    <div
      v-for="board in project.boards"
      :key="board.id"
      class="flex flex-row items-center justify-between p-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-200"
      @click="switchBoard(board)">
      <h1
        class="text-xl"
        :class="{
          'font-bold': board.id === projectsStore.board?.id,
        }">
        {{ board.name }}
      </h1>
      <span v-if="board.isDefault" class="italic text-gray-500">default</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Project } from '../types/project'
import { Board } from '../types/board'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../stores/projects/projects'

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  emits: ['switched'],
  computed: { ...mapStores(useProjectsStore) },
  methods: {
    switchBoard(board: Board) {
      this.$emit('switched', board.id)
    },
  },
})
</script>
