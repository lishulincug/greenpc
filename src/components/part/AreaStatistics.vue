<template>
    <transition enter-active-class="animated slideInDown" leave-active-class="animated slideOutUp">
        <div class="panel panel-default" v-show="visible">
            <div class="panel-heading">当前位置：{{quName}}&nbsp;<span class="close" @click="close">&times;</span></div>
            <div class="panel-body">
                <table class="table" >
                    <tr v-for="(item,index) in list">
                        <td><img class="symbol" :src="item.symbol" alt=""></td><td>{{item.name}}</td><td>{{item.count}}</td>
                    </tr>
                </table>
              <hr/>
              <span class="btn glyphicon glyphicon-tag" @click="choose" title="选择"></span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="glyphicon glyphicon-repeat" @click="refresh" title="刷新"></span>&nbsp;
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
            fun.moveElement(this.$el)
        },
        data(){
            return{
                visible:false,
                list:this.option.list,

            }
        },
        methods:{
            close(){
                this.visible=false
                this.$store.commit('setShowAreaStatistics',false)
            },
          refresh(){
            this.list.map(e=>{
              if (e.name.indexOf('草坪')>-1){
                e.count=this.cnum?this.cnum:'121'
              }
              if (e.name.indexOf('乔木')>-1){
                e.count=this.qnum
              }
              if (e.name.indexOf('灌木')>-1){
                e.count=this.gnum
              }
              if (e.name.indexOf('养护员')>-1){
                e.count=this.pnum?this.pnum:'24'
              }
            })
          },
            //测试
            choose(){

               let data={}
               data.legendData=['灌木','乔木']
               data.seriesData=[
                 {
                   name:'灌木',
                   value:165
                 },
                 {
                   name:'乔木',
                   value:263
                 },
               ]
              data.text='植被数目统计'
              // data.name='数目'
              data.legendData1=['草坪','其它']
              data.seriesData1=[
                {
                  name:'草坪',
                  value:45567
                },
                {
                  name:'其它',
                  value:26578
                },
              ]
              data.text1='草地面积统计'


               this.$store.commit('setChartData',data)



              Bus.$emit('queryQu',{
                key:'query',
                value:{
                  type:'queryMarker',
                  attr:'SmID>0',
                  ds:'quyu'
                }
              });

            }
        },
        computed:{
            show(){
                return this.$store.state.showAreaStatistics
            },
          statistic(){
            return this.$store.state.chartData.statistic
          },
             quName(){
               return this.$store.state.chartData.quyu?this.$store.state.chartData.quyu:'未知'
             },
             //草坪数量
             cnum(){
               return this.$store.state.chartData.statistic&&this.$store.state.chartData.statistic.cnum
             },
        //     乔木数量
             qnum(){
               return this.$store.state.chartData.statistic&&this.$store.state.chartData.statistic.qnum
             },
          //  灌木数量
              gnum(){
                return this.$store.state.chartData.statistic&&this.$store.state.chartData.statistic.gnum
              },
          //  养护人员数量
              pnum(){
                return this.$store.state.chartData.statistic&&this.$store.state.chartData.statistic.pnum
              }
        },
        watch:{
          quName:{
            deep: true,
            handler: function (newVal, oldVal) {
              // this.restore()
            }
          },
          statistic:{
            deep: true,
            handler: function (newVal, oldVal) {

              console.log(this.cnum)
            }
          },
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
