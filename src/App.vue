<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/game">Game</router-link>
    <router-link to="/settings">Settings</router-link>
    <router-link to="/analytics">Analytics</router-link>
  </div>
  <router-view/>
</template>

<style>
html,body {
  height: 100%;
  width: 100%;
  margin: 0 0 0 0;
  padding: 0 0 0 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}

#nav {
  height: 10%;
  background: rgb(34, 148, 255);
  display: flex;
  align-items: center;
  justify-content:space-around;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  font-size: 30px;
}

#nav a.router-link-exact-active {
  color: white;
}
</style>
