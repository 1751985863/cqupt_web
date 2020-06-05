<template>
<div class="wrapper tag-item"> 
   
   <div class="fl left-list"> 
    <div class="hot-company"> 
     <p class="mail"></p> 
     <div class="company"> 
      <div class="head"> 
       <h4>全部企业</h4> 
      </div> 
      <ul class="yui3-g company" style="display:block;"> 
       <li class="yui3-u-1-5 company-item" v-for="(item,index) in hostList" :key="index"> 
         <p><img :src="item.logo" alt="" /></p> 
         <p class="title">{{item.name}}</p> <p class="position">
           <a :href="'/recruit/enterprise/'+item.id" target="_blank">{{item.jobcount}}个职位</a></p> </li> 
      
      </ul> 
     </div> 
    </div>
   </div>
    <div class="fl right-tag"> 
    <div class="hot-company"> 
     <p class="mail"></p> 
     <div class="company"> 
      <div class="head"> 
       <h4>广告</h4> 
      </div> 
      <ul class="yui3-g company" style="display:block;"> 
       <li class="yui3-u-1-1 company-item"> <p> <a href="https://talent.baidu.com/external/baidu/campus.html"><img src="~/assets/img/widget-ad1.png" alt="" /> </a></p> <p class="title">&nbsp; </p> <p class="position"><a  target="_blank"></a></p> </li> 
       <li class="yui3-u-1-1 company-item"> <p><a href="http://campus.hr.xiaomi.com/#/?_k=lwxwrx"><img src="~/assets/img/widget-ad2.png" alt="" /></a></p> <p class="title"> &nbsp;</p> <p class="position"><a  target="_blank"></a></p> </li> 
      <li class="yui3-u-1-1 company-item"> <p><a href="https://talent.alibaba.com/"><img src="~/assets/img/widget-ad3.png" alt="" /></a> </p> <p class="title"> &nbsp;</p> <p class="position"><a  target="_blank"></a></p> </li> 
      <li class="yui3-u-1-1 company-item"> <p> <a href="https://talent.alibaba.com/"><img src="~/assets/img/widget-ad4.png" alt="" /> </a></p> <p class="title">&nbsp; </p> <p class="position"><a  target="_blank"></a></p> </li> 

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
    return axios.all([enterpriseApi.getList() ]).then(
      axios.spread( function(hostList ){
        return {
          
          hostList: hostList.data.data
        }
      })
    )
  }
}
</script>


