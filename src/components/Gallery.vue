<template>
    <div class="gallery">
        <div class="operation">
          <h2>不同下载方式</h2>
          <div class="inline-block">
            <a href="//s.qunarzz.com/qcloud/img/white_logo_1.png" download>a标签下载图片</a>
            <a href="//common.qunarzz.com/lib/prd/element-ui/1.3.7/index.js" download>a标签下载js</a>
          </div>
          <el-button type="primary" @click="ajaxDownload">ajax下载</el-button>
          <el-button type="primary" @click="downloadSubmit()">form submit下载</el-button>
          <el-form :model="downloadForm" ref="downloadForm" :action="downloadAction" target="targetIframe1" method="post">
            <el-input name="name" value="img1" v-show="false"></el-input>
          </el-form>
          <iframe name="targetIframe1" v-show="false"></iframe>
        </div>
        <div class="operation">
            <h2>上传功能</h2>
          <div class="half">
            <div>
              <form :action="uploadAction" ref="uploadForm" target="targetIframe2" method="post" style="display:inline" enctype="multipart/form-data">
                <input type="file" ref="fileInput" @change="preview" name="fileInput"></input>
              </form>
              <iframe name="targetIframe2" v-show="false"></iframe>
              <el-button type="primary" @click="upload">开始上传</el-button>  
            </div>
            <div class="preview-wrapper card"><div>选择预览区域</div><img ref="preview"/></div>
          </div>
          <div class="half">
            <el-button type="primary" @click="dragUpload">开始上传</el-button>              
            <div class="drag-container card" @dragenter="ban" @dragover="ban" @drop="drop">拖拽放置区域
              <div ref="dragPreview"></div>
            </div>
          </div>
        </div>
        <el-dialog>
        </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'gallery',
  data () {
    return {
      count: 3,
      downloadAction: '/gallery/download/form',
      uploadAction: '/gallery/upload/form',
      downloadForm:  {
        name: 'img1'
      }
    }
  },
  methods: {
    ajaxDownload() {
      fetch('/gallery/download/ajax', {
        method: 'GET',
        responseType: 'blob',
        name: 'img1'
      }).then(res => {
        if(res.status === 200){
          return res.blob();
        }else{
          this.$message('出错')
        }
        }).then(stream => {
          var blob = stream;
          var reader = new FileReader();
          reader.readAsDataURL(blob);  // 转换为base64
          reader.onload = e => {
            // 转换完成时，创建一个a标签用于下载
            var a = document.createElement('a');
            a.download = 'down1.jpeg';
            a.href = e.target.result;
            debugger
            document.querySelector("body").append(a);
            a.click();
            a.remove();
          }
      }, e => {
        this.$message('接口出错');
      });
    },
    downloadSubmit() {
      var form = this.$refs.downloadForm.$el;
      form.submit();
    },
    preview() {
      var fileInput = this.$refs.fileInput;
      var preview = this.$refs.preview;
      // preview.width = 500;
      preview.height = 480;
      if(fileInput.files && fileInput.files[0]){
        console.log(fileInput.files);
        debugger
        preview.src = window.URL.createObjectURL(fileInput.files[0]);
      }
    },
    ban(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    drop(e) {
      e.stopPropagation();
      e.preventDefault();

      var dt = e.dataTransfer;
      var files = this.dragFiles = dt.files;

      this.handleFiles(files);
    },
    handleFiles(files) {
      var preview = this.$refs.dragPreview;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;
        
        if (!imageType.test(file.type)) {
          continue;
        }
        
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        img.width = 150;
        preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
        
        var reader = new FileReader();
        reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
      }
    },
    upload(param) {
      // var form = this.$refs.uploadForm;
      // form.submit();
      var fInput = this.$refs.fileInput;
      var formData = new FormData();
      debugger
      formData.append('fileInput', param[0] || fInput.files[0]);
      fetch('/gallery/upload/ajax', {
        method: 'POST',
        responseType: 'json',
        body: formData
      }).then(res => {
        if(res.status === 200){
          return res.json();
          
        }else{
          this.$message('接口错误');
        }
      }).then(json => {
          this.$message(json.msg);
      })
    },
    dragUpload() {
      this.upload(this.dragFiles);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operation>div{
  margin: 30px;
}
h2{
  font-size: 28px;
  text-align: left;
}
.inline-block{
  display: inline-block;
}
.preview-wrapper{
  display: inline-block;
  width: 500px;
  height: 500px;
  border: 1px dashed #333;
}
div.half{
  width: 507px;
  height: 556px;
  display: inline-block;
  overflow: hidden;
}
.card{
  margin: 10px 0;
}
.drag-container{
  display: inline-block;
  width: 500px;
  height: 500px;
  border: 1px dashed #333;
}
</style>
