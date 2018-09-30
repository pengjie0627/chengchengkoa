<template>
    <div>
      <div>
        <el-button size="mini" class="back" @click="onBack">返回</el-button>
        <header class="title">{{type ==='add' ? '新增' : '编辑'}}客户信息</header>
      </div>
      <el-form style="margin-right: 10px; margin-top: 30px;" :style="{height: tableHeight, overflow: 'auto'}" status-icon ref="ruleForm2" label-width="80px" class="demo-ruleForm">
        <el-form-item label="客户姓名" prop="pass">
          <el-input maxLength="11" v-model="name" placeholder="请输入客户名称，非必填"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="pass">
          <el-input maxLength="11" v-model="mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="剪发日期" prop="checkPass">
          <!--<el-input v-model="time"></el-input>-->
          <el-date-picker
            v-model="time"
            value-format="yyyy-MM-dd"
            placeholder="请选择剪发日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="备注信息" prop="age">
          <el-input v-model="remark" maxLength=254 placeholder="请输入备注信息"></el-input>
        </el-form-item>
        <el-form-item label="客户发型" prop="age">
          <img-upload v-model="imageUrl"></img-upload>
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
        imageUrl: [],
        mobile: '',
        time: '',
        remark: '',
        tableHeight: 0,
        customList: [],
        type: ''
      };
    },
    methods: {
      submitForm: function () {
        if (!this.mobile) {
          this.$message.error('手机号码不能为空')
          return
        }
        if (!this.time) {
          this.$message.error('剪发日期不能为空')
          return
        }
        if (!this.remark) {
          this.$message.error('备注信息不能为空')
          return
        }
        if (!this.imageUrl) {
          this.$message.error('客户发型图片不能为空')
          return
        }
        let qs = require('qs');
        if (this.type === 'add') {
          HttpClient.post('/customSave', qs.stringify(
            {
              name: this.name,
              mobile: this.mobile,
              image: this.imageUrl,
              time: this.time,
              remark: this.remark
            })).then((resp) => {
            if (resp.success) {
              this.$message.success('客户资料保存成功')
              this.$router.push({name:'customDtl', query: {mobile: resp.data.mobile, type: 'customAdd'}})
            }
          })
        } else {
          let id = this.$route.query.id
          HttpClient.post('/customEdit', qs.stringify(
            {
              name: this.name,
              mobile: this.mobile,
              image: this.imageUrl,
              time: this.time,
              remark: this.remark,
              id: id
            })).then((resp) => {
            if (resp.success) {
              this.$message.success('客户资料保存成功')
              this.$router.push({name:'customDtl', query: {mobile: resp.data.mobile, type: 'customAdd'}})
            }
          })
        }
      },
      resetForm: function () {
        this.name = ''
        this.mobile = ''
        this.imageUrl = ''
        this.time = ''
        this.remark = ''
      },
      onBack: function () {
        this.$router.back()
      },
      getCustomDtl: function () {
        let mobile = this.$route.query.mobile
        let id = this.$route.query.id
        HttpClient.get(`/customDtl?mobile=${mobile}&&id=${id}`).then((resp) => {
          if (resp.success) {
            this.customList = resp.data
            if (this.customList && this.customList.length > 0) {
              this.customList.forEach(item => {
                item.hairImg = item.hairImg.split(',')
              })
              console.log(this.customList)
            }
            this.name = this.customList[0].name
            this.mobile = this.customList[0].mobile
            // this.imageUrl = this.customList[0].hairImg
            this.time = this.customList[0].hairTime
            this.remark = this.customList[0].remark
            this.customList[0].hairImg.forEach((img, index) => {
              this.$set(this.imageUrl, index, img)
            })
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
