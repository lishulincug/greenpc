<template>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="panel panel-default col-md-2" v-show="visible">
            <div class="panel-heading">在线编辑&nbsp;<span @click="close" class="close">&times;</span></div>
            <div class="panel-body">
                <div class="form-group"  >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" @change="selectActionType" v-model="actionType">
                        <option :value="item" v-for="item in option.actions">{{item.name}}</option>
                    </select>
                </div>
                <div class="form-group"  >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" @change="selectFeatureType" v-model="featureType">
                        <option :value="item" v-for="item in option.features">{{item.name}}</option>
                    </select>
                </div>
                <div class="form-group"  >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <span class="btn glyphicon glyphicon-tag" @click="choose" title="选择"></span>&nbsp;
                  &nbsp;<span class="btn glyphicon glyphicon-grain" @click="addTree" title="树木"></span>&nbsp;&nbsp;<span @click="addCP" title="草坪" class="btn glyphicon glyphicon-barcode"></span>
                    &nbsp;&nbsp;<span class="btn glyphicon glyphicon-pencil" @click="showPro" title="编辑属性"></span>
                </div>
                <div class="form-group" v-show="props" >
                    <hr>
                    <table class="table table-responsive">

                        <tr>
                          <td>名称</td>
                          <td>
                            <input type="text" class="form-control" v-model="obj.COL1">
                          </td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>
                              <select  class="form-control" @change="selectTreeType" v-model="obj.COL2">
                                <option :value="item" v-for="item in treeTypes">{{item}}</option>
                              </select>
                            </td>
                        </tr>
                      <tr>
                        <td>科属</td>
                        <td>
                          <input type="text" class="form-control" v-model="obj.COL3">
                        </td>
                      </tr>
                      <tr>
                        <td>其他</td>
                        <td>
                          <input type="text" class="form-control" v-model="obj.COL4">
                        </td>
                      </tr>

                    </table>
                </div>

                <div class="form-group"  >
                    <button class="btn btn-default" @click="commit">提交</button>
                    <button class="btn btn-default" @click="cancel">取消</button>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    export default {
        name: "AreaStatistics",
        props:{
            option:Object,

        },
        mounted(){
          Bus.$on('在线编辑',e=>{
              this.visible=!this.visible
              this.obj={}
              this.props=false

          })
            this.actionType=this.option.actions[0]
            this.featureType=this.option.features[0]
        },
        data(){
            return{
                visible:false,
                actionType:null,//操作类型
                featureType:null,
                props:false,
                pro:[
                  {
                    COL1:'',
                    COL2:'',
                    COL3:'',
                    COL4:''
                  },
                  {

                  }
                ],
                treeTypes:[
                  '灌木',
                  '乔木'
                ],
                commitObj:{
                  obj:{},
                  action:'',
                  ds:''
                },
                obj:{}

            }
        },

        methods:{
          addTree(){

              Bus.$emit('addTree',{
                s:`m`,
                key:`edit`,
              })
              this.visible=false
          },
          addCP(){

          },
          choose(){


            Bus.$emit('chooseFeature',{
              s:`p`,
              key:`edit`+this.actionType.value,
              value:{
                attr:'',
                ds:this.featureType.value
              }
            })
            this.visible=false
          },
            close(){
                this.visible=false
            },
            selectActionType(){
              this.commitObj.action=this.actionType.value
            },
            selectFeatureType(){
               if (this.featureType.value==='tree'){
                 this.obj=this.pro[0]
               } else{
                 this.obj=this.pro[1]
               }
               this.commitObj.ds=this.featureType.value
            },
            selectTreeType(){

            },

          commit(){
            this.commitObj.obj=this.obj
              Bus.$emit('commit',this.commitObj)
            },
            cancel(){

            },
            showPro(){
                this.props=!this.props
            }
        },
        computed:{

        },

    }
</script>

<style scoped>
    .panel{

    }
 .symbol{
     width: 30px;
     height: 30px;
 }
 .panel-body{
     /*padding-top: 1rem;*/
 }
    table{

    }
</style>
