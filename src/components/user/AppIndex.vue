<template>
 <div>

    <Header class='Header'></Header>
     <!--补植-->

     <!--底部导航-->
     <AppTab  :tab='tab' ></AppTab>
     <!--侧滑栏-->

       <!--提示框-->
     <!-- <Info ref="info"></Info> -->
     <!--进度条-->
     <Progress class="progress" ref="progress"></Progress>
     <Map class="map"  :option="map" ref="map" v-show="showMap" :db="dbConfig"></Map>
     <TaskList class="TaskList" v-show="showTask"></TaskList>
     <BchJl class="bch"></BchJl>
        <Message class="Message"></Message>
     <LaBa class="LaBa"></LaBa>
 </div>

</template>

<script>
    import {mapMutations,mapState} from 'vuex'
    import AppTab from '../part/AppTab'
    import Header from '../part/Header'
    import TaskList from '../part/TaskList'
    import BchJl from '../box/BchJl'
    import LaBa from '../box/LaBa'
    import InfoBox from '../box/InfoBox'
    import Work from '../box/Work'
    import Toolbar from '../toolbar/Toolbar'
    import Message from '../part/Message'
    import Progress from '../box/Progress'
    import Map from '../map/Map'
    import db from '../config/db'

    import {findTask} from '../../common/api'

  export default {
    name: 'Index',

    data:function () {
      return{
        /*定义事件列表*/
           eventList:[],
           query_show:false,
           showTask:false,
           showMap:true,
           map:config.map,
           tab:config.AppTab,
           dbConfig:db,

      }
    },
    components:{
      // AppTab,SlideBar,QueryForm,BZ,CutForm,Caopinggg,Toolbar,InfoBox,Work,Progress,BchJl,
      //   Info,
      AppTab,Toolbar,InfoBox,Work,Progress,Map,Header,TaskList,BchJl,Message,LaBa
      },



    //组件装载之后
    mounted:function(){
        /*初始化事件*/
       Bus.$on('showTask',this._showTask)
       Bus.$on('showMap',this._showMap)
       Bus.$on('getTask',this.setTask)
      //   获取任务
       this.setTask()

    },

    methods:{
      ...mapMutations([
        'setTaskList',
      ]),
     _showMap(){
      this.showMap=true
      this.showTask=false

     },
     _showTask(){
      if (this.showMap){
       this.showMap=false
       this.showTask=true

      }else{
       this.showMap=true
       this.showTask=false

      }


     },


      /*****************************************************************/
     setTask(){
      let user=this.$store.state.person;
      findTask(`user=${user.zh}`).then(e=>{
          if (e.data){
           if (e.data&&e.data.length>0){
            this.setTaskList(e.data)
           }

          }
      },)
     }
    },
   computed:{

   },

   watch:{

   },
  }

</script>

<style scoped>
    .anchorBL{display:none;}


    .menu,.cpMenu,.treeMenu,.bch,.Message,.LaBa{
        position: absolute;
        left: 86%;
    }
    .map{
     width: 100%;
     height: 570px;
     z-index: 0;


     /*pointer-events: none;*/
   }
   .Header{
     position: fixed;
     top:0;
     width: 100%;
     z-index: 999

   }
    .TaskList,.map{
     margin-top: 10%;
    }
   .TaskList{
    width: 100%;
    height: 570px;
   }
    .progress{position: absolute;
        width: 60%;
        left: 20%;
        top:30%;
        z-index: 99;
    }
  .Message{
    left:10%;
    top:40%;
  }
 .LaBa{
  right: 0;
  top: 80%;
 }
</style>
