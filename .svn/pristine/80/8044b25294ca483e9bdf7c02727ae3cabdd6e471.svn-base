define([
	'require','yoValidate'
], function (require) {
	'use strict';
	const module = Vue.component('pay-plan', {
		template: `
  <div class="ibox-content" id="dialog_payplan">
			<div class="row">
				<div class="col-xs-12">
					<div class="tabbable">
						<div class="tab-content">
							<div class="tab-pane in active">
								<form action="" name="customerForm" id="dialog_payplan_form" method="post" class="form form-horizontal">
									<div class="row m-t-sm">
											<div class="col-md-12">
												<div class="form-group">
													<label class="col-sm-2 control-label">类型&nbsp;<font color="red">*</font>:
													</label>
													<div class="col-sm-10">
													<select class="form-control" v-model="type" name="type" id="">
													<option value="0">按月分期</option>
													<option value="1">约定分期</option>
													</select>
													</div>
												</div>
											</div>
											<div v-if="type==0">
											<div class="col-md-12">
												<div class="form-group">
													<label class="col-sm-2 control-label">计划开始回款时间&nbsp;<font color="red">*</font>:
													</label>
													<div class="col-sm-10">
														<input v-model="planTime" id="dialog_planTime"  @click="laydate($event,planTime)" class="span10 date-picker form-control" type="text" data-validate="require"  data-date-format="yyyy-mm-dd" placeholder="这里输入计划开始回款时间" value="">
													</div>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label class="col-sm-2 control-label">单次回款金额(元)&nbsp;<font color="red">*</font>:
													</label>
													<div class="col-sm-10">
														<input v-model="onceMoney" class="form-control" data-validate="require|price|maxLength=50" type="text"  placeholder="这里输入单次回款金额" value="">
													</div>
												</div>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label class="col-sm-2 control-label">回款期数&nbsp;<font color="red">*</font>:
													</label>
													<div class="col-sm-10">
														<input v-model="periods" class="form-control" data-validate="require|integer|maxLength=50" type="text" placeholder="这里输入回款期数" value="">
													</div>
												</div>
											</div>
											</div>
											<div class="col-sm-12" v-if="type==1">
											<div class="form-group">
													<label class="col-sm-2 control-label">分期计划&nbsp;<font color="red">*</font>:
													</label>
													<div class="col-sm-10">
														<button class="btn btn-primary btn-xs m-t-xs" id="addNewPlan" @click.prevent="payList.push({time:'',money:''})">新增一条</button>
													</div>
												</div>
											<table class="table table-bordered form form-inline" >
														            <thead>
														            <tr>
														            <th>时间</th>
																	<th>金额</th>
																 	<th>操作</th>
																	</tr>
														            </thead>
															<tbody>
															 <tr v-for="(el,index) of payList">
														        <td>
																<input class="form-control " readonly data-validate="require" type="text" :id="'payList_date_'+index" @click="laydate($event,el)" v-model="el.time"/>
																</td>
																<td><input class="form-control" type="number" data-validate="require | number":id="'payList_moeny_'+index" onclick="" v-model="el.money"/></td>
																 <td><button class="btn btn-white btn-xs" @click.prevent="payList.splice(index,1)">删除</button></td>
																</tr>	
																</tbody>
														</table>
											</div>
											<div class="col-md-12">
												<div class="form-group">
													<label class="control-label col-sm-2 no-padding-right">备注:</label>
													<div class="col-sm-10">
														<textarea v-model="remark" class="form-control" style="height: 120px;" rows="15" cols="10" placeholder="这里输入备注"></textarea>
													</div>
												</div>
											</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  `,
		props: ['orderId'],
		data() {
			return {
				type: 0,
				planTime: '',
				onceMoney: '',
				periods: '',
				remark: '',
				payList: [
					{
						time: '',
						money: ''
					}
				]
			}
		},
		computed:{
			time(){
				let data = []
				for (var i = 0; i < this.payList.length; i++) {
					data.push(this.payList[i].time)
				}
				return data.join(',')
			},
			money(){
				let data = []
				for (var i = 0; i < this.payList.length; i++) {
					data.push(this.payList[i].money)
				}
				return data.join(',')
			}
		},
		methods: {
			init() {
				const that = this;
				const dialog = layer.open({
					type: 1,
					title: '案件回款计划',
					content: $("#dialog_payplan"),
					area: ['800px', '600px'],
					btn: ['保存'],
					btnAlign: 'c',
					yes() {
						that.save(()=>{
						   layer.close(dialog)
							that.$emit("refresh")
						})
					},
					end(){
							that.type=0;
							that.planTime='';
							that.onceMoney='';
							that.periods='';
							that.remark='';
							that.payList=[]
					}
				});
			},
			save(cb) {
                                if (yoValidate("#dialog_payplan_form", 1)) {
							let data = {types:this.type,remark:this.remark,orderId:this.orderId}
								if(!this.type){
									data.planTime = this.planTime
									data.onceMoney = this.onceMoney
										data.periods = this.periods
								}else{
									if(!this.payList.length){
										layer.yoTips("请新增分期计划","#addNewPlan")
										return
									}
									data.time = this.time;
									data.money = this.money
								}
								$.post('/workBench/savePaymentPlan',data).done((res)=>{
								cb&&cb()
								})
                                }
			},
			laydate(e,elm) {
				const that = this
				laydate({
					vEvent:e,
					format: 'YYYY-MM-DD', istoday: true, choose: function (data) {
					if(typeof elm == "object"){
							elm.time = data
					}else{
						that.planTime = data
					}
				 } })
			}
		}
	})
	return module
});


