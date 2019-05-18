<template>
    <i-circle  :percent="index" stroke-color="#5cb85c" size=18 stroke-width="8">
        <Icon v-show="icon" v-if="index == 100" type="ios-checkmark" size="17" style="color:#5cb85c"></Icon>
        <span v-show="num" v-else style="font-size:1px">{{ index }}%</span>
    </i-circle>
</template>

<script>
    export default {
        name: "CircleProgress",
        data(){
            return{
                index:0,
                control:null,
                num:true,
                icon:false
            }
        },
        mounted(){
           Bus.$on('showCircleProgress',e=>{
               this.init()
           })
        },
        methods:{
           init(){
             this.control=setInterval(this.start,3)
           },
            start(){
                if (this.index>98){
                    this.stop()
                    this.icon=true
                    this.num=false
                }
                this.index++

            },
            stop(){
             if (this.control){
                 clearInterval(this.control)
                 this.control=null

             }
            },

        }
    }
</script>

<style scoped>

</style>
