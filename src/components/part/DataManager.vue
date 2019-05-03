<template>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="panel panel-default col-md-4" v-show="visible">
            <div class="panel-heading">在线编辑&nbsp;<span @click="close" class="close">&times;</span></div>
            <div class="panel-body">
                <div class="form-group"  >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" @change="selectActionType" v-model="actionType">
                        <option :value="item" v-for="item in option.actions">{{item}}</option>
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
                    <span class="btn glyphicon glyphicon-tag" title="选择"></span>&nbsp;&nbsp;<span class="btn glyphicon glyphicon-grain" title="树木"></span>&nbsp;&nbsp;<span title="草坪" class="btn glyphicon glyphicon-barcode"></span>
                    &nbsp;&nbsp;<span class="btn glyphicon glyphicon-pencil" @click="showPro" title="编辑属性"></span>
                </div>
                <div class="form-group" v-show="props" >
                    <hr>
                    <table class="table table-responsive">
                        <tr>
                            <td>名称</td>
                            <td>
                                <input type="text" class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>类型</td>
                            <td>
                                <input type="text" class="form-control">
                            </td>
                        </tr>
                        <tr>
                            <td>备注</td>
                            <td>
                                <input type="text" class="form-control">
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
          })
            this.actionType=this.option.actions[0]
            this.featureType=this.option.features[0]
        },
        data(){
            return{
                visible:true,
                actionType:null,//操作类型
                featureType:null,
                props:false,

            }
        },

        methods:{
            close(){
                this.visible=false

            },
            selectActionType(){

            },
            selectFeatureType(){

            },
            commit(){

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
