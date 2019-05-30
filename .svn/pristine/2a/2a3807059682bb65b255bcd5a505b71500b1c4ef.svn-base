const config = {
	customerId: yo.getQueryString("id"), //案件ID
	role: localStorage.userRole,
	api_getOrderDetail: '/customer/goEdit1', //获取客户数据
	api_xgOrderDetail: '/customer/doEdit1', //修改客户数据
	api_costomerList1: '/user/getUserInfo',
	api_saveLinkManInfo: '/linkman/saveOrupdate', //客户联系人增加
	api_deleteLinkManInfo: '/linkman/delete1', //客户联系人删除
	
	
	api_showAll: '/customer/showAll', //获取记录列表 
	
	api_saveProductAttach: '/order/saveProductAttach', //保存上传附件
	api_updateSaleCustomer: '/saleCustomer/updateSaleCustomer', //保存客户信息
	api_hasName: '/saleCustomer/hasName', //查重
	api_saveLinkMan: '/linkman/saveLinkMan', //债务知情人/其他联系人
	api_updateLinkMans: '/saleCustomer/updateLinkMans', //编辑联系人
	api_updateGjStatus: '/order/updateGjStatus', //编辑跟进状态
	api_saveCallInfo: '/order/saveCallInfo', //保存提醒
	api_call: "/saleCustomer/call.do", //拨打电话
	api_updateCallInfo: '/order/updateCallInfo', //完成提醒操作
	api_moveGh: "/saleCustomer/moveGh.do", //转移至无意向公海
	api_moveKh: "/saleCustomer/moveKh.do", //转移给他人
	api_isYxx: "/saleCustomer/isYxx", //判断最新跟进状态
}
require(['module_dialog_saleoffollow1'], (dialog_follow1) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {},
			type: 3, //记录type
			uploader: 0, //上传组件状态
			role: config.role,
			citys: {}, //城市数据
			editParam: '', //正在编辑的项目
			hoverParam: '', //鼠标覆盖项目
			oldData: '', //编辑项目的旧值
			posting: false, //是否正在上传数据
			saleFollowMode: 1, //写跟进弹框状态
			//记录序列
			sa: [],
			contracts: [],
			orders: [],
			contractSaleList:[],
			orderSaleListList:[],
			contractSaleName:'',
			orderSaleName:'',
		},
		computed: {
			//城市列表
			citys_sub() {
				const province = this.c.provinceName;
				let city = [];
				let provinceId;
				$.each(this.citys['省份'], (i, el) => {
					if(province == el.regionName) provinceId = el.id
				})
				$.each(this.citys['市区'], (i, el) => {
					if(provinceId == el.parentId) city.push(el)
				})
				console.log(city);
				return city;
			},
			citys_sub1() {
				const province = this.c.province;
				const city_1 = this.c.cityName;
				let city = [];
				let area = [];
				let provinceId;
				let cityId;
				console.log(city_1);
				$.each(this.citys['省份'], (i, el) => {
					if(province == el.regionName) provinceId = el.id
				})
				$.each(this.citys['市区'], (i, el) => {
					if(provinceId == el.parentId && city_1 == el.regionName) {
						cityId = el.id
						console.log(cityId);
					}
				})
				$.each(this.citys['区'], (i, el) => {
					if(cityId == el.parentId) area.push(el)
				})
				return area;
			},
			//合成上传附件列表
			attachs() {
				const attachs = this.c.attachs
				let data = {
					"type": [],
				}
				$.each(attachs, function() {
					for(var i in this) {
						if(data[i] == undefined) {
							data[i] = []
						}
						data[i].push(this[i])
					}
				})
				for(var i in data) {
					data[i] = data[i].join(",")
				}
				data.customerId = config.customerId
				return data
			}
		},
		directives: {
			focus: {
				//自动聚焦和销毁select2
				inserted(el) {
					el.focus();
					//如果是选择框
					if(el.tagName == 'SELECT') {
						$(el).select2({
							language: "zh-CN",
							placeholder: '请选择'
						}).on("select2:close", function(e) {
							const newData = e.target.value || app.c[app.editParam];
							const $this = $(this)
							if(app.c[app.editParam] == newData) {
								$this.select2("destroy");
								app.editParam = ''
							} else {
								var changeParam = app.editParam
								switch(app.editParam) {
									case 'province':
										app.c.cityName = ''
										app.c.area = ''
										break;
									case 'province1':
										changeParam = 'provinceName'
										app.c.area = ''
										app.c.cityName = ''
										break;
									case 'cityName1':
										changeParam = 'cityName'
										app.c.cityName = ''
										app.c.area = ''
										break;
									case 'area1':
										changeParam = 'area'
										app.c.area = ''
										break;
									default:
										break;
								}
								Vue.set(app.c, changeParam, newData);
								Vue.nextTick(() => {
									app.saveData()
									$this.select2("destroy")
									app.editParam = ''
								})
							}
						}).select2("open")
					}
				}
			}
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			//初始化城市数据
			if(localStorage.citys) {
				this.citys = JSON.parse(localStorage.citys)
			}
			//获取全局数据
			this.getCaseDetail()
			//获取案件跟进数据
			this.getCaseRecord()
		},
		mounted() {
			//选择负责人
			$('#salerId').select2({
				placeholder: "请选择",
				language: 'zh-CN',
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

			}),
			this.customerName1();
			this.customerName2();
		},
		methods: {
			enter(p, e) {
				const that = this;
				//如果返回的是数字序号
				if(typeof(p) == 'number') {
					if(e.target.id) {
						if(this.editParam == e.target.id) return;
						this.hoverParam = e.target.id;
						this.editParam = e.target.id;
					} else if(that.c.linkmans && that.c.linkmans[p].remark) {
						that.toolTips_tips = layer.yoTips(`<span style="color:#337ab7">${that.c.linkmans[p].remark}</span>`, e.target, {
							tips: [3, '#fff']
						})
					}
				} else { //如果返回的是字符串键值
					if(this.editParam == p) return;
					this.hoverParam = p;
					if(e && that.c[p]) {
						that.toolTips_tips = layer.yoTips(`<span style="color:#337ab7">${that.c[p]}</span>`, e.target, {
							tips: [3, '#fff']
						})
					}
				}
			},
			leave() {
				if(this.hoverParam == this.editParam) this.hoverParam = ''
				if(this.editParam.indexOf("_") > 0) this.editParam = ''
				if(this.toolTips_tips) layer.close(this.toolTips_tips)
			},
			/**
			 * 保存数据
			 * 
			 * @param {any} data 当前值 
			 * @returns 
			 */
			saveData(el) {
				const that = this;
				if(that.posting) return;
				//做一些数据验证
				if(this.c.name == "") this.c.name = this.oldData
				//验证end
				if(this.oldData == this.c[this.editParam]) {
					this.editParam = '';
					return;
				}
				if(this.editParam == 'name') {
					that.posting = true;
					$.post(config.api_hasName, {
						name: that.c[that.editParam]
					}).done((res) => {
						if(res.result == 'error') {
							layer.msg('客户名称已存在,请检查重试')
							Vue.set(that.c, that.editParam, that.oldData)
							that.posting = false;
							return;
						} else {
							that.posting = false;
							save()
						}
					})
				} else {
					save()
				}

				function save() {
					let postData = {
						id: config.customerId,
					};
					that.posting = true;
					if(that.editParam == 'province1') {
						postData.province = that.c.provinceName
					} else if(that.editParam == 'cityName1') {
						postData.cityName = that.c.cityName
					} else if(that.editParam == 'area1') {
						postData.area = that.c.area
					}else if(that.editParam == 'contractSaleName') {
						that.contractSaleName = that.c.contractSaleName.split(',')[1];
						postData.contractSaleName = that.c.contractSaleName.split(',')[1];
						postData.contractSaleId = that.c.contractSaleName.split(',')[0];
					} else if(that.editParam == 'orderSaleName') {
						that.orderSaleName = that.c.orderSaleName.split(',')[1];
						postData.orderSaleName = that.c.orderSaleName.split(',')[1];
						postData.orderSaleId = that.c.orderSaleName.split(',')[0];
					} else {
						postData[that.editParam] = $.trim(that.c[that.editParam])
						Vue.set(that.c, that.editParam, $.trim(that.c[that.editParam]))
					}
					if(!that.editParam) {
						that.posting = false;
						return;
					}
					$.post(config.api_xgOrderDetail, postData, (res) => {
						that.editParam = '';
						that.posting = false;
					})
				}

			},
			/**
			 * 修改项目
			 * 
			 * @param {any} param 项目名称
			 */
			change(param) {
				this.hoverParam = '';
				this.editParam = param;
				if(param == 'province1') {
					param = 'provinceName'
				} else if(param == 'cityName1') {
					param = 'cityName'
				} else if(param == 'area1') {
					param = 'area'
				}
				this.oldData = this.c[param];
			},
			/**
			 * 载入中方法
			 * 
			 * @param {string} s 是否关闭
			 */
			loading(s) {
				if(s == "close") layer.close(this.loadingSwitch)
				else this.loadingSwitch = layer.load(3);
				// else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
			},
			//客户全局数据
			getCaseDetail() {
				const that = this;
				that.loading()
				$.ajax({
					url: config.api_getOrderDetail,
					async: false,
					data: {
						id: config.customerId
					},
					success: function(res) {
						that.c = res.result
						that.contracts = res.result.contracts;
						that.orders = res.result.orders;
						
						
						that.contractSaleName = res.result.contractSaleName;
						that.orderSaleName = res.result.orderSaleName;
						that.loading("close")
					}
				});
			},
			//客户记录数据获取
			getCaseRecord() {
				const that = this;
				that.loading()
				$.post(config.api_showAll, {
					id: config.customerId,
				}).done((res) => {
					that.loading("close")
					that.sa = res.result
					console.log(that.sa)
				})
			},
			//新增联系人
			linkman_add() {
				const that = this;
				require(['text!customer_linkman_add'], (html) => {
					const dialog = layer.open({
						type: 1,
						title: '新增联系人',
						closeBtn: 1,
						content: html,
						area: ['600px', '550px'],
						btn: "保存",
						btnAlign: 'c',
						yes() {
							require(['yoValidate'], () => {
								if(yoValidate("#linkman_add", 1)) {
									let data = {}
									$.each($("#linkman_add").find("input,textarea"), function() {
										data[this.name] = $.trim(this.value)
									})
									data.customerId = config.customerId
									data.type = 0
									that.loading()
									$.post(config.api_saveLinkManInfo, data)
										.done((res) => {
											that.loading("close")
											that.getCaseDetail()
											layer.close(dialog)
										})
								}

							})
						}
					});
				});
			},
			linkman_edit(el) {
				const that = this;
				require(['text!customer_linkman_add'], (html) => {
					const dialog = layer.open({
						type: 1,
						title: '编辑联系人',
						closeBtn: 1,
						content: html,
						area: ['600px', '550px'],
						btn: "保存",
						btnAlign: 'c',
						success() {
							$.each($("#linkman_add").find("input,textarea"), function() {
								this.value = el[this.name]
							})
						},
						yes() {
							require(['yoValidate'], () => {
								if(yoValidate("#linkman_add", 1)) {
									let data = {}
									$.each($("#linkman_add").find("input,textarea"), function() {
										data[this.name] = $.trim(this.value)
									})
									data.id = el.id
									data.customerId = config.customerId
									that.loading()
									$.post(config.api_saveLinkManInfo, data)
										.done((res) => {
											that.loading("close")
											that.getCaseDetail()
											layer.close(dialog)
										})
								}

							})
						}
					});
				});
			},
			//初始化上传附件
			initUploader() {
				if(this.uploader) return;
				const that = this;
				this.loading();
				require(['webuploader'], (WebUploader) => {
					that.loading("close")
					that.uploader = 1
					var uploader = WebUploader.create({
						// 文件接收服务端。
						server: "/contract/uploadAttachment.do",
						runtimeOrder: 'html5',
						// 内部根据当前运行是创建，可能是input元素，也可能是flash.
						pick: {
							id: '#fileUp',
							innerHTML: '上传附件'
						},
						resize: false,
						fileNumLimit: 10
					});

					//上传成功
					uploader.on('uploadSuccess', function(file, res) {
						that.c.attachs.push(res)
					});

					uploader.on('uploadStart', function() {
						that.loading()
					})
					//上传出错
					uploader.on('uploadError', function(file) {
						layer.msg('上传出错');
					});
					//出错
					uploader.on('error', function(res) {
						if(res == 'Q_TYPE_DENIED') {
							layer.msg('上传文件格式错误，请检查')
						}
					});
					//上传完成
					uploader.on('uploadFinished', function(file) {
						uploader.reset();
						$.post(config.api_saveProductAttach, that.attachs)
							.done(() => {
								that.loading("close")
							})
					});
					//文件加入队列
					uploader.on('fileQueued', function() {
						uploader.upload()
					})
				})
			},
			/**
			 * 删除
			 * 
			 * @param {any} i 序号
			 */
			attachs_delete(i) {
				const that = this;
				const dialog = layer.confirm("确定删除此附件?", () => {
					that.c.attachs.splice(i, 1)
					$.ajax({
						type: 'POST',
						url: config.api_saveProductAttach,
						data: that.attachs,
						timeout: 99999
					}).done(() => {
						that.loading("close")
						layer.close(dialog)
					})
				})
			},
			//新增提醒
			remind_add() {
				const that = this;
				require(['text!remind'], (html) => {
					const dialog = layer.open({
						type: 1,
						title: '新增提醒',
						closeBtn: 1,
						content: html,
						area: ['600px', '300px'],
						btn: "保存",
						btnAlign: 'c',
						success() {
							laydate({
								elem: '#remind_time', //需显示日期的元素选择器
								event: 'click',
								format: 'YYYY-MM-DD hh:mm:ss', //日期格式
								istime: 1,
								min: laydate.now(),
								istoday: true, //是否显示今天
							})
							$('#remind_time').val(laydate.now((new Date()).getTime(), 'YYYY-MM-DD'))
						},
						yes() {
							const form = $('#remind_box')
							if(form.find("[name=remark]").val() == "") {
								layer.msg("请填写提醒内容");
								return;
							}
							$.post(config.api_saveCallInfo, {
								customerId: config.customerId,
								customerName: that.c.name,
								remark: form.find("[name=remark]").val(),
								time: form.find("[name=time]").val()
							}).done((res) => {
								that.getCaseDetail();
								layer.close(dialog)
							})
						}
					})
				})
			},
			remind_complete(index, el) {
				const that = this;
				const dialog = layer.confirm("确认完成?", () => {
					$.post(config.api_updateCallInfo, {
						id: el.id
					}).done((res) => {
						if(res.error == '00') {
							el.flag = 1
							layer.close(dialog)
						} else {
							layer.close(dialog)
							layer.msg(res.msg)
						}
					})
				})

			},
			record_add() {
				const that = this;
				this.saleFollowMode = 1;


				this.$refs.follow.init({
					id: config.customerId,
					name: that.c.name,
				})

			},
			//电话
			call(el, phone, linkmanName) {
				const that = this;
				that.loading();
				top.callId = "";
				$.post(config.api_call, {
					mobilePhone: phone
				}).done((res) => {
					that.loading("close");
					//写跟进弹出框
					that.saleFollowMode = 0
					Vue.nextTick(() => {
						this.$refs.follow.init(el, linkmanName)
					})
				})
			},
			customerName1() {
				let that = this
				$.ajax({
					type: "get",
					url: config.api_costomerList1,
					async: true,
					data: {
						ROLE_ID: '30b1487221464d369ca4c2462ccca920,b729e9334ad64c15a4e47d88b8c2638f'
					},
					success: function(res) {
						that.contractSaleList = res;

					}
				});
			},
			customerName2() {
				let that = this
				$.ajax({
					type: "get",
					url: config.api_costomerList1,
					async: true,
					data: {
						ROLE_ID: '30b1487221464d369ca4c2462ccca920,b729e9334ad64c15a4e47d88b8c2638f'
					},
					success: function(res) {
						that.orderSaleList = res;

					}
				});
			},
			vieworders(id){
				var index = layer.open({
					type: 2,
					title: '查看详情',
					content: '/order/viewOrder.do?id=' + id,
					area: ['100%', '100%']
				});
			},
			viewContract(id) {
				var index = layer.open({
					type: 2,
					title: '查看详情',
					content: '/customer/view.do?id=' + id,
					area: ['90%', '90%']
				});
			},
			delLink(id){
				const that = this;
				const dialog = layer.confirm("确认删除该联系人?", {
					title: "提示"
				}, () => {
					$.get(config.api_deleteLinkManInfo, {
						ids: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							that.getCaseDetail();
						} else {
							layer.msg(data.msg)
						}
					})
				})
			}
		}
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}