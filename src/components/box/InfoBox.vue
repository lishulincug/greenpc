<template>
  <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

    <div class="panel panel-default root" v-show="visible">
      <div class="panel-heading">
        <p>地物信息</p>
        <p @click="close"><span class="glyphicon glyphicon-remove"></span></p>
      </div>
      <div class="panel-body">
        <ul class="list-group">
          <li class="list-group-item" v-for="(item,i) in list">
             {{i}}&nbsp;&nbsp;&nbsp;{{list[i]}}
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "CaoGuanGai",
       data:function(){
          return{
            visible:false,
          }
       } ,
       props:{
         list:Object,
       },
      methods:{
          
         show:function(){
           this.visible=true
         },
         close:function () {
           this.visible=false
         },

        }
    }
</script>

<style scoped>
.root{
  width: 80%;
  position: absolute;
  left: 11%;
  top: 20%;
  z-index: 9;
}
 .tab{
   width: 100%;
   height: 30px;
 }
 .tab ul{
   margin-left: 17%;
   padding: 0.2rem 0rem 0 0 ;
   display: flex;
   flex-direction: row;

 }
 .radio{

   background-color: black;
 }
  .tab li{
     list-style: none;
    width: 40%;
    cursor: pointer;
  }
  a{
    cursor: pointer;
  }
  .height{
    border-bottom: 4px solid lightgreen;
  }
  .normal{
    border-bottom: 4px solid gray;
  }
  .panel-heading{
    display: flex;
    padding-left: 4.2rem;
  }
.panel-heading p:nth-child(1){
  width: 90%;
}
</style>
