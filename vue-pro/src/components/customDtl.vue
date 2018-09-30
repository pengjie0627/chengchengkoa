<template>
    <div class="dtl">
      <div>
        <el-button size="mini" class="back" @click="onBack">返回</el-button>
        <header class="title">客户详情</header>
      </div>
      <div :style="{height: tableHeight, overflow: 'auto'}">
        <div class="item" v-for="(item, index) in customList">
          <el-row>
            <el-col :span="12">
              姓名：{{item.name}}
            </el-col>
            <el-col :span="12">
              手机号码：{{item.mobile}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              剪发时间：{{item.hairTime}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              备注：{{item.remark}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              图片：
              <div>
                <img v-for="img in item.hairImg" class="img" :src="img" @click="onImgClick(img)" alt="暂无图片上传">
              </div>
              <div>
                <span class="edit" @click="onEdit(item.mobile, item.id)">编辑</span>
                &nbsp;&nbsp;
                <span class="del" @click="onDel(item.mobile, item.id)">删除</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog
        title="图片查看"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
        <img :src="curImgUrl" alt="暂无图片" style="width: 100%;height: 300px">
      </el-dialog>
    </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
  export default {
    mounted: function() {
      this.tableHeight = (document.documentElement.clientHeight - 50)+'px'
      this.getCustomDtl()
    },
    data() {
      return {
        customList: [],
        tableHeight: 0,
        dialogVisible: false,
        curImgUrl: ''
      }
    },
    methods: {
      getCustomDtl: function () {
        let mobile = this.$route.query.mobile
        HttpClient.get(`/customDtls?mobile=${mobile}`).then((resp) => {
          if (resp.success) {
           this.customList = resp.data
            if (this.customList && this.customList.length > 0) {
              this.customList.forEach(item => {
                item.hairImg = item.hairImg.split(',')
              })
              console.log(this.customList)
            }
          }
        })
      },
      onBack: function () {
        this.$router.back()
      },
      onImgClick: function (imgUrl) {
        this.dialogVisible = true
        this.curImgUrl = imgUrl
      },
      handleClose(done) {
        done()
      },
      onEdit: function (mobile, id) {
        this.$router.push({name: 'addCustom', query: {type: 'edit', mobile: mobile, id: id}})
      },
      onDel: function (mobile, id) {
        let qs = require('qs');
        HttpClient.post('/customDelete', qs.stringify(
          {
            id: id,
            mobile: mobile,
          })).then((resp) => {
          if (resp.success) {
            this.$message.success('删除成功')
            this.getCustomDtl()
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
  .back{
    top: 12px;
    position: absolute;
    left: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 15px;
  }
  .item{
    background: white;
    height: auto;
    padding: 10px;
    margin-top: 15px;
  }
  .img{
    width: 80px;
    height: 80px;
    margin: 10px 10px 10px 0;
  }
  .edit{
    color: #433cff;
  }
  .del{
    color: red;
  }
</style>
