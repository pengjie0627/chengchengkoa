<template>
  <div id="app">
    <div class="horizon">
      <router-view/>
    </div>
    <div class="vertical">使用竖屏体验效果更好</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function() {
  },
  methods: {
  }
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
  @media all and (orientation: landscape){
    .vertical{
      display: none;
    }
    .horizon{
      display: block;
    }
  }
  @media all and (orientation: portrait){
    .vertical{
      display: block;
      color: red;
      font-size: 20px;
    }
    .horizon{
      display: none;
    }
  }
</style>
