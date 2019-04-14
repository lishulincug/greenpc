<template>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div :class="$style.root" v-show="visible">
        <div :class="$style.head">
            <span>任务分发</span>
            <span @click="close">&times;</span>
        </div>
        <div :class="$style.nav">
            <span>养护工作<span class="badge" @click="addTaskItem" title="添加任务">+</span></span>
            <span >养护区域</span>
            <span>养护员</span>

        </div>
        <div :class="$style.item">
            <ul class="list-group" >
                <li class="list-group-item" :class="i.checked==true?$style.height:$style.normal"  v-for="(i,index) in dispatch.task" >
                    <input type="checkbox" :value="i.name" v-model="tasks" @click="addTask(i,index)">
                    {{i.name}}
                    <span class="badge" @click="delTaskItem(index)" title="删除任务">-</span>
                </li>
            </ul>
        </div>
        <div :class="$style.item">
            <ul class="list-group" >
                <li class="list-group-item" v-for="(i,index) in quyu" >
                    <input type="checkbox" :value="i" v-model="result">
                    {{i.name}}
                    <span class="badge" @click="selectQuyu(i,index)">{{i.children.length}}</span>

                    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                    <ul class="list-group" v-if="childKey==index&&i.children.length>0">
                        <li class="list-group-item" v-for="k in i.children">{{k}}</li>
                    </ul>
                    </transition>
                    <!--任务数量-->

                </li>

            </ul>
        </div>
        <div :class="$style.item">
            <ul class="list-group">
                <li class="list-group-item" v-for="i in man">{{i}}</li>

            </ul>
        </div>
        <div :class="$style.foot">
            <span style="width: 100%;background-color: #71c913" class="btn btn-success"  @click="ok">分发</span>
        </div>

    </div>
    </transition>
</template>

<script>
    export default {
        name: "DispatchTask",
        props:{
            dispatch:Object
        },
        data(){
            return{
                visible:false,
                man:this.dispatch.mans[0],
                childrenList:[],
                childKey:null,
                quyu:this.dispatch.quyu,
                temp:[],
                result:[],
                heightKey:null,
                tasks:[]
            }
        },
        methods:{
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
                this.man=this.dispatch.mans[index];
                this.childKey=0//1
                this.childrenList=i.children;
                setTimeout(e=>{
                    this.quyu=this.dispatch.quyu
                    this.childKey=null
                },3000)
                // if (this.childKey==index){
                //     this.childKey=null
                //     this.quyu=this.dispatch.quyu
                // } else{
                //     this.childKey=index
                //
                // }


            },
            ok(){
                this.result.forEach((i)=>{
                    this.tasks.forEach((e)=>{
                        if (i.children.indexOf(e)>-1){
                            alert('不可重复添加任务！')
                            return;
                        }
                        i.children.push(e);
                    })
                })
               console.log()
                // this.result=[]
                // this.tasks=[];
                // this.close()
            }
        },
        computed:{
            show(){
                return this.$store.state.showDispatchTask
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
    $bgcolor:grey;
    $fontColor:#FFFFFF;
 .root{
     display: flex;
     flex-direction: row;
     flex-wrap: wrap;
     width: auto;
     opacity: 0.8;
     color: $fontColor;
       position: relative;
     .head,.nav{
         width: 90%;
         background-color: $bgcolor;
         display: flex;
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

       width:30%;
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
     }

 }


</style>
