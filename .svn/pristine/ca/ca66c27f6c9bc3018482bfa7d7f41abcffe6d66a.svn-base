var config = {
	role: localStorage.userRole,
	api_list: api_url + '/distribution/burstingGoodsList', //获取爆款商品列表
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_dataList2: api_url + '/goods/dataList2', //获取商品大列表
	api_addBurstingGoods: api_url + '/distribution/addBurstingGoods', //新增爆款商品
	api_del: api_url + '/distribution/delBurstingGoods', //删除爆款商品
	api_roleCommissionList: api_url + '/distribution/roleCommissionList', //角色佣金列表
	api_addRoleCommission: api_url + '/distribution/addRoleCommission', //新增角色佣金
	api_delRoleCommission: api_url + '/distribution/delRoleCommission', //删除角色佣金
	api_editRoleCommissionInfo: api_url + '/distribution/editRoleCommissionInfo', //获取角色佣金详情
	api_editRoleCommission: api_url + '/distribution/editRoleCommission', //修改角色佣金
	api_customCommissionList: api_url + '/distribution/customCommissionList', //获取自定义佣金列表
	api_distributorList2: api_url + '/distribution/distributorList2', //按条件检索分销人员(审核通过的)
	api_addCustomCommission: api_url + '/distribution/addCustomCommission', //新增自定义佣金
	api_editCustomCommissionInfo: api_url + '/distribution/editCustomCommissionInfo', //修改 --- 获取自定义佣金详情
	api_editCustomCommission: api_url + '/distribution/editCustomCommission', //修改自定义佣金
	api_delCustomCommission: api_url + '/distribution/delCustomCommission', //删除自定义佣金
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
		list: [], // 爆款商品列表
		list1: [], // 大商品列表
		list2: [], // 自定义佣金列表
		supplierList: [], // 供应商列表
		supplierList1: [], // 供应商列表
		typeList: [], // 分类列表
		typeList1: [], // 分类列表
		brandList: [], // 品牌列表
		brandList1: [], // 品牌列表
		keywords: '', //爆款商品关键词
		keywords1: '', //大商品关键词
		keywords2: '', //自定义佣金列表关键词
		typeId: '', //一级分类id
		typeId1: '', //一级分类id
		supplierId: '', //供应商id
		supplierId1: '', //供应商id
		brandId: '', //品牌id
		brandId1: '', //品牌id
		now: -1, //加入当前选中状态
		goodsId: '', //大商品id
		roleCommissionList: [], //角色佣金列表
		roleType: '', //角色
		commissionPercent: '', //佣金比例
		saleTime: '', //购买时限
		burstingGoodsId: '', //爆款商品id
		roleCommissionId: '', //分销爆款商品角色佣金id
		distributorId: '', //自定义角色id
		commissionPercent1: '', //佣金比例%
		saleTime1: '', //销售时限(小时)
		customList: '' //自定义角色列表
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getData();
		that.getData1();
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
		that.getCustomList()
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
		//爆款商品列表
		getData: function(page, keywords) {
			$('body,html').scrollTop(0)
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
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
									that.now=-1
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
		//角色佣金列表
		CommissionList() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_roleCommissionList,
				async: true,
				data: {
					burstingGoodsId: that.burstingGoodsId
				},
				success(res) {
					if(res.error == '00') {
						that.roleCommissionList = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//自定义佣金列表
		getData2: function(page, keywords) {
			if(page) this.list2.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_customCommissionList,
				async: true,
				type: 'post',
				data: {
					roleCommissionId: that.roleCommissionId,
					keywords: that.keywords2,
					pageSize: that.list1.pageSize || 5,
					pageNo: that.list1.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list2 = res.result;
						//分页
						if(that.pagi2) {
							$('.pagi2').pagination('updatePages', that.list2.pages)
							if(page == 1) $('.pagi2').pagination('goToPage', that.list2.pageNum)
						} else {
							that.pagi2 = $('.pagi2').pagination({
								pages: that.list2.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list2.pageNum,
								onSelect: function(num) {
									that.list2.pageNum = num
									that.getData2()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取类别
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
		// 获取人员
		getCustomList() {
			const that = this;
			$.ajax({
				url: config.api_distributorList2,
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
							obj.id = res.result[i].distributorId;
							obj.text = res.result[i].distributorName;
							arr.push(obj);
						}
						//						that.customList = arr;
						that.customList = res.result
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
			that.now = index;
			that.goodsId = id
		},
		// 新增商品
		addGoods() {
			let that = this
			that.getData1();
			that.goodsId = ''
			that.now = -1
			that.keywords1 = ''
			that.typeId1 = ''
			that.supplierId1 = ''
			that.brandId1 = ''
			const dialog = layer.open({
				type: 1,
				title: '加入商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['95%', '85%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.goodsId == '') {
						layer.msg('请加入商品')
						return
					} else {
						that.loading();
						$.ajax({
							type: "post",
							url: config.api_addBurstingGoods,
							data: {
								goodsId: that.goodsId,
							},
							success: function(res) {
								that.loading('close')
								if(res.error == '00') {
									layer.close(dialog)
									that.getData()
								} else {
									layer.msg(res.msg)
								}
							},
						});
					}

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
			const that = this;
			const dialog = layer.confirm("确认删除该商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					burstingGoodsId: id,
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
		//角色佣金列表
		setUp(id) {
			let that = this;
			that.burstingGoodsId = id
			that.CommissionList()
			const dialog = layer.open({
				type: 1,
				title: '佣金设置',
				closeBtn: 1,
				content: $('#setUp'),
				area: ['95%', '70%'],
				yes() {

				}
			});
		},
		addRole() {
			let that = this
			that.roleType = ''
			that.commissionPercent = ''
			that.saleTime = ''
			const dialog = layer.open({
				type: 1,
				title: '佣金设置',
				closeBtn: 1,
				content: $('#addRole'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.roleType == '' || that.commissionPercent == '' || that.saleTime == '') {
						layer.msg('请填写全部信息')
						return false;
					}
					$.ajax({
						type: "post",
						url: config.api_addRoleCommission,
						async: true,
						data: {
							burstingGoodsId: that.burstingGoodsId,
							roleType: that.roleType,
							commissionPercent: that.commissionPercent,
							saleTime: that.saleTime
						},
						success(res) {
							if(res.error == '00') {
								layer.close(dialog)
								that.CommissionList()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		delRole(id) {
			const that = this;
			const dialog = layer.confirm("确认删除角色佣金?", {
				title: "提示"
			}, () => {
				$.get(config.api_delRoleCommission, {
					roleCommissionId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.CommissionList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		editRole(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_editRoleCommissionInfo,
				async: true,
				data: {
					roleCommissionId: id
				},
				success(res) {
					if(res.error == '00') {
						that.roleType = res.result.roleType
						that.commissionPercent = res.result.commissionPercent
						that.saleTime = res.result.saleTime
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '佣金设置',
				closeBtn: 1,
				content: $('#addRole'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.roleType == '' || that.commissionPercent == '' || that.saleTime == '') {
						layer.msg('请填写全部信息')
						return false;
					}
					$.ajax({
						type: "post",
						url: config.api_editRoleCommission,
						async: true,
						data: {
							roleCommissionId: id,
							burstingGoodsId: that.burstingGoodsId,
							roleType: that.roleType,
							commissionPercent: that.commissionPercent,
							saleTime: that.saleTime
						},
						success(res) {
							if(res.error == '00') {
								layer.close(dialog)
								that.CommissionList()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		defineRole(id) {
			let that = this
			that.roleCommissionId = id
			that.getData2()
			const dialog = layer.open({
				type: 1,
				title: '自定义佣金列表',
				closeBtn: 1,
				content: $('#define'),
				area: ['95%', '70%'],
				yes() {

				}
			});
		},
		searchCustom() {
			let that = this
			that.getData2()
		},
		addCustom() {
			let that = this
			that.distributorId = ''
			that.commissionPercent1 = ''
			that.saleTime1 = ''
			const dialog = layer.open({
				type: 1,
				title: '佣金设置',
				closeBtn: 1,
				content: $('#addDefine'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.distributorId == '' || that.commissionPercent1 == '' || that.saleTime1 == '') {
						layer.msg('请填写全部信息')
						return false;
					}
					$.ajax({
						type: "post",
						url: config.api_addCustomCommission,
						async: true,
						data: {
							roleCommissionId: that.roleCommissionId,
							distributorId: that.distributorId,
							commissionPercent: that.commissionPercent1,
							saleTime: that.saleTime1
						},
						success(res) {
							if(res.error == '00') {
								layer.close(dialog)
								that.getData2()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		editCustom(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_editCustomCommissionInfo,
				async: true,
				data: {
					customCommissionId: id
				},
				success(res) {
					if(res.error == '00') {
						that.distributorId = res.result.distributorId
						that.commissionPercent1 = res.result.commissionPercent
						that.saleTime1 = res.result.saleTime
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '佣金设置',
				closeBtn: 1,
				content: $('#addDefine'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.distributorId == '' || that.commissionPercent1 == '' || that.saleTime1 == '') {
						layer.msg('请填写全部信息')
						return false;
					}
					$.ajax({
						type: "post",
						url: config.api_editCustomCommission,
						async: true,
						data: {
							customCommissionId: id,
							roleCommissionId: that.roleCommissionId,
							distributorId: that.distributorId,
							commissionPercent: that.commissionPercent1,
							saleTime: that.saleTime1
						},
						success(res) {
							if(res.error == '00') {
								layer.close(dialog)
								that.getData2()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		delCustom(id) {
			const that = this;
			const dialog = layer.confirm("确认删除角色佣金?", {
				title: "提示"
			}, () => {
				$.get(config.api_delCustomCommission, {
					customCommissionId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getData2()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},

	}
})