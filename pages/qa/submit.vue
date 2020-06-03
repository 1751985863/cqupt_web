<template>

  <div class="wrapper release-tc"> 
   <div class="release-box"> 
    <h3>发布问题</h3> 
    <div class="editor">
       <h5>问题标题</h5>
      <el-input v-model="title"></el-input>
      <br>

      <br>
<div class='div1'>
        <select v-model="labelid">
            <option value="" selected>----------请选择标签----------</option>


              <option :value="label.id" v-for="(label,index) in labelList" :key="index" >{{label.labelname}}</option>
   
        </select>
    </div>
    

      <br>

      
      
    <h5>问题详情</h5>
    <el-input
  type="textarea"
  :rows="10"
  placeholder="请输入内容"
  v-model="content">
</el-input>

     <div class="btns"> 
      <button class="sui-btn btn-danger btn-release" @click="save">发布</button> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 
</template>
<script>
import '~/assets/css/page-sj-spit-submit.css'
import '~/assets/css/page-sj-qa-submit.css'
import problemApi from '@/api/problem'
import labelApi from '@/api/label'
import {quillRedefine} from 'vue-quill-editor-upload'
export default {
      data () {
      return {
        labelid: '',
        checkList: [],
        content: '',
        title: '',
        editorOption: {}
      }
    },
    asyncData(){
        return labelApi.toplist().then( res=>{
            console.log( JSON.stringify(res.data.data) )
            return {labelList: res.data.data }
        })

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
         tip(){
           alert(this.labelid)
         },
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
          problemApi.save({ content:this.content,title:this.title },this.labelid  ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                  this.$router.push('/qa/label/'+this.labelid)
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
 .div1 select{ /*改变下拉框大小*/
            border: 1px solid #CDCDCD;
            width: 180px;
            height: 29px;
        }
        .div1 select option{  /*下拉列表的样式*/
            border-color: #CDCDCD;
            color: black;
            width: 180px;
            height: 29px;
        }

</style>
