<template>
    <transition enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
        <div class="panel panel-default" style="width: 40%;"  v-show="visible">
            <div class="panel-heading" style="cursor: move">
                <span>任务分配</span>
                <span @click="close" class="close">&times;</span>
            </div>
            <div class="panel-body col-md-12"  >
                <div :class="$style.nav">
                    <span>养护工作<span class="badge" @click="addTaskItem" title="添加任务">+</span></span>
                    <span >养护区域</span>
                    <span>养护员</span>
                </div>
                <div :class="$style.content">
                    <div :class="$style.item" class="col-md-5">
                        <ul class="list-group" >
                            <li class="list-group-item" :class="i.checked==true?$style.height:$style.normal"  v-for="(i,index) in dispatch.task" >
                                <input type="checkbox" :value="i.name" v-model="tasks" @click="addTask(i,index)">
                                {{i.name}}
                                <span class="badge" @click="delTaskItem(index)" title="删除任务">-</span>
                            </li>
                        </ul>
                    </div>
                    <div :class="$style.item" class="col-md-4">
                        <ul class="list-group" >
                            <li class="list-group-item" v-for="(i,index) in quyu" >
                                <input type="checkbox"  :value="i" v-model="result">
                                {{i.name}}
                                <span class="badge" @click="selectQuyu(i,index)">{{i.children.length}}</span>

                                <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                                    <ul class="list-group" v-if="childKey==index&&i.children.length>0">
                                        <li class="list-group-item" v-for="k in i.children" style="cursor: pointer">{{k}}</li>
                                    </ul>
                                </transition>
                                <!--任务数量-->

                            </li>

                        </ul>
                    </div>
                    <div :class="$style.item" class="col-md-3">
                        <ul class="list-group">
                            <li class="list-group-item" v-for="i in man">{{i}}
<!--                                <CircleProgress class="CircleProgress"></CircleProgress>-->
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="panel-footer">
                    <span style="width: 100%;background-color: #71c913" class="btn btn-success"  @click="ok">分发</span>
                </div>


            </div>


        </div>

    </transition>
</template>

<script>
    import {addMoreTask} from '../../common/api'
    import CircleProgress from './CircleProgress'
    import {mapMutations,mapState} from 'vuex'
    export default {
        name: "DispatchTask",
        components:{
            CircleProgress
        },
        props:{
            dispatch:Object
        },
        data(){
            return{
                visible:false,
                man:[],
                childrenList:[],
                childKey:null,
                quyu:this.dispatch.quyu,
                temp:[],
                result:[],
                heightKey:null,
                tasks:[],
                text:'正在分发'
            }
        },
        mounted(){
            Bus.$on('任务分配',e=>{
                this.visible=!this.visible
                this.man=(this.getUserList.filter(e=>e.areaId==(1))).map(e=>e.zh)
            });
            fun.moveElement(this.$el)
            this.man=(this.getUserList.filter(e=>e.areaId==(1))).map(e=>e.zh)
        },
        methods:{
            ...mapMutations([
               'setTaskList','setQueryParam'
            ]),
            close(){
                this.visible=false
                this.$store.commit('setShowDispatchTask',false)

            },
            addTask(i,index){
                i.checked=!i.checked
            },
            delTaskItem(i){
                if (confirm('确定要删除任务吗?')){
                    this. dispatch.task.splice(i,i+1)
                }
            },
            addTaskItem(){
                 let c=prompt('请输入任务名称','');
                 if(c.length>1){
                     this.dispatch.task.push({
                         name:c,
                         checked:false,
                     })
                 }
            },
            selectQuyu(i,index){

                this.quyu=this.dispatch.quyu.slice(index,index+1)
                // this.man=this.dispatch.mans[index];
                this.man=(this.getUserList.filter(e=>e.areaId==(index+1))).map(e=>e.zh)

                this.childKey=0//1

                this.tasks.forEach((e)=>{
                    if (i.children.indexOf(e)>-1){
                        // alert('不可重复添加任务！')
                        return;
                    }
                    i.children.push(e);
                })

                this.childrenList=i.children;
                //根据任务+区索引获取当前区的的植被[]
                i.children.forEach(e=>{
                    let ds='',attr=''
                    if (e.indexOf('草坪')>-1){
                        ds='caoping'
                        attr=`COL2=${index+1}`
                    }
                    if (e.indexOf('树木')>-1){
                        ds='tree'
                    }
                    let queryObject={
                        key:'query',
                        value:{
                            type:'queryZhiBei',
                            ds:ds,
                            attr:attr
                        }
                    };
                    Bus.$emit('queryZhiBei',queryObject)
                });

                setTimeout(e=>{

                    this.quyu=this.dispatch.quyu
                    this.childKey=null
                },3000)

            },
            ok(){
                this.result.forEach((i)=>{
                    this.tasks.forEach((e)=>{
                        if (i.children.indexOf(e)>-1){

                            return;
                        }
                        i.children.push(e);
                    })
                })
                // Bus.$emit('showCircleProgress')




                Bus.$emit('showLoading','分配中...')
                setTimeout(e=>{

                    this.result.forEach((e,i)=>{


                        e.children.forEach(e1=>{
                            let mans=(this.getUserList.filter(e=>e.areaId==(i+1))).map(e=>e.zh)
                            let tasks=[]

                            let ids=config.dispatchTask.quyu.find((e,j)=>j==i).task;

                            // content:{type:String},
                            // other:{type:String},
                            // areaId:{type:Number},
                            // zbId:{type:Number},
                            // date:{type:Date},
                            // user:{type:String}
                            // status:{type:String}
                            //
                            mans.forEach(e2=>{
                                let task={
                                    content:e1,
                                    other:'',
                                    date:new Date(),
                                    areaId:i+1,
                                    zbId:ids.pop(),
                                    user:e2,
                                    status:'未开始'
                                }
                                tasks.push(task)
                            });

                            addMoreTask(`task=${JSON.stringify(tasks)}`).then(e=>{
                                this.$Message.success('任务分配完成!')
                                Bus.$emit('closeLoading')
                            },e=>{
                                if (e){

                                    this.$Message.success('任务分配失败!')
                                    Bus.$emit('closeLoading')
                                }
                            })
                        })
                    })





                },3400);
            }
        },
        computed:{
            show(){
                return this.$store.state.showDispatchTask
            },
            getUserList(){
                return this.$store.state.userList
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

<style lang="scss" module>

    $bgcolor:white;
    $fontColor:black;
 .root{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     width: auto;
     /*opacity: 0.8;*/
     color: $fontColor;
       position: relative;

     .head,.nav,.content{
         width: 90%;
         background-color: $bgcolor;
         display: flex;
     }
     .content{
         display: flex;
         flex-direction: row;
     }

     .foot{

         position: absolute;
         top:95%;
         background-color: $bgcolor;
         width: 90%;
     }
     .head{
         border-bottom: 2px solid $fontColor;
         span:nth-child(1){
             flex: 95%;
         }
         span:nth-child(2){
             flex: 5%;
             cursor: pointer;
         }
     }
     .nav{
        span{
            flex: 30%;
        }
     }
     .item{


         li{
         cursor:pointer;
             background-color: $bgcolor;
          }
         .height{
             background-color: #71c913;

         }
         .normal{
             background-color: $bgcolor;

         }
         .CircleProgress{
             position: relative;
             top: 5%;
         }
     }

 }


</style>
