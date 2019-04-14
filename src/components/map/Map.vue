<template>
  <div :class="$style.root">

  </div>
</template>

<script>
    import Bus from '../common/Bus'
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
             Bus.$on('query',this.query);
             Bus.$on('querygeo',this.querygeo);
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
                    'result':'features'
                }
            )
        },
        watch:{
          result(){
              let resultLayer = L.geoJSON(this.result, {
                  onEachFeature: function (feature, layer) {
                      layer.bindPopup("ID: " + feature.properties.SMID +
                          "<br> " + feature.properties.COUNTRY);
                  }
              }).addTo(this.map);
          }
        },
         methods:{
             ...mapMutations(['setFeatures','clearFeatures']),
             //////////////////////////////////////////////////////////
             query(){
                 this.queryByIds([246, 247])
             },
             querygeo(){
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
                     this.queryBYGeos(p)
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
              this.map.addLayer(this.editableLayers);
              /*var MyCustomMarker = L.Icon.extend({
                options: {
                  shadowUrl: null,
                  iconAnchor: new L.Point(12, 12),
                  iconSize: new L.Point(24, 24),
                  iconUrl: 'link/to/image.png'
                }
              });*/
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
                this.drawControl=null
              } else{
                this.drawControl = new L.Control.Draw(options);
                this.map.addControl(this.drawControl);
              }


              this.map.on(L.Draw.Event.CREATED, function (e) {
                  var type = e.layerType,
                      layer = e.layer;
                  if (type === 'marker') {
                      layer.bindPopup('A popup!');
                  }

                  this.editableLayers.addLayer(layer);
                  let p=L.polygon(layer.editing.latlngs[0], {})

                  if (this.getDistance(p)){
                      console.log(p)
                  }
              }.bind(this));
              ///new
              //   this.map.off()

            },
             clear(){

                  this.editableLayers.clearLayers();
                 this.map.eachLayer(function(layer){
                     if(!layer._layerUrl){
                         this.map.removeLayer(layer)
                     }

                 }.bind(this));
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

            //  测距
           getDistance(geometry){

             var measureParam = new SuperMap.MeasureParameters();
             measureParam.geometry= geometry;
             measureParam.unit = SuperMap.Unit.METER;
             var measureService = L.supermap.measureService(this.option.url);
             measureService.measureDistance(measureParam,function (serviceResult){
               var result=serviceResult.result;
               console.log(result)

             });
           },
         //    通过id检索
             queryByIds(ids){
                 // 数据集ID查询服务参数
                 var idsParam = new SuperMap.GetFeaturesByIDsParameters({
                     IDs: ids,
                     datasetNames: [`${db.dataSourceName}:${db.dataSetName}`]
                 });
                // 创建指定ID查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesByIDs(idsParam, function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features

                      this.setFeatures(featuers);

                 }.bind(this));
             },
         //    sql
             queryBySql(){
                 var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
                     queryParameter: {
                         name: `${db.dataSetName}@${db.dataSourceName}`,
                         attributeFilter: db.attributeFilter
                     },
                     datasetNames: [`${db.dataSourceName}:${db.dataSetName}`]
                 });
                      // 创建SQL查询实例
                 L.supermap.featureService(this.option.dataUrl).getFeaturesBySQL(sqlParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features
                     this.setFeatures(featuers)
                 }.bind(this));
             },
         //    query by geos
             queryBYGeos(polygon){
// 设置几何查询范围
//                  var polygon = L.polygon([[0, 0], [-30, 0], [-10, 30], [0, 0]], {color: 'red'});
// 设置任意几何范围查询参数
                 var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
                     datasetNames: [`${db.dataSourceName}:${db.dataSetName}`],
                     geometry: polygon,
                     spatialQueryMode: "INTERSECT" // 相交空间查询模式
                 });
// 创建任意几何范围查询实例
                 L.supermap .featureService(this.option.dataUrl) .getFeaturesByGeometry(geometryParam,function (serviceResult) {
                     // 获取服务器返回的结果
                     var featuers = serviceResult.result.features;
                     this.setFeatures(featuers)
                 }.bind(this));
             },
         //    专题地图
         }
    }
</script>

<style lang="scss" module>
   .root{
     width: 100%;
     height: 100%;
     border: 1px solid #dddddd;
   }
</style>
