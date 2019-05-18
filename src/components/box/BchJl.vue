<template>
	 <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

	<div class="panel panel-default col-md-4" v-show='visible'>
		 <div class="panel-heading">病虫害记录</div>
		<div class="panel-body">
			<!--<div class="input-group col-md-6">-->
		  <!--<span class="input-group-addon" id="basic-addon1">作业内容</span>-->

		   <!--<select class="form-control" v-model='work.content' @change="change">-->
		  	<!--<option value="0">草坪灌溉</option>-->
		  <!--<option value="1">草坪除草</option>-->
		  <!--<option value="2">病害防治</option>-->
		  <!--<option value="3">虫害防治</option>-->
			   <!--<option value="4">树木修剪</option>-->
			   <!--<option value="5">树木灌溉</option>-->
		  <!--</select>-->
		<!--</div>-->
			<!--<div class="input-group col-md-6" v-show="zc">-->
				<!--<span class="input-group-addon" id="basic-addon1">杂草名称</span>-->
			<!--<select class="form-control"  v-model='work.zc'>-->
				<!--<option value="0">狗尾草</option>-->
				<!--<option value="1">马唐</option>-->
				<!--<option value="2">牛筋草</option>-->
				<!--<option value="3">蒲公英</option>-->
			<!--</select>-->
			<!--</div>-->
		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">植被ID</span>
		  <input type="text" v-model='work.zbId' class="form-control" focus aria-describedby="basic-addon1">
		</div>

		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">名称</span>
		  <input type="text"v-model='work.name' class="form-control" multiple="true" focus aria-describedby="basic-addon1">
		</div>
		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">方法</span>
      <select class="form-control"  v-model='work.method'>
      <option value="0">f1</option>
      <option value="1">f2</option>
      <option value="2">f3</option>
      </select>
		</div>
      <div class="input-group col-md-6">
        <span class="input-group-addon" id="basic-addon1">效果</span>
        <select class="form-control"  v-model='work.effect'>
          <option value="0">良好</option>
          <option value="1">一般</option>
          <option value="2">无效</option>
          <option value="2">产生副作用</option>

        </select>
      </div>



		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">日期</span>
		  <input type="text" class="form-control" v-model='work.time' focus aria-describedby="basic-addon1">
		</div>
        <div>
          <button  class="btn btn-default" @click="submit" >提交</button>
          <button  class="btn btn-default" @click="close">取消</button>
        </div>
		</div>
	</div>
	</transition>
</template>
<script type="text/javascript">


	import {addBch} from '../../common/api'

    export default{

		data:function (argument) {
			/* body... */
			return{
				visible:false,
				 work:{
					zbId:'',
					name:'',
					method:'',

					effect:'',
					userId:'',
					time:'',
					zc:false,
				}
			}
		},

		methods:{
            change(){
               if (this.work.content==1){
					this.zc=true
			   }else{
                   this.zc=false
			   }
			},
			show(){
				this.visible=true
				this.work.time=new Date().toLocaleDateString()
				let user=this.$store.state.person;
				this.work.userId=user.zh
			},
			close(){
			this.visible=false
			},
			submit(){
            	let user=this.$store.state.person;


         addBch(fun.getRequestDataFromObj(this.work))
          .then(function (response) {
              MessageBox(response.data)
          })

				this.close()
			}
		},
      mounted() {
	      Bus.$on('showBchJl',e=>{
	        this.show()
        })
      }
    }
</script>
<style type="text/css" scoped>
	.panel{
		width: 80%;
		position: absolute;
		left: 11%;
		top:20%;
	}
</style>
