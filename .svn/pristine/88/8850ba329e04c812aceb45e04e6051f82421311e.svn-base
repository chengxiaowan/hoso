var config = {
	role: localStorage.userRole,
	api_supplier: api_url + '/supplier/supplierList', //供应商列表
	api_list: api_url + '/stock/stockInList', //获取列表
	api_del: api_url + '/stock/delStockIn', //删除库存入库单
	api_depotList2: api_url + '/depot/depotList2', //获取仓库
	api_auditStockIn: api_url + '/stock/auditStockIn', //审核
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
//		supplierList: [],
		supplierId: '',
		auditStatus: '',
		depotList: [], //仓库列表
		depotId: '',
	},
	created: function() {
		// console.log(this.role);
		// console.log(this.c);
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layer.config({
			extend: 'extend/layer.ext.js'
		});
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.createTimeEnd = value;
					if(value !== '') {
						startDate.config.max.year = date.year;
						startDate.config.max.month = date.month - 1;
						startDate.config.max.date = date.date;
					} else {
						startDate.config.max.year = '2099';
						startDate.config.max.month = '12';
						startDate.config.max.date = '31';
					}
				}
			});
			//日期范围
			var startDate = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.createTimeStart = value;
					if(value !== '') {
						endDate.config.min.year = date.year;
						endDate.config.min.month = date.month - 1;
						endDate.config.min.date = date.date;
					} else {
						endDate.config.min.year = '1970';
						endDate.config.min.month = '1';
						endDate.config.min.date = '1';
					}
				}
			});
		});
		that.getData();
		that.supplier(); //获取供应商
		that.getDepotList();
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
					auditStatus: that.auditStatus,
					depotId: that.depotId,
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
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
		add() {
			var index = layer.open({
				type: 2,
				title: '新增入库商品',
				content: 'wareAdd.html',
				area: ['100%', '100%']
			});
		},
		// 编辑入库单
		edit(id) {
			var index = layer.open({
				type: 2,
				title: '编辑入库单',
				content: 'wareEdit.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 入库单详情
		detail(id) {
			var index = layer.open({
				type: 2,
				title: '入库单详情',
				content: 'wareDetail.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		audit(id) {
			const that = this;
			const dialog = layer.open({
				title: "提示",
				content: '审核入库单',
				btn: ['确定', '驳回'],
				yes: function(index, layero) {
					$.get(config.api_auditStockIn, {
						stockInId: id,
						auditStatus: '1'
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.msg("操作成功")
							that.getData()
						} else {
							layer.msg(data.msg)
						}
					})
				},
				btn2: function(index, layero) {
					layer.prompt({
						title: '驳回理由',
						formType: 2
					}, function(text, index) {
						if(text == '') {
							layer.msg("请输入驳回理由")
						} else {
							$.get(config.api_auditStockIn, {
								stockInId: id,
								auditStatus: '2',
								reason: text
							}, function(data) { // 回调函数
								if(data.error == '00') {
									layer.close(index);
									layer.msg("操作成功")
									that.getData()
								} else {
									layer.msg(data.msg)
								}
							})
						}

					});
				},
				cancel: function() {
					//右上角关闭回调

					//return false 开启该代码可禁止点击该按钮关闭
				}
			});
		},
		// 删除场景
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该入库单?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					stockInId: id
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
	}
})