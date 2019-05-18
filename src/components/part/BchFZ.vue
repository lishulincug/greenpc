<template>
  <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
      <Layout v-show="visible">
          <Header style="background-color: whitesmoke">病虫害防治</Header>
          <Layout>
              <Sider hide-trigger style="background-color: whitesmoke">

                  <!--           植被类型选择-->
                  <Select v-model="zbType" style="width:200px" @on-change="changeZb">
                      <Option v-for="item in zbTypeList" :value="item.name" :key="item.name">{{ item.label }}</Option>
                  </Select>

                  <!--选中树木：显示树木列表-->
                  <Select v-model="treeType" v-show="showTree" style="width:200px"
                          @on-change="changeTreeType">
                      <Option v-for="item in treeTypeList" :value="item.name" :key="item.name">
                          {{ item.label }}</Option>
                  </Select>

                  <!--选中树木：树木列表-->
                  <Select v-model="tree" v-show="showTree" style="width:200px"
                          @on-change="changeTree">
                      <Option v-for="item in treeList" :value="item.name" :key="item.name">{{
                          item.label }}</Option>
                  </Select>


                  <!--     病虫害 分类-->
                  <Select v-model="bchType" style="width:200px" @on-change="changeBchType">
                      <Option v-for="item in bchTypeList" :value="item.name" :key="item.name">
                          {{ item.label }}</Option>
                  </Select>
                  <!--  常见病虫害-->
                  <Collapse >
                      <Panel :name="item.name"  v-for="item in bchList">
                          <span >
                              {{item.name}}
                          </span>
                          <p slot="content" @click="showChart(item.name)">{{item.content}}</p>
                      </Panel>
                  </Collapse>

              </Sider>
              <Content>
                  <Card :bordered="false">
                      <p slot="title">{{bchItem}}发展趋势图</p>
                      <p v-show="nd" class="nd">暂无数据</p>
                      <p id="chart"></p>
                  </Card>

              </Content>
          </Layout>

      </Layout>


<!--      <Card style="width:350px">-->


<!--       -->

