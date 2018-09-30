<template>
  <div>
    <div>
      <el-button size="mini" class="back" @click="onBack">返回</el-button>
      <header class="mbr-list">客户查询</header>
    </div>
    <el-row style="padding: 10px">
      <el-col :span="20">
        <el-input placeholder="请输入手机号" v-model="userMobile"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button style="margin-top: 5px;margin-left: 5px;" type="primary" size="mini" @click="onCustomSearch">查询</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" :style="{height: tableHeight, overflow: 'auto'}">
      <el-table-column prop="name" label="姓名"  width="100"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
      <el-table-column prop="name" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="onCheck(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
  export default {
    data () {
      return {
        userMobile: '',
        tableHeight: '',
        tableData: []
      }
    },
    methods : {
      getMbrList: function () {
        HttpClient.get(`/customList`).then((resp) => {
          if (resp.success) {
            this.tableData = resp.data
          }
        })
      },
      onCheck(index, row) {
        this.$router.push({name: 'customDtl', query: {mobile: row.mobile, type: 'customList', id: row.id}})
      },
      onBack: function () {
        this.$router.push('home')
      },
      onCustomSearch: function() {
        HttpClient.get(`/customSearch?mobile=${this.userMobile}`).then((resp) => {
          if (resp.success) {
            this.tableData = resp.data
          }
        })
      }
    },
    mounted: function () {
      this.tableHeight = (document.documentElement.clientHeight - 110)+'px'
      console.log(document.documentElement.clientHeight)
      this.getMbrList()
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
</style>
