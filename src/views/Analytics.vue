<template>
  <div class="analytics">
      <GameStatistics />
  </div>
</template>

<script>

import GameStatistics from '../components/GameStatistics.vue';

export default {
    name: 'Analytics',
    components: {
      GameStatistics,
    }
}
</script>

<style>
    .analytics {
      width: 100%;
      height: 100%;
      background: white;
    }
</style>