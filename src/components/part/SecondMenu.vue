<template>
    <div>
      <ul class="list-group">
        <li class="list-group-item" v-for="(item,i) in list" @click="select(item,i)" :class="key==i?'height':'normal'">
          {{item.name}}
        </li>

      </ul>
    </div>
</template>

<script>

    export default {
        name: "SecondMenu",
       props:{
          list:Array,
       },
       data:function(){
          return{
            key:null,
          }
       },
       methods:{

          select:function (item,i) {
             this.key=i
             Bus.$emit(item.event)
              /*switch (item.name) {
               case '比例尺':
                 map.addScale()
                 break;
               case '地图鹰眼':
                 map.addMinimap()
                 break;
               case '地图复位':
                   map.reset();
                 break;
                case '空间量算':
                 map.initMeasure()
                 break;
                 case '数据检索':
                     this.$parent.$refs.query.show()
                     break;

                 case '清除':
                     map.clear()
                     break;


             }*/
          }
       },
      computed:{
        items(){
          return this.$store.state.SecondMenuList
        }
      },
      watch:{
        items(){
          this.list=this.items;
          this.key=null
        }
      }
    }
</script>

<style scoped>
li{
  margin-top: 18%;
  cursor: pointer;
}
  .height{
    background-color: #75ca17;
    color: white;
  }
  .normal{
    background-color: white;
    color: black;
  }
</style>
