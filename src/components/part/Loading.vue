<template>

    <div v-show="visible" class="root">

        <Card style="width:550px;background-color: whitesmoke; position: absolute;left:30%;top:40%" >
        <mt-spinner  size="100" color="lightgreen" type="triple-bounce"></mt-spinner>
            <CellGroup>
                <Cell :title="text" ></Cell>
            </CellGroup>
        </Card>
    </div>

</template>

<script>
    export default {
        name: "Loading",

        data(){
            return{
               visible:false,
                text:String
            }
        },
        mounted() {
            Bus.$on('showLoading',e=>{
                this.text=e;
                this.visible=true
            })
            Bus.$on('closeLoading',e=>{
                this.visible=false
            })
        }
    }
</script>

<style scoped>
    .demo-spin-container{
        display: inline-block;
        width: 200px;
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .root{
        background-color: black;
        opacity: 0.6;
        text-align: center;
        line-height: 100%;
        vertical-align: center;
    }
</style>
