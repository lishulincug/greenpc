<template>
  <ul class="nav  nav-pills root" >
    <li v-for="(item) in list"  role="presentation" @click="select(item)">
      <a href="#">{{item.name}}</a>
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
            this.$store.commit('setSecondMenuList',i.children)
            if (i.name.indexOf('个人')>-1){
              this.$store.commit('setShowCenter',true)
            }
          }
        },

    }
</script>

<style scoped>
  .root{

  }
</style>
