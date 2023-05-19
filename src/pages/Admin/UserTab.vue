<template>
  <div>
    <div class="mb-4 flex flex-row items-center">
      <span class="text-xl font-bold">{{ user?.username }}</span>
      <AppButton variant="secondary" class="ml-auto" @click="deleteUser"
        >Delete</AppButton
      >
    </div>
    <div v-if="user">
      <TextBox
        v-model="user.fullName"
        placeholder="User fullname"
        @click="changed = true" />
      <TextBox
        v-model="user.email"
        placeholder="User email"
        @click="changed = true" />
    </div>
    <div class="mb-4 flex flex-row items-center justify-end">
      <AppButton variant="secondary" class="ml-auto" @click="updateUser"
        >Save</AppButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { User } from '../../types/user'
import { useUsersSettingsStore } from '../../stores/settings/users'

export default defineComponent({
  data: () => ({
    user: undefined as User | undefined,
    changed: false,
  }),
  computed: {
    ...mapStores(useUsersSettingsStore),
  },
  async mounted() {
    const user = await this.usersSettingsStore.getUser(
      this.$route.params.username as string
    )
    if (!user) {
      return
    }
    this.user = user
  },
  methods: {
    async deleteUser() {
      if (!this.user) {
        return
      }

      await this.usersSettingsStore.delete(this.user.username)
    },
    async updateUser() {
      if (!this.user) {
        return
      }

      this.changed = false
      await this.usersSettingsStore.updateUser(this.user, this.changed)
    },
  },
})
</script>
