<template>
<div>
  <div class="banner"> 
    
   
     
  </div> 
  <div class="wrapper tag-item"> 
       <el-carousel :interval="4000" type="card" height="310px">
          <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/circle1.jpg" /></a>
         </el-carousel-item>
         <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/circle2.jpg" /></a>
         </el-carousel-item>
         <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/circle6.jpg" /></a>
         </el-carousel-item>
         <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/circle4.jpg" /></a>
         </el-carousel-item>
         <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/circle5.jpg" /></a>
         </el-carousel-item>
  </el-carousel>
    <el-form ref="form"  >
      <el-input size="mini" v-model="usernickname" style="width:220px" placeholder="输入用户昵称"
            ></el-input>
            <el-button size="mini" icon="el-icon-search" @click="serachit()"></el-button>
      </el-form>
      <br>
  <el-tabs type="border-card" >
  <el-tab-pane  >
    
    <span  slot="label"><i class="el-icon-s-flag"></i> JAVA交流圈 &nbsp;&nbsp;&nbsp;
    <el-button type="info" v-if="joinflag[0]===true||user.token===undefined"  @click="joincircle(0)" size="mini" icon="el-icon-plus" circle></el-button> 
    <el-button type="info" v-if="joinflag[0]===false&&user.token!==undefined"  @click="quitcircle(0)" size="mini" icon="el-icon-check" circle></el-button> 
    </span>
<div >
  <el-row :gutter="20" >
<el-col :span="6" v-for="(item,index) in javaUser" :key="index">
    <el-alert   title=""  type="info">
     <div>
     <el-avatar :src="item.data.avatar"></el-avatar>
    </div>     
<el-tag type="primary" size="medium" >
  <a :href="'/requster/'+item.data.nickname">{{item.data.nickname}}</a>
</el-tag>


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button   type="primary" @click="nikename=item.data.nickname;loginorno()"   icon="el-icon-message" size="mini">私信TA</el-button> 
</el-alert>
</el-col>
</el-row>
<br>
</div>

  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-s-help"></i> Python交流圈&nbsp;&nbsp;&nbsp;
    <el-button type="info" v-if="joinflag[1]===true||user.token===undefined"  @click="joincircle(1)" size="mini" icon="el-icon-plus" circle></el-button> 
    <el-button type="info" v-if="joinflag[1]===false&&user.token!==undefined"  @click="quitcircle(1)" size="mini" icon="el-icon-check" circle></el-button> 
    </span>
     <el-row :gutter="20" >
<el-col :span="6" v-for="(item,index) in pythonUser" :key="index">
    <el-alert   title=""  type="info">
     <div>
     <el-avatar :src="item.data.avatar"></el-avatar>
    </div>     
<el-tag type="primary" size="medium" >
  <a :href="'/requster/'+item.data.nickname">{{item.data.nickname}}</a>
</el-tag>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button   type="primary"  @click="nikename=item.data.nickname;loginorno()"  icon="el-icon-message" size="mini">私信TA</el-button> 
</el-alert>
</el-col>
</el-row>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-s-management"></i> C/C++交流圈 &nbsp;&nbsp;&nbsp;
    <el-button type="info" v-if="joinflag[2]===true||user.token===undefined"  @click="joincircle(2)" size="mini" icon="el-icon-plus" circle></el-button> 
    <el-button type="info" v-if="joinflag[2]===false&&user.token!==undefined"  @click="quitcircle(2)" size="mini" icon="el-icon-check" circle></el-button> 
 
    </span>
     <el-row :gutter="20" >
<el-col :span="6" v-for="(item,index) in cUser" :key="index">
    <el-alert   title=""  type="info">
     <div>
     <el-avatar :src="item.data.avatar"></el-avatar>
    </div>     
<el-tag type="primary" size="medium" >
  <a :href="'/requster/'+item.data.nickname">{{item.data.nickname}}</a>
</el-tag>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button   type="primary" @click="nikename=item.data.nickname;loginorno()"   icon="el-icon-message" size="mini">私信TA</el-button> 
</el-alert>
</el-col>
</el-row>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-s-opportunity"></i> Javascript &nbsp;&nbsp;&nbsp;
    <el-button type="info" v-if="joinflag[3]===true||user.token===undefined"  @click="joincircle(3)" size="mini" icon="el-icon-plus" circle></el-button> 
    <el-button type="info" v-if="joinflag[3]===false&&user.token!==undefined"  @click="quitcircle(3)" size="mini" icon="el-icon-check" circle></el-button> 
 
    </span>
     <el-row :gutter="20" >
<el-col :span="6" v-for="(item,index) in jsUser" :key="index">
    <el-alert   title=""  type="info">
     <div>
     <el-avatar :src="item.data.avatar"></el-avatar>
    </div>     
<el-tag type="primary" size="medium" >
  <a :href="'/requster/'+item.data.nickname">{{item.data.nickname}}</a>
</el-tag>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button   type="primary"   @click="nikename=item.data.nickname;loginorno()"  icon="el-icon-message" size="mini">私信TA</el-button> 
</el-alert>
</el-col>
</el-row>
  </el-tab-pane>
  <el-tab-pane>
    <span slot="label"><i class="el-icon-s-platform"></i> .net &nbsp;&nbsp;&nbsp;
    <el-button type="info" v-if="joinflag[4]===true||user.token===undefined"  @click="joincircle(4)" size="mini" icon="el-icon-plus" circle></el-button> 
    <el-button type="info" v-if="joinflag[4]===false&&user.token!==undefined"  @click="quitcircle(4)" size="mini" icon="el-icon-check" circle></el-button> 
 
    </span>
     <el-row :gutter="20" >
