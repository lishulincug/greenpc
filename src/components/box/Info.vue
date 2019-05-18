<template>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <p v-show="visible" class="bg-success">{{info}}</p>
    </transition>
</template>

<script>
    export default {
        name: "Info",
        props:{

        },
        data(){
            return{
                visible:false,
                info:''
            }
        },
        methods:{
            show(msg){
                this.visible=true
                this.info=msg
                setTimeout(e=>{
                  this.close()
                },2000)
            },
            close(){
                this.visible=false
            }
        }
    }
</script>

<style scoped>
    .bg-success{
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        padding-top: 4%;
        height: 9%;
        background-color: #5cb85c;
        color: white;
        border-radius: 3%;
    }

</style>
