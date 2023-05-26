<template>
  <div>
    <div class="flex-1">
      <SavePanel v-if="isModified" @save="save" @revert="reset" />

      <form class="w-full" @input="change" @submit.prevent="save">
        <div class="grid grid-cols-[1fr_3fr] items-center gap-4">
          <div class="text-2xl font-bold">
            {{ usersSettingsStore.user?.username }}
          </div>

          <div class="col-span-2 font-bold">User info</div>
          <label class="">Username</label>
          <TextBox
            :value="usersSettingsStore.user?.username"
            class="bg-gray-100"
            disabled />

          <label class="">Email</label>
          <TextBox v-model="form.email" />

          <label class="">Full name</label>
          <TextBox v-model="form.fullName" />

          <AppButton type="submit" class="hidden">SUBMIT</AppButton>
        </div>
      </form>

      <div class="mt-6">
        <div class="col-span-2 mb-4 font-bold">Danger zone</div>

        <AppButton variant="danger" @click="deleteUser">
          Delete user
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useUsersSettingsStore } from '../../stores/settings/users'
import SavePanel from '../../components/SavePanel.vue'

export default defineComponent({
  components: {
    SavePanel,
  },
  data: () => ({
    form: {
      email: '',
      fullName: '',
    },
    isModified: false,
  }),
  computed: {
    ...mapStores(useUsersSettingsStore),
  },
  async mounted() {
    await this.usersSettingsStore.loadUser(
      this.$route.params.username as string
    )
    this.reset()
  },
  methods: {
    change() {
      this.isModified = true
    },
    async save() {
      this.isModified = false

      await this.usersSettingsStore.updateUser({
        email: this.form.email,
        fullName: this.form.fullName,
      })
    },
    reset() {
      Object.assign(this.form, {
        email: this.usersSettingsStore.user?.email,
        fullName: this.usersSettingsStore.user?.fullName,
      })
      this.isModified = false
    },
    async deleteUser() {
      await this.usersSettingsStore.delete()
    },
  },
})
</script>
