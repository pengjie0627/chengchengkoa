<template>
    <div>
      <div>
        <el-button size="mini" class="back" @click="onBack">返回</el-button>
        <header class="mbr-list">员工列表</header>
      </div>
      <el-table :data="tableData" :style="{height: tableHeight, overflow: 'auto'}">
        <el-table-column prop="name" label="姓名" width="65">
          <template slot-scope="scope">
            <div class="name-style" @click="onToEmployDtl(scope.row)">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
        <el-table-column prop="auth" label="登录权限" align="center">
          <template slot-scope="scope">
            <span style="color: green" v-if="scope.row.auth === 1">有</span>
            <span style="color: red;" v-if="scope.row.auth === 0">无</span>
          </template>
        </el-table-column>
        <el-table-column prop="checked" label="查看权限"  align="center">
          <template slot-scope="scope">
            <span style="color: green" v-if="scope.row.checked === 1">有</span>
            <span style="color: red;" v-if="scope.row.checked === 0">无</span>
          </template>
        </el-table-column>
        <!--<el-table-column prop="name" label="操作" align="center">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button-->
              <!--v-if="scope.row.auth === 0"-->
              <!--size="mini"-->
              <!--type="success"-->
              <!--@click="handleEdit(scope.$index, scope.row)">授权</el-button>-->
            <!--<el-button-->
              <!--v-if="scope.row.auth === 1"-->
              <!--:disabled="scope.row.name ==='admin'"-->
              <!--size="mini"-->
              <!--:type="scope.row.name ==='admin' ? '' :'danger'"-->
              <!--@click="handleDelete(scope.$index, scope.row)">撤销</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>
</template>

<script>
  import HttpClient from 'http/httpClient.js'
  export default {
    data () {
      return {
        tableHeight: '',
        tableData: []
      }
    },
    methods : {
      getMbrList: function () {
        HttpClient.get(`/userList`).then((resp) => {
          if (resp.success) {
            this.tableData = resp.data
          }
        })
      },
      handleEdit(index, row) {
        // 这里要使用qs来处理，其中qs是axios模块中的，不许需要单独安装
        let qs = require('qs');
       HttpClient.post('/employAuth', qs.stringify({employName: row.name, code: 1})).then((resp) => {
         if (resp.success) {
           this.$message.success('授权成功')
           this.getMbrList()
         }
       })
      },
      handleDelete(index, row) {
        let qs = require('qs');
        HttpClient.post('/employAuth', qs.stringify({employName: row.name, code: 0})).then((resp) => {
          if (resp.success) {
            this.$message.success('撤销成功')
            this.getMbrList()
          }
        })
      },
      onToEmployDtl(item) {
        this.$router.push({name: 'employDtl', query: {employ: JSON.stringify(item)}})
      },
      onBack: function () {
        this.$router.back()
      }
    },
    mounted: function () {
      this.tableHeight = (document.documentElement.clientHeight - 50)+'px'
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
  .back{
    top: 12px;
    position: absolute;
    left: 5px;
    background: none;
    border: none;
    color: white;
    font-size: 15px;
  }
  .name-style{
    color: #409EFF;
  }
</style>
