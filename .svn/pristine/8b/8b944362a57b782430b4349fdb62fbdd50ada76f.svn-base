const config = {
	customerId: yo.getQueryString("id"), //案件ID
	role: localStorage.userRole,
	api_getOrderDetail: '/contract/goEdit1', //获取客户数据
	api_xgOrderDetail: '/contract/doEdit1', //修改客户数据
	type: yo.getQueryString("type"),
	api_costomerList: '/customer/getCustomerInfo',
	api_costomerList1: '/user/getUserInfo',
	api_chufa: '/contract/getDebtorInfo1',

	api_showAll: '/saleCustomer/showAll', //获取记录列表 
	api_saveLinkManInfo: '/linkman/saveLinkMan.do', //客户联系人增加
	api_saveProductAttach: '/order/saveProductAttach', //保存上传附件
	api_updateSaleCustomer: '/saleCustomer/updateSaleCustomer', //保存客户信息
	api_hasName: '/saleCustomer/hasName', //查重
	api_saveLinkMan: '/linkman/saveLinkMan', //债务知情人/其他联系人
	api_updateLinkMans: '/saleCustomer/updateLinkMans', //编辑联系人
	api_updateGjStatus: '/order/updateGjStatus', //编辑跟进状态
	api_saveCallInfo: '/order/saveCallInfo', //保存提醒
	api_call: "/saleCustomer/call.do", //拨打电话
	api_updateCallInfo: '/order/updateCallInfo', //完成提醒操作
	api_isYxx: "/saleCustomer/isYxx", //判断最新跟进状态
}
require(['module_dialog_saleoffollow'], (dialog_follow) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {},
			type: 3, //记录type
			uploader: 0, //上传组件状态
			role: config.role,
			editParam: '', //正在编辑的项目
			hoverParam: '', //鼠标覆盖项目
			oldData: '', //编辑项目的旧值
			posting: false, //是否正在上传数据
			saleFollowMode: 1, //写跟进弹框状态
			//记录序列
			sa: [],
			customerNameList: [], //客户列表
			userNameList: [], //商务顾问
			debtorNameList: [],
			swwxNameList: [],
			orderInfo: [],
			userName: '',
			customerName: '',
			swwxName: '',
			//编辑模式
			hoverEl: {
				contractNo: {
					show: 0,
					el: {}
				},
				customerName: {
					show: 0,
					el: {}
				},
				debtorName: {
					show: 0,
					el: {}
				},
				signingTime: {

				},
				endTime: {
					show: 0,
					el: {}
				},
				address: {
					show: 0,
					el: {}
				},
				price: {
					show: 0,
					el: {}
				},
				commissionRate: {
					show: 0,
					el: {}
				},
				userName: {
					show: 0,
					el: {}
				},
				remark: {
					show: 0,
					el: {}
				}
			},
			editEl: {
				show: '',
				el: {},
				oldValue: ""
			},
			cId:''
		},
		watch: {
			'c.signingTime': function(val) {
				this.saveData()
			},
			'c.endTime': function(val) {
				this.saveData()
			},
		},
		computed: {
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
				data.contractId = config.customerId
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

			//获取全局数据
			this.getCaseDetail()
		},
		mounted() {
			const that = this;

			this.customerName1();
			this.customerName2();
			this.customerName3();
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
				if(this.c.customerName == "") this.c.customerName = this.oldData
				//验证end
				if(this.oldData == this.c[this.editParam]) {
					this.editParam = '';
					return;
				}

				save()

				function save() {
					let postData = {
						id: config.customerId,
					};
					that.posting = true;
					if(that.editParam == 'customerName') {
						that.customerName = that.c.customerName.split(',')[1];
						postData.customerName = that.c.customerName.split(',')[1];
						postData.customerId = that.c.customerName.split(',')[0];
						that.cId = that.c.customerName.split(',')[0]
					} else if(that.editParam == 'userName') {
						that.userName = that.c.userName.split(',')[1];
						postData.userName = that.c.userName.split(',')[1];
						postData.userId = that.c.userName.split(',')[0];
					} else if(that.editParam == 'swwxName') {
						that.swwxName = that.c.swwxName.split(',')[1];
						postData.swwxName = that.c.swwxName.split(',')[1];
						postData.swwxId = that.c.swwxName.split(',')[0];
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
				let that = this;
				laydate.render({
					elem: '#signingTime',
					trigger: 'click',
					done: function(value, date) {
						that.c.signingTime = value;
					}
				});
				laydate.render({
					elem: '#endTime',
					trigger: 'click',
					done: function(value, date) {
						that.c.endTime = value;
					}
				});
				
				this.hoverParam = '';
				this.editParam = param;
				this.oldData = this.c[param];
				
				if(param == 'customerName') {
					$.ajax({
						type: "get",
						url: config.api_chufa + '?customerId=' + that.cId + '&key',
						async: true,
						success: function(res) {
							this.debtorNameList = res
						}
					});
				}
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
			getCaseDetail(page) {
				const that = this;
				if(page) this.orderInfo.pageNum = page
				that.loading()
				$.ajax({
					url: config.api_getOrderDetail,
					async: false,
					data: {
						id: config.customerId,
						type: config.type,
						pageSize: that.orderInfo.pageSize || 10,
						pageNo: that.orderInfo.pageNum || 1,
					},
					success: function(res) {
						that.c = res.result
						that.orderInfo = res.result.orderInfo;
						that.userName = res.result.userName;
						that.customerName = res.result.customerName;
						that.swwxName = res.result.swwxName;
						that.cId = res.result.customerId
						that.loading("close")
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.orderInfo.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.orderInfo.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.orderInfo.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.orderInfo.pageNum,
								onSelect: function(num) {
									that.orderInfo.pageNum = num
									that.getCaseDetail()
									yo.scrollTo('body')
								}
							})
						}
					}
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
			customerName1() {
				let that = this
				$.ajax({
					type: "get",
					url: config.api_costomerList,
					async: true,
					success: function(res) {
						that.customerNameList = res;

					}
				});
			},
			customerName2() {
				let that = this
				$.ajax({
					type: "get",
					url: config.api_costomerList1,
					data: {
						ROLE_ID: '30b1487221464d369ca4c2462ccca920,b729e9334ad64c15a4e47d88b8c2638f'
					},
					async: true,
					success: function(res) {
						that.userNameList = res
					}
				});
			},
			customerName3() {
				let that = this
				$.ajax({
					type: "get",
					url: config.api_costomerList1,
					data: {
						ROLE_ID: 'fbe6f2f9535c4fce9f024f6cb999b2bd'
					},
					async: true,
					success: function(res) {
						that.swwxNameList = res
					}
				});
			},
			viewContract(id) {
				var index = layer.open({
					type: 2,
					title: '查看详情',
					content: '/order/viewOrder.do?id=' + id,
					area: ['100%', '100%']
				});
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