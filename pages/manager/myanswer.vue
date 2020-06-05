<template>
    <div class="answers"> 
     <h4><span>我的回答</span></h4> 
     <ul class="answer-list"> 
 <li v-for="(item,index) in items" :key="index">
                             <span class="fl good"><span class="num">{{item.thumbup}}</span> 有用</span>
                              <span class="title"><router-link :to="'/qa/'+item.problemid"> {{item.content}} </router-link></span> <span class="fr date">{{item.replytime}}</span> <span class="clearfix"></span>
                        </li>     </ul> 
    </div> 
</template>
<script>
import '~/assets/css/page-sj-person-myanswer.css'
import problemApi from '@/api/problem'
export default {
    created(){
      return  problemApi.myreply().then( res => {
          this.items=res.data.data 
       })
    },
    data(){
        return{
            items: [{}]
        }
    }
    
}
</script>