<el-col :span="6" v-for="(item,index) in netUser" :key="index">
    <el-alert   title=""  type="info">
     <div>
     <el-avatar :src="item.data.avatar"></el-avatar>
    </div>     
<el-tag type="primary" size="medium" >
  <a :href="'/requster/'+item.data.nickname">{{item.data.nickname}}</a>
</el-tag>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <el-button   type="primary"  @click="nikename=item.data.nickname;loginorno()"  icon="el-icon-message" size="mini">私信TA</el-button> 
</el-alert>
</el-col>
</el-row>
  </el-tab-pane>
</el-tabs>
  </div>
     <el-dialog  width="30%" title="发送私信" :visible.sync="dialogVisible"> 
        <el-form label-width="80px">
          <el-input v-model="content" type="textarea" :rows="5" ></el-input>
          <br>
          <br>
           <el-button type="primary" @click="sendletter(nikename)">确定</el-button>
        <el-button @click="nikename='';dialogVisible = false" >关闭</el-button>
    </el-form>
   </el-dialog>

</div>
 
  
 
</template>
<script>
import letterApi from '@/api/letter'
import axios from 'axios'
import userApi from '@/api/user'
import circleApi from '@/api/circle'
import {getUser,removeUser} from '@/utils/auth'
import '~/assets/css/page-sj-activity-index.css'
import '~/assets/css/page-sj-makeFriends-index.css'
  export default {
          asyncData({}){
        
        return axios.all( [circleApi.getUser(1),circleApi.getUser(2),circleApi.getUser(3),circleApi.getUser(4),circleApi.getUser(5)  ] ).then( 
            axios.spread( function(javaUser,pythonUser,cUser,jsUser,netUser){
                return {
                  javaUser: javaUser.data.data,
                  pythonUser: pythonUser.data.data,
                  cUser: cUser.data.data.data,
                  jsUser: javaUser.data.data,
                  netUser: netUser.data.data
                   
                } 
            })
         )
    },
    created(){
      circleApi.circleJoinByToken().then(res1=>{
                this.joinflag=res1.data.data
              })
      

    },
    data() {
      return {
        usernickname: '',
        nikename: '',
        content: '',
        dialogVisible: false,
        joinflag: [
          true,
          true,
          false,
          false,
          false
        ],
        user: getUser(),
        activeName: 'second',
        items: [{
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        },
        {
          name: '123',
          photo: '123'
        }]
      };
    },
    methods: {
      serachit(){
        if(this.usernickname===''){
          return
        }
        userApi.finduserbynickname(this.usernickname).then(res=>{
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          })
          if(res.data.flag){
            location.href=('/requster/'+this.usernickname)
          }

        })
        
        

      },
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
              this.nikename='';
              this.dialogVisible = false;
              this.content='';


         })

       },
      flashdata(){
       
        flashdatajava();
        flashdatapython();
        flashdatac();
        flashdatajs();
        flashdatanet();
      },
      flashdatajoin(){
        circleApi.circleJoinByToken().then(res1=>{
                this.joinflag=res1.data.data
              })
      
      },
      flashdatajava(){
        circleApi.getUser(1).then(res1=>{
                 this.javaUser=res1.data.data
              })
      
      },
      flashdatapython(){
        circleApi.getUser(2).then(res1=>{
                 this.pythonUser=res1.data.data
              })
      
      },
      flashdatac(){
        circleApi.getUser(3).then(res1=>{
                 this.cUser=res1.data.data
              })
      
      },
      flashdatajs(){
        circleApi.getUser(4).then(res1=>{
                 this.jsUser=res1.data.data
              })
      
      },
      flashdatanet(){
        circleApi.getUser(5).then(res1=>{
                 this.netUser=res1.data.data
              })
      
      },


      joincircle(index){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才能加入哦~',
                    type:'warning'
                })
                return 
                }
          var circleid;
          switch(index) {
            case 0:
              circleid=1;
              break
            case 1:
              circleid=2;
              break
            case 2:
              circleid=3;
              break
            case 3:
              circleid=4;
              break
            case 4:
              circleid=5;
          }
          circleApi.joinCricle(circleid).then(res=>{
            this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
               this.flashdatajoin();
              this.flashdatajava();
              this.flashdatapython();
              this.flashdatac();
              this.flashdatajs();
              this.flashdatanet();




          })

      },
      quitcircle(index){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才能加入哦~',
                    type:'warning'
                })
                return 
                }
          var circleid;
          switch(index) {
            case 0:
              circleid=1;
              break
            case 1:
              circleid=2;
              break
            case 2:
              circleid=3;
              break
            case 3:
              circleid=4;
              break
            case 4:
              circleid=5;
          }
          circleApi.quitCricle(circleid).then(res=>{
            this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
               this.flashdatajoin();
              this.flashdatajava();
              this.flashdatapython();
              this.flashdatac();
              this.flashdatajs();
              this.flashdatanet();

          })

      },
      at(){
        circleApi.circleJoinByToken().then(res1=>{
                this.joinflag=res1.data.data
              })

      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
    .box-card {
    width: 150px;
  }

</style>