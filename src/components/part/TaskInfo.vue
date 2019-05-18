<template>
    <Card :bordered="false" v-show="visible">
        <p slot="title">任务详情<Icon type="ios-backspace" @click="close"/>

        </p>
        <table class="table table-responsive">
           <tr v-for="(value,key,index) in obj" v-if="key!=='_id'&&key!=='user'">
               <td  >
                   {{key}}
               </td>
               <td>{{value}}</td>
           </tr>
        </table>




        <Icon type="md-checkmark" @click="ok"/>
    </Card>

</template>

<script>
    import {updateTask} from '../../common/api'
    import bus from "../common/Bus";

    export default {
        name: "TaskInfo",
        data(){
            return{
             obj:{},
                visible:false
            }
        },

        mounted(){
            Bus.$on('showInfo',this.show)
        },
        methods:{
          show(obj){
                this.obj=obj
              this.visible=true
          },
            close(){
              this.visible=false
            },
            ok(){
              this.obj.status='已完成'
                updateTask(fun.getRequestDataFromObj(this.obj)).then(e=>{
                    if (e.data) {
                        this.$Message.success('任务完成!')
                        Bus.$emit('getTask')
                    }
                })
            }

        }
    }
</script>

<style scoped>
ul li{
    list-style: none;
    text-align: center;
}
</style>