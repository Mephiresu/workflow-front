<template>
  <div class="flex w-full flex-col p-8">
    <SavePanel v-if="isModified" @save="save" @revert="reset" />

    <div class="mb-4 max-w-xl flex-1">
      <form class="w-full" @input="change" @submit.prevent="save">
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <div class="col-span-2 font-bold">General</div>
          <label class="">Name</label>
          <TextBox v-model="form.name" />

          <label class="">Description</label>
          <TextBox v-model="form.description" />

          <AppButton type="submit" class="hidden">SUBMIT</AppButton>
        </div>
      </form>
    </div>

    <div class="mt-6">
      <div class="col-span-2 mb-4 font-bold">Danger zone</div>

      <AppButton variant="danger" @click="deleteProject">
        Delete project
      </AppButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'
import { mapState } from 'pinia'

import SavePanel from '../../components/SavePanel.vue'

export default defineComponent({
  components: {
    SavePanel,
  },
  data() {
    return {
      isModified: false,
      form: {
        name: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapStores(useProjectsStore),
    ...mapState(useProjectsStore, ['project', 'board']),
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
      await this.projectsStore.update({
        description: this.form.description,
        name: this.form.name,
      })
    },
    reset() {
      if (!this.project) return

      Object.assign(this.form, {
        name: this.project.name,
        description: this.project.description,
      })
      this.isModified = false
    },
    deleteProject() {
      if (!this.project) return

      if (
        confirm(
          `Are you sure you want to delete project "${this.project?.name}"?`
        )
      ) {
        this.projectsStore.delete(this.project.id)
      }
    },
  },
})
</script>
