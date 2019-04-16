<template>
  <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div class="panel panel-default" v-show="visible">
      <div class="panel-heading">
        <span>Panel heading without title</span>
        <span @click="close">&times;</span>
      </div>
      <div class="panel-body">
        Panel content
      </div>
    </div>
  </transition>
</template>

<script>
    export default {
        name: "BchFZ",
        data(){
          return{
            visible:false
          }
        },
      methods:{
        close(){
          this.visible=false
          this.$store.commit('setShowBch',false)
        },
      },
      computed:{
        show(){
          return this.$store.state.showBch
        }
      },
      watch:{
        show(){
          if (this.show){
            this.visible=true
          } else{
            this.close()
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.panel-heading{
   display: flex;
  span{
    span:nth-child(1){
      flex: 95%;
    }
    span:nth-child(2){
      flex: 5%;
    }
  }
}

</style>
