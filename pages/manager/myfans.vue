<template>
    <div class="focus-list"> 
     <div class="myfocus-list"> 
      <ul class="sui-nav nav-tabs nav-large"> 
       <li class="active"><a href="#one" data-toggle="tab">我的粉丝</a></li> 
      </ul> 
      <div class="tab-content tab-wraped"> 
       <div id="one" class="tab-pane active"> 
        <ul class="focuspro-list"> 
         <li class="pro-item" v-for="(item,index) in items" :key="index"> 
          <div class="fl intro"> 
           <p class="title"><router-link :to="'/requster/'+item.nickname"> {{item.nickname}} </router-link></p> 
           <ul class="sui-tag"> 
            <li>{{item.locationcity}}</li> 
            <li>{{item.major}}</li> 
            <li>{{item.college}}</li> 
           </ul> 
          </div> 
          <div class="fr btns"> 
           <span class="mum">{{item.fanscount}} 关注</span> 
           <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="jumpfollow(item.nickname)">关注他</button> 
          </div> 
          <div class="clearfix"></div> </li> 
        
        </ul> 
       </div>  
      </div> 
     </div> 
    </div> 

</template>
<script>
import '~/assets/css/page-sj-person-myfocus.css'
import userApi from '@/api/user'
export default {
  asyncData(){
      return  userApi.myfans().then( res => {
          return {items: res.data.data }
       })
    },
    methods: {
         jumpfollow(nikename){
             this.$confirm('确定要关注他吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
          userApi.doFollow(nikename).then(res=>{
               this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
            
          })

      })
          
        
      }
    }


    
}
</script>
