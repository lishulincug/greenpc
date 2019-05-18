<template>
	 <transition enter-active-class="bounceIn" leave-active-class="bounceOut">

	<div class="panel panel-default col-md-4" v-show='visible'>
		 <div class="panel-heading">养护作业单</div>
		<div class="panel-body">
			<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">作业内容</span>

		   <select class="form-control" v-model='work.content' @change="change">
		  	<option value="0">草坪灌溉</option>
		  <option value="1">草坪除草</option>
		  <option value="2">病害防治</option>
		  <option value="3">虫害防治</option>
			   <option value="4">树木修剪</option>
			   <option value="5">树木灌溉</option>
		  </select>
		</div>
			<div class="input-group col-md-6" v-show="zc">
				<span class="input-group-addon" id="basic-addon1">杂草名称</span>
			<select class="form-control"  v-model='work.zc'>
				<option value="0">狗尾草</option>
				<option value="1">马唐</option>
				<option value="2">牛筋草</option>
				<option value="3">蒲公英</option>
			</select>
			</div>
		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">操作对象</span>
		  <input type="text" v-model='zb' class="form-control" focus aria-describedby="basic-addon1">
		</div>

		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">备注</span>
		  <input type="text"v-model='work.beizhu' class="form-control" multiple="true" focus aria-describedby="basic-addon1">
		</div>
		<div class="input-group col-md-6">
		  <span class="input-group-addon" id="basic-addon1">所在区域</span>
			<input type="text" v-model='work.quyu' class="form-control" focus aria-describedby="basic-addon1">
		</div>

		<div class="input-group col-md-6">
		  <span class="input-group-addon"v-model='man' id="basic-addon1">养护人</span>
		  <input type="text" class="form-control" v-model='work.man' focus aria-describedby="basic-addon1">
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

	import fun from "../../common/fun";
	import {addTask} from '../../common/api'

    export default{
	    props:{
	      work:Object
		},
		data:function (argument) {
			/* body... */
			return{
				visible:false,
				content:this.work.content,
				zb:this.work.obj,
				beizhu:this.work.beizhu,
				quyu:this.work.quyu,
				man:this.work.man,
				time:'',
				zc:false,
			}
		},
		computed:{
	        getWork(){
	          return this.$store.state.work
			}
		},
		watch:{
	      getWork(){
	          this.show()
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
				this.work.time=common.getDate();

				// this.obj=o.obj
				// let d= new Date();
				// this.time=d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()+' '
			},
			close(){
			this.visible=false
			},
			submit(){
			    let work={
            content:this.content,
            other:this.beizhu,
            areaId:2018,
            zbId:2019,
            date:new Date().toLocaleDateString(),
            userId:2019
          }
         addTask(func.getUrlRequestData(work))
          .then(function (response) {
            MessageBox(response.data)
          })

				this.close()
			}
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
