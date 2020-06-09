<template>
<div class="grid-content bg-purple">
 <el-row :gutter="10">
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple">
      
      </div></el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
     <div class="grid-content bg-purple">
     </div>

      <el-card class="box-card">
  <el-form ref="form" :model="form" label-width="80px" label-position="top">
  <el-form-item label="手机号">
    <el-input v-model="mobile" placeholder="11位手机号"></el-input>
  </el-form-item>
   <el-form-item label="密码">
    <el-input type="password"  v-model="password" placeholder="输入登录密码" ></el-input>
  </el-form-item>

  
 

  <el-form-item label="登录状态">
    <el-switch v-model="delivery"></el-switch>
    
    
  </el-form-item>



  <el-form-item>
      <el-button @click="cleanmessage();dialogVisible=true" type="info" plain>忘记密码</el-button>
    
     
    <el-button type="info" plain @click="registerdialogVisible=true">注册</el-button>
    <el-button type="primary" @click="login">登录</el-button>
    
  </el-form-item>
</el-form>
</el-card>
<div class="grid-content bg-purple">
     </div>
      </el-col>
  <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">
      <div class="grid-content bg-purple">
     </div>
      <div id="weixin"></div></el-col>
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></el-col>
</el-row>



      <el-dialog  width="30%" title="忘记密码" :visible.sync="dialogVisible"> 
        <el-form label-width="80px">
       <el-form-item label="手机号"><el-input  type="text" v-model="mobile"></el-input></el-form-item>
       <el-form-item label="验证码"><el-input :disabled="Visible" type="text" v-model="code"></el-input></el-form-item>
	       <el-form-item label="重置密码"><el-input :disabled="Visible" type="password" v-model="temp"></el-input></el-form-item>
        <el-form-item label="确认密码"><el-input :disabled="Visible" type="password" v-model="password"></el-input></el-form-item>
       

        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!Visible" type="primary" @click="save">提交</el-button>
        <el-button v-if="Visible" type="primary" @click="sendsms">点击发送验证码</el-button>

    </el-form>
   </el-dialog>
   <el-dialog  width="30%" title="注册" :visible.sync="registerdialogVisible">
       <el-form  label-width="100px">

  <el-form-item label-width="100px" label="名字" 

 
   >
      
    <el-input  type="text" v-model="pojo.nickname" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="邮箱" prop="email"
   
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]" >
      
    <el-input  type="text" v-model="pojo.email" autocomplete="off"></el-input>
    
  </el-form-item>
    <el-form-item label-width="100px" label="城市" >
      
    <el-input  type="text" v-model="pojo.locationcity" autocomplete="off"></el-input>
    
  </el-form-item>
    <el-form-item label-width="100px" label="学历" >
      
    <el-input  type="text" v-model="pojo.education" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="学校" >
      
    <el-input  type="text" v-model="pojo.college" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="专业" >
      
    <el-input  type="text" v-model="pojo.major" autocomplete="off"></el-input>
    
  </el-form-item>

  <el-form-item label-width="100px" label="手机号" >
      
    <el-input  type="text" v-model="pojo.mobile" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label-width="100px" label="验证码" >
      
    <el-input  type="text" v-model="code" autocomplete="off"></el-input>
    <el-button  @click="sendsms1();btflag=true" :disabled="btflag"  size="small">获取验证码</el-button>
    
  </el-form-item>

 
  
    <el-form-item label-width="100px" label="密码" prop="pass">
      
    <el-input  type="password" v-model="pojo.password" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="确认密码" prop="checkPass">
    <el-input type="password" v-model="password1" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button  @click="registerdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="register()" :disabled="!btflag">注册</el-button>
      
  </el-form-item>


</el-form>


   </el-dialog>
    
</div>
    
</template>
<script>
import userApi from '@/api/user'
import {setUser,getUser} from '@/utils/auth'
import '~/assets/css/page-sj-person-loginsign.css'
  export default {
    data() {
      return {
          registerdialogVisible: false,
          delivery: '',
          temp: '',
          saveVisible: false,
          Visible: true,
          dialogVisible: false,
          checkcode: '',
          btflag: false,

          pojo: {},
          code: '',
          mobile: '',
          password: '',
          password1: ''
      }
    },
        mounted(){
      var obj=new WxLogin({
        id: 'weixin',
        appid: 'wx3bdb1192c22883f3',
        scope: 'snsapi_login',
        redirect_uri: 'http://note.java.itcast.cn/weixinlogin'
      })
    },
    methods: {
         cleanmessage(){
        this.password=''
        this.mobile=''
        this.code=''
        this.temp=''

      },
      sendsms1(){
         
        
        userApi.sendsms( this.pojo.mobile ).then(res => {       
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          })      
        })
      },
      register(){
          if(this.pojo.nickname){

          }
        userApi.register( this.pojo, this.code ).then( res=> {
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          }) 
          if(res.data.flag){
            location.href=('/login')
          }
          
        })
      } ,
      login(){
        userApi.login(this.mobile,this.password ).then( res=> {
          if(res.data.flag){
            //保存用户信息 
          
            setUser(res.data.data.token, res.data.data.nickname, res.data.data.avatar)
            
           
            location.href='/manager/account' //用户中心            
            
          }else{
            this.$message( {
              message: res.data.message,
              type: "error"
            })
            this.mobile=''
            this.password=''
          }
        })
      },
     sendsms(){
          this.Visible=false;
          this.saveVisible=true;
          userApi.findpassword(this.mobile).then(res=>{
              this.$message({
                    message:'验证码已发到您手机:'+this.mobile,
                    type:'success'
                })

          })

      },
      save(){
        if(this.password!==this.temp||this.password===''||this.code===''||this.mobile===''||this.temp===''){
				this.$message({
                  message: '输入有误，请重新输入',
                  type: 'error'
			  })
			  return
			}
          userApi.forget(this.mobile,this.code,this.password).then(res=>{
              if(!res.data.flag){
                  this.$message({
                    message: res.data.message,
                    type:'warning'
                })
              

              }  else{
                this.$message({
                    message: res.data.message,
                    type:'success'
                })
               
                  this.dialogVisible=false;
                  

                    
                }


          })

      },   
        

    },
        head: {
      script:[
        {src:'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'}
      ]
    }  
  }
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 400px;
  }

   .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>