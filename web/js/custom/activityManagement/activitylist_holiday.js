var config = {
	role: localStorage.userRole,
	api_list: api_url + '/activity/activityGoodsList', //获取节日活动商品列表
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_dataList2: api_url + '/goods/dataList2', //获取商品大列表
	api_skuList: api_url + '/goodsSku/dataList4', //获取大商品下子商品列表
	api_add: api_url + '/activity/addActivityGoods', //新增活动商品
	api_del: api_url + '/activity/delActivityGoods', //删除爆款商品
	api_check: api_url + '/activity/checkActivityGoods', //检验是否加入
	api_editInfo: api_url + '/activity/editActivityGoodsInfo', //修改时获取信息
	api_edit: api_url + '/activity/editActivityDateTimeGoods', //修改
	id: parameter().id,
	startTime:parameter().startTime,
	endTime:parameter().endTime,
}

Vue.directive('select2', {
	inserted: function(el, binding, vnode) {
		let options = binding.value || {};
		$(el).select2(options).on("select2:select", (e) => {
			el.dispatchEvent(new Event('change', {
				target: e.target
			})); //说好的双向绑定，竟然不安套路
		});
	},
	update: function(el, binding, vnode) {
		for(var i = 0; i < vnode.data.directives.length; i++) {
			if(vnode.data.directives[i].name == "model") {
				$(el).val(vnode.data.directives[i].value);
			}
		}
		$(el).trigger("change");
	}
});
Vue.directive('select22', {
	inserted: function(el, binding, vnode) {
		let options = binding.value || {};
		$(el).select2(options).on("select2:select", (e) => {
			el.dispatchEvent(new Event('change', {
				target: e.target
			})); //说好的双向绑定，竟然不安套路
		});
	},
	update: function(el, binding, vnode) {
		for(var i = 0; i < vnode.data.directives.length; i++) {
			if(vnode.data.directives[i].name == "model") {
				$(el).val(vnode.data.directives[i].value);
			}
		}
		$(el).trigger("change");
	}
});

