<template>
  <div class="flex-1">
    <SavePanel v-if="isModified" @save="save" @revert="reset" />

    <form class="w-full" @input="change" @submit.prevent="save">
      <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
        <div class="col-span-2 font-bold">Instance</div>
        <label class="">Name</label>
        <TextBox
          v-model="form.instanceName"
          :disabled="!authStore.hasPermission('instance:update')" />

        <label class="">Administrator Email</label>
        <TextBox
          v-model="form.administratorEmail"
          :disabled="!authStore.hasPermission('instance:update')" />

        <AppButton type="submit" class="hidden">SUBMIT</AppButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextBox from '../../_lib/TextBox.vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../../stores/app'
import SavePanel from '../../components/SavePanel.vue'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  components: { TextBox, SavePanel },
  data: () => ({
    form: {
      instanceName: '',
      administratorEmail: '',
    },
    isModified: false,
  }),
  computed: {
    ...mapStores(useAppStore, useAuthStore),
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

      await this.appStore.updateInstance(
        this.form.instanceName,
        this.form.administratorEmail
      )
    },
    reset() {
      Object.assign(this.form, {
        instanceName: this.appStore.name,
        administratorEmail: this.appStore.administratorEmail,
      })
      this.isModified = false
    },
  },
})
</script>
