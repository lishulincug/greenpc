<template>
  <div class="root">
    <div class="panel panel-default col-md-5">
      <div class="panel-heading">
        <h3>{{title}}</h3>
      </div>
      <div class="panel-body">
        <div class="form-horizontal">
          <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">账号</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" v-model="user.zh" id="inputEmail3" placeholder="账号">
            </div>
          </div>
          <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" v-model="user.pwd" id="inputPassword3" placeholder="密码">
            </div>
          </div>
          <div class="form-group">
            <div class="col-sm-offset-1 col-sm-10">
              <div class="checkbox">
                <label>
                  <input type="checkbox">记住我
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
            <div class="col-md-offset-1 col-md-10">
              <button type="button" class="btn btn-default" @click="login">登录</button>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-footer"></div>
    </div>
  </div>
</template>
<script>
  import config from '../config/config'
    export default {
        name: "Login",
       data:function(){
         return{
           title:config.title,
           user:{
             zh:'',
             pwd:''
           }
         }
       },
        methods:{

          login:function () {
            let u=Object.assign(this.$store.state.user,this.user)
            this.$store.commit('setUser',u)
            setTimeout(function () {
              this.$router.push('/index');
            }.bind(this),1200)
          }
        }
    }
</script>

<style scoped>
   .root{
     background: url("../../../static/img/login_bg.jpg") top/100% no-repeat;

     position: relative;
     width: 100%;
     height: 696px;
   }
   .panel{
     position: absolute;
     left: 30%;
     top: 20%;
   }
</style>
