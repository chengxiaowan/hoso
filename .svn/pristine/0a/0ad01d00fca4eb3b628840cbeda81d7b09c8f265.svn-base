var config = {
	role: localStorage.userRole,
	api_supplier: api_url + '/supplier/supplierList', //供应商列表
	api_list: api_url + '/depot/depotPlaceGoodsSkuList', //获取列表
	api_del: api_url + '/stock/delStockIn', //删除库存入库单
	api_depotList2: api_url + '/depot/depotList2', //获取仓库
	api_auditStockIn: api_url + '/stock/auditStockIn', //审核
	api_typeList: api_url + '/type/typeList2', //分类

}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		supplierList: [],
		supplierId: '',
		depotList: [], //仓库列表
		depotId: '',
		typeList1: [], //一级分类列表
		typeList2: [], //二级分类列表
		typeId1: '', //一级分类一
		typeId2: '', //一级分类2
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getData();
		that.supplier(); //获取供应商
		that.getDepotList();
		that.type1();
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
	},
	watch: {
		typeId1(val, oldVal) {
			let that = this
			that.typeId2 = ''
			that.typeList2 = []
			if(val != '') {
				$.ajax({
					url: config.api_typeList,
					async: true,
					type: 'post',
					data: {
						level: '2',
						parentId:val
					},
					success: function(res) {
						if(res.error == "00") {
							that.typeList2 = res.result
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		}
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

		getData: function(page) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					supplierId: that.supplierId,
					depotId: that.depotId,
					typeId1:that.typeId1,
					typeId2:that.typeId2,
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
		type1() {
			const that = this;
			$.ajax({
				url: config.api_typeList,
				async: true,
				type: 'post',
				data: {
					level: '1'
				},
				success: function(res) {
					if(res.error == "00") {
						that.typeList1 = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		supplier() {
			const that = this;
			$.ajax({
				url: config.api_supplier,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					if(res.error == "00") {
						var arr = [];
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
		search() {
			const that = this;
			var page = 1;
			that.getData(1);
		},
	}
})