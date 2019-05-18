<template>
   <div>


       <!--底部选项卡-->
       <mt-tab-container v-model="selected">
           <mt-tab-container-item v-for='i in tab' :id="i.name" :key='i.name'>
           </mt-tab-container-item>
          <!--  <mt-tab-container-item id="two">

           </mt-tab-container-item>
           <mt-tab-container-item id="three">

           </mt-tab-container-item> -->
       </mt-tab-container>


       <div class="bottom-bar">
           <mt-tabbar >
               <mt-tab-item id="one" v-for='i in tab' :key='i.name'>
                   <Badge :count="taskLength" v-show="i.name.indexOf('任务')>-1&&taskLength>0">
                       <a href="#" class="demo-badge"></a>
                   </Badge>
                   <img slot="icon" src="../../assets/query.png">
                   <span  @click='select(i)'>
                     {{i.name}}
                   </span>

               </mt-tab-item>

               <!-- <mt-tab-item id="five">
                   <img slot="icon" src="../assets/edit.png">
                   <span @click="edit">
                     在线编辑
                   </span>
               </mt-tab-item>-->
           </mt-tabbar>
       </div>
       <!--底部选项卡-->
   </div>
</template>

<script>

  // import User from './User'

  export default {
    name: 'AppTab',
    props:{
      tab:Array,
    },
    data:function () {
      return{
        selected:true
      }
    },
    mounted(){

      },
    methods:{
          select(item){
            Bus.$emit(item.event)
          },

    },
    computed:{
        taskLength(){
            return this.$store.state.taskList.length
        }
    }
  }
</script>

<style scoped>
 .header{
     height: 60px;
     background-color: forestgreen;
     color:white;
     text-align: center;

 }
 .item{
  text-decoration: none;
  color: grey;
 }
    .right,.center,.left{
        width: auto;
        height: inherit;
        float: left;
        margin-left: 12%;
        margin-top: 5%;
    }
    .center{
        width: 45%;
    }
    .mt-tab-item{
        text-decoration: none;
    }
</style>
