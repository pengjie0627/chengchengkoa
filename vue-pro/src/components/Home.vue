<template>
    <div>
      <header class="title">城城美业</header>
      <div class="home">
        <div class="item"><el-button type="success" @click="onAddCustom">新增客户信息</el-button></div>
        <div class="item"><el-button v-if="employName === 'admin'" type="success" @click="onAddEmploy">新增员工信息</el-button></div>
        <div class="item"> <el-button v-if="employName === 'admin'" type="success" @click="onToAuth">管理员工权限</el-button></div>
        <div class="item"><el-button v-if="checkPermission === '1'" type="success" @click="onToCheck">客户信息查询</el-button></div>
      </div>
    </div>
</template>

<script>
  export default {
    mounted: function() {
      try {
        this.checkPermission = localStorage.getItem('permission')
        this.employName = localStorage.getItem('employName')
      } catch (e) {
        this.checkPermission = Constant.user.userName
        this.employName = Constant.user.password
      }
    },
    data() {
      return {
        employName: '',
        checkPermission: '',
      }
    },
    methods: {
      onToAuth: function () {
        this.$router.push('/permit')
      },
      onToCheck: function() {
        this.$router.push('/search')
      },
      onAddCustom: function () {
        this.$router.push({name: 'addCustom', query: {type: 'add'}})
      },
      onAddEmploy: function () {
        this.$router.push({name: 'addEmploy', query: {type: 'add'}})
      }
    }
  }
</script>

<style scoped>
  .home{
    margin-top: 70px;
  }
  .title{
    text-align: center;
    background: #409EFF;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: white;
  }
  .item{
    text-align: center;
    margin-top: 20px;
  }
</style>
