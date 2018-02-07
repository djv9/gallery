<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Gallery></Gallery>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Gallery from './components/Gallery'

export default {
  name: 'app',
  components: {
    Gallery
  }
}
</script>

<style>
#app {
  width: 80%;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
