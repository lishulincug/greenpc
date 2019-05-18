<template>
    <Card style="width:550px" v-show="visible">
        <Tabs  @on-click="initUserList" >
            <TabPane label="用户列表"icon="logo-apple">


                <i-table @on-select="delete_" :columns="columns" :data="userList"></i-table>
                <Button type="default" @click="deleteUser">

                    <Icon type="ios-trash" size="24"/>
                </Button>

            </TabPane>
            <TabPane label="添加用户"  icon="logo-windows">
                <CellGroup>
                    <Cell title="Only show titles" >
                        <Input v-model="user.zh" icon="ios-clock-outline" placeholder="账号" style="width: 200px" />
                    </Cell>
                    <Cell title="Only show titles" >
                        <Input v-model="user.pwd" icon="ios-clock-outline" placeholder="密码" style="width: 200px" />
                    </Cell>
                    <i-select v-model="user.role" style="width:200px">
                        <i-option v-for="item in roles" :value="item.value" :key="item.value" >{{ item.label }}</i-option>
                    </i-select>

                    <Cell title="Only show titles" >
                        <Input v-model="user.phone" icon="ios-clock-outline" placeholder="手机" style="width: 200px" />
                    </Cell>
                    <Cell title="Only show titles" >
                        <Input v-model="user.email" icon="ios-clock-outline" placeholder="邮箱" style="width: 200px" />
                    </Cell>
                    <Select placement="top-start" v-model="user.areaId" style="width:200px">
                        <Option v-for="item in areas" :value="item" :key="item">{{ item+`区` }}</Option>
                    </Select>

                    <Cell>
                        <Button type="default" @click="addUser">添加</Button>
                        <Button type="default">重置</Button>
                    </Cell>


                </CellGroup>
            </TabPane>
            <TabPane label="更多" icon="logo-tux">标签三的内容</TabPane>
        </Tabs>
    </Card>

</template>

<script>
    import {addUser,deleteUser} from '../../common/api'
    export default {
        name: "UserManager",
        data(){
            return {
              visible:false,
                ids:[],
                columns:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title:'账号',
                        key:'zh'
                    },
                    {

                        title:'密码',
                        key:'pwd'
                    },
                    {

                        title:'角色',
                        key:'role'
                    },
                    {

                        title:'所属区',
                        key:'areaId'
                    },
                    {

                        title:'手机',
                        key:'phone'
                    },
                    {

                        title:'邮箱',
                        key:'email'
                    },

                ],
                user:{
                    zh:'',
                    pwd:'',
                    role:'',
                    areaId:0,
                    phone:'',
                    email:'',
                },
                roles:[{
                    value:'管理员',
                    label:'管理员',
                },{
                   value:'养护员',
                    label:'养护员'
                }],

            }
        },
        mounted() {
            Bus.$on('用户管理',e=>{
                this.visible=!this.visible
            });
            fun.moveElement(this.$el)
        },
        methods:{
            initUserList(){

              Bus.$emit('initUserManager');
            },
            delete_(select,row){
              this.ids=select
            },
            addUser(){
                let obj=fun.getRequestDataFromObj(this.user)
                addUser(obj).then(e=>{
                    if (e.data){

                        this.$Message.info('操作成功!')
                        for(let i in this.user){
                            this.user[i]=''
                        }
                    }
                },e=>{
                    this.$Message.info('操作失败!')

                })
            },
            deleteUser(){
                let result=this.ids.map(e=>e.zh).join(',')
                deleteUser(`ids=${result}`).then(e=>{
                    if (e){
                        this.$Message.info('操作成功!')
                        setTimeout(e=>{
                            Bus.$emit('initUserManager');
                        },1200)
                    }
                })


            }
        },
        computed:{
            userList(){
                return this.$store.state.userList
            },
            areas(){
                let j=1,r=[];
                for(;j<9;j++){
                    r.push(j)
                }
                return r
            }
        }
    }
</script>

<style scoped>

</style>