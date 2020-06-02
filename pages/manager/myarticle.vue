<template>
    <div class="focus-list"> 
     <div class="myfocus-list"> 
      <ul class="sui-nav nav-tabs nav-large"> 
       <li class="active"><a href="#one" data-toggle="tab">我的文章</a></li> 
      </ul> 
      <div class="tab-content tab-wraped"> 
       <div id="one" class="tab-pane active"> 
        <ul class="focuspro-list"> 
         <li class="pro-item" v-for="(item,index) in items" :key="index"> 
          <div class="fl intro"> 
           <p class="title"><router-link :to="'/head/'+item.id" target="_blank"> 《{{item.title}}》 </router-link></p> 
           <ul class="sui-tag"> 
            <li v-if="item.ispublic==='0'">未公开</li> 
             <li v-if="item.ispublic==='1'">公开</li> 
           </ul> 
          </div>

         <div class="fr btns"> 
    
           <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="ispublic=item.ispublic;handleDelete(item.id);" >切换权限</button> &nbsp;
            <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="delmyarticle(item.id)"  >删除文章</button> 
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
import {getUser,removeUser} from '@/utils/auth'
import problemApi from '@/api/problem'
import articleApi from '@/api/article'
export default {
    created(){
      return  articleApi.myarticle().then( res => {
          this.items= res.data.data 
       })
    },
     methods:{
       onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },

     handleDelete(id) {
         this.checkcode='';
         this.Visible=true;
         let str='';
         if(this.ispublic=='1'){
             str='确定要取消公开此文章吗?'
         }
         else if(this.ispublic=='0'){
             str='确定要公开此文章吗?'
         }
         
      this.$confirm(str, '修改权限', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          articleApi.ispublic(id).then(res=>{
              this.$message({
                
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              });
              articleApi.myarticle().then( res => {
          this.items= res.data.data 
       })
               


          })



        
      })
    },
    delmyarticle(spitid){
            
             this.$confirm('确定要删除该文章吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
         }).then(()=>{
               articleApi.deleteById(spitid).then(res=>{
             this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
          articleApi.myarticle().then( res => {
          this.items= res.data.data 
       })
          })
             
         

      })
          
        
      }
      
    },
    data(){
        return{
            items: [{}],
            ispublic: '0'
        }
    }
    
    
}
</script>

