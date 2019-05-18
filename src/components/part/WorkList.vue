<template>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
   <div class="root col-md-8" v-if="list.length>0">
       <ul class="list-group">
           <li class="list-group-item" v-for="item in list">
               <span class="badge">{{item.level}}</span>
              {{item.name}}
           </li>
       </ul>
   </div>
    </transition>
</template>

<script>
    import { Actionsheet } from 'mint-ui';
    export default {
        name: "WorkList",
        data:function () {
            return{
                visible:false,
            }
        },
        methods:{
            show(){
                this.visible=true
            },
            close(){
                this.visible=false
            }
        },
        computed:{
            list(){
                return this.$store.state.worklist;
            }
        },
        watch:{
            list(){

            }
        }
    }
</script>

<style scoped>
.root{

}
</style>
