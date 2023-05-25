<template>
  <div class="flex w-full flex-col p-8">
    <SavePanel v-if="isModified" @save="save" @revert="reset" />

    <div class="mb-4 max-w-xl flex-1">
      <form class="w-full" @input="change" @submit.prevent="save">
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <div class="col-span-2 font-bold">Board</div>
          <label class="">Name</label>
          <TextBox v-model="form.name" />

          <AppButton type="submit" class="hidden">SUBMIT</AppButton>
        </div>
      </form>
    </div>

    <div v-if="board" class="max-w-xl flex-1">
      <div class="w-full">
        <div class="col-span-2 font-bold">Stages</div>
        <draggable
          v-model="board.stages"
          group="test"
          class="my-4 w-full divide-y divide-gray-300"
          item-key="id"
          @end="handleStageReorder">
          <template #item="{ element }">
            <div
              :key="element.id"
              class="group flex w-full cursor-pointer flex-row items-center justify-between px-4 py-2 transition-all duration-300 hover:border-purple-300 hover:bg-purple-200">
              {{ element.name }}
              <div
                class="h-6 w-6 rounded text-center text-transparent transition-colors group-hover:text-gray-400"
                @click="deleteStage(element.id)">
                <i
                  class="fas fa-trash fa-sm transition-colors hover:text-red-500" />
              </div>
            </div>
          </template>
          <template #footer>
            <div
              class="w-full px-4 py-2 text-gray-400 transition-all duration-300 hover:border-purple-300 hover:bg-purple-200 hover:text-gray-600"
              @click="showCreateStageModal = true">
              <i class="fas fa-plus" /> Add stage
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="mt-6">
      <div class="col-span-2 mb-4 font-bold">Danger zone</div>

      <AppButton variant="danger" @click="deleteBoard">
        Delete board
      </AppButton>
    </div>

    <ModalWindow
      v-if="showCreateStageModal"
      @close="showCreateStageModal = false">
      <div
        class="w-1/3 min-w-max rounded-lg border border-gray-400 bg-white p-2 shadow-md">
        <form
          class="flex flex-col items-stretch space-y-6 p-8"
          @submit.prevent="createStage">
          <h1 class="text-center text-2xl text-gray-800">New stage</h1>
          <TextBox v-model="stageForm.name" placeholder="Stage name" />

          <div class="flex flex-row justify-center space-x-6">
            <AppButton type="submit" variant="primary" class="w-32"
              >Create</AppButton
            >
            <AppButton
              type="button"
              variant="secondary"
              class="w-32"
              @click="showCreateStageModal = false"
              >Cancel</AppButton
            >
          </div>
        </form>
      </div>
    </ModalWindow>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import { mapState } from 'pinia'

import ModalWindow from '../../components/ModalWindow.vue'
import SavePanel from '../../components/SavePanel.vue'
import draggable from 'vuedraggable'

export default defineComponent({
  components: {
    ModalWindow,
    SavePanel,
    draggable,
  },
  data() {
    return {
      showCreateStageModal: false,
      stageForm: {
        name: '',
      },
      isModified: false,
      form: {
        name: '',
      },
    }
  },
  computed: {
    ...mapStores(useProjectsStore),
    ...mapState(useProjectsStore, ['project', 'board']),
  },
  watch: {
    board() {
      this.reset()
    },
  },
  mounted() {
    this.reset()
  },
  methods: {
    change() {
      this.isModified = true
    },
    async save() {
      this.isModified = false
    },
    reset() {
      if (!this.board) return

      Object.assign(this.form, {
        name: this.board.name,
      })
      this.isModified = false
    },
    deleteBoard() {
      console.log('Delete board')
    },
    deleteStage(stageId: number) {
      if (!this.board) return

      const stage = this.board.stages.find((s) => s.id === stageId)

      if (!stage) return

      if (confirm(`Are you sure you want to delete stage "${stage.name}"?`)) {
        this.projectsStore.deleteStage(stageId)
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async handleStageReorder(e: any) {
      console.log(`from ${e.oldIndex} to ${e.newIndex}`)

      if (!this.board) return

      const stageId = this.board.stages[e.newIndex].id
      const leadingStageId =
        e.newIndex > 0 ? this.board.stages[e.newIndex - 1].id : undefined

      await this.projectsStore.moveStage(stageId, leadingStageId)
    },
    createStage() {
      this.showCreateStageModal = false

      this.projectsStore.createStage({
        name: this.stageForm.name,
      })

      this.stageForm = {
        name: '',
      }
    },
  },
})
</script>
