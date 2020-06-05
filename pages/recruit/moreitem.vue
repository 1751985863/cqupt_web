<template>
<div class="wrapper tag-item"> 
   <div class="fl left-list"> 



    <div class="job-position"> 
     <div class="job-type reco-job"> 
      <div class="head"> 
       <h4 class="title pull-left">全部职位&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4> 
       <el-form ref="form" >
      <el-input size="mini" v-model="recruitkey" style="width:220px" placeholder="请输入职位名称"
            ></el-input>
            <el-button size="mini" icon="el-icon-search" @click="serachit()"></el-button>
      </el-form>
       <span class="more pull-right"><a href="#">&nbsp;&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></a></span> 
       <div class="clearfix"></div> 
      </div> 
      <ul class="yui3-g job-list" style="display:block;"> 
       <li class="yui3-u-1-2 job-item" v-for="(item,index) in recommendList" :key="index"> 
         <p><span class="name">
           <nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link>
         </span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p> <p class="need"><span class="money">{{item.salary}}</span>/{{item.condition}}/{{item.education}}</p> <p><span class="company">{{item.createtime}}</span></p> 
      </li> 
       
      </ul> 
     </div> 
    </div> 
   </div> 
   <div class="fl right-tag"> 
    <div class="hot-company"> 
     <p class="mail"></p> 
     <div class="company"> 
      <div class="head"> 
       <h4>热门企业</h4> 
      </div> 
      <ul class="yui3-g company" style="display:block;"> 
       <li class="yui3-u-1-3 company-item" v-for="(item,index) in hostList" :key="index"> 
         <p><img :src="item.logo" alt="" /></p> 
         <p class="title">{{item.name}}</p> <p class="position">
           <a :href="'/recruit/enterprise/'+item.id" target="_blank">{{item.jobcount}}个职位</a></p> </li> 
      
      </ul> 
     </div> 
    </div> 
   </div> 
   <div class="clearfix"></div> 
  </div> 
</template>
<script>
import '~/assets/css/page-sj-recruit-index.css'
import recruitApi from '@/api/recruit'
import enterpriseApi from '@/api/enterprise'
import axios from 'axios'
export default {    
  asyncData(){
    return axios.all([recruitApi.getList(),enterpriseApi.hotlist() ]).then(
      axios.spread( function( recommendList ,hostList ){
        return {
          recommendList: recommendList.data.data,
          hostList: hostList.data.data
        }
      })
    )
  },
  data(){
    return {
      recruitkey: ''
    }

  },
  methods: {
    serachit(){
      if(this.recruitkey===''){
        recruitApi.getList().then(res=>{
          this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
          this.recommendList=res.data.data
        })
        return
      }
      recruitApi.searchbykeyword(this.recruitkey,1,100).then(res=>{
        if(res.data.data.rows === undefined || res.data.data.rows.length <= 0){
            this.$message({
                  message: "没有查询到相关岗位哦",
                  type: 'warning'
              })
          }
          else{
            this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
          }
        
        this.recommendList=res.data.data.rows
      })
    }
    
  }
}
</script>


