<template>
  <div>
    <div class="mb-4 flex flex-row items-center">
      <span class="text-xl font-bold">{{ role?.name }}</span>
      <span
        v-if="role?.isGlobal"
        class="ml-2 rounded-md border border-purple-400 px-3 py-1 text-sm font-light text-purple-400"
        >Global</span
      >
      <AppButton
        variant="secondary"
        class="ml-auto"
        :disabled="
          role?.isImmutable || !authStore.hasPermission('roles:delete')
        "
        @click="deleteRole"
        >Delete</AppButton
      >
    </div>
    <div>
      <div v-for="group in groups" :key="group.name" class="">
        <div class="mt-3 font-bold">
          {{ capitalizeFirstLetter(group.name) }}
        </div>
        <div class="divide-y divide-gray-300">
          <div
            v-for="permission in group.permissions"
            :key="permission.name"
            class="flex flex-row items-center justify-between p-2 pl-6 transition-colors hover:bg-purple-200 active:bg-purple-300"
            @click="togglePermission(permission)">
            <div>
              <span>{{ permission.description }}</span>
              <span class="ml-4 text-sm font-light text-gray-500">{{
                permission.operation
              }}</span>
            </div>
            <span>
              <CheckBox
                :model-value="permission.enabled"
                :disabled="
                  role?.isImmutable || !authStore.hasPermission('roles:update')
                " />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'

import { useRolesSettingsStore } from '../../stores/settings/roles'
import { Role } from '../../types/role'
import { Permission } from '../../types/permission'
import { useAuthStore } from '../../stores/auth'

interface PermissionGroup {
  readonly name: string
  readonly permissions: Permission[]
}

export default defineComponent({
  data: () => ({
    role: undefined as Role | undefined,
    permissions: [] as Permission[],
    groups: [] as PermissionGroup[],
  }),
  computed: {
    ...mapStores(useRolesSettingsStore, useAuthStore),
  },
  async mounted() {
    const data = await this.rolesSettingsStore.getRoleWithPermissions(
      this.$route.params.roleName as string
    )
    if (!data) {
      return
    }
    this.role = data.role
    this.permissions = data.permissions.sort(
      (a, b) =>
        a.group.localeCompare(b.group) || a.operation.localeCompare(b.operation)
    )
    this.groups = this.permissions.reduce(
      (groups: PermissionGroup[], cur: Permission) => {
        let group = groups.find((g) => g.name === cur.group)
        if (!group) {
          group = {
            name: cur.group,
            permissions: [],
          }
          groups.push(group)
        }
        group.permissions.push(cur)
        return groups
      },
      []
    )
  },
  methods: {
    capitalizeFirstLetter(value: string) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    async togglePermission(permission: Permission) {
      if (
        !this.role ||
        this.role.isImmutable ||
        !this.authStore.hasPermission('roles:update')
      ) {
        return
      }

      permission.enabled = !permission.enabled

      await this.rolesSettingsStore.togglePermission(
        this.role.name,
        permission.name,
        permission.enabled
      )
    },
    async deleteRole() {
      if (!this.role) {
        return
      }

      await this.rolesSettingsStore.delete(this.role.name)
    },
  },
})
</script>
