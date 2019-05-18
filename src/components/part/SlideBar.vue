<template>
   <transition enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutLeft">
       <div class="panel panel-default" v-show="visible" style="width: 200px;position: absolute;z-index: 9;top:53%" >

           <!--panel 和 list需要整合-->
           <div class="panel-body">
               <ul class="list-group">
                   <li class="list-group-item" @click='item.method();close()'  v-for="item in items" :key="item.name">{{item.name}}</li>
               </ul>

           </div>
       </div>
   </transition>

</template>

<script>


    /*
    * 注入地图事件
    *
    * */
let obj=null;

  export default {
    name:'SlideBar',
    components:{
    },
      /*自定义model*/
     /* model:{
         prop:'itemList',
          event:'manager'
      },
    props:{
      itemList:String
    },*/
    data () {
      return {
         visible:false,
          items:[],

      }
    },
    methods: {
        close:function () {
          this.visible=false;

        },
        /*更新视图
        *
        *
        *
        * */
        changeView:function (list) {
          this.items=list;
            this.visible=!this.visible;
        }
    },
      created:function(){
          obj=this;
      },
    mounted:function(){

    },
      watch: {
          items: {
              handler(newValue, oldValue) {
              },
              deep: true
          }
      }

  }

</script>

<style scoped>
.panel{
    opacity: 6;
}
list-group{
    background-color: white;
}

</style>
