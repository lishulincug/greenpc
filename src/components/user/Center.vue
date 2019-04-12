<template>
    <div class="root col-md-3" v-show="show" >
      <div class="panel panel-default">
        <div class="panel-heading">
           <p>个人信息编辑</p>
           <p @click="close">&times;</p>
        </div>
        <div class="panel-body">
          <table class="table">
            <thead>
            <th></th><th></th>
            </thead>
            <tbody>
            <tr>
              <td>账号</td><td><input type="text" class="form-control" v-model="user.zh" :disabled="edit"></td>
            </tr>
            <tr>
              <td>姓名</td><td><input type="text" class="form-control" v-model="user.name" :disabled="edit"></td>
            </tr>
            <tr>
              <td>邮箱</td><td><input type="text" class="form-control" v-model="user.email" :disabled="edit"></td>
            </tr>
            <tr>
              <td>联系方式</td><td><input type="text" class="form-control" v-model="user.phone" :disabled="edit"></td>
            </tr>
            <tr>
              <td>居住地</td><td><input type="text" class="form-control" v-model="user.address" :disabled="edit"></td>
            </tr>
            </tbody>
          </table>
          <div class="btn-group" role="group" aria-label="...">
            <button type="button" class="btn btn-default" @click="enableEdit">编辑</button>
            <button type="button" class="btn btn-default" @click="Ok">确定</button>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Center",
      props:{
        user:Object
      },
        data:function(){
        return{
          visible:true,
          edit:true,
        }
        },
        computed:{
           show(){
             return this.$store.state.showCenter;
           }
        },
        methods:{
          close:function () {
            this.$store.commit('setShowCenter',false)
          },
          enableEdit(){
            this.edit=false
          },
          Ok(){
            this.edit=true
            this.$store.commit('setUser',this.user)
            this.close();
          }
        }
    }
</script>

<style scoped>
 .root{
   /*width: 100%;*/

 }
  table caption{
    text-align: center;
  }
  td{
    text-align: center;
  }
  img{
    width: 30%;
    height: 30%;
  }
  .panel-heading{
    display: flex;
  }
 .panel-heading p:nth-child(1){
  width: 98%;
 }
 .panel-heading p:nth-child(2){
cursor: pointer;
 }
</style>
