<template>
<div>
         <div class="wrapper loginsign"> 
   <div class="item signup">
   <div class="form"> 
     <h3 class="loginsign-title" ><a href="#">{{nikename}}</a> &nbsp;&nbsp;
       
             <a @click="jumpNofollow" v-if="FollowPojo.flag===true&&user.token!==undefined" class="sui-btn btn-login">已关注</a>
             <a @click="jumpfollow" v-if="FollowPojo.flag===false||user.token===undefined" class="sui-btn btn-login">关注他</a>
        
         
         </h3> 
     <form class="sui-form"> 
      <div class="control-group"> 
          <div class="home-content"> 
                    <ul class="sui-nav nav-tabs nav-large"> 
                    <li class="active"><a  data-toggle="tab">他的问题</a></li> 
                    </ul> 
                    <div class="tab-content tab-wraped"> 
                    <div id="one" class="tab-pane active"> 
                    <ul class="question-list"> 
                        <li v-for="(item,index) in RequsterProblem" :key="index">
                             <span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span>
                              <span class="title"><router-link :to="'/qa/'+item.id"> {{item.title}} </router-link></span> <span class="fr date">{{item.replytime}}</span> <span class="clearfix"></span>
                        </li> 
                    </ul> 
                    
                    </div> 
                    </div> 
                    <div class="activities"> 
                   
                
                    </div> 
                    
                </div> 
       
       <div class="controls"> 
        
       </div> 
      </div> 
      <div class="different"> 
       <div class="radio-content"> 

       </div> 
      </div> 
      <div class="control-group btn-signup"> 
     
       <div class="controls"> 
       

       </div> 
       
      </div> 
           
     </form> 
    </div>
   </div>
      <div class="item"> 
    <div class="form"> 
           <h3 class="loginsign-title"><a href="#"  >&nbsp;</a></h3> 
     <form class="sui-form "> 
      <div class="control-group"> 
       <div class="home-content"> 
                    <ul class="sui-nav nav-tabs nav-large"> 
                    <li class="active"><a  data-toggle="tab">他的回答</a></li> 
                    </ul> 
                    <div class="tab-content tab-wraped"> 
                    <div id="one" class="tab-pane active"> 
                    <ul class="question-list"> 
                        <li v-for="(item,index) in RespondentProblem" :key="index">
                             <span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span>
                              <span class="title"><router-link :to="'/qa/'+item.id"> {{item.title}} </router-link></span> <span class="fr date">{{item.replytime}}</span> <span class="clearfix"></span>
                        </li> 
                    </ul> 
                    
                    </div> 
                    </div> 
                    <div class="activities"> 
                   
                
                    </div> 
                    
                </div> 
      </div> 
      <div class="control-group"> 
      
       <div class="controls"> 
        
       </div> 
      </div> 
      <div class="controls"> 
       
      
      </div> 
      
     </form> 
    </div> 
   </div>  
  </div>   
</div>
</template>
<script>
import '~/assets/css/page-sj-person-loginsign.css'
import '~/assets/css/page-sj-person-homepage.css'
import '~/assets/css/page-headline-logined.css'
import '~/assets/css/page-sj-qa-logined.css'
import problemApi from '@/api/problem'
import userApi from '@/api/user'
import axios from 'axios'
import {getUser,removeUser} from '@/utils/auth'
export default {
     data(){
        return {
            user: getUser(),
            FollowPojo: {
              
            }
        }
    },
    asyncData({params}){
        
        return axios.all( [ problemApi.listByNikenameByRequster(params.nikename),problemApi.listByNikenameByRespondent(params.nikename)  ] ).then( 
            axios.spread( function( RequsterProblem,RespondentProblem ){
                return {
                    RequsterProblem: RequsterProblem.data.data,
                    RespondentProblem: RespondentProblem.data.data,
                    nikename: params.nikename
                } 
            })
         )
    },
    created(){
        userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data
        })
    },
    methods: {
        jumpfollow(){
        if(getUser().name===undefined){
                this.$message({
                    message:'必须登陆才关注哦~',
                    type:'warning'
                })
                return 
            } 
            
          userApi.doFollow(this.nikename).then(res=>{
               this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data
        })
          })
        
      },
      jumpNofollow(){
          userApi.delFollow(this.nikename).then(res=>{
               this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
               userApi.likeOrNo(this.nikename).then(res=>{
            this.FollowPojo=res.data
        })
          })
        
      }

        
    }
    
}
</script>
