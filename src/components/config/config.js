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
    bchFZ:{
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
                               name:'虱子',
                               content:'虱子是0.6厘米长的灰黑色昆虫，从草叶中吸取汁液。它们在草坪上产生棕黄色斑块，要进行诊断，将空罐放入贴片边缘的地面，用水填充罐头。如果存在谷物大害虫麦虱，它们将漂浮到表面。为了尽量减少蔓延，保持该区域充分浇水，化学防治包括毒死蜱和二嗪农。'
                            },
                            {
                                name:'蚯蚓',
                                content:'草皮蚯蚓根本不是蠕虫，而是小的，无毛的灰色毛虫，幼虫形式的小型浅黄色飞蛾，如果存在的话，可以看到在晚上靠近草坪表面飞行。草皮蚯蚓以草叶为食，症状是春天出现并在夏季放大的小草坪。'
                            },

                        ]
                    },
                    {
                        name:'病害',
                        label:'病害',
                        bchList:[
                            {
                                name:'锈',
                                content:'锈病是一种真菌病，在草坪中，它主要影响蓝草和黑麦草。草叶在整个过程中变成黄色到红棕色，较旧的叶片和茎上形成小红色脓疱，叶片最终死亡。生锈的最佳解决方案是使用配制用于草坪护理的氮肥，定期浇水，并更频繁地割草。'
                            },
                            {
                                name:'仙女戒指',
                                content:'仙女戒指是一片深绿色的小圆形斑块，周围是死去的或浅色的草，蘑菇可能会或可能不会出现在绿色区域的周边。这些环是由生长在有机质含量高的土壤中的草坪中常见的真菌病引起的。'
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
                                name:'垂柳',
                                label:'垂柳',
                                bchTypeList:[
                                    {
                                        name:'病害',
                                        label:'病害',
                                        bchList:[
                                            {
                                                name:'根朽病',
                                                content:'防治技术:可分别在土壤中施用三唑酮、杀毒矾、三环唑、百菌清等可湿性粉剂，配合更换客土、设置隔离物等措施，能取得较好的防治效果。'
                                            },
                                            {
                                                name:'腐烂病',
                                                content:'防治技术:苗木种植不宜过密，以便通风降湿；及时清除大柳树下的萌条；4～7月喷洒50％多菌灵可湿性粉剂500倍液，或50％托布津可湿性粉剂800倍液。'
                                            },
                                            {
                                                name:'叶斑病',
                                                content:'防治技术:播种或插条育苗不宜过密；发病初期喷l：2：160的波尔多液保护新梢，发病盛期喷0.2～0.5波美度。石灰硫磺合剂，或25％可湿性萎锈灵200～400倍液，可少加0.05％～0.1％洗衣粉，以增加药液展着性，并可抑制夏孢子萌发。'
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
                                            {
                                                name:'2',
                                                content:'2'
                                            },
                                            {
                                                name:'2',
                                                content:'2'
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                name:'小叶槐',
                                label:'小叶槐',
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
                            },
                            {
                                name:'梧桐树',
                                label:'梧桐树',
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
                        name:'灌木',
                        label:'灌木',
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
