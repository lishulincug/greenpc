<template>
    <Card style="width:300px" v-show="visible">
        <Select v-model="content" style="width:200px">
            <Option v-for="item in question" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button @click="submit">提交</Button>
    </Card>
</template>

<script>
    import {sendMessage} from '../../common/api'
  export default {
    name: 'Bch',
      data(){
        return{
            content:'',
            question:[
                {
                    label:'草坪缺水',
                    value:'草坪缺水'
                },

                {
                    label:'草坪虫害',
                    value:'草坪虫害'
                },
                {
                    label:'草坪病害',
                    value:'草坪病害'
                },
                {
                    label:'草坪过旺盛',
                    value:'草坪过旺盛'
                },
                {
                    label:'树木死亡',
                    value:'树木死亡'
                },
                {
                    label:'树木虫害',
                    value:'树木虫害'
                },
                {
                    label:'树木病害',
                    value:'树木病害'
                },
            ],
            visible:false
        }
      },
      methods:{
        submit(){
            let user=this.$store.state.person;
            let center=this.$store.state.mapCenter
            let message={
                user:user.zh,
                content:this.content,
                time:new Date(),
                position:[center.lat,  center.lng]
            }
            sendMessage(fun.getRequestDataFromObj(message)).then(e=>{
                this.$Message.info('上报成功!')
                this.visible=false
            },e=>{
                this.$Message.info('上报失败!')
            })
        }
      },
      mounted() {
        Bus.$on('showMessageForm',e=>{
            this.visible=!this.visible
        })
      }
  }

</script>

<style scoped>

</style>
