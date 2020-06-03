<template>
    <div class="wrapper headline-content">
        <div class="fl left-list">
            <div class="problem-detail">
    <!-- title area  -->
    <div class="title-intro">
        <h2>{{pojo.title}}</h2><a @click="at">an</a>
        <div class="operate">
            <span class="fl author">{{pojo.nickname}}  发布　　<span class="time">{{pojo.createtime}}</span></span>
            <span class="fr ">收藏</span> 
        </div>
        <div class="clearfix"></div>
        <div class="content">
            <p>{{pojo.content}}</p>
             
        </div>
    </div>
    <div class="tc-detail"> 
      <!-- 标题区 --> 
      <div class="detail-tit"> 
          <div class="detail-tool"> 
              <div><el-button @click="thumbit" :type="zantepy" size="mini" icon="el-icon-thumb" circle></el-button> {{pojo.thumbup}}</div>

  
        

        
       
       </div>
      </div>
     </div>
  

           
    
</div>
        </div>
        <div class="fl right-tag">
            <div class="focus similar-problem">
    <div class="img-title">
        <div class="fl img">
            <img src="~/assets/img/widget-photo.jpg" alt="">
        </div>
        <div class="fl btn-focus">
            <h4><router-link :to="'/requster/'+pojo.nickname"> {{pojo.nickname}} </router-link></h4>
            <button class="sui-btn btn-info btn-attention">关注</button>
        </div>
        <div class="clearfix"></div>
    </div>
    <ul class="problem-list">
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
    </ul>
</div>
<div class="similar-problem">
    <h3 class="title">热门推荐</h3>
    <ul class="problem-list">
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
    </ul>
</div>
<div class="similar-problem">
    <h3 class="title">热门吐槽</h3>
    <ul class="problem-list">
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
        </li>
        <li class="list-item">
            <p class="list-title">如果你还是象棋新手，学会这些套路，你就可以去破残局赚钱了！</p>
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
                    message:'必须登陆才分享哦~',
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