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
           Bus.$on('reset',this.reset);
           Bus.$on('clear',this.clear);

            /*******************************/
             Bus.$on('query',function (d) {
                 this.queryBySql(d.value)
             }.bind(this));

             Bus.$on('queryByGeo',function (d) {
                 this.querygeo(d.value)
             }.bind(this));
             Bus.$on('queryByBuffer',function (d) {
                 this.querybuffer(d.value)
             }.bind(this));
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
          }
        },
        computed:{
            ...mapState(
                {
                    'result':'features',
                     'queryParam':'queryParam',

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
                      }else  if (feature.properties.类型){
                          t="编号" + feature.properties.编号+"<br/>"+"名称" + feature.properties.名称+"<br/>"+"类型" + feature.properties.类型+"<br/>"+"种植时间" + feature.properties.种植时间
                      }else{
                          t=`编号 ${feature.properties.编号}<br/>`+`所属区 ${feature.properties.所属区}区`
                      }
                      layer.bindPopup(t);
                      // if (this.result.feature.length==1){
                      //     this.flyTo(feature)
                      // }

                  }
              }).addTo(this.map);
          //    绘制结果
              this.result.features.map(e=>{
                  if(e.properties.MAN_NAME){
                        this.loadMan(e);
                  }
                  if(e.properties.类型.indexOf('乔木')>-1){
                      this.loadQm(e);
                  }
                  if(e.properties.类型.indexOf('灌木')>-1){
                      this.loadGm(e);
                  }
              })
          }
        },
         methods:{
             ...mapMutations(['setFeatures','clearFeatures',
              'setQueryParam',
             ]),
             //////////////////////////////////////////////////////////
             query(){
                 this.queryByIds([246, 247])
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
                         iconUrl: '../../../static/img/gm.png',
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

             querygeo(item){
                 var options = {
                     position: 'topleft',
                     draw: {
                         polyline: false,
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
                 if (this.queryControl){
                     this.queryControl=null
                 } else{
                     this.queryControl = new L.Control.Draw(options);
                     this.map.addControl(this.queryControl);
                 }
                 this.map.on(L.Draw.Event.CREATED, function (e) {
                     var type = e.layerType,
                         layer = e.layer;
                     if (type === 'polygon') {
                         layer.bindPopup('A popup!');
                     }
                     this.editableLayers.addLayer(layer);
                     let p=L.polygon(layer.editing.latlngs[0], {})
                     item.p=p;
                     this.queryBYGeos(item)
                 }.bind(this));
             },
             flyTo(e){
                 let o=e.geometry.coordinates
               this.map.flyTo([o[1],o[0]])
                 setTimeout(e=>{
                     this.map.setZoom(this.option.option.zoom+4)
                 },1200)
             },
             querybuffer(item){
                 var options = {
                     position: 'topleft',
                     draw: {
                         polyline: true,
                         polygon: false,
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
                 if (this.queryControl){

                     this.queryControl=null

                 } else{
                     this.queryControl = new L.Control.Draw(options);
                     this.map.addControl(this.queryControl);
                 }
                 this.map.on(L.Draw.Event.CREATED, function (e) {
                     var type = e.layerType,
                         layer = e.layer;
                     if (type === 'polygon') {
                         layer.bindPopup('A popup!');
                     }
                     this.editableLayers.addLayer(layer);
                     let p=L.polygon(layer.editing.latlngs[0], {})
                     item.p=p;
                     this.queryByBuffer(item)
                 }.bind(this));
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

            },
             clear(){

                 this.queryControl&&this.map.removeControl(this.queryControl);
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
                     datasetNames: [`${db.dataSourceName}:${item.ds}`]
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
                     datasetNames: [`${db.dataSourceName}:${item.ds}`],
                     geometry: item.p,
                     spatialQueryMode: "INTERSECT" // 相交空间查询模式
                 });
// 创建任意几何范围查询实例
                 L.supermap .featureService(this.option.dataUrl) .getFeaturesByGeometry(geometryParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features;
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
                     geometry: item.p
                 });
                 L.supermap
                     .featureService(this.option.dataUrl)
                     .getFeaturesByBuffer(bufferParam, function (serviceResult) {
                         var featuers =serviceResult.result&& serviceResult.result.features;
                         if (featuers)
                         this.setFeatures(featuers)
                     }.bind(this));
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
