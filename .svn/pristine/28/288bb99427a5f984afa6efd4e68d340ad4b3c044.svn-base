var config = {
	role: localStorage.userRole,
	id: parameter().id,
	sceneLabels: parameter().sceneLabels,
	api_add: api_url + '/stock/editStockIn', //编辑入库,
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/goodsSku/dataList5', //获取商品大列表
	api_edit: api_url + '/stock/editStockInInfo', //获取详情
	api_delSceneGoodsSku: api_url + '/stock/delStockInGoodsSku', //删除子商品
	api_depotList2: api_url + '/depot/depotList2', //获取仓库
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		shopsName: '',
		selected: 0,
		postData: {},
		keywords: '', //请输入分类商品名称,编号
		typeId: '', //商品分类
		supplierId: '', //请选择供应商
		brandId: '', //请选择品牌
		typeList: [],
		supplierList: [],
		brandList: [],
		arr: [],
		goodList: [],
		isgo: true,
		arr1: [], //记忆添加id
		arr2: [], //记忆删除id
		skipGoodsIds: [], //不需要显示的sku
		now: -1, //加入当前选中状态
		isOpen: 1, //是否公开
		scenePicList: [], //场景图片列表
		sceneId: '', //编辑id
		stockInNo: '',
		stockInDate: '',
		supplierId1: '',
		depotId: '',
		remark: '',
		depotList: [], //仓库列表
		money: '',
	},
	watch: {
		goodList: {
			handler(val, oldval) {
				val.forEach(function(i){
					i.money = Number(i.num)* Number(i.purchasePrice).toFixed(2)
				})
			},
			deep: true,
		}
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this
		that.getDetail();
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
		that.getDepotList();
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			//日期范围
			var stockInDate = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.stockInDate = value;
				}
			});

		});
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
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
		getDetail() {
			let that = this;
			that.loading();
			that.skipGoodsIds=[]
			$.ajax({
				type: "post",
				url: config.api_edit,
				async: true,
				data: {
					stockInId: config.id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == '00') {
						res.result.stockInGoodsSkuList = JSON.parse(JSON.stringify(res.result.stockInGoodsSkuList).replace(/stockInGoodsSkuList/g, "goodsSkuList"))
						that.goodList = res.result.stockInGoodsSkuList
						that.stockInNo = res.result.stockInNo
						that.stockInDate = res.result.stockInDate
//						that.supplierId1 = res.result.supplierId
						that.depotId = res.result.depotId
						that.remark = res.result.remark
						that.stockInId= res.result.stockInId
						that.goodList.forEach(function(i) {
							that.skipGoodsIds.push(i.goodsSkuId)
						})
						console.log(that.goodList)
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//sku商品列表
		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_attributeList,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					skipGoodsSkuIds: that.skipGoodsIds.join(','),
					pageSize: that.list.pageSize || 5,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						res.result.list.forEach(function(i){
							i.num=0
							i.money=0
						})
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
									that.now=-1
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
		// 跳转新增商品页面
		jumpToGoods() {
			let that = this
			that.now = -1
			that.getData()
			that.arr = []
			const dialog = layer.open({
				type: 1,
				title: '加入商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['95%', '85%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					console.log(that.arr)
					if(that.arr.length < 1) {
						layer.msg('请加入至少一个商品')
						return
					} else {
						that.list.list.forEach(function(i) {
							if(i.goodsSkuId == that.arr[0]) {
								layer.close(dialog)
								that.goodList.push(i)
								that.skipGoodsIds.push(i.goodsSkuId)
							}
						})
					}

				},
			});
		},
		//加入组合
		join(id, index, item) {
			let that = this
			var ind;
			that.arr = []
			that.now = index;
			that.arr.push(id)
		},
		save() {
			const that = this;
			var arr = [],picArr=[];
			var sz = 0,
				sz1 = 0;
				
			that.goodList.forEach(function(v) {
				var obj = {
					goodsSkuId: v.goodsSkuId,
					skuCode: v.skuCode,
					num: v.num,
					purchasePrice: v.purchasePrice,
				};
				arr.push(obj)
			})
			if(that.stockInNo == "") {
				layer.msg("请输入入库单号");
				return;
			}
			if(that.stockInDate == "") {
				layer.msg("请选择日期");
				return;
			}
			if(that.supplierId1 == "") {
				layer.msg("请选择供应商");
				return;
			}
			if(that.depotId == "") {
				layer.msg("请输入仓库");
				return;
			}
			that.addGroup(arr);
		},
		addGroup(arr) {
			const that = this;
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					stockInGoodsSkuList: JSON.stringify(arr),
					stockInNo: that.stockInNo,
					stockInDate: that.stockInDate,
					supplierId: that.supplierId1,
					depotId: that.depotId,
					remark: that.remark,
					stockInId:that.stockInId
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						setTimeout(function() {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
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
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//仓库列表
		getDepotList() {
			const that = this;
			$.ajax({
				url: config.api_depotList2,
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
							obj.id = res.result[i].depotId;
							obj.text = res.result[i].depotName;
							arr.push(obj);
						}
						that.depotList = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		searchGood() {
			let that = this;
			that.getData()
		},
		delGoodSku(index, id,goodsId) {
			let that = this
			var ind
			ind = that.skipGoodsIds.indexOf(goodsId)
			if(id) {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delSceneGoodsSku,
						async: true,
						type: 'post',
						data: {
							stockInId: id
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("删除成功")
								that.skipGoodsIds.splice(ind,1)
								that.goodList.splice(index, 1)
							} else {
								layer.msg(res.msg)
							}
						}
					});
				})
			} else {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					layer.close(dialog)
					layer.msg("删除成功")
					that.skipGoodsIds.splice(ind,1)
					that.goodList.splice(index, 1)
				})
			}

		},
	}
})