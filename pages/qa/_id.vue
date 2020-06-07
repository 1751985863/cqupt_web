<template>
    <div class="wrapper tc-detail"> 
    <div class="fl left-list"> 
     <div class="tc-detail"> 
      <!-- 标题区 --> 
      <div class="detail-tit"> 
       <div class="detail-author"> 
             <router-link :to="'/requster/'+pojo.nickname"> {{pojo.nickname}} </router-link>发布
          
       </div> 
 
       <div class="detail-content"> 
           <h1>{{pojo.title}}</h1>
        <p>{{pojo.content}}</p> 
       
       </div> 
      
       <div class="detail-tool"> 
        <ul> 
        <li><el-button type="primary" icon="el-icon-view" size="mini" circle></el-button> {{pojo.visits}}</li>

         <li><el-button @click="thumbit" :type="zantepy" size="mini" icon="el-icon-star-off" circle></el-button> {{pojo.thumbup}}</li>
         <li><el-button @click="dialogVisible=true;content=''" type="primary" size="mini" icon="el-icon-chat-dot-square" circle></el-button> {{pojo.reply}}</li>

        </ul> 
       </div> 
      </div> 
      
      <!-- 评论区 --> 
      <div class="comment-area"> 
       <div class="comment-tit"> 
        <span>回答</span> 
       </div> 
        <ul class="comment-list"> 
         <li v-for="(item,index) in commentlist" :key="index"> 
         <div class="item-photo"> 
          <img src="~/assets/img/widget-widget-photo.png" alt="" /> 
         </div> 
         <div class="item-content"> 
          
           <router-link :to="'/requster/'+item.nickname"> {{item.nickname}} </router-link>回答
          <p class="content">{{item.content}}</p> 
         </div> 
         <div class="item-thumb"> 
          <div>
           <i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{item.thumbup}}
          </div> 
         </div> </li> 
          
       </ul> 
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      
      <p>今天，要提个问题吗?</p> 
      <a class="sui-btn btn-block btn-share" @click="jumpqa" target="_blank">发布问题</a> 
     </div> 
    </div> 
    <div class="clearfix"></div> 

    <el-dialog
        title="回答" :visible.sync="dialogVisible"
        width="40%">
        <el-input type="textarea" :rows="5" v-model="content"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">提交</el-button>
        </span>
    </el-dialog>

   </div> 
</template>
<script>
import '~/assets/css/page-sj-spit-detail.css'
import problemApi from '@/api/problem'
import axios from 'axios'
import {getUser} from '@/utils/auth'
export default {
        created(){
        problemApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
        })


    },
    asyncData({params}){
        
        return axios.all( [ problemApi.findById(params.id),problemApi.commentlist(params.id)  ] ).then( 
            axios.spread( function( pojo,commentlist ){
                return {
                    pojo: pojo.data.data,
                    commentlist: commentlist.data.data, 
                    problemid: params.id
                } 
            })
         )
    },
    data(){
        return {
            
            zantepy: 'info',
            dialogVisible: false,
            content: '',            
            editorOption: {
                // some quill options
                modules: {
                    toolbar: [
                    [{ 'size': ['small', false, 'large'] }],
                    ['bold', 'italic'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link', 'image']
                    ]
                }
            }
        }
    },
    methods:{
        at(){
            alert(problemid)
            problemApi.spitthumbif(this.problemid).then(res=>{
            this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
        })

        },
        thumbit(){
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            }
            if(this.zantepy==='info'){
                problemApi.thumbspit(this.problemid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              problemApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
            problemApi.findById(this.problemid).then(res1=>{
                this.pojo=res1.data.data

            })

        })
                })

            }
            if(this.zantepy==='primary'){
                problemApi.delthumbspit(this.problemid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              problemApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
             problemApi.findById(this.problemid).then(res1=>{
                this.pojo=res1.data.data

            })
  
              })



                })

            }
            

        },
       onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      save(){
          if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
          problemApi.reply({ content:this.content },this.pojo.id ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                  this.dialogVisible=false //关闭窗口
                  //刷新数据
                  problemApi.commentlist(this.pojo.id ).then( res=>{
                      this.commentlist=res.data.data
                  })
              }
          })
      },
      jumpqa(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
        
          this.$router.push('/qa/submit')
        
      },
      jumpspit(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
        
          this.$router.push('/spit/submit')
        

      },
      jumphead(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
          this.$router.push('/head/submit')
        
      }
    }

}
</script>

<style>

.quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
</style>
