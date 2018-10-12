<template>
  <div>
    <div class="img-wrap">
      <input  type="file" accept="image/*" class="img-input" @change="onImgChange($event)">
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
    canvasDataURL: function(path, obj, callback){

    },
    photoCompress: function (file,w,objDiv){
      var ready=new FileReader();
      /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
      ready.readAsDataURL(file);
      ready.onload = function () {
        // var re=this.result;
        // this.canvasDataURL(re,w,objDiv)
        let path = this.result
        let obj = w
        let callback = objDiv

        var img = new Image();
        img.src = path;
        img.onload = function(){
          var that = this;
          // 默认按比例压缩
          var w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          var quality = 0.7;  // 默认图片质量为0.7
          //生成canvas
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          // 创建属性节点
          var anw = document.createAttribute("width");
          anw.nodeValue = w;
          var anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          var base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      }
    },
    onImgChange: function (e) {
      let that = this
      let file = e.target.files[0]
      let param = new FormData()  // 创建form对象
      // param.append('file', file, file.name)  // 通过append向form对象添加数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      if (file.type.indexOf('jpeg') < 0 && file.type.indexOf('png') < 0) {
        this.$message.warn('只支持png图片或者jpg图片')
        return
      }
      // 图片压缩
      if(file.size/1024 > 1025) { //大于1M，进行压缩上传
        this.photoCompress(file, {
          quality: 0.2
        }, function(base64Codes){
          //console.log("压缩后：" + base.length / 1024 + " " + base);
          // var bl = this.convertBase64UrlToBlob(base64Codes);
          // let urlData = base64Codes
          var arr = base64Codes.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while(n--){
            u8arr[n] = bstr.charCodeAt(n);
          }
          param.append('file', new Blob([u8arr], {type:mime}), file.name)  // 通过append向form对象添加数据
          // 上传到服务器
          HttpClient.post('/fileUpload', param, config).then((resp) => {
            e.target.value = null
            // this.imageUrl = resp.data
            that.images.push(resp.data)
            that.$emit('input', that.images)
          })
        });
      }else{ //小于等于1M 原图上传
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        // 上传到服务器
        HttpClient.post('/fileUpload', param, config).then((resp) => {
          e.target.value = null
          // this.imageUrl = resp.data
          that.images.push(resp.data)
          that.$emit('input', that.images)
        })
      }
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
