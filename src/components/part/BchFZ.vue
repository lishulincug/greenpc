<template>
  <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">

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

<style scoped>

</style>