var vueApp = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 节日商品列表
		list1: [], // 大商品列表
		supplierList: [], // 供应商列表
		supplierList1: [], // 供应商列表
		typeList: [], // 分类列表
		typeList1: [], // 分类列表
		brandList: [], // 品牌列表
		brandList1: [], // 品牌列表
		keywords: '', //爆款商品关键词
		keywords1: '', //大商品关键词
		typeId: '', //一级分类id
		typeId1: '', //一级分类id
		supplierId: '', //供应商id
		supplierId1: '', //供应商id
		brandId: '', //品牌id
		brandId1: '', //品牌id
		now: -1, //加入当前选中状态
		goodsId: '', //大商品id
		roleCommissionList: [],
		skuList: [], //子商品列表
		activityMoney: '',
		startTime: config.startTime,
		endTime: config.endTime,
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			//日期范围
			var endTime = laydate.render({
				elem: '#end1', //选择器结束时间
				type: 'datetime',
				min: config.startTime,
				max: config.endTime, //设置一个默认最大值
				done: function(value, date) {
					that.endTime = value;
					console.log(date)
					startTime.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: date.hours,
						minutes: date.minutes,
						seconds: date.seconds
					}
				}
			});
			//日期范围
			var startTime = laydate.render({
				elem: '#start1',
				type: 'datetime',
				min: config.startTime,
				max: config.endTime, //设置一个默认最大值
				done: function(value, date) {
					that.startTime = value;
					endTime.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: date.hours,
						minutes: date.minutes,
						seconds: date.seconds
					};
				}
			});

		});
		that.getData();
		that.getData1();
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
	},
	methods: {
		/**
		 * 载入中方法
		 *
		 * @param {string} s 是否关闭
		 */
		loading: function(s) {
			if(s == "close") layer.close(this.loadingSwitch)
			else this.loadingSwitch = layer.load(3);
		},
		//节日活动商品列表
		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					activityId: config.id,
					keywords: that.keywords,
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.list.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list.pageNum,
								onSelect: function(num) {
									that.list.pageNum = num
									that.getData()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//获取大列表
		getData1: function(page, keywords) {
			if(page) this.list1.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_dataList2,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords1,
					typeId: that.typeId1,
					supplierId: that.supplierId1,
					brandId: that.brandId1,
					pageSize: that.list1.pageSize || 5,
					pageNo: that.list1.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list1 = res.result;
						//分页
						if(that.pagi1) {
							$('.pagi1').pagination('updatePages', that.list1.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.list1.pageNum)
						} else {
							that.pagi1 = $('.pagi1').pagination({
								pages: that.list1.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list1.pageNum,
								onSelect: function(num) {
									that.now = -1
									that.list1.pageNum = num
									that.getData1()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getTypeList() {
			const that = this;
			$.ajax({
				url: config.api_typeList,
				async: true,
				type: 'post',
				data: {
					level: 1
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.typeList = res.result;
						that.typeList1 = res.result;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取供应商
		getSupplierList() {
			const that = this;
			$.ajax({
				url: config.api_supplierList,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = []
						for(var i in res.result) {
							var obj = {};
							obj.id = res.result[i].id;
							obj.text = res.result[i].name;
							arr.push(obj);
						}
						that.supplierList = arr;
						that.supplierList1 = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取品牌列表
		getBrandList() {
			const that = this;
			$.ajax({
				url: config.api_brandList,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						for(var i in res.result) {
							var obj = {}
							obj.id = res.result[i].id;
							obj.text = res.result[i].name;
							arr.push(obj);
						}
						that.brandList = arr;
						that.brandList1 = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//加入商品
		join(id, index, item) {
			let that = this
			var ind;
			that.goodsId = id;
			$.ajax({
				type: "post",
				url: config.api_check,
				async: true,
				data: {
					activityId: config.id,
					goodsId: that.goodsId
				},
				success(res) {
					if(res.error == '00') {
						$.ajax({
							type: "post",
							url: config.api_skuList,
							async: true,
							data: {
								goodsId: that.goodsId
							},
							success(res) {
								if(res.error == '00') {
									that.skuList = res.result.goodsSkuList;
									const dialog = layer.open({
										type: 1,
										title: '加入商品',
										closeBtn: 1,
										content: $('#setUp'),
										area: ['95%', '85%'],
										btn: "确定",
										btnAlign: 'c',
										yes() {
											var arr = [];
											var sz = 0,
												sz1 = 0;
											that.skuList.forEach(function(i) {
												var obj = {
													goodsSkuId: i.goodsSkuId,
													activityMoney: i.activityMoney
												}
												arr.push(obj)
											})
											arr.forEach(function(v) {
												sz++
												if(v.activityMoney == '' || v.activityMoney == undefined) {
													return;
												} else {
													that.isgo = true
													sz1++
												}
											})
											if(sz != sz1) {
												layer.msg("请填写全部活动价");
												return;
											}
											if(that.startTime == '') {
												layer.msg("请选择开始日期");
												return
											}
											if(that.endTime == '') {
												layer.msg("请选择结束日期");
												return
											}
											$.ajax({
												type: "post",
												url: config.api_add,
												data: {
													goodsId: that.goodsId,
													activityId: config.id,
													startTime: that.startTime,
													endTime: that.endTime,
													activityGoodsSkuList: JSON.stringify(arr),
												},
												success: function(res) {
													that.loading('close')
													if(res.error == '00') {
														that.now = index;
														layer.msg('添加成功')
														layer.close(dialog)
														that.getData()
													} else {
														layer.msg(res.msg)
													}
												},
											});
										}
									});

								} else {
									layer.msg(res.msg)
								}
							}
						});
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 新增商品
		addGoods() {
			let that = this
			that.goodsId = ''
			that.now = -1
			that.keywords1 = ''
			that.typeId1 = ''
			that.supplierId1 = ''
			that.brandId1 = ''
			that.getData1();
			const dialog = layer.open({
				type: 1,
				title: '加入商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['95%', '85%'],
				btn: "关闭",
				btnAlign: 'c',
				yes() {
					layer.close(dialog)
				}
			});
		},
		// 搜索商品
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
		// 搜索商品
		searchGood() {
			const that = this;
			var page = 1;
			var keywords = that.keywords1;
			that.getData1(page, keywords);
		},
		// 删除商品
		del(id) {
			let that = this;
			const dialog = layer.confirm("确认删除该商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					activityGoodsId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getData()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		setUp(id) {
			let that = this;
			$.ajax({
				type: "post",
				url: config.api_editInfo,
				async: true,
				data: {
					activityGoodsId: id
				},
				success(res) {
					if(res.error == '00') {
						that.skuList = res.result.activityGoodsSkuList;
						that.startTime = res.result.startTime
						that.endTime = res.result.endTime
						const dialog = layer.open({
							type: 1,
							title: '加入商品',
							closeBtn: 1,
							content: $('#setUp'),
							area: ['95%', '85%'],
							btn: "确定",
							btnAlign: 'c',
							yes() {
								var arr = [];
								var sz = 0,
									sz1 = 0;
								that.skuList.forEach(function(i) {
									var obj = {
										activityGoodsSkuId:i.activityGoodsSkuId,
										goodsSkuId: i.goodsSkuId,
										activityMoney: i.activityMoney
									}
									arr.push(obj)
								})
								arr.forEach(function(v) {
									sz++
									if(v.activityMoney == '' || v.activityMoney == undefined) {
										return;
									} else {
										that.isgo = true
										sz1++
									}
								})
								if(sz != sz1) {
									layer.msg("请填写全部活动价");
									return;
								}
								if(that.startTime == '') {
									layer.msg("请选择开始日期");
									return
								}
								if(that.endTime == '') {
									layer.msg("请选择结束日期");
									return
								}
								$.ajax({
									type: "post",
									url: config.api_edit,
									data: {
										activityGoodsId:id,
										startTime: that.startTime,
										endTime: that.endTime,
										activityGoodsSkuList: JSON.stringify(arr),
									},
									success: function(res) {
										that.loading('close')
										if(res.error == '00') {
											layer.close(dialog)
											layer.msg("修改成功")
											that.getData()
										} else {
											layer.msg(res.msg)
										}
									},
								});
							}
						});

					} else {
						layer.msg(data.msg)
					}
				}
			});
		},
	}
})