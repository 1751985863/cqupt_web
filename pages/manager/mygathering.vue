<template>
    <div class="focus-list"> 
     <div class="myfocus-list"> 
      <ul class="sui-nav nav-tabs nav-large"> 
       <li class="active"><a href="#one" data-toggle="tab">参加的活动</a></li> 
      </ul> 
      <div class="tab-content tab-wraped"> 
       <div id="one" class="tab-pane active"> 
        <ul class="focuspro-list"> 
         <li class="pro-item" v-for="(item,index) in items" :key="index"> 
          <div class="fl intro"> 
           <p class="title"><a :href="'/gathering/item/'+item.id" target="_blank"> {{item.name}} </a></p> 
           <ul class="sui-tag"> 
            <li>{{item.sponsor}}</li> 
            <li>{{item.address}}</li> 
           </ul> 
          </div>

         <div class="fr btns"> 
           <span class="mum">{{item.joincount}} 参加</span> 
           <button class="sui-btn btn-danger btn-cancel btn-bordered" @click="gathid=item.id;handleDelete();content='';" >取消参加</button> 
          </div> 
          <div class="clearfix"></div> </li> 
        
        </ul> 
       </div>  
      </div> 
     </div> 
         <el-dialog
        title="请填写验证码" :visible.sync="dialogVisible"
        width="20%">
        <el-input  type="text" :disabled="Visible" v-model="checkcode" /> 
        <br>
        <br>
        <br>
        <el-button  @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="!Visible" type="primary" @click="save">提交</el-button>
        <el-button v-if="Visible" type="primary" @click="sendsms">点击发送验证码</el-button>
    </el-dialog> 

    </div> 

</template>
<script>
import '~/assets/css/page-sj-person-myfocus.css'
import {getUser,removeUser} from '@/utils/auth'
import gatheringApi from '@/api/gathering'
import userApi from '@/api/user'
export default {
    created(){
		userApi.info().then( res=> {
			this.user=res.data.data
        })
         gatheringApi.mygathering().then( res => {
          this.items=res.data.data
       })
	},
    data(){
        return {
            items: [{}],
            saveVisible: false,
            Visible: true,
            gathid: '',
            checkcode: '',
            user:{},
            dialogVisible: false,
            content: '',            
            editorOption: {
                // some quill options
                modules: {
                    toolbar: [
                   
                   
                   
                   
                    ]
                }
            }
        }
    },
    methods:{
       onEditorChange({ editor, html, text }) {
        console.log('editor change!', editor, html, text)
        this.content = html
      },
      save(){
          gatheringApi.delmygathering(this.gathid,this.user.mobile,this.checkcode).then(res=>{
              if(!res.data.flag){
                  this.$message({
                    message:'验证码错误，请新输入',
                    type:'warning'
                })
              

              }  else{
                  this.dialogVisible=false;
              location.href=('/manager/mygathering')
                    
                }


          })

      },
      sendsms(){
          this.Visible=false;
          this.saveVisible=true;
          gatheringApi.gatheringsendsms(this.user.mobile).then(res=>{
              this.$message({
                    message:'验证码已发到您手机:'+this.user.mobile,
                    type:'success'
                })

          })

      },
     handleDelete() {
         this.checkcode='';
         this.Visible=true;
      this.$confirm('确定要取消参加此活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.dialogVisible=true;
          
        
      })
    }
      
    }
    
}
</script>


