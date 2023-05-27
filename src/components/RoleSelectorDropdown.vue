<template>
  <div class="relative">
    <div
      class="flex w-fit cursor-pointer flex-row items-center rounded bg-gray-100 py-2 px-4 text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 active:shadow"
      @click="showRolesSelector = true">
      {{ currentRole }}
      <i class="fas fa-xs fa-chevron-down ml-2" />
    </div>
    <div
      v-if="showRolesSelector"
      class="fixed inset-0"
      @click="showRolesSelector = false"></div>
    <RolesSelector
      v-if="showRolesSelector"
      class="absolute right-0 top-10 z-50 w-56"
      :roles="roles.filter((r) => r.name !== currentRole)"
      @selected="selected" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Role } from '../types/role'
import RolesSelector from './RolesSelector.vue'

export default defineComponent({
  components: { RolesSelector },
  props: {
    roles: {
      type: Array as PropType<Role[]>,
      required: true,
    },
    currentRole: {
      type: String,
      required: true,
    },
  },
  emits: ['selected'],
  data() {
    return {
      showRolesSelector: false,
    }
  },
  methods: {
    selected(role: string) {
      this.$emit('selected', role)
      this.showRolesSelector = false
    },
  },
})
</script>
