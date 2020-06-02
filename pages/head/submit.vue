<template>
  <div class="wrapper release-tc"> 
      
   <div class="release-box"> 
    <h3>发布文章</h3> 
         <h5>文章标题</h5>
      <el-input v-model="title"></el-input>
      
      
      <br>
      <br>
      <h5>文章内容</h5>
      <el-input
  type="textarea"
  :rows="10"
  placeholder="请输入内容"
  v-model="content">
</el-input>
<br>
<br>
 <el-button  type="primary" class="rightbutton" @click="save">发布</el-button>
    <div class="editortitle"> 
    

     <div class="btns"> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 
</template>
<script>
import '~/assets/css/page-sj-spit-submit.css'
import articleApi from '@/api/article'
import {quillRedefine} from 'vue-quill-editor-upload'
export default {
      data () {
      return {
        title: '',
        content: '',
        editorOption: {}
      }
    },
    created(){
      this.editorOption=quillRedefine({
        uploadConfig:{
          action: 'http://localhost:3000/upload',
          res: (response) =>{
            return response.info
          },
          name: 'img'  //图片上传参数 
        }
      })
    },
       methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      save(){
          articleApi.save({ content:this.content,title:this.title }  ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                  this.$router.push('/')
              }
          })
      }
    },
        mounted() {
      console.log('app init, my quill insrance object is:', this.myQuillEditor)
      /*setTimeout(() => {
        this.content = 'i am changed'
      }, 3000)*/
    }
  
}
</script>
<style>

.quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
.rightbutton{
  text-align: right;
}

</style>
