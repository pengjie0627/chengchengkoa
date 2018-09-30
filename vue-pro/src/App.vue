<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted: function() {
    this.orition()
  },
  methods: {
    orition: function () {
      try {
        if (window.orientation === 0 || window.orientation === 180) {
          // $("body").attr("class", "portrait");
          document.getElementById('bodyRef').setAttribute('class', 'portrait')
          orientation = 'portrait'
          return false
        }
        else if (window.orientation === 90 || window.orientation === -90) {
          // $("body").attr("class", "landscape")
          document.getElementById('bodyRef').setAttribute('class', 'landscape')
          orientation = 'landscape'
          return false
        }
      } catch(error) {
      }
    }
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

  }
  @media all and (orientation: portrait){

  }
</style>
