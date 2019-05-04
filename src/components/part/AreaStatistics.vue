<template>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
        <div class="panel panel-default" v-show="visible">
            <div class="panel-heading">当前位置：{{option.name}}&nbsp;<span class="close" @click="close">&times;</span></div>
            <div class="panel-body">
                <table class="table" >
                    <tr v-for="(item,index) in option.list">
                        <td><img class="symbol" :src="item.symbol" alt=""></td><td>{{item.name}}</td><td>{{item.count}}</td>
                    </tr>
                </table>
              <hr/>
              <span class="btn glyphicon glyphicon-tag" @click="choose" title="选择"></span>&nbsp;
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
          Bus.$on('统计分析',e=>{
              this.visible=!this.visible
          })
        },
        data(){
            return{
                visible:true
            }
        },
        methods:{
            close(){
                this.visible=false
                this.$store.commit('setShowAreaStatistics',false)
            },
            //测试
            choose(){
               let data={}
               data.legendData=['灌木','乔木']
               data.seriesData=[
                 {
                   name:'灌木',
                   value:70
                 },
                 {
                   name:'乔木',
                   value:24
                 },
               ]
              data.text='植被数目统计'
              // data.name='数目'
              data.legendData1=['草坪','其它']
              data.seriesData1=[
                {
                  name:'草坪',
                  value:40
                },
                {
                  name:'其它',
                  value:50
                },
              ]
              data.text1='草地面积统计'

               Bus.$emit('restore',data)
            }
        },
        computed:{
            show(){
                return this.$store.state.showAreaStatistics
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
