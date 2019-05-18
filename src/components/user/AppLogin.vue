<template>
    <div class="container">
        <div id="img" style="text-align: center">
            <img src="../../assets/leaf.png"  alt="">
        </div>
        <div id="form" class="form-vertial">
            <div class="form-group">
                <div class="col-md-3">
                    <input type="text" class="form-control"  v-model="user.zh" id="exampleInputEmail1" placeholder="账号" >
                </div>

            </div>
            <div class="form-group">

                <div class="col-md-2">
                    <i class="pwd"></i>
                    <input type="password" class="form-control" v-model="user.pwd" id="exampleInputPassword12" placeholder="密码">
                </div>
            </div>
            <div class="form-group ">
                <div class="col-md-3">
                    <button class="btn btn-success" style="width: 99%" @click="login">登录</button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import Header from '../part/Header'
    import {login} from '../../common/api'
    export default {
    name: 'Login',
    data(){
      return{
          user:{
              zh:'',
              pwd:''
          }
      }
    },
    methods:{
      login:function () {
        Toast({
           message: '登录中...', //提示内容分
         duration: 1800 , //持续时间（毫秒），若为 -1 则不会自动关闭
         iconClass: 'icon icon-success' , //icon 图标的类名
         })
        setTimeout((e)=>{

          let person={
            zh:'2019',
            name:'李明',
            email:"1234554321@qq.com",
            phone:"18345677654",
            pwd:'2019'
        }
        login(fun.getRequestDataFromObj(this.user)).then(e=>{
            if(e.data.indexOf('成功')>-1){
                this.$router.push({
                    path:'/AppIndex',
                    query: {
                        visible: true
                    }
                });
                this.$store.commit('setPerson',Object.assign(person,this.user))
            }

        },e=>{
            Toast({
                message: e.data, //提示内容分
                duration: 1000 , //持续时间（毫秒），若为 -1 则不会自动关闭
                iconClass: 'icon icon-success' , //icon 图标的类名
            })
        })
          

        },2000)

      }
    }

  }
</script>

<style scoped>
    .container{
        padding-top: 10%;
    }
 #img img{
      width: 300px;
      height: 300px;
  }
    #form img{
        width: 30px;
        height: 30px;
    }


</style>
