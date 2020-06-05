<template>
    <div class="wrapper headline-content">
        <div class="fl left-list">
            <div class="problem-detail">
    <!-- title area  -->
    <div class="title-intro">
        <h2>{{pojo.title}}</h2>
        <div class="operate">
            <span class="fl author">{{pojo.nickname}}  发布　　<span class="time">{{pojo.createtime}}</span></span>
           
        </div>
        <div class="clearfix"></div>
        <div class="content">
            <p>{{pojo.content}}</p>
             
        </div>
    </div>
    <div class="tc-detail"> 
      <!-- 标题区 --> 
      <div class="detail-tit"> 
          <br>
          <div class="detail-tool"> 
              <el-button type="primary" icon="el-icon-view" size="small" circle></el-button> {{pojo.visits}} 
             <el-button @click="thumbit" :type="zantepy" size="mini" icon="el-icon-star-off" circle></el-button> {{pojo.thumbup}}


  
        

        
       
       </div>
      </div>
     </div>
  

           
    
</div>
        </div>
        <div class="fl right-tag">
            <div class="focus similar-problem">
    <div class="img-title">
        <div class="fl img">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
        </div>
        <div class="fl btn-focus">
            <h4><router-link :to="'/requster/'+pojo.nickname"> {{pojo.nickname}} </router-link></h4>
        <router-link :to="'/requster/'+pojo.nickname">    <button  class="sui-btn btn-info btn-attention">关注</button></router-link>
        </div>
        <div class="clearfix"></div>
    </div>
    <ul class="problem-list">
        <li class="list-item">
        <p class="list-title">我一直都在流浪，可我不曾见过海洋...</p>
        </li>

    </ul>
</div>
<div class="similar-problem">
    <h3 class="title">热门推荐</h3>
    <ul class="problem-list">
        <li class="list-item">
        <a href="#">    <p class="list-title">#北京青年报：内部“线人”制度让安全生产监管更有力</p> </a>
        </li>
        <li class="list-item">
<a href="#">    <p class="list-title">#望海楼：美国是名副其实的国际“驰名双标”</p> </a>        </li>
        <li class="list-item">
<a href="#">    <p class="list-title">#美国政府刚刚发布命令：暂停所有中国客运航班</p> </a>        </li>
        <li class="list-item">
<a href="#">    <p class="list-title">#支持“涉港国安法”，汇丰银行、渣打银行接连表态</p> </a>        </li>
    </ul>
</div>
<div class="similar-problem">
    <h3 class="title">热门吐槽</h3>
    <ul class="problem-list">
        <li class="list-item">
            <p class="list-title">吐槽吐得好，生活没烦恼。</p>
        </li>
        <li class="list-item">
            <p class="list-title">#今年找工作好难啊，高不成低不就的，想去的公司要求又很严厉，难受，想哭。</p>
        </li>
        <li class="list-item">
            <p class="list-title">#不知道大家怎么想的，学习居然成为了不光彩的事，每次去图书馆都要偷偷摸摸的，无语...</p>
        </li>
        <li class="list-item">
            <p class="list-title">#戴着快800度的眼镜终究只有0.5的视力，度数再增加，眼睛完全承受不了，只能说坏到了极致。</p>
        </li>
    </ul>
</div>
        </div>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import '~/assets//css/page-sj-headline-detail.css'
import articleApi from '@/api/article'
import userApi from '@/api/user'
import axios from 'axios'
import {getUser} from '@/utils/auth'
export default {
        created(){
            
        articleApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
        })


    }
,
    asyncData({params}){
      return  articleApi.findById(params.id).then(function (res){
          console.log(res.data.data.userid)
         
          return{
              pojo: res.data.data,
              user: {},
              problemid: params.id
              
             
          }
          
      }
       )
    
    
},
data(){
    return {
         zantepy: 'info'
    }

},
methods: {
    at(){
        articleApi.findById(this.problemid).then(res1=>{
                  this.pojo=res1.data.data

              })

    },
     thumbit(){
         
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才能点赞哦~',
                    type:'warning'
                })
                return 
            }
            if(this.zantepy==='info'){
                articleApi.thumbspit(this.problemid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              articleApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
            articleApi.findById(this.problemid).then(res1=>{
                  this.pojo=res1.data.data

              })
        })
         



                })


            }
            if(this.zantepy==='primary'){
                articleApi.delthumbspit(this.problemid).then(res=>{
                    this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              articleApi.spitthumbif(this.problemid).then(res=>{
            if(res.data.flag){
                this.zantepy='primary'
            }
            else{
                this.zantepy='info'
            }
            articleApi.findById(this.problemid).then(res1=>{
                  this.pojo=res1.data.data

              })
              })



                })

            }
            

        },
    findUser(userid){
         userApi.findById(userid).then(function(res){
            this.user=res.data.data;
        })
    }
}


}
</script>