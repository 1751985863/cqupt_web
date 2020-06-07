
<template>
    <div>
        <div class="myhome-personinfo" style="background-color:#AEDD81"> 
            <div class="wrapper"> 
                <div class="person-baseinfo"> 
                <!--头像信息--> 
                <div class="photo"> 
                <img :src="photorul" alt="" class="person" /> 
                <div class="share"> 
                    <el-badge v-if="lettercount===0" class="item">
                        <el-button size="small" icon="el-icon-message-solid"></el-button>
                       <el-button size="small" @click="drawer=true" class="share-button" icon="el-icon-chat-dot-square" type="primary"></el-button>
                    </el-badge>
                    <el-badge v-if="lettercount!==0" :value="lettercount" class="item">
                        <el-button size="small" icon="el-icon-message-solid"></el-button>
                       <el-button size="small" @click="drawer=true" class="share-button" icon="el-icon-chat-dot-square" type="primary"></el-button>
                    </el-badge>
                    
          
                </div> 
                </div> 
                <!--文字信息--> 
                <div class="info"> 
                <h1>{{user.nickname}}<span class="allinfo"><a href="~/assets/person-myfile.html" target="_blank"></a></span></h1> 
                <ul class="fill"> 
                <li> <i class="fa fa-map-marker" aria-hidden="true"></i> <span class="edit-item"> {{user.locationcity}}</span> 
                    </li> 
                <li> <i class="fa fa-graduation-cap" aria-hidden="true"></i> <span class="edit-item"> {{user.college}}</span> 
                    </li> 
                <li> <i class="fa fa-shopping-bag" aria-hidden="true"></i> <span class="edit-item"> {{user.education}}</span> 
                    </li> 
                <li> <i class="fa fa-link" aria-hidden="true"></i> <span class="edit-item"> {{user.major}}</span> 
                   </li> 
                </ul> 
                </div> 
                </div> 
                <!--右侧编辑--> 
                <div class="edit-info"> 
                <h4 @click="dialogVisible=true">个人签名<span class="addedit" ><img src="~/assets/img/widget-edit.png" width="12" height="3"  />编辑</span></h4> 
                <div class="info-box"> 
                <div class="edit-intro">
                {{user.personality}}
                </div> 
                </div> 
                
                </div> 
                <div class="clearfix"></div> 
            </div> 
        </div> 
        <div class="wrapper  myhome"> 
            <div class="left-list"> 
                <div class="myhome-list"> 
                <ul class="home-list"> 
                    
                <router-link to="/manager/myspit" tag="li" active-class="active" exact><a>我的秘密</a></router-link>
                <router-link to="/manager/myanswer" tag="li" active-class="active"><a>我的回答</a></router-link>
                <router-link to="/manager/myquestion" tag="li" active-class="active"><a>我的提问</a></router-link>
                <router-link to="/manager/mygathering" tag="li" active-class="active"><a>参与活动</a></router-link>
                </ul> 
                <ul class="home-list bottom"> 
                <router-link to="/manager/myarticle" tag="li" active-class="active"><a>发表文章</a></router-link>
                <router-link to="/manager/myletter" tag="li" active-class="active"><a>我的私信</a></router-link>
                <router-link to="/manager/myfocus" tag="li" active-class="active"><a>我的关注</a></router-link>
                <router-link to="/manager/myfans" tag="li" active-class="active"><a>我的粉丝</a></router-link>
                <router-link to="/manager/account" tag="li" active-class="active"><a>账户设置</a></router-link>            
                </ul> 
                </div> 
            </div> 
            <div class="right-content"> 
                <nuxt-child/>
            </div> 
            <div class="clearfix"></div> 
        </div> 
     <el-dialog
        title="修改个人简介" :visible.sync="dialogVisible"
        width="40%">
        <el-input type="textarea" :rows="5" v-model="user.personality"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveinfo_personnality">提交</el-button>
        </span>
    </el-dialog>
         <el-dialog
        :title="'来自'+lettercontent.nickname+'的私信'" :visible.sync="letterVisible"
        width="40%">
 <el-button type="info" size="mini" icon="el-icon-time" plain >{{lettercontent.publishtime}}</el-button>

        <br>
        <br>
        <br>
 <el-alert
    :title="lettercontent.content"
    type="info"
    :closable="false">
  </el-alert>        
          
          <br>
          <br>
        <el-input type="textarea" :rows="5" v-model="content"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="letterVisible = false;lettercontent={};flashdata()">已 读</el-button>
            <el-button type="primary" @click="flashdata();sendletter(lettercontent.nickname);" >回 复</el-button>
        </span>
    </el-dialog>
    <el-drawer title="未读的私信" :visible.sync="drawer"  direction="rtl" :before-close="handleClose"> <!-- 抽屉 -->
    <div class="demo-drawer__content">
   <span> </span>
   <div v-for="(item,index) in letteritems" :key="index">
    <el-alert   title=""  type="success">
     <div><el-avatar :src="item.avatar" ></el-avatar> </div>    <!-- 头像 -->
     <el-tag type="primary" size="medium" > <a :href="'/requster/'+item.nickname">{{item.nickname}}</a></el-tag> <!-- nickname -->
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
 <el-button type="info" size="mini" icon="el-icon-time" plain >{{item.publishtime}}</el-button>

  <el-button   type="primary" style="float: right" @click="readletter(item.id)" icon="el-icon-message" size="mini">查看私信</el-button>
   </el-alert>
   <br>
   </div>
   <div class="demo-drawer__footer">

        </div>
   </div>
  
    </el-drawer>
        
    </div>
</template>

<script>
import '~/assets/css/page-sj-person-homepage.css'
import {getUser} from '@/utils/auth'
import userApi from '@/api/user'
import letterApi from '@/api/letter'
export default {
    data(){
        return {
            content: '',
            value: true,
            lettercontent: {},
            lettercount: 0,
            letteritems: [],
            drawer: false,
            show3: true,
            photorul: getUser().avatar,
            letterVisible: false,
            dialogVisible: false,
            user: {}

        }
    }
    ,
    created(){
        userApi.info().then( res=> {
			this.user=res.data.data
        })
        letterApi.findnoread().then(res1=>{
            this.lettercount=res1.data.data.total;
            this.letteritems=res1.data.data.rows;
        })
        
        if(getUser().name===undefined){
            this.$router.push('/login')
        }
        else{
            

        }
    },
    methods: {
        sendletter(targetname){
         letterApi.sendletter(targetname,{content:this.content}).then(res=>{
           this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              this.letterVisible = false;
              this.content='';
              flashdata()
              

         })

       },
        flashdata(){
            letterApi.findnoread().then(res1=>{
            this.lettercount=res1.data.data.total;
            this.letteritems=res1.data.data.rows;
        })

        },
        readletter(letterid){
            letterApi.readletter(letterid).then(res=>{
                this.lettercontent=res.data.data;
                this.letterVisible=true;
            })

        },
         handleClose() {
        this.drawer=false
    },
        saveinfo_personnality(){
			userApi.saveinfo( this.user ).then( res=> {
                this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              this.dialogVisible=false;


                userApi.info().then( res=> {
			this.user=res.data.data
		})
				
				
	  })

		}

    }
}
</script>
<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
