<template>
  <div class="flex flex-col p-8">
    <h1 class="mb-4 text-3xl font-bold">Create Project</h1>
    <div class="max-w-md flex-1">
      <form class="w-full" @submit.prevent="createProject">
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <div class="col-span-2 font-bold">General</div>
          <label class="">Name</label>
          <TextBox v-model="form.name" />

          <label class="">Description</label>
          <TextBox v-model="form.description" />
        </div>
        <div class="mt-6 space-x-4">
          <AppButton type="submit">Create</AppButton>
          <AppButton variant="secondary" @click="$router.back()"
            >Back</AppButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useProjectsStore } from '../../stores/projects/projects'

export default defineComponent({
  data() {
    return {
      form: {
        name: '',
        description: '',
      },
    }
  },
  computed: {
    ...mapStores(useProjectsStore),
  },
  methods: {
    async createProject() {
      await this.projectsStore.create({
        name: this.form.name,
        description: this.form.description,
      })
    },
  },
})
</script>
