<template>
 <div :class="$style.root">
     <span @click="select(0)" :class="active==0?$style.height:$style.normal">比例尺</span>
     <span @click="select(1)" :class="active==1?$style.height:$style.normal">地图鹰眼</span>
     <span @click="select(2)" :class="active==2?$style.height:$style.normal">地图平移</span>
 </div>
</template>

<script>
    export default {
        name: "TabBoundary",
        props:{

        },
        data:function(){
            return {
                active:null,
            }
        },
        methods:{
           select:function (i) {
               this.$emit('control',i)
               this.active=i;
           }

        }
    }
</script>

<style lang="scss" module>
  .root{

      width: 9%;
      height: 34px;
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;


      background-color: #b1b1b1;

      span{
          width: 30%;
          line-height: inherit;
          color: #D3D3D3;
          cursor: pointer;
          text-align: center;
          padding: 0 0.01rem;

      }
      .height{
          background-color: #337ab7;
        color: whitesmoke;
      }
      .normal{
          background-color: whitesmoke;
        color: black;
      }
  }
</style>
