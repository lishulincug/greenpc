<template>
 <div class="root">
     <span @click="clear" class="btn btn-default glyphicon glyphicon-trash"></span>
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
           clear:function () {
               Bus.$emit('clear')
           }

        }
    }
</script>

<style lang="scss" scoped>
  .root{

      width: 9%;
      /*height: 34px;*/
      z-index: 99;
      display: flex;
      align-items: center;
      justify-content: center;

      span{
          width: 30%;
          line-height: inherit;
          cursor: pointer;
          text-align: center;
          padding: 0 0.01rem;

      }
  }
</style>
