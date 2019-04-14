<template>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
        <div class="panel panel-default" v-show="visible">
            <div class="panel-heading">当前位置：{{option.name}}&nbsp;<span @click="close">&times;</span></div>
            <div class="panel-body">
                <table class="table" >
                    <tr v-for="(item,index) in option.list">
                        <td><img class="symbol" :src="item.symbol" alt=""></td><td>{{item.name}}</td><td>{{item.count}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "AreaStatistics",
        props:{
            option:Object,

        },
        data(){
            return{
                visible:false
            }
        },
        methods:{
            close(){
                this.visible=false
                this.$store.commit('setShowAreaStatistics',false)
            },
        },
        computed:{
            show(){
                return this.$store.state.showAreaStatistics
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
    .panel{

    }
 .symbol{
     width: 30px;
     height: 30px;
 }
 .panel-body{
     /*padding-top: 1rem;*/
 }
    table{

    }
</style>
