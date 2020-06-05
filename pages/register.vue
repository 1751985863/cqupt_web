<template>

      <div class="wrapper loginsign"> 
   <div class="item signup"> 
   <div class="form"> 
     <h3 class="loginsign-title">注册新账号</h3> 
     <form class="sui-form"> 
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
      <div class="item"> 
    <div class="form"> 
     <h3 class="loginsign-title" align="center">《邮语圈服务协议》</h3> 
     <form class="sui-form login-form"> 
      <div class="control-group"> 
       <label for="inputname" class="control-label"></label> 
       <div class="controls"> 
         <p>为使用邮语圈的服务，您应当阅读并遵守《邮语圈服务协议》（以下简称“本协议”）和《邮语圈隐私政策》。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制邮语圈责任的条款、对用户权利进行限制的条款、约定争议解决方式和司法管辖的条款（如第十八条相关约定）等，以及开通或使用某项服务的单独协议或规则。限制、免责条款或者其他涉及您重大权益的条款可能以加粗、加下划线等形式提示您重点注意。</p>
         <p>除非您已充分阅读、完全理解并接受本协议所有条款，否则您无权使用邮语圈服务。您点击“同意”或“下一步”，或您使用邮语圈服务，或者以其他任何明示或者默示方式表示接受本协议的，均视为您已阅读并同意签署本协议。本协议即在您与邮语圈之间产生法律效力，成为对双方均具有约束力的法律文件。</p>
       <h4>一、【协议的范围】</h4>
       <p>1.1本协议是用户与邮语圈之间关于其使用邮语圈的服务所订立的协议。“邮语圈”是指邮语圈和/或其相关服务可能存在的运营关联单位。“用户”是指邮语圈的服务的使用人，在本协议中更多地称为“您”。</p>
       <p>1.2邮语圈的服务是指邮语圈向用户提供的，包括但不限于即时通讯、网络媒体、互联网增值、互动娱乐、金融支付、广告等产品及服务，具体服务以邮语圈实际提供的为准（以下简称“本服务”）。</p>
       <p>1.3本协议内容同时包括《邮语圈隐私政策》（链接地址http://privacy.qq.com/）,且您在使用邮语圈某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。您对前述任何单独协议的接受，即视为您对本协议全部的接受。您对本协议的接受，即视为您对《邮语圈隐私政策》的接受。</p>
       <h4>二、【帐号与密码安全】</h4>
       <p> 2.1您在使用本服务时可能需要注册一个帐号。关于您使用帐号的具体规则，请仔细阅读并遵守相关单独协议。</p>
       <p>2.2邮语圈特别提醒您应妥善保管您的帐号和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受被盗号或密码失窃，责任由您自行承担。</p>
       <p>2.3部分第三方网站或者服务可能可以用QQ帐号、微信帐号等作为其登录途径之一。您知晓，除非邮语圈特别说明外，这些网站或者服务并非邮语圈运营，您应自行判断此类第三方网站或者服务的安全性和可用性，并自行承担相关风险和责任。</p>
      <br>
      <br>
       <button type="button" class="sui-btn btn-danger " >详细条款</button> 
       </div> 
      </div> 
      <div class="control-group"> 
      
       <div class="controls"> 
        
       </div> 
      </div> 
      <div class="controls"> 
       
      
      </div> 
      
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
