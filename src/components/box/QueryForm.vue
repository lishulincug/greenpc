<template>
  <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

    <div class="panel panel-default root" v-show="visible">
      <div class="panel-body">


        <div class="form-group col-md-4">

        <select class="form-control" @change="change" v-model="selectValue">
          <option value="0">草坪</option>
          <option value="1">树木</option>
          <option value="2">水井</option>
        </select>
        </div>

        <!--tab-->
        <div class="tab" v-show="tab">
          <ul>
            <li @click="key=0;cVisible=true;sVisible=false;tVisible=false;showBtn=true" :class="key==0?'height':'normal' ">条件查询</li>
            <li @click="key=1;sVisible=true;cVisible=false;tVisible=false;showBtn=false" :class="key==1?'height':'normal'">几何查询</li>
          </ul>
        </div>

        <!--草坪查询-->
        <div v-if="cVisible">
          <div v-for="i in checklist[key1]" class="form-group col-md-12">
          <input type="checkbox"  value="0"  placeholder="单位：米">
          <label for="exampleInputEmail1">{{i}}</label>
        </div>
        </div>

        <!--树木查询-->
        <div v-show="sVisible">
          <div class="form-group ">
            <label for="exampleInputEmail1" >点选</label>
            <a href="#" @click="dotQuery" class="btn btn-primary glyphicon glyphicon-hand-up"></a>
          </div>
          <!--<div class="form-group cicle">
            <label for="exampleInputEmail1" >圆选</label>
            <a href="#" @click="circleQuery" class="btn btn-primary glyphicon glyphicon-record"></a>
            <input type="number" style="width: 1%" class="form-control "  v-model="length" placeholder="单位：米">
          </div>-->

        </div>
        <div class="form-group col-md-3" v-show="fw">
          <input type="text"  v-model="jb" autofocus class="form-control" placeholder="单位：米">
        </div>
           <!--工具查询-->
        <div >
          <button  class="btn btn-default" @click="query">查询</button>
          <button  class="btn btn-default" @click="close">取消</button>
        </div>

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
            cVisible:true,//草坪
            sVisible:false,//树木
            tVisible:false,//工具
            pointer:false,//显示位置获取工具
            pos_checked:false,
              fw:false,
              jb:'',
              tab:true,
              selectValue:0,
            showBtn:true,
            key:0,
              key1:0,

            dis:'',
            checks:[],
              length:0,
              checklist:[
                  ['待除草','待灌溉','待施肥','待补植'],
                  ['待修剪','待灌溉'],
                  [],
              ]
          }
       } ,
      methods:{
          change(){
            this.key1=this.selectValue;
            if (this.key1==2){
                this.tab=false;
                this.fw=true
                this.sVisible=false
            } else {
                if (this.key1==0){
                    this.key=0
                    this.cVisible=true
                }
                this.tab=true;
                this.fw=false
                if (this.key==1){
                    this.sVisible=true
                }

            }
              this.jb='';


          },
         show:function(){
             this.jb=0;
              this.visible=true

         },
         close:function () {
           this.visible=false
         },
         query:function(){
           this.close()
           if (this.jb>1){
               this.$emit('querywell')
           } else {
               this.$emit('query')
           }
         },
         showPointer:function () {
           this.pointer=true;
         },
          select:function () {
            this.$emit('well_select_position',this.dis)
          },
         dotQuery(){
           this.$emit('dotQuery')
           this.close()
         },
         circleQuery(){
           this.$emit('circleQuery')
           this.close()
         }
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
</style>
