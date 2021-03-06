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
     caopingList:[],
      infoBox:{},
      work:{},
      person:{},
      worklist:[],
      taskList:[],
      userList:[],
      manList:[],

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
        statistic:{},

      },
      devicePoint:{},
      devicePoints:[],
      message:[],
      mapCenter:{}
  },
  mutations:{
      setCaopingList(state,value){
          state.caopingList=value;
      },
      setMapCenter(state,value){
          state. mapCenter=value;
      },
      pushCaoping(state,v){
          state.caopingList.push(v);
      },
      setMessage(state,v){
          state.message=v;
      },
      setWorklist(state,v){
          state.worklist=v;
      },
      setUserList(state,v){
          state.userList=v;
      },
      setDevicePoint(state,v){
          state.devicePoint=v;
      },
      setDevicePoints(state,v){
          state.devicePoints=v;
      },
      putDevicePoints(state,v){
          state.devicePoints.push(v);
      },
      popDevicePoints(state,v){
          return state.devicePoints.pop();
      },
      setManList(state,v){
          state.manList=v;
      },
      setTaskList(state,v){
          state.taskList=v;
      },
      setInfoBox(state,v){
          state.infoBox=v;
      },
      setPerson(state,v){
          state.person=v;
      },
      setWork(state,v){
          state.work=v;
      },
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
