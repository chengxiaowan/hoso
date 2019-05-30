define([
	'require', 'select2', 'yoValidate'
], function(require, select2, yoValidate) {
	'use strict';
	const module = Vue.component('sea-config', {
		template: `
		<div class="col-sm-12 form form-horizontal m-t-sm" :id="addBox">
            <div class="row">
							<div class="col-md-12">
								<div class="form-group" style="margin-bottom: 25px;">
									<label class="col-sm-2 control-label"  style="text-align: left;width:12%">公海成员<span class="text-danger">*</span>：</label>
									<div class="col-sm-10" style="width:88%">
									<select style="width:100%" name="" v-model="c.saleIds" multiple :id="selectBox">
									</select>
									</div>
								</div>
							</div>
						<div class="col-md-12">
								<div class="form-group" style="margin-bottom: 25px;">
									<label class="col-sm-2 control-label" style="text-align: left;width:12%">划入规则<span class="text-danger">*</span>：</label>
									<div class="col-sm-10" style="width:88%">
										<table class="table table-bordered table-hover" style="margin-bottom:0">
										<thead>
  											<tr>
    											<th>客户</th>
    											<th>未跟进天数</th>
    											<th>划入客户公海时间</th>
  											</tr>
  										</thead>
  										<tbody>
  											<tr>
    											<td>所有客户</td>
    											<td>超过<input type="number" style="width: 80px;margin:0 5px;display: inline-block;"  class="form-control" v-model="c.days"  value="">天未跟进</td>
    											<td>系统会在每天的
    											<select class="form-control" v-model="c.time" style="width: 100px;margin:0 5px;display: inline-block;">
									<option value="00:00">00:00</option>
									<option value="00:30">00:30</option>
									<option value="01:00">01:00</option>
									<option value="01:30">01:30</option>
									<option value="02:00">02:00</option>
									<option value="02:30">02:30</option>
									<option value="03:00">03:00</option>
									<option value="03:30">03:30</option>
									<option value="04:00">04:00</option>
									<option value="04:30">04:30</option>
									<option value="05:00">05:00</option>
									<option value="05:30">05:30</option>
									<option value="06:00">06:00</option>
									<option value="06:30">06:30</option>
									<option value="07:00">07:00</option>
									<option value="07:30">07:30</option>
									<option value="08:00">08:00</option>
									<option value="08:30">08:30</option>
									<option value="09:00">09:00</option>
									<option value="09:30">09:30</option>
									<option value="10:00">10:00</option>
									<option value="10:30">10:30</option>
									<option value="11:00">11:00</option>
									<option value="11:30">11:30</option>
									<option value="12:00">12:00</option>
									<option value="12:30">12:30</option>
									<option value="13:00">13:00</option>
									<option value="13:30">13:30</option>
									<option value="14:00">14:00</option>
									<option value="14:30">14:30</option>
									<option value="15:00">15:00</option>
									<option value="15:30">15:30</option>
									<option value="16:00">16:00</option>
									<option value="16:30">16:30</option>
									<option value="17:00">17:00</option>
									<option value="17:30">17:30</option>
									<option value="18:00">18:00</option>
									<option value="18:30">18:30</option>
									<option value="19:00">19:00</option>
									<option value="19:30">19:30</option>
									<option value="20:00">20:00</option>
									<option value="20:30">20:30</option>
									<option value="21:00">21:00</option>
									<option value="21:30">21:30</option>
									<option value="22:00">22:00</option>
									<option value="22:30">22:30</option>
									<option value="23:00">23:00</option>
									<option value="23:30">23:30</option>
									</select>
    											
    											将超过未跟进天数的客户划入客户公海</td>
  											</tr>
  											</tbody>
										</table>
									</div>
								</div>
							</div>
							
							<div class="col-md-12">
								<div class="form-group" style="margin-bottom: 25px;" >
									<label class="col-sm-2 control-label" style="text-align: left;width:12%">抢回限制<span class="text-danger">*</span>：</label>
									<div class="col-sm-10" style="width:88%">
									<div class="btn-group btn-toggle" style="margin:0 5px;"> 
    									<button class="btn btn-default">启用</button>
   										<button class="btn btn-primary active">停用</button>
  									</div>
									<input type="number" style="width: 80px;margin:0 5px;display: inline-block;"  class="form-control" v-model="c.cfdays"  value="">
									天内不能连续"抢"同一个客户
									</select>
									</div>
									<div class="col-sm-10 pull-right" style="margin-top:10px">
									客户被转移或者系统定时划入客户公海后，前负责人在N天内不能抢回。
									</div>
								</div>
							</div>
							
							
							
						</div>
        </div>
  `,
		//							<div class="col-md-12">
		//								<div class="form-group">
		//									<label class="col-sm-3 control-label">类型：</label>
		//									<div class="col-sm-9">
		//										<select class="form-control" name="" v-model="c.type">
		//										<option value="0">客户公海</option>
		//											<option value="1">无意向公海</option>
		//										</select>
		//									</div>
		//								</div>
		//							</div>
		data() {
			return {
				//前置数据
				api_saveTasks: '/qzTask/saveTasks.do', //新增
				api_updateTasks: '/qzTask/updateTasks.do', //编辑
				saleId: '',
				editEl: {},

				//新增
				init_add: 0,
				addBox: 'addBox' + (Math.random()).toString().split('.')[1],
				selectBox: 'selectBox' + (Math.random()).toString().split('.')[1],
				select2: {
					select: {},
				},
				c: {
					id: "",
					"saleIds": [],
					"saleNames": [],
					"time": "00:00",
					"days": "",
					"type": "0",
					"cfdays": "",
					"isOpen":"0"
				}
			}
		},
		computed: {
			saleInfo() {
				let data = [];
				for(var i = 0; i < this.c.saleIds.length; i++) {
					data.push({
						id: this.c.saleIds[i],
						name: this.c.saleNames[i]
					})
				}
				return data;
			}
		},
		created() {

		},
		mounted() {
			//初始化全选
			this.select_init()
			this.qiehuan();
		},
		methods: {
			init(el) {
				const that = this;
				if(el) {
					this.editEl = el;
					this.c.saleIds = el.saleIds.split(',');
					this.c.saleNames = el.saleNames.split(',');
					this.c.id = el.id;
					this.c.type = el.type;
					this.c.time = el.time;
					this.c.days = el.days;
					this.c.cfdays = el.cfdays;
					this.c.isOpen = el.isOpen
					let html = "";
					let a;
					if(el.isOpen ==1 ){
						a =0
					}else if(el.isOpen ==0){
						a =1
					}
					$(".btn-toggle button").eq(a).addClass('btn-primary active').removeClass('btn-default').siblings().removeClass('btn-primary active').addClass('btn-default');
					for(var i = 0; i < this.c.saleIds.length; i++) {
						html += `<option selected value="${this.c.saleIds[i]}">${this.c.saleNames[i]}</option>`
					}
					that.select2.select.html(html)
					this.select_init()
					const dialog = layer.open({
						type: 1,
						title: '编辑规则',
						content: $("#" + that.addBox),
						area: ['920px', '400px'],
						btn: ['保存'],
						btnAlign: 'c',
						yes() {
							that.save(() => {
								layer.close(dialog)
								window.parentFnc && window.parentFnc()
							})
						},
						end() {
							that.editEl = {}
							that.clear()
						}
					});
				} else {
					this.select_init()
					const dialog = layer.open({
						type: 1,
						title: '新增规则',
						content: $("#" + that.addBox),
						area: ['920px', '450px'],
						btn: ['保存'],
						btnAlign: 'c',
						yes() {
							that.save(() => {
								layer.close(dialog)
								window.parentFnc && window.parentFnc()
							})
						},
						end() {
							that.editEl = {}
							that.clear()
						}
					});
				}
			},
			clear() {
				this.c.id = "";
				this.c.saleIds = [];
				this.c.saleNames = [];
				this.c.time = "00:00";
				this.c.days = "";
				this.c.type = "0";
				this.c.cfdays = "";
				this.c.isOpen = 0;
				this.select2.select.select2("destroy");
				this.select2.select.find('option').remove();
			},
			select_init() {
				const that = this;
				that.select2.select = $("#" + this.selectBox).select2({
					placeholder: "请选择公海成员",
					language: 'zh-CN',
					allowClear: true,
					ajax: {
						url: "/user/getUserInfo",
						dataType: 'json',
						type: "post",
						delay: 250,
						data: function(params) {
							return {
								page: params.page || 1,
								ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
								data: {
									q: params.term || "", // search term
								}
							};
						},
						processResults: function(data, params) {
							params.page = params.page || 1;
							$.each(data, function() {
								this.id = this.USER_ID;
								this.text = this.NAME;
							})
							return {
								results: data,
								pagination: {
									more: data.length == 10
								}
							};
						},
						cache: true
					},
					minimumInputLength: 0
				}).on("change", function() {
					that.c.saleIds = [];
					that.c.saleNames = [];
					for(var i = 0; i < this.children.length; i++) {
						if(this.children[i].selected) {
							that.c.saleIds.push(this.children[i].value)
							that.c.saleNames.push(this.children[i].innerHTML)
						}
					}
				})
			},
			save(cb) {
				
				const that = this;
				if(!that.c.saleIds.length) {
					layer.msg('请选择公海成员')
					return;
				} else if(!that.c.days || !/^[0-9]\d*$/.test(that.c.days)) {
					layer.msg('划入公海天数格式不正确')
					return;
				}else if(!that.c.cfdays || !/^[0-9]\d*$/.test(that.c.cfdays)) {
					layer.msg('抢回限制天数格式不正确')
					return;
				}
				this.$parent.loading();
				let data = JSON.parse(JSON.stringify(that.$data.c));
				for(var key in data) {
					if(data.hasOwnProperty(key) && typeof(data[key]) == 'object') {
						data[key] = data[key].join(',')
					}
				}
				if(this.editEl.id) {
					$.post(that.api_updateTasks, data).done((res) => {
						this.$parent.loading('close');
						cb && cb()
					})
				} else {
					$.post(that.api_saveTasks, data).done((res) => {
						this.$parent.loading('close');
						cb && cb()
					})
				}

			},
			laydate(e, elm) {
				const that = this
				laydate({
					vEvent: e,
					format: 'YYYY-MM-DD',
					istime: true,
					istoday: true,
					choose: function(data) {
						that.c.xcgetTime = data
					}
				})
			},
			qiehuan() {
				const that = this
				$('.btn-toggle').click(function() {
					var $this = $(this); //找到当前btn-toggle定义的按钮组

					//这段代码中找到对应的btn-primary定义的按钮并且去掉相关CSS类定义
					if($this.find('.btn-primary').length > 0) {
						$this.find('.btn').toggleClass('btn-primary');
					}
					
					$this.find('.btn').toggleClass('btn-default').toggleClass('active');
					var text= $this.find('.active').text();
					if(text == "启用"){
						that.c.isOpen=1
					}else{
						that.c.isOpen=0
					}
				});
			}
		}
	})
	return module
});