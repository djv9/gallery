<template>
  <div id="app">
    <img src="./assets/logo.png">
    <UserList></UserList>
  </div>
</template>

<script>
// import Hello from './components/Hello'
import UserList from './components/UserList'

export default {
  name: 'app',
  components: {
    UserList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
