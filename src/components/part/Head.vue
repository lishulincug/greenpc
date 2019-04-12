<template>
    <div :class="$style.root">
      <div class="panel panel-default">
        <div class="panel-body">
             <div :class="$style.con">
                  <div :class="$style.item">
                      <p :class="$style.title">
                        <span class="glyphicon glyphicon-send"></span>
                        基于GIS的城市空间形态量算与分析系统
                      </p>
                  </div>
                <Nav :class="$style.item" :list="nav"></Nav>

                 <div :class="$style.item">
                   <div class="dropdown">
                     <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                       <span class="glyphicon glyphicon-user">
                       </span>
                       <span class="caret"></span>
                     </button>
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
                       <li><a href="#">{{user.zh}}</a></li>
                       <li role="separator" class="divider"></li>
                       <li><a href="#" @click="logout">退出</a></li>
                     </ul>
                   </div>
                 </div>

             </div>
        </div>
      </div>
    </div>
</template>

<script>
    import Nav from '../part/Nav'

    export default {
        name: "Head",
       components:{
         Nav
       },
       props:{
          nav:Array
       },
       data:function(){
         return{

         }
       },
       computed:{
         user(){
           return this.$store.state.user;
         }
       },
       methods:{
          logout:function () {
            this.$router.push('/login')
          }
       }
    }
</script>

<style lang="scss" module>
  .root{
    /*background-color: black;*/
    color: #337ab7;
      height: 70px;
    .con{
      display: flex;
      .item:nth-child(1){
          width: 29%;
         font-size: 2rem;
        padding: 0.2rem 0 0 0.1rem;
        /*background-color: black;*/
      }
      .item:nth-child(2){
        width: 62%;
        padding: 0rem 0 0 5rem;
      }
      .item:nth-child(3){
        padding: 0.5rem 0 0 0.1rem;
        width: 3%;
      }
    }
  }
</style>
