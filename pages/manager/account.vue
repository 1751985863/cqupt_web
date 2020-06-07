<template>
    <div class="home-content"> 
    
     <div class="activities account-type"> 
      <h4 class="tit"><span>账户设置</span></h4> 
        <div class="account-main">
        	
   
	      <div class="account-person"> 
	       <h3>个人账号</h3> 
	       <ul class="account-info"> 
	        <li> <span class="gray index">名字</span> 
			 <span class="info" v-show="!name_input">{{user.nickname}}</span> 
	         <form  v-show="name_input"> 
	          <input type="text" placeholder="输入姓名" v-model="user.nickname" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_name()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="name_input=false" >取消</button> 
	         </form> <span ></span> </li> 

			 <li> <span class="gray index">email</span> 
			 <span class="info" v-show="!email_input">{{user.email}}</span> 
	         <form  v-show="email_input"> 
	          <input type="text" placeholder="输入姓名" v-model="user.email" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_email()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="email_input=false" >取消</button> 
	         </form> <span class="gray edit"><a class="fa fa-pencil" aria-hidden="true" @click="email_input=true">编辑</a> </span> </li> 
            <li> <span class="gray index">居住城市</span> 
			 <span class="info" v-show="!locationcity_input">{{user.locationcity}}</span> 
	         <form  v-show="locationcity_input"> 
	          <input type="text" placeholder="输入城市" v-model="user.locationcity" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_locationcity()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="locationcity_input=false" >取消</button> 
	         </form> <span class="gray edit"><a class="fa fa-pencil" aria-hidden="true" @click="locationcity_input=true">编辑</a> </span> </li> 

			 <li> <span class="gray index">毕业大学</span> 
			 <span class="info" v-show="!college_input">{{user.college}}</span> 
	         <form  v-show="college_input"> 
	          <input type="text" placeholder="输入学校" v-model="user.college" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_college()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="college_input=false" >取消</button> 
	         </form> <span class="gray edit"><a class="fa fa-pencil" aria-hidden="true" @click="college_input=true">编辑</a> </span> </li>
			 <li> <span class="gray index">专业</span> 
			 <span class="info" v-show="!major_input">{{user.major}}</span> 
	         <form  v-show="major_input"> 
	          <input type="text" placeholder="输入专业" v-model="user.major" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_major()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="major_input=false" >取消</button> 
	         </form> <span class="gray edit"><a class="fa fa-pencil" aria-hidden="true" @click="major_input=true">编辑</a> </span> </li> 
			 <li> <span class="gray index">学历</span> 
			 <span class="info" v-show="!education_input">{{user.education}}</span> 
	         <form  v-show="education_input"> 
	          <input type="text" placeholder="输入学历" v-model="user.education" /> 
	          <button type='button' class="sui-btn btn-danger save-btn" @click="saveinfo_education()">保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn" @click="education_input=false" >取消</button> 
	         </form> <span class="gray edit"><a class="fa fa-pencil" aria-hidden="true" @click="education_input=true">编辑</a> </span> </li> 
	        
	        
	        <li> <span class="gray index">手机号码 </span> <span class="info">{{user.mobile}}</span> 
	         <form class="sui-form form-inline"> 
	          <input type="phone" placeholder="输入手机号码" /> 
	          <button class="sui-btn btn-danger save-btn">保存</button> 
	         </form> <span class="gray edit"></span> </li> 
	         <li> <span class="gray index">password</span> 
			 <span class="info" v-show="!password_input">点击修改密码</span> 
	         <form  v-show="password_input"> 
	          <input type="text" placeholder="输入密码"  /> 
	          <button type='button' class="sui-btn btn-danger save-btn" >保存</button> 
			  <button type='button' class="sui-btn btn-danger save-btn"  >取消</button> 
	         </form> <span class="gray edit"><a @click="clean();dialogVisible=true">编辑</a> </span> </li> 
	       </ul> 
	      </div> 
	      <div class="account-other"> 
	       <h3>第三方账号</h3> 
	       <ul class="account-info"> 
	        <li> <span class="gray index"><img src="~/assets/img/widget-weixin.png" width="20" /> 微信</span> <span class="name">已绑定，解绑</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span> </li> 
	        <li> <span class="gray index"><img src="~/assets/img/widget-QQ.png" width="20" /> QQ</span> <span class="name bind">绑定账号</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span> </li> 
	        <li> <span class="gray index"><img src="~/assets/img/widget-weibo.png" width="20" /> 新浪微博 </span> <span class="name">已绑定，解绑</span> <span class="gray check"><i class="fa fa-square-o" aria-hidden="true"></i> 公开显示</span> </li> 
	       </ul> 
	      </div> 
	     </div>
     
     </div> 
    <el-dialog  width="30%" title="确认信息" :visible.sync="dialogVisible"> 
        <el-form label-width="80px">
       <el-form-item label="旧密码"><el-input type="password" v-model="password1"></el-input></el-form-item>
	   <el-form-item label="新密码"><el-input type="password" v-model="password2"></el-input></el-form-item>
        <el-form-item label="确认密码"><el-input type="password" v-model="password3"></el-input></el-form-item>
       

        <el-button type="primary" @click="updatapassword()">确定</el-button>
        <el-button @click="dialogVisible = false" >关闭</el-button>

    </el-form>
   </el-dialog>
    </div> 

</template>
<script>
import '~/assets/css/page-sj-person-account.css'
import userApi from '@/api/user'
import {getUser} from '@/utils/auth'
import axios from 'axios'
export default {	
	/*asyncData(){
		return userApi.info().then(  res=>{
			return {user: res.data.data }
		})
	},*/
	data(){
		return {
			password1: '',
			password2: '',
			password3: '',
			dialogVisible: false,
			user:{},
			name_input: false,
			email_input: false,
			password_input: false,
			college_input: false,
			major_input: false,
			education_input: false,
			locationcity_input: false
		}
	},
	created(){
		userApi.info().then( res=> {
			this.user=res.data.data
		})
	},
	methods:{
		updatapassword(){
			if(this.password2!==this.password3||this.password3===''||this.password2===''||this.password1===''){
				this.$message({
                  message: '密码有误，请重新输入',
                  type: 'error'
			  })
			  return
			}
			userApi.updatepassword(this.password1,this.password2).then(res=>{
				this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
			  })
			  if(res.data.flag){
				  this.dialogVisible=false;

			  }
			})
		
		    
			

		},
		clean(){
			this.password1=''
			this.password2=''
			this.password3=''

		},
		saveinfo_name(){
			userApi.saveinfo( this.user ).then( res=> {
				this.name_input=false
			})
		},
		saveinfo_email(){
			userApi.saveinfo( this.user ).then( res=> {
				this.email_input=false
			})
		},
		saveinfo_password(){
			userApi.saveinfo( this.user ).then( res=> {
				this.password_input=false
			})
		},
		saveinfo_major(){
			userApi.saveinfo( this.user ).then( res=> {
				this.major_input=false
			})
		},
		saveinfo_education(){
			userApi.saveinfo( this.user ).then( res=> {
				this.education_input=false
			})
		},
		saveinfo_college(){
			userApi.saveinfo( this.user ).then( res=> {
				this.college_input=false
				
			})

		},
		saveinfo_locationcity(){
			userApi.saveinfo( this.user ).then( res=> {
				this.locationcity_input=false
			})
		},
		
		test(){
			axios.get('http://127.0.0.1:8888/?code=1213132131').then( res=>{
				alert( JSON.stringify(res.data) )
			})
		}
	}
}
</script>
