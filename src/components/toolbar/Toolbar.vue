<template>
  <div id="btn">
        <span class="item" v-for="(item,i)  in menu" :title="item.name" @mouseenter="showInfo" @mouseleave="closeInfo" @click="select(item.name)">
             <span :class="item.style"></span>
             <!--<Tip v-show="isShow" :info="item.title"></Tip>-->
         </span>
  </div>
</template>

<script>
    import Info from '../box/Info'
    import Tip from '../box/Tip'
    export default {
        name: "toolbar",
        props:{
          menu:Array,
        },
        data(){
            return{
                isShow:true
            }
        },
        components:{
          Info,Tip,
        },
        methods:{
          select(n){
            this.$emit('toolbar',n);
          },
            showInfo(){

                this.isShow=true
            },
            closeInfo(){
                this.isShow=false
            }
        }
    }
</script>

<style scoped>
  #btn{
    width: 8%;
    height: auto;


  }
  #btn img{
    width: 25px;
    height: 30px;
  }
  #btn .item{
    display: block;
    border-radius: 50%;
    z-index: 9;
    margin-top: 30%;
    background-color: white;
  }
</style>
