import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    SecondMenuList:[],
    user:{
      zh:'0000',
      name:'2019',
      pwd:'',
      sex:'男',
      email:'1234565432@qq.com',
      phone:'15532456754',
      address:'北京市朝阳区',
    },
    showCenter:false,
    distance:0,
    area:0,
      features:[],
      showQuery:false,//显示查询
      showDispatchTask:false,
      showAreaStatistics:false,
      showBch:false,
      queryParam:{},
      chartData:{
       text:'',
        text1:'',
        legendData:[],
        legendData1:[],
        seriesData:[],
        seriesData1:[],
        statistic:{}
      }
  },
  mutations:{
      setQueryParam(state,v){
        state.queryParam=v;
      },
      setSecondMenuList(state,v){
          state.SecondMenuList=v;
      },
      pushItemToSecondMenu(state,v){
        state.SecondMenuList.push(v);
      },
      setChartData(state,v){
          state.chartData=v;
      },
    setFeatures(state,v){
      state.features=v;
    },
      clearFeatures(state){
        state.features=[]
      },
    setUser(state,v){
      state.user=v;
    },
      setShowQuery(state,v){
          state.showQuery=v;
      },
      setShowBch(state,v){
        state.showBch=v;
      },
      setShowDispatchTask(state,v){
          state.showDispatchTask=v;
      },
      setShowAreaStatistics(state,v){
          state.showAreaStatistics=v;
      },
    setShowCenter(state,v){
      state.showCenter=v;
    },
    setDistance(state,v){
       state.distance=v;
    },
    setArea(state,v){
       state.area=v;
    }
  },
  actions:{
     addItemToSecondMenu(){

     }
  }
});
