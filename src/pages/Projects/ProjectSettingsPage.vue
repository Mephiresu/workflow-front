<template>
  <div class="flex flex-col p-8">
    <SavePanel v-if="isModified" @save="save" @revert="reset" />

    <div class="mb-6">
      <AppButton variant="danger" @click="deleteProject">Delete</AppButton>
    </div>

    <div class="max-w-md flex-1">
      <form class="w-full" @change="change" @submit.prevent="">
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <div class="col-span-2 font-bold">General</div>
          <label class="">Name</label>
          <TextBox v-model="form.name" />

          <label class="">Description</label>
          <TextBox v-model="form.description" />
        </div>
      </form>
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
    ...mapState(useProjectsStore, ['project']),
  },
  mounted() {
    this.reset()
  },
  methods: {
    change() {
      this.isModified = true
    },
    save() {
      console.log(this.form)
      this.isModified = false
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
          `Are you sure you want to delete project ${this.project?.name}?`
        )
      ) {
        this.projectsStore.delete(this.project.id)
      }
    },
  },
})
</script>
