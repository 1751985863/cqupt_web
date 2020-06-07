<template>
  <div>
      <header>
      <div class="activity-head">
        <div class="wrapper"> 
        <div class="sui-navbar"> 
            <div class="navbar-inner"> 
            <a href="/" class="sui-brand"><img src="~/assets/img/asset-logo-black.png" alt="社交" /></a> 
            <ul class="sui-nav"> 
                 <router-link tag="li" to="/" active-class="active" exact><a>头条</a></router-link>
                <router-link tag="li" to="/qa" active-class="active"><a>知否</a></router-link>
                <router-link tag="li" to="/gathering" active-class="active"><a>活动</a></router-link>
                <router-link tag="li" to="/spit" active-class="active"><a>无秘</a></router-link>
                 <router-link tag="li" to="/circle" active-class="active"><a>圈子</a></router-link>
                <router-link tag="li" to="/recruit" active-class="active"><a>招聘</a></router-link>
            


            </ul> 
            <form class="sui-form sui-form pull-left"> 
                
                <input type="text" v-model="keyword"  placeholder="输入关键词查询头条文章..." /> 
                  <el-button slot="append" icon="el-icon-search" circle @click="searchKeyWords()"></el-button>
               
            </form> 
            
            
            <div class="sui-nav pull-right info" v-if="user.name!==undefined"> 
              <li><a :href="'/requster/'+user.name" class="notice">{{user.name}}</a></li>     
              <li><a @click="logout" class="sui-btn btn-login">退出</a></li>
                    
              <li><a href="/manager/account"  class="homego"><img :src="user.avatar" width="50px" height="50px" :alt="user.name" /></a></li> 
            </div> 
             <div class="sui-nav pull-right info" v-if="user.name===undefined"> 
                 
                        <li><a href="/register" target="_blank">注册</a></li> 
                        <li><a href="/login" target="_blank" class="sui-btn btn-login">登录</a></li>  
             </div>
            </div> 
            </div> 
        </div>
        </div>
        </header>
        <nuxt/>
      <footer>
        <div class="footer"> 
        <div class="wrapper"> 
            <div class="footer-bottom"> 
            <div class="link"> 
            <dl> 
            <dt>
                网站相关
            </dt> 
            <dd>
                关于我们
            </dd> 
            <dd>
                服务条款
            </dd> 
            <dd>
                帮助中心
            </dd> 
            <dd>
                编辑器语法
            </dd> 
            </dl> 
            <dl> 
            <dt>
                常用链接
            </dt> 
            <dd>
                重邮官网
            </dd> 
            <dd>
                CSDN社区
            </dd> 
            </dl> 
            <dl> 
            <dt>
                联系我们
            </dt> 
            <dd>
                联系我们
            </dd> 
            <dd>
                加入我们
            </dd> 
            <dd>
                建议反馈
            </dd> 
            </dl> 
            <dl> 
            <dt>
                关注我们
            </dt> 
            <dd>
                微博
            </dd> 
            <dd>
                twitter
            </dd> 
            </dl> 
            <div class="xuke"> 
            <h3>内容许可</h3> 
            <p>除特别说明外，用户内容均采用知识共享署名-非商业性使用-禁止演绎4.0 国际许可协议 (CC BY-NC-ND 4.0) 进行许可</p> 
            <p>本站由 唐杨李某 提供更新服务</p> 
            </div> 
            </div> 
            <p class="Copyright">Copyright &copy; 2020 邮语圈社区 当前版本 0.0.1</p> 
            </div> 
        </div> 
        </div> 
      </footer>
  </div>
</template>
<script>
import '~/assets/plugins/normalize-css/normalize.css'
import '~/assets/plugins/yui/cssgrids-min.css'
import '~/assets/plugins/sui/sui.min.css'
import '~/assets/plugins/sui/sui-append.min.css'
import '~/assets/plugins/font-awesome/css/font-awesome.min.css'
import '~/assets/css/widget-base.css'
import '~/assets/css/widget-head-foot.css'
import {getUser,removeUser} from '@/utils/auth'
import {setkeyword,getkeyword} from '@/utils/auth'
export default {
    data(){
        return {
            user: {},
            keyword: '',
            word: ''

        }
    },
    created(){
        this.user= getUser()
    },
    methods: {
        at(word){
            setkeyword(word)
            alert(word)

        },
        get(){
            alert(getkeyword().word)

        },
        logout(){
            removeUser()
            location.href='/'
        },
        searchKeyWords(){
            this.word=this.keyword
            this.keyword=''
            setkeyword(this.word)
            location.href=('/head/keyword/'+1)

            
        }

    }
}
</script>
<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
