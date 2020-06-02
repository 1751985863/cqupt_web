<template>
    <div class="questions"> 
     <h4><span>我的提问</span></h4> 
     <ul class="question-list"> 
         <li v-for="(item,index) in items" :key="index">
                           <span class="fl good"><span class="num">{{item.visits}}</span> 浏览</span>  <span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span><span class="fl good"><span class="num">{{item.reply}}</span> 回答</span>
                              <span class="title"><router-link :to="'/qa/'+item.id"> {{item.title}} </router-link></span>
                              <div class="fr btns"> 
           <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="delmyprobelm(item.id)">删除问题</button> 
          </div> 
                                <span class="clearfix"></span>
          </li> 
     </ul> 
    </div> 

</template>
<script>
import '~/assets/css/page-sj-person-myquestion.css'
import {getUser,removeUser} from '@/utils/auth'
import problemApi from '@/api/problem'
export default {
    created(){
      return  problemApi.myproblem().then( res => {
          this.items=res.data.data 
       })
    },
    data(){
        return{
            items: [{}]

        }
    },
    methods: {
        delmyprobelm(spitid){
          
                 
            
             this.$confirm('确定要删除该秘密吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
         }).then(()=>{
               problemApi.delmyprobelm(spitid).then(res=>{
             this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
         problemApi.myproblem().then( res => {
          this.items=res.data.data 
       })
          })
             
         

      })
          
        
      }

    }
    
}
</script>

