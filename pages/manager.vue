<template>
    <div>
        <div class="myhome-personinfo" style="background-color:#AEDD81"> 
            <div class="wrapper"> 
                <div class="person-baseinfo"> 
                <!--头像信息--> 
                <div class="photo"> 
                <img :src="photorul" alt="" class="person" /> 
                <div class="share"> 
                <span><img src="~/assets/img/asset-QQ.png" alt="" width="34" height="28" /></span> 
                <span><img src="~/assets/img/asset-weixin.png" alt="" width="28" height="28" /></span> 
                <span><img src="~/assets/img/asset-weibo.png" alt="" width="28" height="28" /></span> 
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
                <h4 @click="dialogVisible=true">个人简介<span class="addedit" ><img src="~/assets/img/widget-edit.png" width="12" height="12"  />编辑</span></h4> 
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
        
    </div>
</template>
<script>
import '~/assets/css/page-sj-person-homepage.css'
import {getUser} from '@/utils/auth'
import userApi from '@/api/user'
export default {
    data(){
        return {
            photorul: getUser().avatar,
            dialogVisible: false,
            user: {}

        }
    }
    ,
    created(){
        userApi.info().then( res=> {
			this.user=res.data.data
		})
        if(getUser().name===undefined){
            this.$router.push('/login')
        }
        else{
            

        }
    },
    methods: {
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
