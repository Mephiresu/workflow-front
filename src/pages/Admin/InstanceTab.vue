<template>
  <div class="flex-1">
    <SavePanel v-if="isModified" @save="save" @revert="reset" />

    <form class="w-full" @change="change">
      <div class="grid gap-4 grid-cols-[1fr_3fr] items-center">
        <div class="font-bold col-span-2">Instance</div>
        <label class="">Name</label>
        <TextBox v-model="form.instanceName" />

        <label class="">Administrator Email</label>
        <TextBox v-model="form.administratorEmail" />
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
    ...mapStores(useAppStore),
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
      Object.assign(this.form, {
        instanceName: this.appStore.name,
        administratorEmail: this.appStore.administratorEmail,
      })
      this.isModified = false
    },
  },
})
</script>
