<template>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
    <div class="panel panel-default root col-md-4" v-show="visible">
        <div class="panel-heading root"  style="display: flex;">
            <span style="flex: 70%; color: white" >综合检索</span>
            <span style="cursor: pointer; color: white" @click="close">&times;</span>
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
                <div class="form-group" v-show="showL3"  v-model="l3Value">
                    <!-- <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">-->
                    <select  class="form-control">
                        <option :value="item" v-for="item in l3">{{item}}</option>
                    </select>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" id="exampleInputPassword1"  v-model="ID" placeholder="请输入ID">
                </div>
                <hr>
                <div class="form-group " v-show="more">
                    <a href="#" @click="querygeo" class="tool btn btn-success">缓冲区查询</a>
                    <a href="#" @click="querygeo" class="tool btn btn-success">多边形查询</a>
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
    import Bus from '../common/Bus'
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
        methods:{
            changeL1(){

                if (this.l1Value.indexOf('植被')>-1){
                    this.showL2=true;

                }  else{
                    this.showL2=false;
                    this.showL3=false;
                    this.l2Value='草坪'
                }
            },
            changeL2(){
                if (this.l2Value.indexOf('树木')>-1){
                    this.showL3=true;

                }  else{
                    this.showL3=false;
                }
            },
            querygeo(){
                if (this.l1Value.indexOf('植被')>-1)
                {
                    Bus.$emit('queryByGeo',{
                        ds:'zb',
                    })
                }
                this.close()
            },

            query(){
                let key='',ds=''
                if (this.l1Value.indexOf('区域')>-1){
                    key='quyu'
                    ds='quyu'
                }else if (this.l1Value.indexOf('人员')>1){
                    key='man'
                }else{
                    key='zhibei'
                }
                Bus.$emit('query',{
                    key:key,
                    value:{
                        attr:"NAME like '%"+this.ID+"%'",
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
    background-color: gray;
    opacity: 0.8;
}
.tool{
    border-radius: 50%;
}
</style>
