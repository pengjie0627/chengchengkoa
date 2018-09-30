<template>
  <div class="employ-wrap">
    <div>
      <el-button size="mini" class="back" @click="onBack">返回</el-button>
      <header class="mbr-list">员工详情</header>
      <el-button size="mini" class="edit" @click="onEdit">编辑</el-button>
    </div>
    <el-form style="margin-left: 30px; margin-top: 30px;" :style="{height: tableHeight, overflow: 'auto'}" status-icon ref="ruleForm2" label-width="85px" class="demo-ruleForm">
      <el-form-item label="员工姓名：" prop="pass">
        <div>{{employName}}</div>
      </el-form-item>
      <el-form-item label="手机号码：" prop="checkPass">
        <div>{{employMobile}}</div>
      </el-form-item>
      <el-form-item label="入职时间：" prop="checkPass">
        <div>{{employTime}}</div>
      </el-form-item>
      <el-form-item label="登录密码：" prop="checkPass">
        <div>{{employPassword}}</div>
      </el-form-item>
      <el-form-item label="备注信息：" prop="checkPass">
        <div>{{employRemark}}</div>
      </el-form-item>
      <el-form-item label="查看权限：" prop="age">
        <div>{{checkPermission ? '该员工有查看客户信息权限' : '该员工无查看客户信息权限'}}</div>
      </el-form-item>
      <el-form-item label="登录权限：" prop="age">
        <div>{{loginPermission ? '该员工有登录权限' : '该员工无登录权限'}}</div>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import HttpClient from 'http/httpClient.js'
export default {
  mounted: function() {
    let employ = JSON.parse(this.$route.query.employ)
    this.id = employ.id
    this.employName = employ.name
    this.employMobile = employ.mobile
    this.employTime = employ.dateTime
    this.employPassword = employ.password
    this.employRemark = employ.remark
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
      tableHeight: 0,
      employTime: '',
      employPassword: '',
      employRemark: '',
      id: ''
    }
  },
  methods: {
    onBack: function () {
      this.$router.back()
    },
    onEdit: function () {
      this.$router.push({name: 'addEmploy', query: {id: this.id, mobile: this.employMobile, type: 'edit'}})
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
  .edit{
    top: 12px;
    position: absolute;
    right: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 15px;
   }
</style>
