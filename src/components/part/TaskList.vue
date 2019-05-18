<template>
    <transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
   <div class="root col-md-8">

      <table class="table table-responsive">
          <thead>
          <th v-for="i in heads">
              <span v-if="i==='_id'">{{i}}</span>

          </th>
          <th> <span >操作</span></th>
          </thead>
         <tbody>
           <tr v-for="i in list">
               <td v-for="j in i">
                   <span v-if="j.length>10&&(j.indexOf(':')<0)"  >{{j}}</span>
               </td>
               <td> <span class="glyphicon glyphicon-eye-open" @click="showInfo(i)" ></span></td>
           </tr>
         </tbody>
      </table>
       <TaskInfo></TaskInfo>
   </div>
    </transition>
</template>

<script>
  import TaskInfo from './TaskInfo'
    export default {
        name: "WorkList",
        data:function () {
            return{

            }
        },
        components:{
            TaskInfo,
        },
        mounted(){

        },
        methods:{

            close(){
                Bus.$emit('showMap')
            },
            showInfo(i){
                let info=this.list.find(e=>e._id===i._id)
                Bus.$emit('showInfo',info)
                this.fixed(info)
                setTimeout(e=>{
                  this.close()
                },1000)
            },
            fixed(obj){
                let ds='',key='',attr=''
                if (obj.content&&obj.content.indexOf('草坪')>-1){
                    ds='caoping'
                    key='cp'
                    attr=`COL1=='${obj.zbId}'`
                }
                Bus.$emit('query',{
                    key:key,
                    value:{
                        attr:attr,
                        ds:ds
                    }
                });

            }
        },
        computed:{
            list(){
                return this.$store.state.taskList;
            },
            heads(){
                let item=(Array.isArray(this.list)&&this.list.length>0)?this.list[0]:{}

                return Object.keys(item);
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
