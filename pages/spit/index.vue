<template>
    <div>
   <div class="wrapper tag-item"> 
    <div class="fl left-list"> 
     <div class="tc-data-list"> 
      <div class="tc-list" v-infinite-scroll="loadMore"> 
       <ul class="detail-list"> 
        <li class="qa-item" v-for="(item,index) in items" :key="index"> 
         <div class="fl record"> 
          <div class="number"> 
           <div class="border useful"> 
            <a href="#" class="star">浏览量</a> 
            <p class="zannum"> {{item.visits}} </p> 
           </div> 
           <div class="border answer"> 

           </div> 
          </div> 
         </div> 
          
         <div class="info"> 
            
          <p class="text"> <router-link :to="'/spit/'+item._id"  > {{item.content}} </router-link> </p> 
          <div class="other"> 
           <div class="fl date"> 
            <span>{{item.publishtime}}</span> 
           </div> 
          </div> 
         </div> 
         <div class="clearfix"></div> </li>  
       </ul> 
      </div> 
     </div> 
    </div> 
    <div class="fl right-tag"> 
     <div class="block-btn"> 
      <p>来个匿名吐槽，发泄一下你心中的怒火吧！</p>       
      <a class="sui-btn btn-block btn-share" @click="jumpspit">发吐槽</a>
     </div> 
    </div> 
    <div class="clearfix"></div> 
   </div>
   </div>
</template>
<script>
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

