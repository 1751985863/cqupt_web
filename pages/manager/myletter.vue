<template>
     <el-tabs v-model="activeName" @tab-click="handleClick">
<!-- 我收到的私信 -->
    <el-tab-pane  name="second">
      <span slot="label">我收到的私信 {{letteritemsgettotal}}</span>
         <div v-for="(item,index) in letteritemsget" :key="index">
    <el-alert  @close="deleteletter(item.id)"  title=""  type="success">
     <div><el-avatar :src="item.avatar" ></el-avatar> </div>    <!-- 头像 -->
     <el-tag type="primary" size="medium" > <a :href="'/requster/'+item.nickname">{{item.nickname}}</a></el-tag> 
     <!-- nickname -->

<el-button type="info" size="mini" icon="el-icon-time" plain >{{item.publishtime}}</el-button>



  {{item.content}}

   </el-alert>
   <br>
   </div>
     

    </el-tab-pane>

<!-- 我发送的私信 -->
 
    <el-tab-pane name="third">
       <span slot="label">我发送的私信 {{letteritemstotal}}</span>
       <div v-for="(item,index) in letteritems" :key="index">
    <el-alert   @close="deleteletter(item.id)" title=""  type="success">
     <div><el-avatar :src="item.targetavatar" ></el-avatar> </div> 
        <!-- 头像 -->
       
     <el-tag type="primary" size="medium" > <a :href="'/requster/'+item.targetusername">{{item.targetusername}}</a></el-tag> <!-- nickname -->

<el-button type="info" size="mini" icon="el-icon-time" plain >{{item.publishtime}}</el-button>



  {{item.content}}

   </el-alert>
   <br>
   </div>

    </el-tab-pane>

  </el-tabs>

</template>
<script>
import letterApi from '@/api/letter'
  export default {
    data() {
      return {
        letteritemstotal: 0,
        letteritemsgettotal: 0,
        letteritems: [],
        letteritemsget: [],
        activeName: 'second'
      };
    },
    created(){
        letterApi.lettersend().then(res1=>{
            this.letteritems=res1.data.data.rows;
            this.letteritemstotal=res1.data.data.total;
        });
        letterApi.letterget().then(res1=>{
            this.letteritemsget=res1.data.data.rows;
            this.letteritemsgettotal=res1.data.data.total;
        })

    },
    methods: {
      deleteletter(letterid){
        this.$confirm('确定要删除这条私信吗', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(()=>{
        letterApi.deleteletter(letterid).then(res=>{
            this.$message({
                  message: res.data.message,
                  type: (res.data.flag?'success':'error')
              })
              letterApi.lettersend().then(res1=>{
            this.letteritems=res1.data.data.rows;
            this.letteritemstotal=res1.data.data.total;
        });
        letterApi.letterget().then(res1=>{
            this.letteritemsget=res1.data.data.rows;
            this.letteritemsgettotal=res1.data.data.total;
        })
        })


      })


      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

