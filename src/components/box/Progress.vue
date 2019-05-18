<template>
    <div class="progress" v-show="visible">
        <div class="progress-bar progress-bar-success progress-bar-striped"
             role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" :style="{width: value}">

            <span>{{value}}</span>
        </div>
    </div>
</template>

<script>
    import { Progress } from 'mint-ui';

    export default {
        name: "Progress",
        data(){
            return{
                visible:false,
                value:0,

                control:{}
            }
        },
        methods:{
            show(){
                this.visible=true
                let i=0
                this.control=setInterval(e=>{
                    if (i>100){
                        clearInterval(this.control)
                        this.value=0;
                    }
                    i+=2;
                    this.value=i+'%';
                },30)
            },
            close(){
                this.visible=false
            }
        }
    }
</script>

<style scoped>

</style>
