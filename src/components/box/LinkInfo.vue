<template>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <p v-show="visible" class="bg-primary">{{info}}</p>
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
