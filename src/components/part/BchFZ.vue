<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
    <div class="panel panel-default" v-show="visible">
      <div class="panel-heading">

          <div class="dropdown col-md-2">
              <span class="btn dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  类型选择
                  <span class="caret"></span>
              </span>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li><a href="#" @click="type(0)">病害</a></li>
                  <li><a href="#"  @click="type(1)">虫害</a></li>
              </ul>
          </div>
        <span @click="close" style="margin-left: 80%;margin-top: 1%">&times;</span>
      </div>

      <div class="panel-body">
        <div class="head">
          <ul>
              <li @click="select(0)" :class="'height'">{{bch.caoping.name}}</li>
              <li></li>
              <li @click="select(1)" :class="key==1?'height':'normal'">{{bch.tree.name}}</li>
          </ul>
        </div>
        <div class="body" v-show="showC">
          <div class="left">
              <ul class="list-group" >
                  <li class="list-group-item" v-for="item in list" @click="clickItem(item)">{{item.name}}&nbsp;&nbsp;
                  <span class="glyphicon glyphicon-eye-open" @click="eysItem(item)"></span>
                  </li>
              </ul>
          </div>
           <div class="info">
              <p v-for="(key ,i) in info">

                  <span>{{i}}</span>：
                  <span v-if="i.indexOf('图片')>-1">
                      <img :src="info[i]" alt="">
                  </span>
                  <span v-else>
                      {{info[i]}}
                  </span>

              </p>

          </div>
        </div>

          <div class="body" v-show="showT">

              <div class="form-group col-md-3">
                  <select name="" class="form-control"  @change="selectTreeType"   v-model="treetype">
                      <option value="0">乔木</option>
                      <option value="1">灌木</option>
                  </select>
                  <select name="" class="form-control" @change="selectTree" v-model="tree">
                      <option v-for="item in tlist" @click="clickTreeItem(item)">{{item.name}}</option>
                  </select>
              </div>

             <div class="body_c">
                 <div class="left">
                     <ul class="list-group" >
                         <li class="list-group-item" v-for="item in list.list" @click="clickItem(item)">{{item.name}}&nbsp;&nbsp;
                             <span class="glyphicon glyphicon-eye-open" @click="eysItem(item)"></span>
                         </li>
                     </ul>
                 </div>
                 <div class="info">
                     <p v-for="(key ,i) in info">

                         <span>{{i}}</span>：
                         <span v-if="i.indexOf('图片')>-1">
                      <img :src="info[i]" alt="">
                  </span>
                         <span v-else>
                      {{info[i]}}
                  </span>

                     </p>
                 </div>
             </div>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "BchFZ",
        props:{
          bch:Object
        },
        data(){
          return{
            visible:false,
              key:0,
              showC:true,
              showT:false,
              info:{},
              list:[],
              tree:'',
              classify:'cp',
              treetype:'0',
              tlist:[],
              tree:{}
          }
        },

        mounted(){
            Bus.$on('病虫害防治',e=>{
                this.visible=!this.visible
            })
        },
      methods:{
          selectTreeType(){

              this.tlist=this.bch.tree.type[parseInt(this.treetype)].children;
              // console.log(this.tlist)
              this.tree=this.tlist[0]

          },
            selectTree(){
                // this.list=this.tree.list;
             this.list=this.tlist.find(e=>e.name.indexOf(this.tree)>-1)

          },
        close(){
          this.visible=false
          this.$store.commit('setShowBch',false)
        },
          type(i){
            if (this.classify.indexOf('cp')>-1){
                if (i){
                    this.list=this.bch.caoping.list1;
                } else{
                    this.list=this.bch.caoping.list;
                }
            } else{

                // this.tree='乔木'


                // if (i){
                //     this.list=this.bch.caoping.list1;
                // } else{
                //     this.list=this.bch.caoping.list;
                // }
            }
            // this.info=this.list[0].info;
          },
          select(i){
            this.key=i;
            if (i){
                this.tlist=this.bch.tree.type[0].children;
                this.showT=true
                this.showC=false;
                this.classify='tr'
            } else{

                this.classify='cp'
                this.list=this.bch.caoping.list;
                this.showT=false
                this.showC=true;

            }
            this.info={};
          },
          clickItem(item){
              this.info=item.info;
          },
          clickTreeItem(item){
              this.list=item.list;
          },
          //防护效果 热点图
          eysItem(item){

          }
      },
      computed:{
        show(){
          return this.$store.state.showBch
        }
      },
      watch:{
        show(){
          if (this.show){
            this.visible=true
          } else{
            this.close()
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.panel-heading{

   display: flex;
  span{
    span:nth-child(1){
      flex: 95%;
    }
    span:nth-child(2){
      flex: 5%;
    }
  }
}
.panel-body{
    .body{
        padding-left: 15%;
        height: 300px;
        display: flex;
        .left{
        width: 30%;
        }
        .info{
         width: 60%;
            img{
                width: 30%;
                height: 30%;
            }
        }
        .body_c{
            width: 100%;
            display: flex;
            /*background-color: black;*/
            ul{
                width: 100%;
            }
            .info{
                width: 60%;
                img{
                    width: 30%;
                    height: 30%;
                }
            }
        }

    }
    .body:nth-child(1){
        /*flex-direction: column;*/
        background-color: #5bc0de;

    }
    .head{
        ul{
            padding-left: 1%;
            display: flex;
            margin-left: 12%;
            li{
                text-align: center;
                list-style: none;
                border-bottom: 2px solid grey;
                width: 40%;
                   /*background-color: #5bc0de;*/
                cursor: pointer;


                .height{
                    border-bottom: 2px solid lightgreen;
                }
                .normal{
                    border-bottom: 2px solid rebeccapurple;
                }
            }
            li:nth-child(1){
                padding-left: 10%;

            }
            li:nth-child(3){
                padding-right: 10%;
            }
            li:nth-child(2){
                width: 20px;
                border-bottom: 2px solid rebeccapurple;
            }
        }
    }
}


</style>
