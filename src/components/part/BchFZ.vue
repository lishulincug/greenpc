<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
   <Card>
     <Tabs value="name1">
       <TabPane label="草坪" name="name1">
         <Card style="width:350px">
           <!--          分类-->
           <Select v-model="type" style="width:200px">
             <Option v-for="item in bchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
           <!--          常见病虫害-->
           <Collapse v-model="bchItem">
             <Panel name="1" v-for="item in bchList">
               {{item.name}}
               <p slot="content">{{item.content}}</p>
             </Panel>
           </Collapse>

         </Card>
       </TabPane>
       <TabPane label="树木" name="name2">
         <Card style="width:350px">
<!--           树木类型选择-->
           <Select v-model="type" style="width:200px">
             <Option v-for="item in bchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
<!--树木列表-->
           <Select v-model="type" style="width:200px">
             <Option v-for="item in bchType" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>

           

         </Card>
       </TabPane>
     </Tabs>
     <!--    趋势图-->
     <Card :bordered="false">
       <p slot="title">病虫害趋势图</p>
       <p id="chart"></p>
     </Card>
   </Card>
  </transition>
</template>

<script>
    export default {
        name: "BchFZ",
        props:{
          bchList:Array,
          bchType:Array,
        },
        data(){
          return{
              visible:false,
              type:{},
             bchItem:{}
          }
        },

        mounted(){
            Bus.$on('病虫害防治',e=>{
                this.visible=!this.visible
            })
            fun.moveElement(this.$el)
        },
      methods:{

      },
    }
</script>

<style lang="scss" scoped>


</style>
