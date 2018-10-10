<template>
  <div>
    <el-button size="mini" class="back" @click="onBack">返回</el-button>
    <header class="mbr-list">员工群聊</header>
    <div ref="content" :style="{height: tableHeight, overflow: 'auto'}"></div>
    <footer class="footer">
      <el-row>
        <el-col :span="20">
          <el-input placeholder="发送信息" v-model="message"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="send" size="mini" type="primary" @click="onSendMessage">发送</el-button>
        </el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.tableHeight = (document.documentElement.clientHeight - 110)+'px'
    },
    sockets:{
      connect: function(){
        this.id = this.$socket.id
      },
      news: function(val){
        console.log(val)
        this._createDiv(val)
      },
      join: function (val) {
        console.log(val)
      },
      leave: function (val) {
        console.log(val)
      }
    },
    data() {
      return {
        id: '',
        message: '',
        tableHeight: 0
      }
    },
    methods: {
      onSendMessage: function() {
        if (this.message) {
          this.$socket.emit('news', {message: this.message});
        }
      },
      onBack: function () {
        this.$router.back()
      },
      _createDiv: function (val) {
        let oDiv = document.createElement('div')
        let img = document.createElement('img')
        img.style.borderRadius = '100%'
        img.style.width = '30px'
        img.style.height = '30px'
        img.style.marginTop = '10px'
        img.src = 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=a6a4728c4aa98226accc2375ebebd264/060828381f30e924f5f96cc845086e061c95f7ee.jpg'
        oDiv.appendChild(img)
        let oSpan = document.createElement('span')
        oSpan.style.height = '30px'
        oSpan.style.lineHeight = '30px'
        oSpan.style.backgroundColor = 'white'
        oSpan.style.padding = '0 10px'
        oSpan.style.borderRadius = '10px'
        oSpan.style.marginTop = '10px'
        oSpan.style.marginLeft = '5px'
        oSpan.style.position = 'relative'
        oSpan.style.bottom = '10px'
        oSpan.style.wordBreak = 'break-all'
        oSpan.innerText = val.msg
        oDiv.appendChild(oSpan)
        this.$refs.content.appendChild(oDiv)
        this.message = ''
      }
    }
  }
</script>

<style scoped>
  .mbr-list{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .title{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .back{
    top: 12px;
    position: absolute;
    left: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 15px;
  }
  .footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .send{
    margin: 5px;
  }
</style>
