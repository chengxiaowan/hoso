var config = {
	role: localStorage.userRole,
	id: parameter().id,
	api_list: api_url + '/goods/dataList2', //获取品牌列表
	api_add: api_url + '/goodsGroup/edit', //编辑保存增商品组合,
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/goods/dataList', //获取商品大列表
	api_goodsSku: api_url + '/goodsSku/dataList2', //获取sku
	api_edit: api_url + '/goodsGroup/editInfo', //获取详情
	api_delGoodsGroupGoods: api_url + '/goodsGroup/delGoodsGroupGoods', //删除商品组合商品
	api_delGoodsGroupGoodsSku: api_url + '/goodsGroup/delGoodsGroupGoodsSku', //删除商品组合商品
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		title: '',
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
		goodList1: [], //goodList1,
		isgo: true,
		goodsGroupId: '',
		arr1: [], //记忆添加id
		arr2: [], //记忆删除id
		skipGoodsIds: [],
		now: -1, //加入当前选中状态
		num:''
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
		that.getDetail();

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
			$.ajax({
				type: "post",
				url: config.api_edit,
				async: true,
				data: {
					goodsGroupId: config.id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == '00') {
						res.result.goodsGrouoGoodsList = JSON.parse(JSON.stringify(res.result.goodsGrouoGoodsList).replace(/goodsGroupGoodsSkuList/g, "goodsSkuList"))
						that.goodList = res.result.goodsGrouoGoodsList
						that.goodList1 = res.result.goodsGrouoGoodsList
						that.title = res.result.title
						that.goodsGroupId = res.result.goodsGroupId
						that.goodList.forEach(function(i) {
							that.skipGoodsIds.push(i.goodsId)
						})
						that.getData(1);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getData: function(page, keywords) {
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
					skipGoodsIds: that.skipGoodsIds.join(','),
					pageSize: that.list.pageSize || 5,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						for(var i = 0; i < res.result.list.length; i++) {
							res.result.list[i].isShow = false
						}
						that.goodList.forEach(function(i) {
							var goodsId = i.goodsId;
							res.result.list.map(function(v) {
								v.goodsGroupGoodsId = i.goodsGroupGoodsId
								if(goodsId == v.goodsId) {
									v.isShow = true
									that.arr.push(v.goodsId) //一类产品初始赋值
								}
							})
						})
						console.log(res.result.list, that.arr)
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
			let that = this;
			that.skipGoodsIds = []
			that.now = -1
			that.arr = []
			that.num=''
			that.goodList.forEach(function(i) {
				that.skipGoodsIds.push(i.goodsId)
			})
			that.getData()
			that.list.list.forEach(function(i) {
				that.arr.forEach(function(v) {
					if(i.goodsId == v) {
						i.isShow = true
					}
				})
			})
			const dialog = layer.open({
				type: 1,
				title: '加入商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.arr.length < 1) {
						layer.msg('请加入至少一个商品')
						return
					}else if(that.num=='') {
						layer.msg('请输入数量')
						return
					} else {
						that.loading();
						$.ajax({
							type: "post",
							url: config.api_goodsSku,
							data: {
								goodsId: that.arr.join(','),
								num:that.num
							},
							success: function(res) {
								that.loading('close')
								layer.close(dialog)
								that.arr1 = []
								if(res.error == '00') {
									that.goodList.push(res.result)
								} else {
									layer.msg(res.msg)
								}
							},
						});
					}

				}
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
			// console.log(1);
			const that = this;
			var title = that.title;
			var arr = [];
			var sz=0,sz1=0;
			that.goodList.forEach(function(v) {
				var obj = {
					goodsId: v.goodsId,
					num: v.num,
					goodsGroupGoodsId: v.goodsGroupGoodsId||'',
					goodsGroupGoodsSkuList: []
				};
				v.goodsSkuList.map(function(i) {
					obj.goodsGroupGoodsSkuList.push({
						goodsSkuId: i.goodsSkuId,
						preferentialPrice: i.preferentialPrice,
						goodsGroupGoodsSkuId: i.goodsGroupGoodsSkuId||''
					})
				});
				arr.push(obj)
			})
			if(title == "") {
				layer.msg("请填写组合名称");
				return;
			}
			console.log(arr)
			arr.forEach(function(v) {
				v.goodsGroupGoodsSkuList.map(function(h) {
					sz++
					if(h.preferentialPrice == '' || h.preferentialPrice==undefined ) {
						console.log('11')
						that.isgo = false
						return;
					} else {
						that.isgo = true
						sz1++
					}
				})
			})
			console.log(that.isgo)
			if(sz!=sz1) {
				layer.msg("请填写全部商品优惠价");
				return;
			}
			that.addGroup(arr);
			
		},
		addGroup(arr) {
			const that = this;
			that.loading();
			console.log(arr)
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					goodsGroupGoodsList: JSON.stringify(arr),
					title: that.title,
					goodsGroupId: that.goodsGroupId
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
		searchGood() {
			let that = this;
			that.now=-1
			that.getData()
		},
		delGood(index, id, item) {
			let that = this
			var ind, ind1;
			if(id) {
				const dialog = layer.confirm("确认删除该商品组合吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delGoodsGroupGoods,
						async: true,
						type: 'post',
						data: {
							goodsGroupGoodsId: id
						},
						success: function(res) {
							if(res.error == "00") {
								that.goodList.splice(index, 1)
								ind = that.arr.indexOf(id)
								that.arr.splice(ind, 1)
								layer.close(dialog)
								layer.msg("删除成功")
							} else {
								layer.msg(res.msg)
							}
						}
					});

				})
			} else {
				const dialog = layer.confirm("确认删除该商品组合吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					layer.close(dialog)
					layer.msg("删除成功")
					that.goodList.splice(index, 1)
					ind = that.arr.indexOf(item.goodsId)
					that.arr.splice(ind, 1)
				})
			}

			console.log(that.list.list)
		},
		delGoodSku(index, id,index1) {
			let that = this
			if(id) {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delGoodsGroupGoodsSku,
						async: true,
						type: 'post',
						data: {
							goodsGroupGoodsSkuId: id
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("删除成功")
								that.goodList[index].goodsSkuList.splice(index1, 1)
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
					that.goodList[index].goodsSkuList.splice(index1, 1)
				})
			}

		}

	}
})