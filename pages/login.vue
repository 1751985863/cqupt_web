<template>
      <div class="wrapper loginsign"> 
     <div class="item signup"> 
      <div class="form"> 
       <h3 class="loginsign-title">用户登录</h3> 
       <form class="sui-form login-form"> 
       <div class="control-group"> 
         <label for="inputname" class="control-label">手机号：</label> 
         <div class="controls"> 
          <input type="text" id="inputname" v-model="mobile" placeholder="11位手机号" class="input-xlarge" data-rules="required" /> 
        </div> 
      </div> 
      <div class="control-group"> 
       <label for="inputpassword" class="control-label">密码：</label> 
       <div class="controls"> 
        <input type="password" id="inputpassword" v-model="password" placeholder="输入登录密码" class="input-xlarge" /> 
       </div> 
      </div> 
      <div class="controls"> 
       <label> <input type="checkbox" name="remember-me" /><span class="type-text" style="font-size:12px;">记住登录状态 &nbsp; </span><a @click="cleanmessage();dialogVisible=true">忘记密码</a> </label> 
       <button type="button" class="sui-btn btn-danger btn-yes" @click="login" >登 录</button> 
      </div> 
     </form> 
    </div> 

   </div> 
   <div class="item"> 
    <div class="form"> 
     <h3 class="loginsign-title"><div id="weixin"></div></h3> 

 

    </div> 
   </div> 
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
  </div>   
</template>
<script>
import '~/assets/css/page-sj-person-loginsign.css'
import userApi from '@/api/user'
import {setUser,getUser} from '@/utils/auth'

export default {
    data(){
      return {
        temp: '',
          saveVisible: false,
          Visible: true,
          dialogVisible: false,
          checkcode: '',

        pojo: {},
        code: '',
        mobile: '',
        password: ''
      }
    },
    methods: {
      cleanmessage(){
        this.password=''
        this.mobile=''
        this.code=''
        this.temp=''

      },
      register(){
        userApi.register( this.pojo, this.code ).then( res=> {
          this.$message({
            message: res.data.message,
            type: (res.data.flag?'success':'error')
          }) 
        })
      },
      login(){
        userApi.login(this.mobile,this.password ).then( res=> {
          if(res.data.flag){
            //保存用户信息 
          
            setUser(res.data.data.token, res.data.data.nickname, res.data.data.avatar)
            alert("ddfff")
           
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
    mounted(){
      var obj=new WxLogin({
        id: 'weixin',
        appid: 'wx3bdb1192c22883f3',
        scope: 'snsapi_login',
        redirect_uri: 'http://note.java.itcast.cn/weixinlogin'
      })
    },
    head: {
      script:[
        {src:'http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js'}
      ]
    }   
}
</script>
