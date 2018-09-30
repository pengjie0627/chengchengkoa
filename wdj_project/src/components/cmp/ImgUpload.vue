<template>
  <div>
    <div class="img-wrap">
      <input  type="file" class="img-input" @change="onImgChange($event)">
      <span  class="line1"></span>
      <span  class="line2"></span>
    </div>
    <div>
      <div style="display: inline-block;position: relative" v-if="images.length > 0" v-for="(item, index) in images">
        <img :src="item" alt="暂无图片" style="width: 100px;height: 100px;margin: 10px 10px 10px 0">
        <span class="del-style" @click="onDeleteImg(index)">删除</span>
      </div>
    </div>
  </div>

</template>

<script>
  import HttpClient from 'http/httpClient.js'
export default {
  data() {
   return {
     images: []
   }
  },
  props: {
    value: Array
  },
  watch: {
    value: function (val) {
      this.images = val
    },
    deep: true,
    immediate: true
  },
  methods: {
    onImgChange: function (e) {
      let file = e.target.files[0]
      let param = new FormData()  // 创建form对象
      param.append('file', file, file.name)  // 通过append向form对象添加数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      if (file.type.indexOf('jpeg') < 0 && file.type.indexOf('png') < 0) {
        this.$message.warn('只支持png图片或者jpg图片')
        return
      }
      HttpClient.post('/fileUpload', param, config).then((resp) => {
        e.target.value = null
        // this.imageUrl = resp.data
        this.images.push(resp.data)
        this.$emit('input', this.images)
      })
    },
    onDeleteImg: function (index) {
      this.images.splice(index,1)
      this.$emit('input', this.images)
    }
  }
}
</script>

<style scoped>
  .img-wrap{
    width: 100px;
    height: 100px;
    border: 1px dashed #aaa;
    position: relative;
  }
  .img-input{
    width: 100px;
    height: 100px;
    position: absolute;
    opacity: 0;
    z-index: 10;
  }
  .line1{
    width: 18px;
    height: 2px;
    border: 1px solid;
    position: absolute;
    left: 40px;
    top: 50px;
  }
  .line2{
    width: 2px;
    height: 18px;
    border: 1px solid;
    position: absolute;
    left: 48px;
    top: 42px;
  }
  .del-style{
    position: absolute;
    display: inline-block;
    right: 3px;
    top: 5px;
    color: red;
    background: pink;
    border-radius: 100%;
    height: 20px;
    width: 35px;
    line-height: 20px;
    font-size: 10px;
    text-align: center;
  }
</style>
