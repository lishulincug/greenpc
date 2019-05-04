<template>
  <div :class="$style.root">

  </div>
</template>

<script>

    import db from '../config/db'
  import {mapMutations,mapState} from 'vuex'
    export default {
        name: "Map",
        props:{
          option:Object,
            db:Object,
        },
         mounted:function(){
          this.init()
           Bus.$on('measure',this.initMeasure);
           Bus.$on('scale',this.addScale);
           Bus.$on('minimap',this.addMinimap);
           Bus.$on('resetPosition',this.reset);
           Bus.$on('clear',this.clear);
           Bus.$on('addTree',this.addTree);
           Bus.$on('commit',this.commit);
           Bus.$on('queryQu',this.queryQu);
           Bus.$on('chooseFeature',this.chooseFeature);

            /*******************************/
             Bus.$on('query',d =>{
                 this.queryBySql(d.value)
             });

             Bus.$on('queryByGeo', (d)=> {
                 this.queryByGeos(d)
             });

             Bus.$on('queryByBuffer',d=> {
                 this.queryByGeos(d)
             });

            this.map.on(L.Draw.Event.CREATED, this.draw);
         },
        data:function(){
          return{
            map:{},
            baseLayer:{},
            scale:null,
            minimap:null,
            editableLayers:null,
             drawControl:null,
              queryControl:null,
              statistic:{
               cnum:0,
               qnum:0,
               gnum:0,
               pnum:0,
              }
          }
        },
        computed:{
            ...mapState(
                {
                     'result':'features',
                     'queryParam':'queryParam',
                     'chartData':'chartData'
                }
            )
        },
        watch:{
          result(){
              // this.clear()
              let that=this
              let resultLayer = L.geoJSON(this.result, {
                  //绑定弹窗
                  onEachFeature: function (feature, layer) {
                      let t=''
                      //quyu
                      if (feature.properties.NAME){
                          t="当前位置 " + feature.properties.NAME
                      }

                      else if (feature.properties.MAN_NAME){
                          t=`姓名 ${feature.properties.MAN_NAME}<br/>`+`角色 ${feature.properties.ROLE}<br/>`+`所属区 ${feature.properties.所属区}区<br/>`+`手机 ${feature.properties.手机}<br/>`
                      }else  if (feature.properties.COL2.indexOf('乔木')>-1||feature.properties.COL2.indexOf('灌木')>-1){
                        let o={}
                        if (feature.properties.COL1!==''){
                          for(let i in feature.properties){
                            if (i.indexOf('COL')>-1) {
                                 if (feature.properties[i]===''){
                                   feature.properties[i]=Tester.getRandomId('T')
                                 }
                               t += Tester.TreeMap(i) + '：' + feature.properties[i] + '<br>';
                            }
                          }
                         } else{
                           o=Tester.getTreeData(feature.properties)
                          for(let i in o){
                            t+=i+'：'+o[i]+'<br>';
                          }
                         }
                      }else{
                          t=`编号 ${feature.properties.COL1}<br/>`+`所属区 ${feature.properties.COL2}区`
                      }
                      layer.bindPopup(t);
                      // if (this.result.feature.length==1){
                      //     this.flyTo(feature)
                      // }
                  }
              }).addTo(this.map);
                if (this.queryParam.key&&this.queryParam.key.indexOf('delete')>-1){
                  this.queryParam.deleteObj=[]
                  this.result.features.map(e=>{
                    this.queryParam.deleteObj.push(e.id)
                  })

                 }
          //    绘制结果
             if (this.result.features.length==1){
               let obj=this.result.features[0]
// zoom the map to the polygon
//                this.map.flyToBounds(L.polygon(obj.geometry.coordinates, {}).getBounds());
              }

            if (that.queryParam.value&&that.queryParam.value.type&&that.queryParam.value.type.indexOf('queryMarker')>-1){
              // let jb=[]

              let c=(this.result.features[0].geometry.coordinates[0][0]).map(e=>[e[1],e[0]])

              let p=L.polygon([c], {color:'red'}).addTo(that.map);
                 this.chartData.quyu=this.result.features[0].properties.NAME

                this.$store.commit('setChartData',this.chartData)

                 this.queryBYGeos({
                  p:p,
                  ds:'caoping',
                  attr:'1=1'
                });


              that.queryBYGeos({
                p:p,
                ds:'tree',
                attr:`COL2=='灌木'`
              });
              this.queryBYGeos({
                p:p,
                ds:'tree',
                attr:`COL2=='乔木'`
              });

              that.setQueryParam({})
              setTimeout(e=>{
                Bus.$emit('restore')
              },2000)
            }


              let cnum=0,gnum=0,qnum=0,quyu=0;
              this.result.features.map(e=>{

                  if(e.properties.MAN_NAME){
                        this.loadMan(e);
                    this.statistic.pnum++;
                  }
                  if(e.properties.COL2&&e.properties.COL2.indexOf('乔木')>-1){
                      this.loadQm(e);
                    this.statistic.qnum++
                  }
                  if(e.properties.COL2&&e.properties.COL2.indexOf('灌木')>-1){
                      this.loadGm(e);
                    this.statistic.gnum++
                  }
                  if (!e.properties.NAME&&e.geometry.coordinates){
                    this.statistic.cnum++
                  }



               });
            this.chartData.statistic=this.statistic

            this.$store.commit('setChartData',this.chartData)


            // Bus.$emit('restore',{
            //   text:'植被数目统计',
            //   legendData:['乔木','灌木'],
            //   seriesData:[{
            //     name:'乔木',
            //     value:qnum
            //   },{
            //     name:'灌木',value:gnum
            //   }],
            //   text1:'草地面积统计',
            //   legendData1:['草坪','其它'],
            //   seriesData1:[{
            //    name: '草地',value:cnum,
            //   },{
            //     name:'其它',
            //     value:478159.417938201-cnum
            //   }]
            // });





          }
        },
         methods:{
             ...mapMutations([
               'setFeatures','clearFeatures',
              'setQueryParam',' setChartData'
             ]),
             //////////////////////////////////////////////////////////

             query(){
                 this.queryByIds([246, 247])
             },
             queryQu(item){

               this.setQueryParam(item)

               this.addQueryControl('m')
             },
             loadMan(e){
                 let o=e.geometry.coordinates
                 L.marker([o[1],o[0]],{
                     icon:L.icon({
                         iconUrl: '../../../static/img/man.png',
                         iconSize: [30, 30],
                         iconAnchor: [30, 34],

                     })
                 }).addTo(this.map);
             },
             loadQm(e){
                 let o=e.geometry.coordinates
                 L.marker([o[1],o[0]],{
                     icon:L.icon({
                         iconUrl: '../../../static/img/qm.png',
                         iconSize: [40, 40],
                         iconAnchor: [40, 44],
                         // popupAnchor: [-20, 0],
                         // shadowUrl: 'my-icon-shadow.png',
                         // shadowSize: [68, 95],
                         // shadowAnchor: [32, 94]
                     })
                 }).addTo(this.map);
             },
             loadGm(e){
                 let o=e.geometry.coordinates

                 L.marker([o[1],o[0]],{
                     icon:L.icon({
                         iconUrl: '../../../static/img/gm.png',
                         iconSize: [30, 30],
                         iconAnchor: [30, 34],
                         // popupAnchor: [-20, 0],
                         // shadowUrl: 'my-icon-shadow.png',
                         // shadowSize: [68, 95],
                         // shadowAnchor: [32, 94]
                     })
                 }).addTo(this.map);
             },
             addTree(item){
               this.setQueryParam(item)
               this.addQueryControl(item.s)
             },
             chooseFeature(item){
               this.setQueryParam(item)
               this.addQueryControl(item.s)
             },

             addQueryControl(s){
               let [marker,polygon,polyline]=[false,false,false]
               if (s==='p'){
                 polygon=true
               } else if (s==='l') {
                 polyline=true
               }else {
                 marker=true
               }
               let options={
                 position: 'topright',
                 draw: {
                   polyline: polyline,
                   polygon: polygon,
                   circle: false,
                   marker: marker,
                   rectangle: false,
                   circlemarker: false,
                 },
                 edit: {
                   featureGroup: this.editableLayers,
                   remove: false
                 }
               };

               if (this.queryControl){
                 return;
               } else{
                 this.queryControl = new L.Control.Draw(options);
                 this.map.addControl(this.queryControl);
               }
             },


             queryByGeos(item){
                 if (item.value.type==='queryByBuffer'){
                   this.addQueryControl('l')
                 } else{
                   this.addQueryControl('p')
                 }
                 this.setQueryParam(item)
             },
             flyTo(e){
                 let o=e.geometry.coordinates
               this.map.flyTo([o[1],o[0]])
                 setTimeout(e=>{
                     this.map.setZoom(this.option.option.zoom+4)
                 },1200)
             },




             ///////////////////////////////////////////////////////////////////////////
           init() {
             // 初始化地图信息
             this.map = L.map(this.$el, this.option.option);
             // 添加图层
             this.baseLayer= L.supermap.tiledMapLayer(this.option.url, {noWrap: true}).addTo(this.map);

             this.editableLayers = new L.FeatureGroup();
           },
            initMeasure(){
               this.setQueryParam({
                 key:'measure'
               })
              this.map.addLayer(this.editableLayers);

              var options = {
                position: 'topleft',
                draw: {
                  polyline: true,
                  polygon: true,
                  circle: false,
                  marker: false,
                  rectangle:false,
                  circlemarker:false,
                },
                edit: {
                  featureGroup: this.editableLayers,
                  remove: true
                }
              };
              if (this.drawControl){
                  this.map.removeControl(this.drawControl);
                  this.drawControl=null
              } else{
                this.drawControl = new L.Control.Draw(options);
                this.map.addControl(this.drawControl);
              }
            },
            //绘制相关功能统一处理入口
            draw(e){
              var type = e.layerType,
                      layer = e.layer;
              this.editableLayers.addLayer(layer);
              if (this.queryParam.key==='measure'){
                if (type === 'polygon') {
                  let p=L.polygon(layer.editing.latlngs[0], {})
                  this.getArea(p)
                }
              }
              if (this.queryParam.key==='query'){
                let item=this.queryParam
                let value=item.value


                if (type==='polygon'){
                  value.p= L.polygon(layer.editing.latlngs[0],  {color: 'blue'}).addTo(this.map)
                }

                if (type==='polyline'){
                  value.p= L.polyline(layer.editing.latlngs[0], {color: 'blue'}).addTo(this.map)
                }

                if (value.type==='queryByBuffer'){
                  this.queryByBuffer(value)
                } if (value.type===`queryByGeo`) {
                  this.queryBYGeos(value)
                }
                if (value.type===`queryMarker`){
                  let m=layer._latlng
                  this.queryParam.value.p=L.marker([m.lat,m.lng],{});
                  this.queryBYGeos(this.queryParam.value)
                }


              }


              if (this.queryParam.key.indexOf('edit')>-1){
                if (type === 'marker') {
                  let m=layer._latlng
                  let p=L.marker([m.lat,m.lng],{
                    icon:L.icon({
                      iconUrl: '../../../static/img/redmarker.png',
                      iconSize: [30, 40],
                    })
                  }).addTo(this.map);
                  this.queryParam.p=p;
                }
                if (type==='polygon'){
                  this.queryParam.value.p= L.polygon(layer.editing.latlngs[0],  {color: 'blue'}).addTo(this.map)
                  this.queryBYGeos(this.queryParam.value)

                }
                setTimeout(e=>{
                  Bus.$emit('在线编辑')
                  this.removeDrawControl()
                },700)
              }

            },
           removeDrawControl(){
             this.queryControl&&this.map.removeControl(this.queryControl);
             this.queryControl=null
           },
           commit(item){

             let marker=this.queryParam.p;
             let ids=[],markers=[]
             if (this.queryParam.deleteObj&&this.queryParam.deleteObj.length>0){
               ids=this.queryParam.deleteObj
             }
             // if (this.currentResult&&this.currentResult.features&&this.currentResult.features.length>0){
             //   this.currentResult.features.map(e=>{
             //     markers.push(L.polygon(e.geometry.coordinates, {}))
             //     ids.push(e.id)
             //   })
             //   markers.map(e=>{
             //     e=e.toGeoJSON();
             //     e.properties = queryParam.properties;
             //   })
             //
             // }else{
             //
             // }
             if(item.action!=='delete'){
               marker = marker&& marker.toGeoJSON();
               marker.properties =item.obj
             }


             let EditFeaturesParameters={
               dataSourceName: db.dataSourceName,
               dataSetName: item.ds,
               editType: item.action,
               returnContent: true,
             }


             if (item.action==='add') {
               EditFeaturesParameters.features= marker
             }
             if (item.action==='update'){
               EditFeaturesParameters.IDs=ids
               EditFeaturesParameters.features= markers
             }
             if(item.action==='delete'){
               EditFeaturesParameters.IDs=ids
             }

             var addFeatureParams = new SuperMap.EditFeaturesParameters(EditFeaturesParameters);

             L.supermap.featureService(this.option.dataUrl).editFeatures(addFeatureParams, serviceResult=> {
               if (serviceResult.result&&serviceResult.result.succeed) {
               alert(`操作成功！`);

               }else{
                 alert(`操作失败！`);

               }
             });

             ids=[]
             markers=[]
             this.clear()

           },
             clear(){

                 this.queryControl&&this.map.removeControl(this.queryControl);
                 this.queryControl=null
                  this.editableLayers.clearLayers();
                 this.map.eachLayer(function(layer){
                     if(!layer._layerUrl){
                         this.map.removeLayer(layer)
                     }

                 }.bind(this));
                 this.setQueryParam({})
             },
             //.............................
            addScale(){
              if (!this.scale){
                this.scale=L.control.scale().addTo(this.map);
              }else{
                this.map.removeControl(this.scale)
              }
            },
            addMinimap(){
              if (!this.minimap){
                this.minimap=new L.Control.MiniMap(this.baseLayer, { toggleDisplay: true }).addTo(this.map);
              }else{
                this.minimap=null
              }
            },
            addPan(){
              this.map.removeControl(this.drawControl)
            },
            reset(){
              this.map.flyTo(this.option.option.center)
              setTimeout(e=>{
                  this.map.setZoom(this.option.option.zoom)
              },1200)
            },
            //  测距
           getDistance(geometry){

             var measureParam = new SuperMap.MeasureParameters();
             measureParam.geometry= geometry;
             measureParam.unit = SuperMap.Unit.METER;
             var measureService = L.supermap.measureService(this.option.url);
             measureService.measureDistance(measureParam,function (serviceResult){
               var result=serviceResult.result;
               alert(result.distance.toFixed(2)+'米')

             });
           },
             getArea(geometry){

                 var areaMeasureParam = new SuperMap.MeasureParameters(geometry);
                 //提交服务请求，传递服务查询参数，获取返回结果并按照用户需求进行处理
                 L.supermap .measureService(this.option.url) .measureArea(areaMeasureParam, function (serviceResult) {
                     //获取服务器返回的结果
                     var result=serviceResult.result;
                     alert((result.area/10).toFixed(2)+'平方米')

                 });

             },

         //    通过id检索
             queryByIds(item){

                 // 数据集ID查询服务参数
                 var idsParam = new SuperMap.GetFeaturesByIDsParameters({
                     IDs: [item.id],
                     datasetNames: [`${db.dataSourceName}:${item.ds}`]
                 });
                // 创建指定ID查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesByIDs(idsParam, function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features

                      this.setFeatures(featuers);

                 }.bind(this));
             },
         //    sql
             queryBySql(item){
                 var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                     queryParameter: {
                         name: `${db.dataSetName}@${item.ds}`,
                         attributeFilter: item.attr
                     },
                     datasetNames: [`${db.dataSourceName}:${item.ds}`],
                     toIndex:1000,
                 });
                      // 创建SQL查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesBySQL(sqlParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features
                     this.setFeatures(featuers)
                 }.bind(this));
             },
         //    query by geos
             queryBYGeos(item){
// 设置几何查询范围
//                  var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]], {color: 'red'});
// 设置任意几何范围查询参数
                 var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
                     queryParameter: {
                         name: `${db.dataSetName}@${item.ds}`,
                         attributeFilter: item.attr
                     },
                     attributeFilter: item.attr,
                     datasetNames: [`${db.dataSourceName}:${item.ds}`],
                     geometry: item.p,
                     toIndex:1000,
                     spatialQueryMode: "INTERSECT" // 相交空间查询模式
                 });
