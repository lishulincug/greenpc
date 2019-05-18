<template>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
        <div class="panel panel-default col-md-4" v-show="visible">
            <div class="panel-heading">区域植被统计&nbsp;<span class="close" @click="close">&times;</span></div>
            <div class="panel-body row">
                <div class="chart col-md-6">

                </div>
              <div class="chart col-md-6">

              </div>
            </div>

        </div>
    </transition>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
    export default {
        name: "AreaStatistics",
        props:{
            option:Object,

        },
        mounted(){
          Bus.$on('统计分析',e=>{
              this.visible=!this.visible
          });
          Bus.$on('restore',this.restore);
          this.init()
            fun.moveElement(this.$el)
        },
        data(){
            return{
                visible:false,
                options:{},
                 myChart:{}
            }
        },
       computed:{
          ...mapState({
            'chartData':'chartData',
          }),
         text(){
           return this.chartData.text
         },
         legendData(){
           return this.chartData.legendData
         },
         seriesData(){
           return this.chartData.seriesData
         }
       },
        methods:{
          ...mapMutations([
            'setChartData'
          ]),
            init(){
            this.  options = {
                title : {
                  text: '',
                  x:'center'
                },
                tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                  type: 'scroll',
                  orient: 'vertical',
                  right: 1,
                  top: 20,
                  bottom: 20,
                  data: this.legendData,
                  // selected: data.selected
                },
                series : [
                  {
                    name: '',
                    type: 'pie',
                    radius : '55%',
                    center: ['48%', '57%'],
                    data: this.seriesData,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                    }
                  }
                ]
              };
              this .myChart = echarts.init(document.getElementsByClassName('chart')[0])
              this.myChart.setOption(this.options)
            },
            close(){
                this.visible=false
                this.$store.commit('setShowAreaStatistics',false)
            },
            restore(){
              let obj=this.$store.state.chartData;
              this.visible=true
              this.myChart.clear()
              this.options.legend.data=obj.legendData
              this.options.series[0].data=obj.seriesData
              this.options.title.text=obj.text;
              this.myChart.setOption(this.options,true)
              this .myChart = echarts.init(document.getElementsByClassName('chart')[1])
              this.options.legend.data=obj.legendData1
              this.options.series[0].data=obj.seriesData1
              this.options.title.text=obj.text1;
              this.myChart.setOption(this.options,true)
            }
        },

        watch:{
          chartData : {
            deep: true,
            handler: function (newVal, oldVal) {
               // this.restore()
            }
          }
        }
    }
</script>

<style scoped>

.chart{
  width: 300px;
  border: 1px solid lightgray;
  height: 200px;
}
</style>
