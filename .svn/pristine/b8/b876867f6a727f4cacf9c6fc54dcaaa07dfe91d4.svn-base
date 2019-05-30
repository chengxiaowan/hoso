const config = {
	isKhGh: yo.getQueryString("isKhGh") || 0, //0,客户公海,2潜在客户,3有意向公海,1无意向公海,4大客户公海
	role: localStorage.userRole,
	api_showSaleCustomer: '/saleCustomer/showSaleCustomer', //获取客户列表
	api_qdKhgh: '/saleCustomer/qdKhgh', //抢夺客户
	api_import: "/saleCustomer/importExcel.do", //导入客户
	api_moveKh: "/saleCustomer/moveKh.do", //转移给他人
	api_del: "/saleCustomer/delete.do", //删除
	api_isGh: "/saleCustomer/isGh", //判断是否有电销商务顾问

}
//时间选择初始化
require(['dateTimeInit'])

require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {
				list: []
			},
			role: config.role,
			isKhGh: config.isKhGh,
			postData: {},
			checkAll: 0,
			checks: [],
			posting: false, //是否正在上传数据
			s: {
				lastSaleName: {},
				provinceName: "",
				cityName: "",
				areaName: "",
			},
			isCream: (config.role == '商务顾问J' || config.role == '经理'),
			select2: {
				privince: {},
				city: {},
				saleId: {},
				area: {}
			},
			citys_sub: [],
			citys_sub1: [],
			isGh: 1,
			isActive1:false,
			isActive2:false,
			isActive3:false,
			isActive4:false,
			isActive5:false,
		},
		watch: {
			's.provinceName': {
				handler() {
					//城市列表
					const province = this.s.provinceName;
					let city = [];
					let provinceId;
					console.log(province);
					$.each(this.citys['省份'], (i, el) => {
						if(province == el.regionName) {
							provinceId = el.id
						}
					})
					$.each(this.citys['市区'], (i, el) => {
						if(provinceId == el.parentId) {
							city.push(el);
						}
					})
					this.citys_sub = city;
					Vue.set(this.citys_sub);
				},
				deep: true
			},
			's.cityName': {
				handler() {
					//城市列表
					const province = this.s.provinceName;
					const city_1 = this.s.cityName;
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
					this.citys_sub1 = area;
					Vue.set(this.citys_sub1);
				},
				deep: true
			},
		},
		computed: {
			//			citys_sub1() {
			//				const province = this.s.provinceName;
			//				const city_1 = this.s.cityName;
			//				let city = [];
			//				let area = [];
			//				let provinceId;
			//				let cityId;
			//				console.log(city_1);
			//				$.each(this.citys['省份'], (i, el) => {
			//					if(province == el.regionName) provinceId = el.id
			//				})
			//				$.each(this.citys['市区'], (i, el) => {
			//					if(city_1 == el.regionName) {
			//						cityId = el.id
			//						console.log(cityId);
			//					}
			//				})
			//				$.each(this.citys['区'], (i, el) => {
			//					if(cityId == el.parentId) area.push(el)
			//				})
			//				return area;
			//			}
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			//初始化城市数据
			if(localStorage.citys) {
				this.citys = JSON.parse(localStorage.citys)
			}
			if(config.role == '高级商务顾问S2' || config.role == '高级商务顾问S3' || config.role == '经理') {
				that.isKhGh = 6
				that.isActive1=true;
			} else if(config.role == '高级商务顾问S1') {
				that.isKhGh = 7
				that.isActive2=true;
			} else if(config.role == '商务顾问J') {
				that.isKhGh = 4
				that.isActive3=true;
			} else if(config.role == '电销员工' || config.role == '电销主管') {
				that.isKhGh = 5
				that.isActive4=true;
			} else if(that.isGh == 1) {
				that.isKhGh = 3
				that.isActive5=true;
			}

			//初始化上传
			require(['webuploader'], (WebUploader) => {
				that.uploader = WebUploader.create({
					// 文件接收服务端。
					server: config.api_import,
					formData: {
						isKhgh: that.isKhGh
					},
					timeout: 0,
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
				that.uploader.on('uploadSuccess', function(file, res) {
					that.uploader.reset();
					that.loading('close')
					if(res.result) {
						const dialog = layer.alert("上传成功<br>以下项目有重复无法导入:<br>" + res.result, () => {
							that.list_Get(1);
							layer.close(dialog)
						})
					} else {
						layer.msg("上传成功")
						setTimeout(function() {
							that.list_Get(1)
						}, 2000);
					}
				});

				that.uploader.on('uploadStart', function() {
					that.loading()
				})
				//上传出错
				that.uploader.on('uploadError', function(file) {
					layer.msg('上传出错');
				});
				//出错
				that.uploader.on('error', function(res) {
					if(res == 'Q_TYPE_DENIED') {
						layer.msg('上传文件格式错误，请检查')
					}
				});
				//上传完成
				that.uploader.on('uploadFinished', function(file) {});
				//文件加入队列
				that.uploader.on('fileQueued', function() {
					that.uploader.upload()
				})
			})
		},

		mounted() {
			//全选
			this.$watch('checks', (o, n) => {
				if(that.checks.length == that.c.list.length && that.checks.length != 0) {
					that.checkAll = 1
				} else {
					that.checkAll = 0
				}
			})
			this.s.lastSaleName = this.select_init('[name=saleName]', '请选择前负责人', 1)
			//城市筛选
			const that = this;
			this.select2.province = $('select[name=provinceName]').select2({
				language: "zh-CN",
				placeholder: '请选择',
				allowClear: 1,
			}).on('change', function() {
				that.s.provinceName = this.value;
				that.select2.city.val(null).trigger("change");
			})
			that.select2.city = $('select[name=cityName]').select2({
				language: "zh-CN",
				placeholder: '请选择',
				allowClear: 1
			}).on('change', function() {
				that.s.cityName = this.value;
				that.select2.area.val(null).trigger("change");
			})
			that.select2.area = $('select[name=area]').select2({
				language: "zh-CN",
				placeholder: '请选择',
				allowClear: 1
			}).on('change', function() {
				that.s.areaName = this.value;
			})
			this.sf();
			//获取列表
			this.list_Get();
			//选择负责人
			this.select2.saleId = this.select_init('#salerId', "请选择", false)

			//			$('.date-picker').datepicker({
			//				autoclose: true,
			//				todayHighlight: true
			//			});
			//			if($("#createTimeStart").val()) {
			//				$("#createTimeEnd").datepicker('setStartDate',
			//					new Date($("#createTimeStart").val()))
			//			}
			//
			//			if($("#createTimeEnd").val()) {
			//				$("#createTimeStart").datepicker('setEndDate',
			//					new Date($("#createTimeEnd").val()))
			//			}
			//
			//			//开始日期
			//			$("#createTimeStart").datepicker({}).on(
			//				'changeDate',
			//				function(ev) {
			//					if(ev.date) {
			//						$("#createTimeEnd").datepicker('setStartDate',
			//							new Date(ev.date.valueOf()))
			//					} else {
			//						$("#createTimeEnd").datepicker('setStartDate', null);
			//					}
			//				});
			//			//结束日期
			//			$("#createTimeEnd").datepicker({}).on(
			//				'changeDate',
			//				function(ev) {
			//					if(ev.date) {
			//						$("#createTimeStart").datepicker('setEndDate',
			//							new Date(ev.date.valueOf()))
			//					} else {
			//						$("#createTimeStart").datepicker('setEndDate',
			//							new Date());
			//					}
			//				});
		},

		methods: {
			//重置
			clear() {
				this.s.lastSaleName.val(null).trigger('change');
				this.select2.province.val(null).trigger('change');
				this.select2.city.val(null).trigger('change');
				this.select2.area.val(null).trigger('change');
				this.postData.createTimeStart = "";
				this.postData.createTimeEnd = "";
			},
			btn_checkAll() {
				const that = this;
				that.checks = [];
				if(that.checkAll) {
					$.each(that.c.list, function() {
						that.checks.push(this.id)
					})
				}
			},
			//转移
			shiftToOther() {
				const that = this;
				if(!this.checks.length) {
					layer.msg("请先选择一项进行操作")
				} else {
					if(this.isKhGh == 4) {
						this.select2.saleId.select2("destroy");
						this.select2.saleId = this.select_init('#salerId', "请选择", false, "b729e9334ad64c15a4e47d88b8c2638f")
					}
					const dialog = layer.open({
						type: 1,
						title: '转移客户',
						closeBtn: 1,
						content: $('#salerBox'),
						area: ['350px', '200px'],
						btn: "转移",
						btnAlign: 'c',
						end() {
							that.select2.saleId.select2("destroy");
							that.select2.saleId = that.select_init('#salerId')
						},
						yes() {
							if(!$('#salerId').val()) {
								layer.close(dialog)
								return;
							}
							var type = "";
							if(that.isKhGh == 0) {
								type = 0
							} else if(that.isKhGh == 3) {
								type = 1
							} else if(that.isKhGh == 1) {
								type = 3
							} else if(that.isKhGh == 4) {
								type = 4
							}
							yocto.json(config.api_moveKh, {
								id: that.checks,
								saleId: $('#salerId').val(),
								type: type
							}, (res) => {
								layer.close(dialog)
								layer.msg("转移成功")
								that.list_Get(1)
							})
						}
					});
				}
			},
			del() {
				const that = this;
				if(!this.checks.length) {
					layer.msg("请先选择一项进行操作")
				} else {
					const dialog = layer.confirm("确认删除客户?", () => {
						yocto.json(config.api_del, {
							id: that.checks,
						}, (res) => {
							layer.close(dialog)
							layer.msg("删除成功")
							that.list_Get(1)
						})
					})
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
			//抢夺
			sale_Get(id) {
				var postData = []
				if(typeof id != 'object') {
					postData.push(id)
				} else {
					if(!this.checks.length) {
						layer.msg("请先选择一项进行操作");
						return;
					}
					postData = this.checks
				}
				const that = this;
				var type = "";
				if(that.isKhGh == 0) {
					type = 0
				} else if(that.isKhGh == 3) {
					type = 1
				} else if(that.isKhGh == 1) {
					type = 3
				} else if(that.isKhGh == 4) {
					type = 4
				}
				$.post(config.api_qdKhgh, {
					ids: postData.join(','),
					type: type
				}).done((res) => {
					if(res.result) {
						layer.msg(res.result)
						that.list_Get()
					} else {
						layer.msg('操作成功,请在潜在客户查看')
						that.list_Get()
					}
				})
			},
			tab(isKhGh) {
				if(this.isKhGh != isKhGh) {
					this.clear()
					this.isKhGh = isKhGh;
					$('#searchForm')[0].reset();
					this.s.lastSaleName.val(null).trigger("change")
					this.postData.saleName = ""
					this.postData.status = ""
					this.checks = []
					this.checkAll = 0
					this.list_Get(1)
					this.uploader.option('formData', {
						isKhgh: this.isKhGh
					})
				}
			},
			//搜索
			search() {
				this.postData.saleName = $.trim($('[name=saleName]').val());
				this.postData.status = $.trim($('[name=status]').val());
				this.postData.provinceName = $.trim($('[name=provinceName]').val());
				this.postData.cityName = $.trim($('[name=cityName]').val());
				this.postData.area = $.trim($('[name=area]').val());
				this.postData.keywords = $.trim($('[name=keywords]').val());
				console.log(this.postData);
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
				require(['pagination'], (pagination) => {
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
							that.pagi = 1
							$('.pagi').pagination({
								pages: that.c.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.c.pageNum,
								onSelect: function(num) {
									that.c.pageNum = num
									that.list_Get()
								}

							});
						}
						that.loading('close');
					})
				})
			},
			//销售select2
			/**
			 * @param {el} param_name
			 * @param {placeholder} param_name
			 * @param {clearbtn} param_name
			 * @param {roleId} aram_name
			 */
			select_init(el, placeholder, clearbtn, roleId) {
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
								ROLE_ID: roleId || "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
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

			},
			sf() {
				$.get(config.api_isGh, function(data) {
					if(data.error == '00') {
						if(data.msg == '有') {
							this.isGh = 1 //有电销商务顾问
						} else {
							this.isGh = 2 //无电销商务顾问
						}

					}
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