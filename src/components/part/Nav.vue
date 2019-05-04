<template>
  <ul class="nav  nav-pills root"  >
    <li v-for="(item) in list"  role="presentation" @click="select(item)">
      <a href="#" style=" color: #FFFFFF;">{{item.name}}</a>
    </li>

    <li class="query" role="presentation" @click="select({name:`查询`})">
      <span class="btn glyphicon glyphicon-search" title="查询"></span>
    </li>

  </ul>
</template>

<script>
    export default {
        name: "Nav",
         props:{
          list:Array
         },
        methods:{
          select:function (i) {


            Bus.$emit(i.name);
            Bus.$emit('showMenu',i.children);

            // if (i.name.indexOf('个人')>-1){
            //   this.$store.commit('setShowCenter',true)
            // }
            // if (i.name.indexOf('查询')>-1){
            //     this.$store.commit('setShowQuery',true)
            //
            // }
            //   if (i.name.indexOf('分发')>-1){
            //       this.$store.commit('setShowDispatchTask',true)
            //
            //   }
            //   if (i.name.indexOf('统计')>-1){
            //       this.$store.commit('setShowAreaStatistics',true)
            //
            //   }
            //   if (i.name.indexOf('防治')>-1){
            //
            //       this.$store.commit('setShowBch',true)
            //
            //   }
          }
        },
    }
</script>

<style scoped>
  .root{

  }
  a:visited{
    color:black;
  }
  .query{
    margin-left: 10%;
  }
</style>
