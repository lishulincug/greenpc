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
        dataUrl:"http://101.200.50.47:8090/iserver/services/data-xxq_mapall/rest/data",
    spatialanalystUrl:'http://101.200.50.47:8090/iserver/services/spatialAnalysis-xxq_mapall/restjsr/spatialanalyst'
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
        // {
        //   name:'地图鹰眼',
        //     event:'minimap',
        // },
        {
          name:'地图复位',
            event:'resetPosition',
        },
        {
          name:'全屏',
          event:'fullScreen',
        },
          {
              name:'打印',
              event:'print',
          },
          {
              name:'清除',
              event:'clear',
          }
      ]
    },

    {
      name:'任务分配',
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

      ]
    },
      {
          name:'病虫害防治',
          children:[


          ]
      },

      {
          name:'设备模拟',
          children:[


          ]
      },
      {
          name:'用户管理',
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
                task:[],
                checked:false
            },
            {
                name:'二区',
                children:[
                ],
                task:[],
                checked:false
            },
            {
                name:'三区',
                children:[],
                task:[],
                checked:false
            },
            {
                name:'四区',
                children:[],
                task:[],
                checked:false
            },
            {
                name:'五区',
                children:[],
                task:[],
                checked:false
            },
            {
                name:'六区',
                children:[],
                task:[],
                checked:false
            },
            {
                name:'七区',
                children:[],
                task:[],
                checked:false
            },

        ],
        mans:[
            [
                '李明',
                '刘四',
                '张五',
                '张张',
                '王五',
                '张山',
                '张三',
                '李二',
                '张六',
            ],

            [
                'rr',
                'aa',
                'bb',
                'cc',
                'dd',
                'nn',
                'mm',
                'kk',
                'jj',
                'gg',
                'ff',

            ],
            [
                '11',
                '22',
                '33',
                '44',
                '55',
                '66',
                '77',
                '88',
                '99',
                '00',
            ],
        ],
    },
//    区域统计
    AreaStatistics:{
      name:'未知',
        list:[
            {
                name:'草坪',
                symbol:'static/img/cp.png',
                count:0,
            },
            {
                name:'乔木',
                symbol:'static/img/qm.png',
                count:0,
            },
            {
                name:'灌木',
                symbol:'static/img/gm.png',
                count:0,
            },
            {
                name:'养护员',
                symbol:'static/img/man.png',
                count:0,
            },
        ]
    },
//   病虫害防治
    bch:{
        zbTypeList:[
            {
                name:'草坪',
                label:'草坪',
                bchTypes:[
                    {
                        name:'虫害',
                        label:'虫害',
                        bchList:[
                            {
                               name:'1',
                               content:'1'
                            },
                        ]
                    },
                    {
                        name:'病害',
                        label:'病害',
                        bchList:[
                            {
                                name:'1',
                                content:'1'
                            },
                        ]
                    },
                ]
            },
            {
                name:'树木',
                label:'树木',
                treeTypeList:[
                    {
                        name:'乔木',
                        label:'乔木',
                        treeList:[
                            {
                                name:'树1',
                                label:'树1',
                                bchTypeList:[
                                    {
                                        name:'病害',
                                        label:'病害',
                                        bchList:[
                                            {
                                                name:'1',
                                                content:'1'
                                            },
                                        ]
                                    },
                                    {
                                        name:'虫害',
                                        label:'虫害',
                                        bchList:[
                                            {
                                                name:'2',
                                                content:'2'
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name:'乔木',
                        label:'乔木',
                        treeList:[
                            {
                                name:'树2',
                                label:'树2',
                                bchTypeList:[
                                    {
                                        name:'病害',
                                        label:'病害',
                                        bchList:[
                                            {
                                                name:'3',
                                                content:'1'
                                            },
                                        ]
                                    },
                                    {
                                        name:'虫害',
                                        label:'虫害',
                                        bchList:[
                                            {
                                                name:'4',
                                                content:'2'
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
        ]
    },
    dataManager:{
      dataSourceName:'xxq',
      actions:[
        {
          name:`选择操作类型`,
          value:''
        },
        {
          name:'新增',
          value:'add'
        },
        {
          name:'编辑',
          value:'update'
        },
        {
          name: '删除',
          value:'delete'
        },



      ],
        features:[
            {
                name:'选择数据集类型',
              value:''
            },
            {
                name:'草坪',
                value:'caoping',
            },
            {
                name:'树木',
                value:'tree',
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
    },
    AppTab:[
      {

        name:'任务单',
        event:'showTask',
        img:'static/img/manager.png',
      },

      {
        name:'病虫害',
        event:'showBchJl',
        img:'static/img/yuji.png',
      },
      // {
      //   name:'',
      //   event:'',
      // },

    ]

}