// 创建任意几何范围查询实例
                 L.supermap .featureService(this.option.dataUrl) .getFeaturesByGeometry(geometryParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result&& serviceResult.result.features;
                     if (featuers)
                     this.setFeatures(featuers)
                 }.bind(this));
             },

             queryByBuffer(item){
                 let length=prompt('请输入缓冲距离[单位:米]','');
                 if (length===''){
                     return;
                 }

                 var bufferParam = new SuperMap.GetFeaturesByBufferParameters({
                     datasetNames:  [`${db.dataSourceName}:${item.ds}`],
                     bufferDistance: length,
                     geometry: item.p,
                     attributeFilter:item.attr,
                     toIndex:1000,
                 });
                 L.supermap
                     .featureService(this.option.dataUrl)
                     .getFeaturesByBuffer(bufferParam, function (serviceResult) {
                         var featuers =serviceResult.result&& serviceResult.result.features;
                         if (featuers)
                         this.setFeatures(featuers)
                     }.bind(this));

             },
            //缓冲区分析
            bufferAnalysis(item){
              let bufferAnalystService = L.supermap.spatialAnalystService(this.option.spatialanalystUrl);
               //对生成的线路进行缓冲区分析
              let geoBufferAnalystParams = new SuperMap.GeometryBufferAnalystParameters({
                 sourceGeometry: item.p,
                 bufferSetting: new SuperMap.BufferSetting({
                   endType: SuperMap.BufferEndType.ROUND,
                   leftDistance: new SuperMap.BufferDistance({value: 250}),
                   rightDistance: new SuperMap.BufferDistance({value: 250}),
                   semicircleLineSegment: 10
                 })
               });
               bufferAnalystService.bufferAnalysis(geoBufferAnalystParams, function (serviceResult) {
                 resultLayer = L.geoJSON(serviceResult.result.resultGeometry).addTo(map);
                 //查询出缓冲区内信号影响范围内的工厂
                 queryService = L.supermap.queryService(this.option.url);

                 queryByGeometryParameters = new SuperMap.QueryByGeometryParameters({
                   queryParams: [new SuperMap.FilterParameter({name:`${db.dataSetName}@${item.ds}`, })],
                   geometry: resultLayer,
                   spatialQueryMode: SuperMap.SpatialQueryMode.INTERSECT
                 });
                 queryService.queryByGeometry(queryByGeometryParameters, function (serviceResult) {
                   // var result = serviceResult.result;
                   //
                   // resultLayer1 = L.geoJSON(result.recordsets[0].features).addTo(map);
                   var featuers =serviceResult.result&& serviceResult.result.features;
                           if (featuers)
                           this.setFeatures(featuers)
                 });
               });
            },
         //    查询
             queryQuyu(item){
                 this.queryBySql(item)
             },
             queryMan(item){

                 this.queryBySql(item)
             },
             queryZhibei(item){
                 this.queryBySql(item)
             },

         },



    }
</script>

<style lang="scss" module>
   .root{
     width: 100%;
     height: 100%;
     border: 1px solid #dddddd;
   }
</style>
