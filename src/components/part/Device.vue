<template>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="panel panel-default col-md-3" v-show="visible">
            <div class="panel-heading">设备模拟&nbsp;<span @click="close" class="close">&times;</span></div>
            <div class="panel-body">


                <div class="form-group"  >

                    <table class="table table-responsive">
                       <tr>
                           <td>
                             选择设备
                           </td>
                           <td class="form-group">
                               <select  class="form-control" @change="selectType" v-model="type">
                                   <option :value="item" v-for="item in option.types">{{item.name}}</option>
                               </select>
                           </td>
                       </tr>

                        <tr v-show="props">
                            <td>选择位置</td>
                            <td class="form-group">
                                <span class="btn btn-default form-control">选点</span>
                            </td>
                        </tr>
                        <tr v-show="props">
                            <td>喷头类型</td>
                            <td class="form-group">
                                <select  class="form-control" @change="selectPtType" v-model="ptType">
                                    <option :value="item" v-for="item in option.types[1].types">{{item.name}}</option>
                                </select>
                            </td>
                        </tr>
                        <tr v-show="props">
                            <td>设置角度</td>
                            <td>
                                <input type="text" value="0" v-model="degree" class="form-control">
                            </td>
                        </tr>
<!--                        <tr v-show="props">-->
<!--                            <td>喷头数量</td>-->
<!--                            <td>-->
<!--                                <input type="text" value="0" v-model="num" class="form-control">-->
<!--                            </td>-->
<!--                        </tr>-->
                        <tr v-show="props">
                            <td>当前射程</td>
                            <td>
                                <input type="text" value="30" v-model="radius" class="form-control">
                            </td>
                        </tr>
                        <tr v-show="props">
                            <td>示意图</td>
                            <td>
                                <div class="con">
                                    <hr class="line">
                                    <hr class="line" :style="rotate">
                                </div>
                            </td>
                        </tr>

                    </table>
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
          Bus.$on('设备模拟',e=>{
              this.visible=!this.visible
          })
            this.type=this.option.types[0]

        },
        watch:{
            degree(n,o){
                if (o===''){
                    n=0;
                }
            }
        },
        data(){
            return{
                visible:false,
                type:null,//设备类型
                ptType:null,//设备类型
                props:false,
                degree:0,

                num:0,
            }
        },

        methods:{
            close(){
                this.visible=false

            },
            selectType(){
                let type=this.type
                switch (type.name) {
                    case '喷灌设备':
                        this.props=!this.props
                        this.$Message.info('请选点')
                        break
                    default:
                        this.props=false
                }
            },
            selectPtType(){

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
            rotate(){
                return {
                    'transform': 'rotate(-'+this.degree+'deg)'
                }
            },
            radius(){
                return Math.abs(this.ptType&&this.ptType.value*Math.cos(this.degree)).toFixed(2)+'m'
            }
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
    .con{
        width: 70%;
        height: 150px;
        border: 1px solid gray;
        position: relative;
        left: 15%;
    }
    .line{
        border: 1px solid red;
        width: 60%;
        position: absolute;
    }
    .line:nth-child(1){
        top: 60%;
        left: 20%;
    }
    .line:nth-child(2){
        top: 61%;
        left: 20%;
        transform-origin: 0 0;
        transform: rotate(-0deg);
    }
    tr{

    }
</style>
