let [dev,real]=[{
     option:{
         crs: L.CRS.NonEarthCRS({
             bounds: L.bounds([48.4, -7668.25], [8958.85, -55.58]),
             origin: L.point(48.4, -55.58)
         }),
         center: [-4500, 4000],
         maxZoom: 18,
         zoom: 1
     },
    url:"http://support.supermap.com.cn:8090/iserver/services/map-changchun/rest/maps/长春市区图",
},
    {
        option:{
            crs:L.CRS.NonEarthCRS({
                bounds: L.bounds([ 506077.42 , 4340213.02 ], [508570.72 , 4342564.64]),
                origin: L.point(506077.42, 4342564.64)
            }),
            center: [4341399.44,507291.56 ],
            maxZoom: 10,
            zoom: 1,
            measureControl:true,
        },
//101.200.50.47
        url:'http://101.200.50.47:8090/iserver/services/map-xxq_mapall/rest/maps/mapall@xxq',
        dataUrl:"http://101.200.50.47:8090/iserver/services/data-xxq_mapall/rest/data/",
    }]
export default {
  //标题
  title:'基于GIS的校园绿地养护系统',
  //地图配置
  map:real,
  //导航菜单
  resourceMenu:[
    {
      name:'基础操作',

      children:[
        {
          name:'空间量算',
            event:'measure',
        },
        {
          name:'比例尺',
            event:'scale',
        },
        {
          name:'地图鹰眼',
            event:'minimap',
        },
        {
          name:'地图复位',
            event:'resetPosition',
        },
          {
              name:'清除',
              event:'clear',
          }
      ]
    },

    {
      name:'任务分发',
      children:[
        /*{
          name:'数据检索',
        },
        {
          name:'在线编辑',
        },
          {
              name:'清除',
          }*/
      ]
    },
      {
          name:'在线编辑',
          children:[
          ]
      },
    {
      name:'统计分析',
      children:[

          {
              name:'清除',
          }
      ]
    },
      {
          name:'病虫害防治',
          children:[

              {
                  name:'清除',
              }
          ]
      },

      {
          name:'设备模拟',
          children:[


          ]
      },
        // {
        //   name:'问题上报',
        // },


  ],
//    综合查询
    query:{
       l1:[
           '区域查询',
           '人员查询',
           '植被查询',
       ],
        l2:[
            '草坪',
            '树木',
        ],
        l3:[
            '乔木',
            '灌木'
          ],
    },
//    任务分发
    dispatchTask:{
      task:[

          {
              name:'草坪灌溉',
              checked:false
          },
          {
              name:  '草坪修剪',
              checked:false
          },
          {
              name:'草坪施肥',
              checked:false
          },
          {
              name:'草坪补植',
              checked:false
          },
          {
              name: '病虫防治',
              checked:false
          },
          {
              name:  '树木修剪',
              checked:false
          },{
              name: '树木灌溉',
              checked:false
          },{
              name: '树木补植',
              checked:false
          },







      ],
        quyu:[
            {
                name:'一区',
                children:[
                ],
                checked:false
            },
            {
                name:'二区',
                children:[
                ],
                checked:false
            },
            {
                name:'三区',
                children:[],
                checked:false
            },
            {
                name:'四区',
                children:[],
                checked:false
            },
            {
                name:'五区',
                children:[],
                checked:false
            },
            {
                name:'六区',
                children:[],
                checked:false
            },
            {
                name:'七区',
                children:[],
                checked:false
            },

        ],
        mans:[
            [
              '张三',
                '李四',
                '张五',
            ],

            [
                '李二'
            ],
            [
                '3111'
            ],
        ],
    },
//    区域统计
    AreaStatistics:{
      name:'未知',
        list:[
            {
                name:'草坪',
                symbol:'../../../static/img/cp.png',
                count:0,
            },
            {
                name:'乔木',
                symbol:'../../../static/img/qm.png',
                count:0,
            },
            {
                name:'灌木',
                symbol:'../../../static/img/gm.png',
                count:0,
            },
            {
                name:'养护员',
                symbol:'../../../static/img/man.png',
                count:0,
            },
        ]
    },
//   病虫害列表
    bch:{
      caoping:{
          name:'草坪',
          list:[
              {
                  name:'病1',
                  info:{
                      名称:'狗尾草',
                      防治措施:'措施',
                      发病期:'3~4月份',
                      防治周期:'',//防治周期,
                      图片:'../../../static/img/man.png'
                  }
              },

          ],
          list1:[
              {
                  name:'虫1',
                  info:{
                      名称:'虫1',
                      防治措施:'措施',
                      发病期:'3~4月份',
                      防治周期:'',//防治周期,
                      图片:'../../../static/img/man.png'
                  }
              },
          ]
      },
       tree:{
           name:'树木',
          type:[
              {
                  name:'乔木',
                  children:[
                      {
                          name:'乔木',
                          list:[
                              {
                                  name:'乔木1狗尾草',
                                  info:{
                                      名称:'虫1',
                                      防治措施:'措施',
                                      发病期:'3~4月份',
                                      防治周期:'',//防治周期,
                                      图片:'../../../static/img/man.png'
                                  }
                              },
                          ]
                      },
                      {
                          name:'乔木2',
                          list:[
                              {
                                  name:'乔木2-狗尾草',
                                  info:{
                                      名称:'虫1',
                                      防治措施:'措施',
                                      发病期:'3~4月份',
                                      防治周期:'',//防治周期,
                                      图片:'../../../static/img/man.png'
                                  }
                              },
                          ]
                      },
                  ]
              },
              {
                  name:'灌木',
                  children:[
                      {
                          name:'灌木',
                          list:[
                              {
                                  name:'灌木1狗尾草',
                                  info:{
                                      名称:'虫1',
                                      防治措施:'措施',
                                      发病期:'3~4月份',
                                      防治周期:'',//防治周期,
                                      图片:'../../../static/img/man.png'
                                  }
                              },
                          ]
                      },
                      {
                          name:'灌木2',
                          list:[
                              {
                                  name:'灌木2狗尾草',
                                  info:{
                                      name:'狗尾草',
                                      method:'措施',
                                      bfq:'3~4月份',
                                      zhouqi:'',//防治周期,
                                      pic:'../../../static/img/man.png'
                                  }
                              },
                          ]
                      },
                  ]
              },
          ],

       }
    },
    dataManager:{
      dataSourceName:'xxq',
      actions:[
           `选择操作类型`,
          '新增',
          '编辑',
          '删除',
      ],
        features:[
            {
                name:'选择数据集类型'
            },
            {
                name:'草坪',
                dataSetName:'caoping',
            },
            {
                name:'树木',
                dataSetName:'tree',
            },
        ]
    },
    device:{
      types:[
          {
              name:'请选择设备',
          },
          {
              name:'喷灌设备',
              types:[
                  {
                      name:'近射程（23m）',
                      value:23,
                  },
                  {
                      name:'中射程(48m)',
                      value:48
                  },
              ]
          }
      ]
    }

}
