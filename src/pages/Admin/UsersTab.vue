<template>
  <div><AppButton class="w-32">New user</AppButton></div>
</template>

<script lang="ts">
import { mapStores } from 'pinia'
import { defineComponent } from 'vue'
import { useUsersSettingsStore } from '../../stores/settings/users'

export default defineComponent({
  computed: {
    ...mapStores(useUsersSettingsStore),
  },
})
</script>
