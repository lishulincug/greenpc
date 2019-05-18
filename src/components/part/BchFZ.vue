<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <Card style="width:350px">
          <!--           植被类型选择-->
          <Select v-model="zbType" style="width:200px" @change="changeZb">
              <Option v-for="item in zbTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

          <!--选中树木：显示树木列表-->
          <Select v-model="treeType" style="width:200px" @change="changeTreeType">
              <Option v-for="item in treeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

          <!--选中树木：树木类型-->
          <Select v-model="tree" style="width:200px" @change="changeTree">
              <Option v-for="item in treeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>


          <!--     病虫害 分类-->
          <Select v-model="bchType" style="width:200px" @change="changeBchType">
              <Option v-for="item in bchTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>

          <!--  常见病虫害-->
          <Collapse v-model="bchItem">
              <Panel name="1" v-for="item in bchList">
                  {{item.name}}
                  <p slot="content">{{item.content}}</p>
              </Panel>
          </Collapse>
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
            bch:Object,
        },
        data(){
          return{
              visible:false,
              bchList:[],
              bchType:{},
              bchTypeList:[],
              type:{},
              zbType:{},
              zbTypeList:this.bch.zbTypeList,
              treeType:{},
              treeTypeList:[],
              tree:{},
              treeList:[],
              bchItem:{},

          }
        },

        mounted(){
            Bus.$on('病虫害防治',e=>{
                this.visible=!this.visible
            })
            fun.moveElement(this.$el)
        },
      methods:{
          changeZb(){
            if (this.zbType.name.i){

            }
          },
          changeTreeType(){

          },
          changeTree(){

          },
          changeBchType(){

          },

      },
    }
</script>

<style scoped>
#chart{
    width: 100%;
    height: 300px;
}

</style>
