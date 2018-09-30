<template>
  <div>
    <header class="title">城城美业</header>
    <!--<header class="title">测试跨域配置</header>-->
    <div class="login_wrap">
      <el-form ref="form" label-width="80px">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="userName"></el-input>
        </el-form-item>

        <el-form-item label="密码：">
          <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
        </el-form-item>
      </el-form>

    </div>
    <footer class="footer">
      <el-button type="primary" :disabled="!userName || !password " @click="onLogin">登录</el-button>
    </footer>
  </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    getUser: function () {
      return HttpClient.get(`/login?userName=${this.userName}&password=${this.password}`)
    },
    onLogin: function () {
      this.getUser().then((resp) => {
        if (resp.success) {
          try {
            if (localStorage && window.localStorage) {
              localStorage.setItem('employName', resp.data.userName)
              localStorage.setItem('permission', resp.data.permission)
              this.$router.push({name: 'home'})
            } else {
              this.$message.error('手机系统版本太低,升级后再试试')
            }
          } catch (error) {
            this.$message.error('手机系统版本太低,升级后再试试')
          }
        }
      }).catch((error) => {
        this.$message.error(error.message);
      })
    }
  },
  mounted: function () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_wrap{
    height: 300px;
    width: 90%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .title{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .footer{
    width: 90%;
    position: absolute;
    bottom: 10px;
    margin: 0 5%;
  }
  .el-button{
    width: 100%;
  }
</style>