<!--      </Card>-->
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
              showTree:false,
              nd:true,
              bchList:[],
              bchType:'',
              bchTypeList:[],
              type:{},
              zbType:'',
              zbTypeList:[],
              treeType:'',
              treeTypeList:[],
              tree:'',
              treeList:[],
              bchItem:'病虫害',
              myChart:{},
              option:{},
              legendTitle:['感染植被数量'],
              cData:[],
              month:['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月' ],
              item:{}

          }
        },

        mounted(){
            Bus.$on('病虫害防治',e=>{
                this.visible=!this.visible
            })
            if (!this.visible){
                this.nd=true;

            }
            fun.moveElement(this.$el)
            this.zbTypeList=this.bch.zbTypeList
        },
      methods:{
          changeZb(){
              this.bchList=[]
              this.bchTypeList=[]
              this.treeList=[]
              this.treeTypeList=[]
            if (this.zbType.indexOf('树木')>-1){
                this.showTree=true
                this.treeTypeList=this.zbTypeList.find(e=>e.name.indexOf(this.zbType)>-1).treeTypeList
            }else{
                this.bchTypeList=this.zbTypeList.find(e=>e.name.indexOf(this.zbType)>-1).bchTypes
                this.showTree=false
            }
          },

          changeTreeType(){
              let item=this.treeTypeList.find(e=>e.name===this.treeType)

              this.treeList=item.treeList;
          },
          changeTree(){
              let item=this.treeList.find(e=>e.name==this.tree)
              this.bchTypeList=item.bchTypeList
          },
          changeBchType(){
              let item=this.bchTypeList.find(e=>e.name==this.bchType)
               this.bchList=item.bchList

          },
          randomMonth(n) {
              let start=Math.ceil(Math.random()*n)
              let end=start+n;

              let month=[]
              for (let i=start;i<end;i++){
               month.push(`${i}月`)
              }
              return month;
          },
          showChart(name){
              this.nd=false;

              this.bchItem=name
              let n=Math.ceil(Math.random()*3+3)
              this.cData=this.randomData(n)
              this.month=this.randomMonth(n)
              this.initChart(name,this.cData)
          },

          initChart(title=this.title,cData=this.cData){
              this. option = {
                  baseOption: {
                      backgroundColor: "black",
                      timeline: {
                          //loop: false,
                          axisType: 'category',
                          show: true,
                          autoPlay: true,
                          playInterval: 2000,
                          data: this.month
                      },
                      grid: { containLabel: true },
                      legend: {
                          itemGap: 50,
                          data: `${title}发展趋势图`,
                          textStyle: {
                              color: '#f9f9f9',
                              borderColor: '#fff'
                          },
                      },
                      xAxis: [{
                          type: 'category',
                          boundaryGap: true,
                          axisLine: { //坐标轴轴线相关设置。数学上的x轴
                              show: true,
                              lineStyle: {
                                  color: '#f9f9f9'
                              },
                          },
                          axisLabel: { //坐标轴刻度标签的相关设置
                              textStyle: {
                                  color: '#d1e6eb',
                                  margin: 15,
                              },
                          },
                          axisTick: {
                              show: false,
                          },
                          data: this.month,
                      }],
                      yAxis: [{
                          type: 'value',
                          min: 0,
                          // max: 140,
                          splitNumber: 7,
                          splitLine: {
                              show: true,
                              lineStyle: {
                                  color: '#0a3256'
                              }
                          },
                          axisLine: {
                              show: false,
                          },
                          axisLabel: {
                              margin: 20,
                              textStyle: {
                                  color: '#d1e6eb',

                              },
                          },
                          axisTick: {
                              show: false,
                          },
                      }],
                      series: [
                          {
                              name: '感染植被数量',
                              type: 'line',
                              smooth: true, //是否平滑曲线显示
                              // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
                              showAllSymbol: true,
                              symbol: 'emptyCircle',
                              symbolSize: 6,
                              lineStyle: {
                                  normal: {
                                      color: "#28ffb3", // 线条颜色
                                  },
                                  borderColor: '#f0f'
                              },
                              label: {
                                  show: true,
                                  position: 'top',
                                  textStyle: {
                                      color: '#fff',
                                  }
                              },
                              itemStyle: {
                                  normal: {
                                      color: "#28ffb3",

                                  }
                              },
                              tooltip: {
                                  show: true,
                                  formatter: function (params, ticket, callback) {
                                      //x轴名称
                                      //x轴名称
                                      var name = params.name
                                      //图表title名称
                                      var seriesName = params.seriesName
                                      //值
                                      var value = params.value

                                      return name +seriesName +':' + value
                                  },
                                  position: function (pos, params, dom, rect, size) {
                                      // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
                                      var obj = {top: 10};
                                      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
                                      return obj;
                                  }


                              },
                              areaStyle: { //区域填充样式
                                  normal: {
                                      //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                          offset: 0,
                                          color: 'rgba(0,154,120,1)'
                                      },
                                          {
                                              offset: 1,
                                              color: 'rgba(0,0,0, 0)'
                                          }
                                      ], false),
                                      shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                                      shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                                  }
                              },
                              data: cData
                          }, ],
                      tooltip: {
                          show: true,
                          formatter: function (params, ticket, callback) {
                              //x轴名称
                              //x轴名称
                              var name = params[0].name
                              //图表title名称
                              var seriesName = params[0].seriesName
                              //值
                              var value = params[0].value

                              return name + ':' + value
                          }

                      }
                  },

                  tooltip: {},
                  grid: {
                      top: '8%',
                      left: '1%',
                      right: '1%',
                      bottom: '8%',
                      containLabel: true,
                  },

                  series: []
              };
              this .myChart = echarts.init(document.getElementById('chart'))
              this.myChart.setOption(this.option)

              this.myChart.on('timelinechanged',e=>{

                  this.myChart.dispatchAction({
                      type: 'showTip',
                      seriesIndex: 0,
                      dataIndex: e.currentIndex
                  });
                  Bus.$emit('loadHeatMap')


              })
          },
          randomData(v){
              let n=100,result=[];
              for (let j=1;j<=v;j++){

                  result.push(Math.ceil(Math.random()*n+100));

              }
              return result
          }
      },
    }
</script>

<style scoped>
#chart{
    width: 100%;
    height: 300px;
}
    .nd{
        position: absolute;
        left: 40%;
        top:30%
    }

</style>
