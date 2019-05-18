<template>
  <ul class="nav  nav-pills root"  >
    <li v-for="(item) in list"  role="presentation" @click="select(item)">
      <a href="#" style=" color: #FFFFFF;">{{item.name}}</a>
    </li>


    <li class="query" role="presentation" @click="select({name:`查询`})">
      <span class="btn glyphicon glyphicon-search" title="查询"></span>
    </li>
    <li class="message dropdown" role="presentation"  >
      <span class="btn glyphicon glyphicon-bell dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" title="消息"></span>
      <Badge :count="mLength" v-show="mLength>0&&ok">
        <a href="#" class="demo-badge"></a>
      </Badge>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
        <li v-for="i in message" @click="show(i)">{{i.user}}</li>
        <li  @click="clear">清空</li>
      </ul>
    </li>

  </ul>
</template>

<script>
    export default {
        name: "Nav",
         props:{
          list:Array
         },
        data(){
          return{
            ok:true
          }
        },
        methods:{
          select:function (i) {
            Bus.$emit(i.name);
            Bus.$emit('showMenu',i.children);
          },
          show(i){
            Bus.$emit('showMessage',i);
          },
          clear(){
            this.$store.commit('setMessage',[])
            this.ok=false
          }
        },
       computed:{
         mLength(){
           return this.$store.state.message.length;
         },
         message(){
           return this.$store.state.message
         }
       }
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
  .message{
    margin-left: 3%;
    margin-top: 0%;
  }
  .dropdown-menu li{
    color:black;
    text-align: center;
  }
</style>
