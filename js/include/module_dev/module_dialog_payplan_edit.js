define([
	'require','yoValidate'
], function (require) {
	'use strict';
	const module = Vue.component('pay-planedit', {
		template: `
  <div class="ibox-content" id="dialog_payplan_edit">
    <div class="row">
        <div class="col-xs-12">
            <div class="tabbable">
                <div class="tab-content">
                    <div class="tab-pane in active">
                        <form action="" name="customerForm" id="dialog_payplan_edit_form" method="post" class="form form-horizontal">
                            <div class="row m-t-sm">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">类型&nbsp;<font color="red">*</font>:
													</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" disabled :value="c.type==0 ? '按月分期':'约定分期'" />
                                        </div>
                                    </div>
                                </div>
                                <div v-if="c.type==0">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">计划开始回款时间&nbsp;<font color="red">*</font>:
													</label>
                                            <div class="col-sm-10">
                                                <input v-model="c.planTime" @click="laydate($event,c.planTime)" class="span10 date-picker form-control" type="text" data-validate="require"
                                                    readonly="readonly" data-date-format="yyyy-mm-dd" placeholder="这里输入计划开始回款时间"
                                                    value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">单次回款金额(元)&nbsp;<font color="red">*</font>:
													</label>
                                            <div class="col-sm-10">
                                                <input v-model="c.onceMoney" class="form-control" data-validate="require|price|maxLength=50" type="text" placeholder="这里输入单次回款金额"
                                                    value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="c.type==1">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">计划开始回款时间:
													</label>
                                            <div class="col-sm-10">
                                                <input v-model="c.time" @click="laydate(c.time)" class="span10 date-picker form-control" type="text" data-validate="require"
                                                    readonly="readonly" data-date-format="yyyy-mm-dd" placeholder="这里输入计划开始回款时间"
                                                    value="">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label">单次回款金额(元)&nbsp;<font color="red">*</font>:
													</label>
                                            <div class="col-sm-10">
                                                <input v-model="c.money" class="form-control " data-validate="require|price|maxLength=50" type="text" value="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12" v-if="c.type==0">
                                    <div class="form-group">
                                        <label class="control-label col-sm-2 no-padding-right">备注:</label>
                                        <div class="col-sm-10">
                                            <textarea v-model="c.remark" class="form-control" style=" height: 120px;" rows="15" cols="10" placeholder="这里输入备注"></textarea>
                                        </div>
                                    </div>
                                </div>
								<div class="col-md-12" v-if="c.type==1">
                                    <div class="form-group">
                                        <label class="control-label col-sm-2 no-padding-right">备注:</label>
                                        <div class="col-sm-10">
                                            <textarea v-model="c.remark1" class="form-control" style=" height: 120px;" rows="15" cols="10" placeholder="这里输入备注"></textarea>
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
				c: {
					id: 0,
					subId: 0,
					type: 0,
					planTime: '',
					onceMoney: '',
					periods: '',
					time: '',
					money: '',
					remark: '',
					remark1: '',
				}
			}
		},
		mounted() {
			// this.$on("savePlan",()=>{
			//    console.log('savePlan');
			// })
			//this.$emit("mll")
		},
		methods: {
			init(el) {
				for (var key in el) {
					if (key != 'time' && key != 'planTime') {
						Vue.set(this.c, key, el[key])
					} else {
						Vue.set(this.c, key, el[key].split(' ')[0])
					}
				}
				if (this.c.remark1 != "") this.c.remark = this.c.remark1
				const that = this;
				const dialog = layer.open({
					type: 1,
					title: '案件回款计划',
					content: $("#dialog_payplan_edit"),
					area: ['800px', '600px'],
					btn: ['保存'],
					btnAlign: 'c',
					yes() {
						that.save(() => {
							layer.close(dialog)
							that.$emit("refresh")
						})
					},
					end() {
						that.c.type = 0;
						that.c.planTime = '';
						that.c.onceMoney = '';
						that.c.periods = '';
						that.c.remark = '';
						that.c.payList = []
					}
				});
			},
			save(cb) {
				if (yoValidate("#dialog_payplan_edit_form", 1)) {
				let data = { remark: this.c.remark || this.c.remark1 }
				if (!this.c.type) {
					data.id = this.c.id
					data.planTime = this.c.planTime
					data.onceMoney = this.c.onceMoney
				} else {
					data.subId = this.c.subId
					data.time = this.c.time;
					data.money = this.c.money
				}
				$.post('/workBench/updatePaymentPlan', data).done((res) => {
					cb && cb()
				})
				}
			},
			laydate(e,elm) {
				const that = this
				laydate({
					vEvent:e,
					format: 'YYYY-MM-DD', istoday: true, choose: function (data) {
						if(that.c.type){
							that.c.time = data
						}else{
							that.c.planTime = data
						}
					}
				})
			}
		}
	})
	return module
});


