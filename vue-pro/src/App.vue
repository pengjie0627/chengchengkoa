<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  * {
    font-family: Microsoft YaHei;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-size: 14px;
    background: #F0F2F5;
  }
</style>
