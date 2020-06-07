<template>
<div class="wrapper"> 
<div class="sj-content"> 
    <div class="left-nav"> 
     <div class="float-nav" id="float-nav"> 
      <ul class="sui-nav nav-tabs nav-xlarge tab-navbar tab-vertical"> 
       <li class="active"><a>导航</a></li> 
       <li><a href="http://jwc.cqupt.edu.cn/">教务在线</a></li> 
      
       
       <li><a href="http://job.cqupt.edu.cn/portal/home.html">就业信息</a></li> 
        <li><a href="https://github.com/">GitHub</a></li> 
         <li><a href="https://mvnrepository.com/artifact/oracle/ojdbc6/11.2.0.3?__cf_chl_jschl_tk__=ffd0ac4cf73bece0428b62b0a345a670e439b39f-1584774421-0-ATgB4QbPsD6DGR0UryjYUchCyoe19j-SyQnxyk5drCAJ1zJDj4jPeBe-gn1New0jlPh-cmZoogn8xaxeCglLGAHBp4NooPkx2DpFH7urHpN209ShI0Wt48wp8tdrzT7KU4t2XwDV2xHwLaw5hcjxfNdi5MKZGTHSCHhUW50P3hQPvP-k8mkL6Zr-CZA-_DUTrRdcbAg0QXKjdX-djOuVxAqsPc5MWdgV-97WpmSRWmB5i8yFrsZQfU_Zm817-mlmdHXOyQoiMeeZltcpNqRTV6d-kkyXWNKvIy6hJkm581y9Ujs7U9JMHRbl-QHAqOm_Lg7BiQOUq4nB-vbMWszGHC4r7hcLkPeyic4j_dWqa9UhTBY9vGICgQpuB3UFb9RqTQ">Maven库</a></li> 
       <li><a href="https://leetcode-cn.com/explore/">LeetCode</a></li> 
         <li><a href="https://hub.docker.com/">DockerHub</a></li> 
     
      </ul> 
     </div> 
    </div> 
    <div class="right-content"> 
     <div class="fl middle"> 
      <el-carousel indicator-position="outside">
    <el-carousel-item >
              <a href="#"><img src="~/assets/img/banner2.png" /></a> 
    </el-carousel-item>
    <el-carousel-item >
           <a href="https://spring.io/">   <img src="~/assets/img/banner1.png" /></a>
    </el-carousel-item>
    <el-carousel-item >
              <a href="https://spring.io/"><img src="~/assets/img/banner3.png" /></a> 
    </el-carousel-item>
  </el-carousel> 
      <div class="data-list"> 
       
       <div v-for="(item,index) in items" :key="index">
       <el-alert effect="dark"  :title="item.createtime+' 发布'"  :type="color[1]"  >
   <el-row>
 <router-link style="color:white" :to="'/head/'+item.id"  >  <h3>{{item.title}}</h3></router-link>
  </el-row>
  <el-row>
    <h4>作者：{{item.nickname}} </h4>
  <br>
  <el-button icon="el-icon-star-off" size="small" circle></el-button> {{item.thumbup}}
  <el-button icon="el-icon-view" size="small" circle></el-button> {{item.visits}} 
  <br>
  </el-row>
  </el-alert>
  <br>
</div> 
       <div class="stop"> 
        <a @click="loadMore">内容看不够，点击刷新 <i class="fa fa-refresh" aria-hidden="true"></i></a> 
       </div> 
       
       <ul id="loaded" class="headline"> 
       </ul> 
      </div> 
      <!-- <script src="~/assets/data-list.js" type="text/javascript"></script> --> 
     </div> 
     <div class="fl right">
       <div class="activity"> 
       <div class="acti">
        <img src="~/assets/img/widget-activity01.png" alt="活动一" />
       </div> 
       <div class="acti">
        <img src="~/assets/img/widget-activity02.png" alt="活动一" />
       </div>
      </div>
      <div class="block-btn"> 
       <p>今天，有什么好东西要和大家分享么?</p> 
       <a class="sui-btn btn-block btn-share" @click="jumphead"  target="_blank">发布文章</a> 
       <a class="sui-btn btn-block btn-share" @click="jumpqa" target="_blank">发布问题</a> 
       <a class="sui-btn btn-block btn-share" @click="jumpspit"  target="_blank">发布秘密</a> 
      </div>   
      <div class="card-list"> 
       <div class="head"> 
        <h3 class="title">免费资源</h3> 
       </div> 
       <div class="list"> 
        <ul>
          <li class="card-item"> 
          <div class="img"> 
          <a href="https://pan.baidu.com/s/1Q5NklNGneeeM3nvugvPHGQ"> <img src="~/assets/img/baiudpan.png" alt="" /> </a>
          </div> 
          <div class="info">
           <div class="fl intro"> 
            <p>《JavaSE入门》<span class="date">提取码：z1hn</span></p> 
            <p class="name">点击图片即可获取资源 <span class="date"></span></p> 
           </div> 
           <div class="clearfix"></div> 
          </div>
           </li> 

		</ul>
		</div>
		</div>
      
      

      <div class="ad-carousel"> 
       <div class="carousel"> 
        <div id="myCarousel" data-ride="carousel" data-interval="4000" class="sui-carousel slide"> 
         <ol class="carousel-indicators"> 
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li> 
          <li data-target="#myCarousel" data-slide-to="1"></li> 
          <li data-target="#myCarousel" data-slide-to="2"></li> 
         </ol> 
         <div class="carousel-inner"> 
          <div class="active item"> 
          <a href="https://www.runoob.com/w3cnote_genre/algorithm"> <img src="~/assets/img/ad01.png" /> </a>
          </div> 
          <div class="item"> 
           <img src="~/assets/img/widget-ad01.png" /> 
          </div> 
          <div class="item"> 
           <img src="~/assets/img/widget-ad01.png" /> 
          </div> 
         </div> 
         <span class="adname">广告</span> 

         
        </div> 
       </div> 
      </div> 
     
  
      <!-- <link rel="import" href=".~/assets/.~/assets/modules/ui-modules/footer/footer.html?__inline"> --> 
     </div> 
    </div> 
   </div> 
</div>
</template>
<script>
import '~/assets/css/page-headline-logined.css'
import problemApi from '@/api/problem'
import articleApi from '@/api/article'
import gatheringApi from '@/api/gathering'
import spitApi from '@/api/spit'
import axios from 'axios'
import {getUser} from '@/utils/auth'
export default {

 data(){
      return {
        color: ['success','info','warning','error'],
        pageNo: 1
      }
    },
    asyncData(){
      return axios.all( [articleApi.search(1,5,{ispublic: "1"})]).then(
            axios.spread( function(article){
                return {
                  items: article.data.data.rows


                   
                
                }
            })
         )

    },
    methods: {
      loadMore(){
        this.pageNo++
        articleApi.search(this.pageNo,5,{ispublic: "1"}).then( res => {
          this.items = this.items.concat( res.data.data.rows )
          if(res.data.data.rows == undefined || res.data.data.rows.length <= 0){
            this.$message({
                  message: "已经没有新内容了哦",
                  type: 'warning'
              })
          }
        })
      },
      logined(){
         if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以点赞哦~',
                    type:'warning'
                })
                return 
            } 
         

      },
      jumpqa(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
        
          this.$router.push('/qa/submit')
        
      },
      jumpspit(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
        
          this.$router.push('/spit/submit')
        

      },
      jumphead(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才分享哦~',
                    type:'warning'
                })
                return 
            } 
          this.$router.push('/head/submit')
        
      }
      
    }

  
}
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

