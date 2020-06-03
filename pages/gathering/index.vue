<template>
<div class="wrapper activities"> 
   <div class="activity-card-list"> 
    <div class="top-title"> 
     <h4 class="latest">最新活动</h4>      
     <div class="clearfix"></div> 
    </div> 
    <div class="activity-list" v-infinite-scroll="loadMore"> 
     <ul class="activity"> 
      <li class="activity-item" v-for="(item,index) in items" :key="index"> 
       <div class="activity-inner"> 
        <a href="http://"></a> 
        <div class="img">
         <a :href="'/gathering/item/'+item.id" target="_blank"><img :src="item.image" alt="" /></a>
        </div> 
        <div class="text"> 
         <p class="title">{{item.name}}</p> 
         <div class="fl goin"> 
          <p>时间：{{item.starttime}}</p> 
          <p>城市：{{item.address}}</p> 
         </div> 
         <div class="fr btn"> 
          <span class="sui-btn btn-bao"   ><a style="color:white" :href="'/gathering/item/'+item.id" target="_blank">查看详情</a></span> 
         </div> 
                       
          
         <div class="clearfix"></div> 
        </div> 
       </div>

        </li> 

     </ul> 
    </div> 

   </div> 

  </div> 
</template>
<script>
import '~/assets/css/page-sj-activity-index.css'
import gatheringApi from '@/api/gathering'
import {getUser} from '@/utils/auth'
import userApi from '@/api/user'
import axios from 'axios'
export default {
    data(){
      return {
        gathid: '',
        checkcode: '',
        Visible: true, //按钮显示
        dialogVisible: false,//发送验证码的窗口
        dialogFormVisible: false, //报名窗口
        pageNo: 1
      }
    },
    asyncData(){
       return axios.all( [gatheringApi.search(1,12,{state:'1'}) ] ).then( 
            axios.spread( function( res ){
                return {
                    items: res.data.data.rows
                }
            })
         )
    },
    methods: {
      at(id){
        alert(id)

      },
      loadMore(){
        this.pageNo++
        gatheringApi.search(this.pageNo,12,{state:'1'}).then( res => {
          this.items = this.items.concat( res.data.data.rows )
        })
      }
    }
}
</script>
<style type="text/css">

a:link{color:white;}

a:visited{color:black;}

</style>

