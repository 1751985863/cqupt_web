<template>
    <div class="wrapper tc-detail"> 
    <div class="fl left-list"> 
     <div class="tc-detail"> 
      <!-- 标题区 --> 
      <div class="detail-tit"> 
       <div class="detail-author"> 
        <a href="javascript:;">匿名</a> 发布&nbsp;&nbsp; <a>{{pojo.publishtime}}</a>
       </div> 
       <div class="detail-content"> 
        <p>{{pojo.content}}</p> 
       
       </div> 
       <div class="detail-tool"> 
        <ul> 
         <li><el-button type="primary" icon="el-icon-view" size="mini" circle></el-button> {{pojo.visits}}</li>
         <li>   <el-button @click="thumbit" :type="zantepy" size="mini" icon="el-icon-star-off" circle></el-button> {{pojo.thumbup}}</li>
         <li>   <el-button @click="dialogVisible=true;content=''" type="primary" size="mini" icon="el-icon-chat-dot-square" circle></el-button> {{pojo.comment}}</li>
        </ul> 
       </div> 
      </div> 
      
      <!-- 评论区 --> 
      <div class="comment-area"> 
       <div class="comment-tit"> 
        <span>评论</span> 
       </div> 
        <ul class="comment-list"> 
         <li v-for="(item,index) in commentlist" :key="index"> 
         <div class="item-photo"> 
          <img src="~/assets/img/widget-widget-photo.png" alt="" /> 
         </div> 
         <div class="item-content"> 
          <p class="author"><a href="javascript:;">{{index+1}}楼</a> 发布&nbsp;&nbsp; <a>{{item.publishdate}}</a></p> 
          <p class="content">{{item.content}}</p> 
         </div> 
         <div class="item-thumb"> 
          <div>
          
          </div> 
         </div> </li> 
          
       </ul> 
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个秘密，发泄一下你心中的怒火吧！</p> 
      <a class="sui-btn btn-block btn-share" @click="jumpspit" target="_blank">发无秘</a> 
     </div> 
    </div> 
    <div class="clearfix"></div> 

    <el-dialog
        title="评论" :visible.sync="dialogVisible"
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
import '~/assets/css/page-sj-spit-index.css'
import '~/assets/css/page-sj-spit-detail.css'
import spitApi from '@/api/spit'
import axios from 'axios'
import {getUser} from '@/utils/auth'
export default {
    created(){
        spitApi.spitthumbif(this.spitid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
        })


    },
    asyncData({params}){
        
        return axios.all( [ spitApi.findById(params.id),spitApi.commentlist(params.id ) ] ).then( 
            axios.spread( function( pojo,commentlist){
                return {
                    pojo: pojo.data.data,
                    commentlist: commentlist.data.data,
                    spitid: params.id

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
        thumbit(){
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            }
            if(this.zantepy==='info'){
                spitApi.thumbspit(this.spitid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              spitApi.spitthumbif(this.spitid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
            spitApi.findById(this.spitid).then(res1=>{
                  this.pojo=res1.data.data

              })
        })
         



                })


            }
            if(this.zantepy==='primary'){
                spitApi.delthumbspit(this.spitid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              spitApi.spitthumbif(this.spitid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
            spitApi.findById(this.spitid).then(res1=>{
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
         

          spitApi.comment({ content:this.content,spitid:this.spitid }  ).then(res=>{
              this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              if(res.data.flag){
                  this.dialogVisible=false //关闭窗口
                  //刷新数据
                
                  spitApi.commentlist(this.spitid ).then( res=>{
                      this.commentlist=res.data.data
                  })
              }
          })
      },jumpqa(){
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
        
      },
      logined(){
          if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
            this.dialogVisible=true

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
