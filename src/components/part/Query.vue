<template>
    <transition enter-active-class="animated rotateIn" leave-active-class="animated rotateOut">
    <div class="panel panel-default root col-md-4" v-show="visible">
        <div class="panel-heading root"  style="display: flex;">
            <span style="flex: 70%; " >综合检索</span>
            <span style="cursor: pointer; " @click="close">&times;</span>
        </div>
        <div class="panel-body">
            <div>
                <div class="form-group">
                   <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" @change="changeL1" v-model="l1Value">
                        <option :value="item" v-for="item in l1">{{item}}</option>
                    </select>
                </div>
                <div class="form-group" v-show="showL2" >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" @change="changeL2" v-model="l2Value">
                        <option :value="item" v-for="item in l2">{{item}}</option>
                    </select>
                </div>
                <div class="form-group" v-show="showL3"  >
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control" v-model="l3Value">
                        <option :value="item" v-for="item in l3">{{item}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="exampleInputPassword1"  v-model="ID" placeholder="请输入ID">
                </div>
                <hr>
                <div class="form-group " v-show="more">
                    <a href="#" @click="queryMore(0)" class="tool btn btn-success">缓冲区查询</a>
                    <a href="#" @click="queryMore(1)" class="tool btn btn-success">多边形查询</a>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default" @click="query">查询</button>
                    <a href="#" class="btn btn-default" @click="showMore">更多</a>
                </div>

            </div>
        </div>
    </div>
    </transition>
</template>

<script>

    export default {
        name: "Query",

            data(){
                return{
                 visible:false,
                    map:{},
                    more:false,
                    l1:this.queryO.l1,
                    l2:this.queryO.l2,
                    l3:this.queryO.l3,
                    showL2:false,
                    showL3:false,
                    l1Value:'',
                    l2Value:'',
                    l3Value:'',
                    ID:''
                }
            },
           props:{
            queryO:Object
           },
        mounted(){
            Bus.$on('查询',e=>{
                this.visible=!this.visible
            })
            fun.moveElement(this.$el)
        },
        methods:{
            changeL1(){

                if (this.l1Value.indexOf('植被')>-1){
                    this.showL2=true;

                }  else{
                    this.showL2=false;
                    this.showL3=false;
                    this.l2Value='草坪'
                }
                this.ID=''
            },
            changeL2(){
                if (this.l2Value.indexOf('树木')>-1){
                    this.showL3=true;

                }  else{
                    this.showL3=false;
                }
              this.ID=''
            },
            queryMore(i){
                let attr='',key='',ds=''
                if (i==0){
                    key='queryByBuffer'
                } else{
                    key='queryByGeo'
                }
                if (this.l2Value.indexOf('树木')>-1)
                {
                    attr="COL2 like '%"+this.l3Value+"%'"
                    ds='tree'
                }
                if (this.l2Value.indexOf('草坪')>-1)
                {

                    attr="1=1"
                    ds='caoping'
                }

                    Bus.$emit(key,{
                        key:'query',
                        value:{
                            type:key,
                            ds:ds,
                            attr:attr
                        }
                    })
                this.close()
            },

            query(){

                let key='',ds='',attr=''
                if (this.l1Value.indexOf('区域')>-1){
                    key='quyu'
                    ds='quyu'
                    attr="NAME like '%"+this.ID+"%'"
                }else if (this.l1Value.indexOf('人员')>-1){
                    key='man'
                    attr="MAN_NAME like '%"+this.ID+"%'"
                    ds='man'
                }else{


                    if (this.l2Value.indexOf('草坪')>-1){

                        key='cp'
                        if (this.ID!==''){
                          attr="COL1=='"+this.ID+"'"
                        } else{
                          attr="SmID>0"
                        }

                        ds='caoping'
                    }

                    if (this.l2Value.indexOf('树木')>-1&&this.l3Value===''&&this.ID===''){

                      attr="SmID >0"

                    }else{
                      if(this.l3Value.indexOf('乔木')>-1){
                        key='qm'
                      }else{
                        key='gm'
                      }

                      if (this.ID===''){
                        attr="col2 like '%"+this.l3Value+"%'"
                      } else{
                        attr="SmID =='"+(this.ID.substr(1,this.ID.length))+"'"
                      }

                    }
                  ds='tree'
                }

                Bus.$emit('query',{
                    key:key,
                    value:{
                        attr:attr,
                        ds:ds
                    }
                });

                this.close()

            },
            showMore(){
              this.more=!this.more
            },
            show(){
                this.visible=true
            },
            close(){
                this.visible=false
                this.more=false
                this.$store.commit('setShowQuery',false)
            }
        },
        computed:{
            showQuery(){
                return this.$store.state.showQuery
            }
        },
        watch:{
            showQuery(){
                  if (this.showQuery){
                      this.show()
                  } else{
                      this.close()
                  }
            }
        }
    }
</script>

<style scoped>
.root{

    /*background-color: gray;*/
    /*opacity: 0.8;*/
}
.tool{
    border-radius: 50%;
}
</style>
