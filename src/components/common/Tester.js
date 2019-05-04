export default {
  TreeMap(key){
    let map=new Map([
      ['COL0','编号'],
      ['COL1','名称'],
      ['COL2','类型'],
      ['COL3','科属'],
      ['COL4','其他'],
    ])
    return map.get(key)
  },
  getTreeData(item){
     let info={}
      if (item.COL2&&item.COL2==='乔木'){
         info={
           编号:`T`+item.SMID,
           名称:'龙爪槐',
           学名:'Sophora japonica',
           目:'蔷薇目',
           属:'槐属',
           说明:`龙爪槐是国槐的芽变品种，落叶乔木、喜光、稍耐阴、能适应干冷气候。树冠优美，花芳香，是行道树和优良的蜜源植物；花和荚果入药，有清凉收敛、止血降压作用；叶和根皮有清热解毒作用，可治疗疮毒；木材供建筑用。本种由于生境不同，或由于人工选育结果，形态多变，产生许多变种和变型`,

           种植时间:'2017/3/4',
         }
      }
      if (item.COL2&&item.COL2==='灌木'){
        info={
          编号:`T`+item.SMID,
          名称:'海桐',
          科:'海桐科',
          属:'海桐花属',
          分布区域:'核心教学区',

          说明:`海桐是双子叶植物纲，高达6米，嫩枝被褐色柔毛，有皮孔。叶聚生于枝顶，二年生，革质；伞形花序或伞房状伞形花序顶生或近顶生，花白色，有芳香，后变黄色；蒴果圆球形，有棱或呈三角形，直径12毫米；花期3至5月，果熟期9至10月。`,
          种植时间:'2016/11/8',
        }
      }
      return info
  },
  getRandomId(symbol) {
    let i = 5;
    for (let j = 0; j < i; j++) {
      symbol += Math.ceil(Math.random() * 9)
    }
    return symbol;
  }
}
