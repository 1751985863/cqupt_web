<template>
    <div class="answers"> 
     <h4><span>我的秘密</span></h4> 
     <ul class="answer-list"> 
 <li v-for="(item,index) in items" :key="index">
                             <span class="fl good"><span class="num">{{item.visits}}</span> 浏览</span><span class="fl good"><span class="num">{{item.comment}}</span> 评论</span>
                              <span class="title"><router-link :to="'/spit/'+item._id"  > {{item.content}} </router-link></span> <span class="fr date"></span> <div class="fr btns"> 
           <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="delspit(item._id)">删除秘密</button> 
          </div> 
      
          <span class="clearfix"></span>

                        </li>     </ul> 
    </div> 
</template>
<script>
import '~/assets/css/page-sj-person-myanswer.css'
import spitApi from '@/api/spit'
export default {
    created(){
      return  spitApi.myspit().then( res => {
          this.items=res.data.data 
       })
    },
    data(){
        return {
            items: [{}]

        }
    },
    methods: {
        delspit(spitid){
                 
            
             this.$confirm('确定要删除该秘密吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
         }).then(()=>{
             spitApi.delmyspit(spitid).then(res=>{
             this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
         spitApi.myspit().then( res => {
          this.items=res.data.data 
                })
          })
         

      })
          
        
      }

    }
    
}
</script>

