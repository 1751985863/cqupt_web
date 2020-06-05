<template>
  <div class="wrapper activities"> 
   <h1>{{item.name}}</h1> 
   <div class="img-text"> 
    <div class="left-img"> 
     <img :src="item.image" alt="" /> 
    </div> 
    <div class="right-txt"> 
     <p>开始时间： {{item.starttime}}</p> 
     <p>结束时间： {{item.endtime}}</p> 
     <p>举办地点： {{item.address}}</p> 
     <p>主办方：{{item.sponsor}}</p> 
     <p>报名截止：{{item.enrolltime}} 
     
          
     <div class="join"> 
     <div v-if="user1.name===undefined">
         <button class="sui-btn btn-danger"  @click="logined">立即报名</button> <span class="will">报名即将开始</span> 
     </div>
     <div v-if="user1.name!==undefined">
         <div v-if="joinflag===true">
             <button class="sui-btn btn-danger"  @click="dialogFormVisible=true;">立即报名</button> <span class="will">报名即将开始</span> 
         </div>
         <div v-if="joinflag===false">
             <button class="sui-btn btn-danger"  >已经参加</button> <span class="will">报名即将开始</span> 
         </div>
     </div>
      

      
     </div> 
    </div> 
   </div> 
   <div class="simple-text"> 
    <div class="left-content"> 
     <div class="content-item"> 
      <div class="tit">
       <span>大会介绍</span>
      </div> 
      <div class="text"> 
       <h4></h4> 
       <p>{{item.detail}}</p> 
      </div> 
     </div> 
     <div class="content-item"> 

     </div> 
    </div> 
    <div class="right-intro"> 
     <div class="content-item"> 
      <div class="tit">
       <span>活动组织者</span>
      </div> 
      <div class="text"> 
       <p>主办方： {{item.sponsor}}</p> 
      </div> 
     </div> 
     <div class="content-item"> 
      <div class="tit">
       <span>相关链接</span>
      </div> 
      <div class="text"> 
       <p>活动官网： infoQ.com</p> 
      </div> 
     </div>
         <el-dialog
        title="请填写验证码" :visible.sync="dialogVisible"
        width="20%">
        <el-input  type="text" :disabled="Visible" v-model="checkcode" /> 
        <br>
        <br>
        <br>
        <el-button  @click="dialogVisible = false;Visible= true;checkcode=''">取 消</el-button>
        <el-button v-if="!Visible" type="primary" @click="save">提交</el-button>
        <el-button v-if="Visible" type="primary" @click="sendsms">点击发送验证码</el-button>
    </el-dialog> 


    
    </div> 
   </div> 
      <el-dialog  width="30%" title="确认信息" :visible.sync="dialogFormVisible"> 
        <el-form label-width="80px">
       <el-form-item label="手机号"><el-input v-model="user.mobile"></el-input></el-form-item>
        <el-form-item label="用户名"><el-input v-model="user.nickname" :disabled="true"></el-input></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="user.email" :disabled="true"></el-input></el-form-item>
        <el-form-item label="活动名"><el-input v-model="item.name" :disabled="true" ></el-input></el-form-item>
        <el-form-item label="活动地点"><el-input v-model="item.address" :disabled="true" ></el-input></el-form-item>
        <el-form-item label="开始时间"><el-input v-model="item.starttime" :disabled="true" ></el-input></el-form-item>
        <el-form-item label="结束时间"><el-input v-model="item.endtime" :disabled="true" ></el-input></el-form-item>
        <el-form-item label="主办方"><el-input v-model="item.sponsor" :disabled="true" ></el-input></el-form-item>

       

        <el-button type="primary" @click="dialogFormVisible = false;dialogVisible = true">确定参加</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>

    </el-form>
   </el-dialog>

   

  </div> 
</template>
<script>
import "~/assets/css/page-sj-activity-detail.css"
import gatheringApi from '@/api/gathering'
import {getUser} from '@/utils/auth'
import userApi from '@/api/user'
import axios from 'axios'
export default {
    asyncData( {params} ){
        
        return axios.all( [gatheringApi.findById(params.id)] ).then(
            axios.spread( function( res ){
                
                return {
                    item: res.data.data,
                    pregathid: params.id
           
                }
            })
         )
        
        
    },
    head: {
        script:[
            {src: 'https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js'}
        ],
        link: [
            {rel:'stylesheet' ,href: 'https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css' }
        ]
    },
     data(){
      return {
          nickname: 'kd',
          emial: '1151078176@qq.com',
          mobile: '15310450645',
        user:{},
        user1: getUser(),
        joinflag: false,   
        gathid: '',
        checkcode: '',
        Visible: true, //按钮显示
        dialogVisible: false,//发送验证码的窗口
        dialogFormVisible: false, //报名窗口
      }
    },
    created(){
         userApi.joinorno(this.pregathid).then(res=>{
          
             this.joinflag=res.data.flag

         })
         userApi.info().then(res2=>{
             this.user=res2.data.data
         })
        
        


                
            
		
    },
        methods: {
      sendsms(){
          this.Visible=false;
          gatheringApi.joingatheringsendsms(this.user.mobile).then(res=>{
              this.$message({
                    message:'验证码已发到您手机:'+this.user.mobile,
                    type:'success'
                })

          })

      },
      at2(){
           userApi.joinorno(this.pregathid).then(res=>{
               this.joinflag=res.data.flag
              return {
                  
              }

         })

      },
      at1(){
           userApi.joinorno(this.pregathid).then(res=>{
               alert(res.data.flag)
              return {
                  
              }

         })

      },
      at(){
          alert(this.pregathid)
          alert(this.joinflag)
          alert(this.user.nickname)
          alert('prejoinflag'+this.prejoinflag)
          

      },
      save(){
          gatheringApi.joingathering(this.pregathid,this.user.mobile,this.checkcode).then(res=>{
              if(!res.data.flag){
                this.checkcode=''
                  this.$message({
                    message: ''+res.data.message,
                    type:'warning'
                })
              

              }  else{
          
                this.checkcode='';
                  this.dialogVisible=false;
              location.href=('/gathering')
                    
                }


          })

      },
       logined(){
         if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以报名哦~',
                    type:'warning'
                })
                return 
            } 
       },
       notice(){
           alert(''+this.joinflag)
       }
      
    }
}
</script>
