<template>
  <div class="employ-wrap">
    <div>
      <el-button size="mini" class="back" @click="onBack">返回</el-button>
      <header class="mbr-list">员工详情</header>
    </div>
    <el-form style="margin-left: 30px; margin-top: 30px;" :style="{height: tableHeight, overflow: 'auto'}" status-icon ref="ruleForm2" label-width="85px" class="demo-ruleForm">
      <el-form-item label="员工姓名：" prop="pass">
        <div>{{employName}}</div>
      </el-form-item>
      <el-form-item label="手机号码：" prop="checkPass">
        <div>{{employMobile}}</div>
      </el-form-item>
      <el-form-item label="查看权限：" prop="age">
        <div><el-switch :disabled="employName === 'admin'" v-model="checkPermission" @change="onCheckPermissionChange"></el-switch>&nbsp;&nbsp;{{checkPermission ? '该员工有查看客户信息权限' : '该员工无查看客户信息权限'}}</div>
      </el-form-item>
      <el-form-item label="登录权限：" prop="age">
        <div><el-switch :disabled="employName === 'admin'" v-model="loginPermission" @change="onLoginPermissionChange"></el-switch>&nbsp;&nbsp;{{loginPermission ? '该员工有登录权限' : '该员工无登录权限'}}</div>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import HttpClient from 'http/httpClient.js'
export default {
  mounted: function() {
    let employ = JSON.parse(this.$route.query.employ)
    this.employName = employ.name
    this.employMobile = employ.mobile
    this.checkPermission = Boolean(employ.checked)
    this.loginPermission = Boolean(employ.auth)
    this.tableHeight = (document.documentElement.clientHeight - 50)+'px'
  },
  data () {
    return {
      checkPermission: false,
      loginPermission: false,
      employMobile: '',
      employName: '',
      tableHeight: 0
    }
  },
  methods: {
    onCheckPermissionChange: function() {
      if (this.checkPermission) {
        let qs = require('qs');
        HttpClient.post('/employAuth', qs.stringify({permissionType: 'check',employMobile: this.employMobile, code: 1})).then((resp) => {
          if (resp.success) {
            this.$message.success('授权成功')
          }
        })
      } else {
        let qs = require('qs');
        HttpClient.post('/employAuth', qs.stringify({permissionType: 'check',employMobile: this.employMobile, code: 0})).then((resp) => {
          if (resp.success) {
            this.$message.success('取消成功')
          }
        })
      }
    },
    onLoginPermissionChange: function() {
      if (this.loginPermission) {
        let qs = require('qs');
        HttpClient.post('/employAuth', qs.stringify({permissionType: 'login',employMobile: this.employMobile, code: 1})).then((resp) => {
          if (resp.success) {
            this.$message.success('授权成功')
          }
        })
      } else {
        let qs = require('qs');
        HttpClient.post('/employAuth', qs.stringify({permissionType: 'login',employMobile: this.employMobile, code: 0})).then((resp) => {
          if (resp.success) {
            this.$message.success('取消成功')
          }
        })
      }
    },
    onBack: function () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .employ-wrap{
    background: white;
    height: 100%;
  }
  .mbr-list{
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
</style>
