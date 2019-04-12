<template>
    <div class="panel panel-default col-md-4" v-show="visible">
        <div class="panel-heading" style="display: flex;">
            <span style="flex: 70%">综合检索</span>
            <span style="cursor: pointer;" @click="close">&times;</span>
        </div>
        <div class="panel-body">
            <div>
                <div class="form-group">
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="">
                </div>
                <hr>
                <div class="form-group" v-show="more">

                    <a href="#" class="glyphicon glyphicon-flash btn" @click="querygeo" title="几何查询"></a>
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-default" @click="query">查询</button>
                    <a href="#" class="btn btn-default" @click="showMore">更多</a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Bus from '../common/Bus'
    export default {
        name: "Query",

            data(){
                return{
                 visible:true,
                    map:{},
                    more:false
                }
            },
        methods:{
            querygeo(){
                Bus.$emit('querygeo')
                this.close()
            },
            query(){
                Bus.$emit('query',{})
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
            }
        }
    }
</script>

<style scoped>

</style>
