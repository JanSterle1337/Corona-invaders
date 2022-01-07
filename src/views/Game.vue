<template>
  <div class="home">
    <Content />
    <LiveStats />
  </div>
</template>

<script>
// @ is an alias to /src
import Content from '../components/Content.vue';
import LiveStats from '../components/LiveStats.vue';

export default {
  name: 'Game',
  components: {
    Content,LiveStats
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: row;
  }
</style>
