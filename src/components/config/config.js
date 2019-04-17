export default {
  //标题
  title:'基于GIS的校园绿地养护系统',
  //地图配置
  map:{
    option:{
      crs:L.CRS.NonEarthCRS({
        bounds: L.bounds([ 506077.42 , 4340213.02 ], [508570.72 , 4342564.64]),
        origin: L.point(506077.42, 4342564.64)
      }),
      center: [4340999.44,506821.56 ],
      maxZoom: 10,
      zoom: 2,
       measureControl:true,
    },
      // url:"http://support.supermap.com.cn:8090/iserver/services/map-changchun/rest/maps/长春市区图",
      url:'http://101.200.50.47:8090/iserver/services/map-xxq_mapall/rest/maps/mapall@xxq',
      dataUrl:"http://support.supermap.com.cn:8090/iserver/services/data-changchun/rest/data",
  },
  //导航菜单
  resourceMenu:[
    {
      name:'基础操作',
      children:[
        {
          name:'空间量算'
        },
        {
          name:'比例尺',
        },
        {
          name:'地图鹰眼',
        },
        {
          name:'地图平移',
        },
          {
              name:'清除',
          }
      ]
    },
      {
          name:'综合查询',
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
    // {
    //   name:'城市空间量算',
    // },
    {
      name:'问题上报',
    },


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
    bch:[
        {
            name:'',
            list:[
                {
                    name:'',
                    info:{
                        
                    }
                }
            ]
        }
    ]
}
