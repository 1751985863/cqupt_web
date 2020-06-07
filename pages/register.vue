<template>

      <div class="wrapper loginsign"> 
   <div class="item signup"> 
   <div class="form"> 
     <h3 class="loginsign-title">注册新账号</h3> 
     <form class="sui-form"> 
       <a @click="at">a</a>
        <el-col :span="20">
<el-form  label-width="100px">

  <el-form-item label-width="100px" label="名字" >
      
    <el-input  type="text" v-model="pojo.nickname" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="邮箱" >
      
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
    <el-button  @click="sendsms();btflag=true" :disabled="btflag"  size="small">获取验证码</el-button>
    
  </el-form-item>

 
  
    <el-form-item label-width="100px" label="密码" prop="pass">
      
    <el-input  type="password" v-model="pojo.password" autocomplete="off"></el-input>
    
  </el-form-item>
  <el-form-item label-width="100px" label="确认密码" prop="checkPass">
    <el-input type="password" v-model="password" autocomplete="off"></el-input>
  </el-form-item>
   <el-form-item>
     
    <el-button type="primary" @click="register()" :disabled="!btflag">注册</el-button>
      
  </el-form-item>

</el-form>
</el-col>

           
     </form> 
    </div>
   </div>
  </div> 
    
</template>
<script>
import '~/assets/css/page-sj-person-loginsign.css'
import userApi from '@/api/user'
import {setUser,getUser} from '@/utils/auth'



export default {
    data(){
      return {
        pojo: {},
        code: '',
        mobile: '',
        password: ''
      }
    },
    methods: {
      at(){
        this.$message({
            message: '注册成功',
            type: 'success'
          })  

      },
      sendsms(){
        
        userApi.sendsms( this.pojo.mobile ).then(res => {       
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          })      
        })
      },
      register(){
        userApi.register( this.pojo, this.code ).then( res=> {
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          }) 
          if(res.data.flag){
            location.href=('/login')
          }
          
        })
      }    
    } 
}
</script>
