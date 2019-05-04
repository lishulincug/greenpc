<template>
  <div :class="$style.root" >
     <Head :class="$style.item" :nav="nav" :title="title" ></Head>
      <Map :class="$style.item" :style="style" :option="map" ref="map" :db="dbConfig"></Map>
      <SecondMenu :class="$style.SecondMenu"></SecondMenu>
      <Center :class="$style.center" :user="user"></Center>
      <Query :class="$style.query" :queryO="query" ref="query"></Query>
      <DispatchTask :class="$style.DispatchTask" :dispatch="dispatch" ></DispatchTask>
      <AreaStatistics :class="$style.AreaStatistics" :option="statistics" ></AreaStatistics>
      <BchFZ :class="$style.BchFZ" :bch="bch"></BchFZ>
      <MapTool :class="$style.MapTool"></MapTool>
      <DataManager :class="$style.DataManager" :option="dataManager"></DataManager>
      <Device :class="$style.Device" :option="device"></Device>
      <FullWindow></FullWindow>
    <Chart :class="$style.Chart"></Chart>
  </div>
</template>

<script>
   import config from '../config/config'
   import Head from '../part/Head'
   import Query from '../part/Query'
   import DispatchTask from '../part/DispatchTask'
   import Map from '../map/Map'
   import SecondMenu from '../part/SecondMenu'
   import DataManager from '../part/DataManager'
   import AreaStatistics from '../part/AreaStatistics'
   import BchFZ from '../part/BchFZ'
   import Device from '../part/Device'
   import Chart from '../part/Chart'
   import MapTool from '../toolbar/MapTool'
   import Center from '../user/Center'
   import db from '../config/db'
   import FullWindow from '../common/FullWindow'
    export default {
        name: "Index",
        components:{
          SecondMenu,
          Head,
          Map,
          MapTool,Center,Query,DispatchTask,AreaStatistics,BchFZ,DataManager,Device,FullWindow,Chart
        },
        data:function () {
         return{
           nav:config.resourceMenu,SecondMenu,
              map:config.map,
             dbConfig:db,
             title:config.title,
             query:config.query,
             dispatch:config.dispatchTask,
             statistics:config.AreaStatistics,
             bch:config.bch,
             dataManager: config.dataManager,
             device:config.device
         }
        },
        computed:{
          style(){
            return {
              height:document.documentElement.clientHeight*0.93+'px'
            }
          },
          user(){
            return this.$store.state.user
          },
            getMap(){
              return this.$refs.map.map
            }
        },
        mounted() {
              // this.$refs.query.map=this.getMap()
            this.$Message.info('hello world!')
        },
      methods:{
          control(i){
            switch (Number.parseInt(i)) {
              case 0:
                this.$refs.map.addScale()
                break;
              case 1:
                this.$refs.map.addMinimap();
                break;
              case 2:
                this.$refs.map.reset();
                break;
            }
          }
      }
    }
</script>

<style lang="scss" module>
  $height:640px;
 .root{
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
     flex-direction: column;
     .item:nth-child(1){

     }
     .item:nth-child(2){
     width: 100%;
     height: $height;
     z-index: 0;

     /*pointer-events: none;*/
   }
     .SecondMenu,.maptool,.center,.query,.DispatchTask,.AreaStatistics,.BchFZ,.MapTool,.DataManager,.Device,.Chart{
         position: absolute;
         z-index: 999;
     }
   .SecondMenu{
     right: 0.6%;
     top: 18%;
   }
   .maptool{

     right: 0.6%;
     top: 13%;
   }
   .center{
     width: 30%;
     height: 40%;

     left: 39%;
     top: 33%;
   }
     .query{
         left:39%;
         top:20%
     }
     .DispatchTask{
         left:35%;
         top:20%
     }
     .AreaStatistics,.Device,.DataManager{
         right:1%;
         top:12%
     }
   .AreaStatistics{
     right: 3%;
     top: 8.5%;
   }
     .BchFZ{
         width: 50%;
         left:30%;
         top:22%
     }
     .MapTool{
         left:91%;
         top:80%
     }
     .Chart{
         left:0%;
         bottom:1%

     }
 }
</style>
