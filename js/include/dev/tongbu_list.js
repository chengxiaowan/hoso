const config = {
	role: localStorage.userRole,
	api_showSaleCustomer: '/saleCustomer/showSaleCustomer', //获取客户列表
	api_qdKhgh: '/saleCustomer/qdKhgh', //抢夺客户

	api_call: "/saleCustomer/call.do",
	api_hasName: '/saleCustomer/hasName', //查重
	api_updateSaleCustomer: '/saleCustomer/updateSaleCustomer', //保存客户信息
}
require(['module_dialog_saleoffollow', 'module_dialog_importExcel'], (dialog_follow, importExcel) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {},
			role: config.role,
			isKhGh: 2,
			postData: {},
			posting: false, //是否正在上传数据
			checkAll: 0,
			checks: [],
			callId: '',
			//搜索项
			s: {
				keywords: {},
				saleName: {},
				provinceName: "",
				cityName: "",
				areaName:"",
			},
			sort: {
				gjTime: "",
				clrq: "",
				xchrghTime: "",
				zczb: ""
			},
			select2: {

			},
			//编辑模式
			hoverEl: {
				name: {
					show: 0,
					el: {}
				},
				linkmanLandline: {
					show: 0,
					el: {}
				},
				linkmanMobilePhone: {
					show: 0,
					el: {}
				},
				email: {

				},
				postion: {
					show: 0,
					el: {}
				},
				linkmanName: {
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
			saleFollowMode: 0,
			citys_sub: [],
			citys_sub1: []
		},
		watch: {
			
		},
		computed: {
			
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			
		},
		mounted() {
			const that = this;
			//时间选择初始化
			// require(['dateTimeInit'], (dateTimeInit) => {
			// 	dateTimeInit()
			// })
			//获取列表
			this.list_Get()
			//监听全选p
			this.$watch('checks', (o, n) => {
				if(that.checks.length == that.c.list.length) {
					that.checkAll = 1
				} else {
					that.checkAll = 0
				}
			})
			//下拉框初始化
			$(".select2").select2({
				language: "zh-CN"
			})



			if(that.role == '经理') {
				that.s.saleName = that.select_init('[name=saleName]', '请选择负责人', 1)
			}
			const salerId = that.select_init('#salerId')

			//初始化上传

			require(['webuploader'], (WebUploader) => {
				var uploader = WebUploader.create({
					// 文件接收服务端。
					server: config.api_import,
					formData: {
						isKhgh: 0
					},
					runtimeOrder: 'html5',
					// 内部根据当前运行是创建，可能是input元素，也可能是flash.
					pick: {
						id: '#excel_fileUp',
						innerHTML: '导入客户'
					},
					resize: false,
					fileNumLimit: 10
				});

				//上传成功
				uploader.on('uploadSuccess', function(file, res) {});

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
					layer.msg("上传成功")
					that.loading("close")
					that.list_Get();
				});
				//文件加入队列
				uploader.on('fileQueued', function() {
					uploader.upload()
				})
			})


		},
		directives: {
			focus: {
				inserted(el) {
					el.focus();
					if(el.dataset.tips) {
						layer.yoTips(`<span style="color:#337ab7">${el.dataset.tips}</span>`, el, {
							tips: [2, '#fff']
						})
					}
				}
			}
		},
		methods: {
			//重置
			clear() {
				if(this.role == '经理') this.s.saleName.val(null).trigger('change');
				this.select2.province.val(null).trigger('change');
				this.select2.city.val(null).trigger('change');
				this.select2.area.val(null).trigger('change');
			},
			//全选
			btn_checkAll() {
				const that = this;
				that.checks = [];
				if(that.checkAll) {
					$.each(that.c.list, function() {
						that.checks.push(this.id)
					})
				}
			},
			edit_hover(key, el) {
				Vue.set(this.hoverEl, key, {
					show: 1,
					el: el
				})

			},
			edit_el(key, el) {
				this.editEl.show = key;
				this.editEl.el = el;
				this.editEl.oldValue = el.name
			},
			edit_submit(key, el) {
				console.log(2);
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
				this.saveData(key, el)
			},
			edit_keyup(key, el) {
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
			},
			overTips(el) {
				layer.yoTips(`<span style="color:#337ab7">${el.remark}</span>`, "#remark_" + el.id, {
					tips: [2, '#fff']
				})
			},
			/**
			 * 保存数据
			 * 
			 * @param {any} data 当前值 
			 * @returns 
			 */
			saveData(key, el) {
				if(key == 'name' && el.name == '') {
					el.name = this.editEl.oldValue
					return;
				}
				if(key == 'name' && el.name == this.editEl.oldValue) {
					return;
				}
				if(key == 'name') {
					$.post(config.api_hasName, {
						name: $.trim(el.name)
					}).done((res) => {
						if(res.result == 'error') {
							layer.msg('客户名称已存在,请检查重试')
							el.name = this.editEl.oldValue
							return;
						} else {
							save()
						}
					})
				} else {
					save()
				}

				function save() {
					let postData = {
						id: el.id,
					};
					postData[key] = $.trim(el[key])

					$.post(config.api_updateSaleCustomer, postData, (res) => {})
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
			//搜索
			search() {
				this.postData.keywords = $.trim($('[name=keywords]').val());
				this.postData.status = $('[name=status]').val()
				this.list_Get(1)
			},
			//获取列表数据
			list_Get(page) {
				$('.appWrapper').scrollTop(0)
				this.checks = []
				const that = this;
				if(page) this.c.pageNum = page
				that.loading();
				that.postData.isKhGh = this.isKhGh;
				that.postData.pageSize = this.c.pageSize;
				that.postData.pageNo = this.c.pageNum;
				this.postData.status = $('[name=status]').val()
				$.ajax({
					url: config.api_showSaleCustomer,
					async: false,
					data: that.postData
				}).done((res) => {
					that.c = res.result;
					//分页
					if(that.pagi) {
						$('.pagi').pagination('updatePages', that.c.pages)
						if(page == 1) $('.pagi').pagination('goToPage', that.c.pageNum)
					} else {
						require(['pagination'], (pagination) => {
							that.pagi = $('.pagi').pagination({
								pages: that.c.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.c.pageNum,
								onSelect: function(num) {
									that.c.pageNum = num
									that.list_Get()
								}
							})
						});
					}
					that.loading('close');
				})
			},
			//排序
			data_sort(el) {
				switch(this.sort[el]) {
					case "":
						Vue.set(this.sort, el, 0)
						break;
					case 0:
						Vue.set(this.sort, el, 1)
						break;
					case 1:
						Vue.set(this.sort, el, "")
						break;
					default:
						break;
				}
				for(var key in this.sort) {
					if(key != el) {
						Vue.set(this.sort, key, "")
					}
				}
				this.list_Get(1)
			},
			shiftToOther() {
				const that = this;
				if(!this.checks.length) {
					layer.msg("请先选择一项进行操作")
				} else {
					const dialog = layer.open({
						type: 1,
						title: '转移客户',
						closeBtn: 1,
						content: $('#salerBox'),
						area: ['350px', '200px'],
						btn: "转移",
						btnAlign: 'c',
						yes() {
							if(!$('#salerId').val()) {
								layer.close(dialog)
								return;
							}
							yocto.json(config.api_moveKh, {
								id: that.checks,
								saleId: $('#salerId').val()
							}, (res) => {
								layer.close(dialog)
								layer.msg("转移成功")
								that.checks = []
								that.list_Get(1)
							})
						}
					});
				}
			},

			shiftToSea() {
				const that = this;
				if(!this.checks.length) {
					layer.msg("请先选择一项进行操作")
				} else {
					if(this.role == '经理' || this.role == '销售总监' || this.role == '销售精英') {
						const dialog = layer.confirm('请选择转移到的公海', {
							btn: ['有意向公海', '客户公海', '大客户公海', '无意向公海'], //按钮,
							btnAlign: 'c',
							btn3: function() {
								yocto.json(config.api_moveGh, {
									id: that.checks,
									isKhgh: 4
								}, (res) => {
									layer.msg("转移成功")
									layer.close(dialog)
									that.btn_checkAll()
									that.list_Get(1)
								})
							},
							btn4: function() {
								yocto.json(config.api_moveGh, {
									id: that.checks,
									isKhgh: 1
								}, (res) => {
									layer.msg("转移成功")
									layer.close(dialog)
									that.btn_checkAll()
									that.list_Get(1)
								})
							}
						}, function() {
							var flag = 0
							$.each(that.checks, (index, el) => {
								$.each(that.c.list, (indexs, els) => {
									if(els.id == el && els.gjStatus >= 3 && els.gjStatus < 10) flag++
								})
							})
							if(!flag) {
								layer.alert("只有[有意向]及以上的跟进状态客户可以转入[有意向公海],请检查选择项")
								return;
							}
							yocto.json(config.api_moveGh, {
								id: that.checks,
								isKhgh: 3
							}, (res) => {
								layer.msg("转移成功")
								layer.close(dialog)
								that.btn_checkAll()
								that.list_Get(1)
							})
						}, function() {
							yocto.json(config.api_moveGh, {
								id: that.checks,
								isKhgh: 0
							}, (res) => {
								layer.msg("转移成功")
								layer.close(dialog)
								that.btn_checkAll()
								that.list_Get(1)
							})
						});
					} else {
						const dialog = layer.confirm('请选择转移到的公海', {
							btn: ['客户公海', '无意向公海'], //按钮,
							btnAlign: 'c'
						}, function() {
							yocto.json(config.api_moveGh, {
								id: that.checks,
								isKhgh: 0
							}, (res) => {
								layer.msg("转移成功")
								layer.close(dialog)
								that.btn_checkAll()
								that.list_Get(1)
							})
						}, function() {
							yocto.json(config.api_moveGh, {
								id: that.checks,
								isKhgh: 1
							}, (res) => {
								layer.msg("转移成功")
								layer.close(dialog)
								that.btn_checkAll()
								that.list_Get(1)
							})
						});
					}

				}
			},
			//电话
			call(el, phone) {
				const that = this;
				this.hoverEl.linkmanMobilePhone.show = 0
				this.hoverEl.linkmanLandline.show = 0
				that.loading();
				top.callId = "";
				$.post(config.api_call, {
					mobilePhone: phone
				}).done((res) => {
					that.loading("close");
					//写跟进弹出框
					that.saleFollowMode = 0
					Vue.nextTick(() => {
						this.$refs.follow.init(el)
					})
				})
			},
			//打开客户详情
			customer_detail(el) {
				var index = layer.open({
					type: 2,
					title: ' ',
					content: 'customer_detail.html?id=' + el.id,
					area: ['100%', '100%']
				});

			},
			edit_saleRecord(el) {
				const that = this;
				that.saleFollowMode = 1
				Vue.nextTick(() => {
					that.$refs.follow.init({
						id: el.id,
						name: el.name,
					})
				})

			},
			//同步
			sync(id) {
				const dialog = layer.open({
					type: 2,
					title: '同步',
					closeBtn: 1,
					content: '/saleCustomer/goZy.do?id=' + id,
					area: ['700px', '600px'],
				});
			},
			//销售select2
			select_init(el, placeholder, clearbtn) {
				return $(el).select2({
					placeholder: placeholder || "请选择",
					language: 'zh-CN',
					allowClear: clearbtn || false,
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
				})

			}
		}
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.list_Get()
}