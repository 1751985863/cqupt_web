<template>
<div>
    <div class="wrapper tag-item">
        <div class="job-intro">
    <div class="left-img">
        <img :src="enterprise.logo" alt="" />
    </div>
    <div class="middle-intro">
       <div class="name">{{enterprise.name}}</div>
       <div class="intro">{{enterprise.summary}}</div>
       <div class="tag">
           <li>{{enterprise.address}}</li><li>{{enterprise.labels}}</li>
       </div>
      
    </div>
    <div class="right-tool">
        
    </div>
    <div style="clear:both"></div>
</div>
        <div class="company-index">
            <li class="active"><span>招聘岗位</span></li>
          
        </div>


    </div>
<div class="wrapper tag-item">
           <div class="fl left-list"> 
                <div class="job-position"> 
             <div class="job-type latest-job"> 
      <div class="head"> 
       <h4 class="title pull-left">所有职位</h4> 
       <span class="more pull-right"><a href="#">&nbsp;&nbsp;<i class="fa fa-angle-right" aria-hidden="true"></i></a></span> 
       <div class="clearfix"></div> 
      </div> 
      <ul class="yui3-g job-list" style="display:block;"> 
       <li class="yui3-u-1-2 job-item" v-for="(item,index) in items" :key="index"> <p>
         <span class="name"> 
           
           <nuxt-link :to="'/recruit/item/'+item.id">{{item.jobname}}</nuxt-link>
           </span><span class="city"><i class="fa fa-map-marker"></i> {{item.address}}</span></p> <p class="need"><span class="money">{{item.salary}}</span>/{{item.condition}}/{{item.education}}</p> <p><span class="company">{{item.createtime}}</span></p> </li> 
      
      </ul> 
     </div> 
        </div>
</div>
</div>
   
    </div>
    
</template>
<script>
import '~/assets/css/page-sj-recruit-company.css'
import '~/assets/css/page-sj-recruit-index.css'
import enterpriseApi from '@/api/enterprise'
import recruitApi from '@/api/recruit'
import axios from 'axios'
export default {
        asyncData({params}){
            return axios.all( [enterpriseApi.findByIdfromrecruit(params.id ),recruitApi.findrecruit(params.id) ] ).then( 
            axios.spread( function( res ,res1){
                return {
                    enterprise: res.data.data,
                    items: res1.data.data
                }
            })
         )

    }
    
}
</script>