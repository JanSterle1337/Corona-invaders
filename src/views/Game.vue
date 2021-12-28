<template>
  <div class="home">
    <Content />
    <Stats />
  </div>
</template>

<script>
// @ is an alias to /src
import Content from '../components/Content.vue';
import Stats from '../components/Stats.vue';

export default {
  name: 'Game',
  components: {
    Content,Stats
  }
}
</script>

<style>
  .home {
    display: flex;
    flex-direction: row;
  }
</style>
