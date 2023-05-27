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
          <TextBox
            v-model="form.email"
            :disabled="!authStore.hasPermission('users:update')" />

          <label class="">Full name</label>
          <TextBox
            v-model="form.fullName"
            :disabled="!authStore.hasPermission('users:update')" />

          <label class="">Role</label>
          <div class="relative">
            <button
              :disabled="!authStore.hasPermission('users:update')"
              class="flex w-fit cursor-pointer flex-row items-center rounded bg-gray-100 py-2 px-4 text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 active:shadow"
              @click="showRolesSelector = true">
              {{ usersSettingsStore.user?.roleName }}
              <i class="fas fa-xs fa-chevron-down ml-2" />
            </button>
            <div
              v-if="showRolesSelector"
              class="fixed inset-0"
              @click="showRolesSelector = false"></div>
            <RolesSelector
              v-if="showRolesSelector"
              class="absolute z-50 w-1/2"
              :roles="
                rolesSettingsStore.globalRoles.filter(
                  (r) => r.name !== usersSettingsStore.user?.roleName
                )
              "
              @selected="updateUserRole" />
          </div>

          <AppButton type="submit" class="hidden">SUBMIT</AppButton>
        </div>
      </form>

      <div v-if="authStore.hasPermission('users:delete')" class="mt-6">
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
import RolesSelector from '../../components/RolesSelector.vue'
import { useRolesSettingsStore } from '../../stores/settings/roles'
import { useAuthStore } from '../../stores/auth'

export default defineComponent({
  components: {
    SavePanel,
    RolesSelector,
  },
  data: () => ({
    form: {
      email: '',
      fullName: '',
    },
    isModified: false,
    showRolesSelector: false,
  }),
  computed: {
    ...mapStores(useUsersSettingsStore, useRolesSettingsStore, useAuthStore),
  },
  async mounted() {
    await this.usersSettingsStore.loadUser(
      this.$route.params.username as string
    )
    this.reset()
    await this.rolesSettingsStore.load()
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
    async updateUserRole(roleName: string) {
      this.showRolesSelector = false
      await this.usersSettingsStore.updateUserRole({ roleName })
    },
  },
})
</script>
