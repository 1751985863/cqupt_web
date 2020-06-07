<template>
   <div>
   <div class="wrapper tag-item"> 
    <div class="fl left-list">

  <el-card class="box-card">
         <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
    <div class="block"><el-avatar shape="square" :size="85" :src="visituser.avatar"></el-avatar>
        
  </div>
    </el-col>

  </el-row>
     
  <el-button type="text">{{nikename}}</el-button>
  <el-button   type="primary"  style="float: right" @click="loginorno()" icon="el-icon-message" size="mini">私信TA</el-button> 
     <el-button   type="primary" v-if="FollowPojo===false||user.token===undefined" @click="jumpfollow()"  style="float: right" icon="el-icon-star-on" size="mini">关注TA</el-button> 
   <el-button type="success" v-if="FollowPojo===true&&user.token!==undefined" @click="jumpNofollow()"  style="float: right" icon="el-icon-check" size="mini">已关注</el-button> 
</el-card>
    
     <div class="tc-data-list"> 
      <el-tabs type="border-card">       
  <el-tab-pane label="他的签名">{{visituser.personality}}</el-tab-pane>
  <el-tab-pane label="他的提问">
      <el-card class="box-card">
  <div v-for="(item,index) in RequsterProblem" :key="index" class="text item">
    <div class="tag-group">
         <el-tag  type="danger"  effect="dark">{{item.thumbup}} 点赞 </el-tag>
         &nbsp;
         <el-tag  type="warning"  effect="dark">{{item.reply}} 回答 </el-tag>
          &nbsp;
         <router-link :to="'/qa/'+item.id"> {{item.title}} </router-link>
    </div>
  </div>
</el-card>
  </el-tab-pane>
  <el-tab-pane label="他的回答">
      <el-card class="box-card">
  <div v-for="(item,index) in RespondentProblem" :key="index" class="text item">
    <div class="tag-group">
         <el-tag  type="danger"  effect="dark">{{item.thumbup}} 点赞 </el-tag>
         &nbsp;
         <el-tag  type="warning"  effect="dark">{{item.reply}} 回答 </el-tag>
          &nbsp;
        <router-link :to="'/qa/'+item.id"> {{item.title}} </router-link>
    </div>
  </div>
</el-card>
  </el-tab-pane>
  <el-tab-pane label="他的文章">
      <el-card class="box-card">
  <div v-for="(item,index) in articleItems" :key="index" class="text item">
    <div class="tag-group">
         <el-tag  type="danger"  effect="dark">{{item.thumbup}} 点赞 </el-tag>
         &nbsp;
         <el-tag  type="warning"  effect="dark">{{item.visits}} 浏览 </el-tag>
          &nbsp;
         <router-link :to="'/head/'+item.id"> {{item.title}} </router-link>
    </div>
  </div>
</el-card>
  </el-tab-pane>
  
    </el-tabs>
     </div> 
    </div> 
    <div class="fl right-tag"> 
        
     
    </div> 
    <div class="clearfix"></div> 
   <el-dialog  width="30%" title="发送私信" :visible.sync="dialogVisible"> 
        <el-form label-width="80px">
          <el-input v-model="content" type="textarea" :rows="5" ></el-input>
          <br>
          <br>
           <el-button type="primary" @click="sendletter(nikename)">确定</el-button>
        <el-button @click="dialogVisible = false" >关闭</el-button>
    </el-form>
   </el-dialog>
   </div>
   </div>
</template>
<script>
import problemApi from '@/api/problem'
import userApi from '@/api/user'
import letterApi from '@/api/letter'
import articleApi from '@/api/article'
import axios from 'axios'
import {getUser,removeUser} from '@/utils/auth'
  export default {
      asyncData({params}){
        
        return axios.all( [ problemApi.listByNikenameByRequster(params.nikename),problemApi.myreply(params.nikename),userApi.finduserbynickname(params.nikename),articleApi.listByNickname(params.nikename)] ).then( 
            axios.spread( function( RequsterProblem,RespondentProblem,visituser,articleItems){
                return {
                    RequsterProblem: RequsterProblem.data.data,
                    RespondentProblem: RespondentProblem.data.data,
                    nikename: params.nikename,
                    visituser: visituser.data.data,
                    articleItems: articleItems.data.data
                } 
            })
         )
    },
     methods: {
       loginorno(){
         if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才能私信TA哦~',
                    type:'warning'
                })
                return 
            } 
            this.dialogVisible=true

       },
       sendletter(targetname){
         letterApi.sendletter(targetname,{content:this.content}).then(res=>{
           this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              this.dialogVisible = false;
              this.content='';


         })

       },
      
         jumpfollow(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才关注哦~',
                    type:'warning'
                })
                return 
            } 
            
          userApi.doFollow(this.nikename).then(res=>{
               this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
          userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data.flag
        })
          })
        
      },
      jumpNofollow(){
          userApi.delFollow(this.nikename).then(res=>{
               this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
            userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data.flag
        })
          })
        
      }

        
    ,
    },
       
    created(){
        userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data.flag
        })
    },
    data() {
      return {
        content: '',
        dialogVisible: false,
           FollowPojo: false ,
          user: getUser(),
        tabPosition: 'left',
        currentDate: new Date(),
         circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["large", "medium", "small"]
      };
    }
  };
</script>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }
</style>