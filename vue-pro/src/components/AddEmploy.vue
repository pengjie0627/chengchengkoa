<template>
  <div>
    <div>
      <el-button size="mini" class="back" @click="onBack">返回</el-button>
      <header class="title">{{type ==='add' ? '新增' : '编辑'}}员工信息</header>
    </div>
    <el-form style="margin-right: 10px; margin-top: 30px;" :style="{height: tableHeight, overflow: 'auto'}" status-icon ref="ruleForm2" label-width="80px" class="demo-ruleForm">
      <el-form-item label="员工姓名" prop="pass">
        <el-input maxLength="11" v-model="name" placeholder="请输入员工姓名"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="pass">
        <el-input maxLength="11" v-model="mobile" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="入职日期" prop="checkPass">
        <!--<el-input v-model="time"></el-input>-->
        <el-date-picker
          v-model="dateTime"
          value-format="yyyy-MM-dd"
          placeholder="请选择入职日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="登录密码" prop="age">
        <el-input maxLength="15" v-model="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="备注信息" prop="age">
        <el-input v-model="remark" maxLength=254 placeholder="请输入备注信息"></el-input>
      </el-form-item>
      <el-form-item label="登录权限" prop="age">
        <el-switch v-model="auth"></el-switch>&nbsp;&nbsp;该员工拥有登录权限
      </el-form-item>
      <el-form-item label="查看权限" prop="age">
        <el-switch v-model="checked"></el-switch>&nbsp;&nbsp;该员工拥有查看客户信息权限
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ImgUpload from '@/components/cmp/ImgUpload.vue'
  import HttpClient from 'http/httpClient.js'
  export default {
    components: {ImgUpload},
    mounted: function() {
      this.tableHeight = (document.documentElement.clientHeight - 50)+'px'
      this.type = this.$route.query.type
      if (this.type === 'edit') {
        this.getCustomDtl()
      }
    },
    data() {
      return {
        name: '',
        password: '',
        mobile: '',
        dateTime: '',
        remark: '',
        tableHeight: 0,
        customList: [],
        type: '',
        auth: false,
        checked: false
      };
    },
    methods: {
      submitForm: function () {
        if (!this.name) {
          this.$message.error('员工姓名不能为空')
          return
        }
        if (!this.mobile) {
          this.$message.error('手机号码不能为空')
          return
        }
        if (!this.dateTime) {
          this.$message.error('入职日期不能为空')
          return
        }
        if (!this.password) {
          this.$message.error('登录密码不能为空')
          return
        }
        if (!this.remark) {
          this.$message.error('备注信息不能为空')
          return
        }
        let qs = require('qs');
        if (this.type === 'add') {
          HttpClient.post('/employSave', qs.stringify(
            {
              name: this.name,
              mobile: this.mobile,
              dateTime: this.dateTime,
              password: this.password,
              remark: this.remark,
              auth: this.auth ? 1 : 0,
              checked: this.checked ? 1 : 0
            })).then((resp) => {
            if (resp.success) {
              this.$message.success('员工资料保存成功')
              this.$router.push({name:'employDtl', query: {employ: JSON.stringify(resp.data), type: 'employAdd'}})
            }
          })
        } else {
          let id = this.$route.query.id
          HttpClient.post('/employEdit', qs.stringify(
            {
              name: this.name,
              mobile: this.mobile,
              dateTime: this.dateTime,
              password: this.password,
              remark: this.remark,
              auth: this.auth ? 1 : 0,
              checked: this.checked ? 1 : 0,
              id: id
            })).then((resp) => {
            if (resp.success) {
              this.$message.success('客户资料保存成功')
              this.$router.push({name:'employDtl', query: {employ: JSON.stringify(resp.data), type: 'customAdd'}})
            }
          })
        }
      },
      resetForm: function () {
        this.name = ''
        this.mobile = ''
        this.dateTime = ''
        this.password = ''
        this.remark = ''
        this.auth = false
        this.checked = false
      },
      onBack: function () {
        this.$router.back()
      },
      getCustomDtl: function () {
        let mobile = this.$route.query.mobile
        let id = this.$route.query.id
        HttpClient.get(`/employDtl?mobile=${mobile}&&id=${id}`).then((resp) => {
          if (resp.success) {
            this.customList = resp.data
            this.name = this.customList[0].name
            this.mobile = this.customList[0].mobile
            this.password = this.customList[0].password
            this.dateTime = this.customList[0].dateTime
            this.remark = this.customList[0].remark
            this.auth = Boolean(this.customList[0].auth)
            this.checked = Boolean(this.customList[0].checked)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .title{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
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
