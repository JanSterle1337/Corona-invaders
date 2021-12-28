<template>
  <div class="settings">
      <h1>Settings</h1>
      <PlayerSettings />
  </div>
</template>

<script>

import PlayerSettings from '../components/PlayerSettings.vue'

export default {
    name: 'Settings',
    components: {
      PlayerSettings
    }
}
</script>

<style>
  .settings {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
  }
</style>