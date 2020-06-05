<template>
    <div>
   <div class="wrapper tag-item"> 
    <div class="fl left-list">
         <el-carousel height="300px" direction="vertical" :autoplay="false">
                 <el-carousel-item >
      <h3 class="medium">
          <img src="~/assets/img/tucao2.png" />
      </h3>
    </el-carousel-item>
    <el-carousel-item >
      <h3 class="medium">
          <img src="~/assets/img/tucao1.png" />
      </h3>
    </el-carousel-item>

    <el-carousel-item >
      <h3 class="medium">
          <img src="~/assets/img/tucao3.png" />
      </h3>
    </el-carousel-item>
    
      <div class="clearfix"></div> 
  </el-carousel> 
  <br>
     <div class="tc-data-list"> 
      <div class="tc-list" v-infinite-scroll="loadMore"> 

<div v-for="(item,index) in items" :key="index">
       <el-alert   :title="item.publishtime+' 发布'"  :type="color[index%4]"  effect="dark">
   <el-row>
 <router-link style="color:white" :to="'/spit/'+item._id"  >  <h3>{{item.content}}</h3></router-link>
  </el-row>
  <el-row>
  <br>
  <el-button icon="el-icon-star-off" size="small" circle></el-button> {{item.comment}}
  <el-button icon="el-icon-chat-dot-square" size="small" circle></el-button> {{item.thumbup}}
  <el-button icon="el-icon-view" size="small" circle></el-button> {{item.visits}}
  <br>
  </el-row>
  </el-alert>
  <br>
</div>
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>       
      <a class="sui-btn btn-block btn-share" @click="jumpspit">发吐槽</a>
     </div> 
     <div class="list"> 
          <div class="head"> 
        <h3 class="title">热点</h3> 
       </div> 
         <ul>
             <li class="card-item"> 
          <div class="img"> 
          <a href="http://nodejs.cn/"> <img src="~/assets/img/widget-ad01.png" alt="" /> </a>
          </div> 
          <div class="info">
           <div class="fl intro"> 

           </div> 
           <div class="clearfix"></div> 
          </div>
           </li> 
            <li><br></li> 
              <li class="card-item"> 
          <div class="img"> 
          <a href="https://job.alibaba.com/zhaopin/index.htm"> <img src="~/assets/img/hot2.png" alt="" /> </a>
          </div> 
          <div class="info">
           <div class="fl intro"> 

           </div> 
           <div class="clearfix"></div> 
          </div>
           </li>
           <li><br></li> 
              <li class="card-item"> 
          <div class="img"> 
          <a href="https://talent.baidu.com/external/baidu/campus.html"> <img src="~/assets/img/hot3.png" alt="" /> </a>
          </div> 
          <div class="info">
           <div class="fl intro"> 

           </div> 
           <div class="clearfix"></div> 
          </div>
           </li> 
         </ul>
     </div>
    </div> 
    <div class="clearfix"></div> 
   </div>
   </div>
</template>
<script>
import '~/assets/css/page-headline-logined.css'
import '~/assets/css/page-sj-spit-index.css'
import spitApi from '@/api/spit'
import {getUser} from '@/utils/auth'

export default {
    asyncData(){
        return spitApi.search(1,10).then( res=> {
            let tmp= res.data.data.rows.map( item=>{
                return {
                    ...item,
                    zan: ''
                }
            })

            return {items:tmp}
        })
    },
    data(){
        return {
            color: ['success','info','warning','error'],
            pageNo: 1
        }
    },
    methods:{
        at(id){
            alert(id)

        },
        loadMore(){            
           this.pageNo++ 
           spitApi.search( this.pageNo,10,{state:'1'} ).then( res=>{
                let tmp= res.data.data.rows.map( item=>{
                    return {
                        ...item,
                        zan: ''
                    }
                })
               this.items=this.items.concat( tmp  )
           })
        },
        thumbup(index){
            if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才可以点赞哦~',
                    type:'warning'
                })
                return 
            } 
            if(this.items[index].zan==='color'){
                this.$message({
                    message:'不可以重复点赞哦~',
                    type:'warning'
                })
                return
            }
            this.items[index].zan='color'
            spitApi.thumbup(this.items[index].id).then( res=>{
                if(res.data.flag){
                    this.items[index].thumbup++
                }
            })
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
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

