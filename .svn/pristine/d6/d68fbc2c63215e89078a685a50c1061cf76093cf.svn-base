var config = {
	role: localStorage.userRole,
	api_list: api_url + '/hotGoods/hotGoodsList', //获取热门商品列表
	api_add: api_url + '/hotGoods/addHotGoods', //添加热门商品
	api_del: api_url + '/hotGoods/delHotGoods', // 删除热门商品
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_typeList: api_url + '/type/typeList', //获取类别列表
	api_goodsList: api_url + '/goods/dataList2', //获取商品列表
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	id: parameter().id,
	typeId: parameter().typeId,
	api_edit:api_url+'/hotGoods/editHotGoods',
	api_info:api_url+'/hotGoods/editHotGoodsInfo',
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		name: '', // 搜索关键词
		keywords: '', // 搜索关键词
		keywords1: '', // 搜索关键词
		startDate: '', // 开始日期
		endDate: '', // 结束日期
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		brandId: '', // 品牌id
		supplierId: '', // 供应商id
		typeId: '', // 一级分类id
		hotList: [], // 热门商品列表
		goodsList: [], // 弹框商品列表
		sortNo: '', // 顺序号
		now: -1,
		isShow: true, // 是否显示
		goodsId: '', // 商品Id
		imageUrl: '', // 图片
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate = value;
					startDate.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				}
			});
			//日期范围
			var startDate = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startDate = value;
					console.log(that.startDate);
					endDate.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}
			});
		});

		that.getHotList();
		that.getTokenMessage()
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
		// 获取热门列表
		getHotList: function(page, name, startDate, endDate) {
			$('body,html').scrollTop(0)
			if(page) this.hotList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				type: 'post',
				data: {
					keywords: that.keywords,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
					hotGoodsTypeId: config.id,
					pageSize: that.hotList.pageSize || 10,
					pageNo: that.hotList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.hotList = res.result;
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.hotList.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.hotList.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								// pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.hotList.pageNum,
								onSelect: function(num) {
									that.hotList.pageNum = num
									that.getHotList()
								}
							})
						}
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
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
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
		// 获取类别
		getTypeList() {
			const that = this;
			$.ajax({
				url: config.api_typeList,
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
		// 获取品牌
		getBrandList() {
			const that = this;
			$.ajax({
				url: config.api_brandList,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						for(var i in res.result) {
							var obj = {};
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
		// 获取商品
		getGoodsList(page, name, typeId, supplierId, brandId) {
			if(page) this.goodsList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_goodsList,
				type: 'post',
				data: {
					keywords: that.keywords1,
					typeId: config.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					pageSize: that.goodsList.pageSize || 10,
					pageNo: that.goodsList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.goodsList = res.result;
						//分页
						if(that.pagi1) {
							$('.pagi1').pagination('updatePages', that.goodsList.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.goodsList.pageNum)
						} else {
							that.pagi1 = $('.pagi1').pagination({
								pages: that.goodsList.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.goodsList.pageNum,
								onSelect: function(num) {
									that.goodsList.pageNum = num
									that.getGoodsList();
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var name = that.name;
			var startDate = that.startDate;
			var endDate = that.endDate;
			that.getHotList(page, name, startDate, endDate);
		},
		// 弹框搜索
		searchHotGoods() {
			const that = this;
			var page = 1,
				keywords = that.keywords,
				typeId = that.typeId,
				supplierId = that.supplierId,
				brandId = that.brandId;
			that.getGoodsList(page, keywords, typeId, supplierId, brandId);
		},
		// 删除合同
		del(id, hotGoodsId) {
			const that = this;
			const dialog = layer.confirm("确认删除该热门商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					goodsId: id,
					hotGoodsId: hotGoodsId
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getHotList();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 新增
		add() {
			const that = this;
			that.now = -1;
			that.sortNo = ''
			that.goodsId = ''
			that.keywords1 = ''
			that.typeId = ''
			that.supplierId = ''
			that.brandId = ''
			that.getSupplierList();
			that.getTypeList();
			that.getBrandList();
			that.getGoodsList();
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var goodsId = that.goodsId,
						sortNo = that.sortNo;
					that.imageUrl = $("#demo1").attr('src')
					console.log($("#demo1").attr('src'))
					if(that.goodsId == "") {
						layer.msg("请选择商品")
						return;
					} else if(sortNo == "") {
						layer.msg("请填写顺序号")
						return;
					}
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							hotGoodsTypeId: config.id,
							goodsId: that.goodsId,
							sortNo: that.sortNo
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("添加成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 加入
		join(id, index) {
			const that = this;
			that.goodsId = id;
			that.now = index;
		},
		getTokenMessage() {
			let that = this
			$.ajax({
				url: config.api_getToken,
				type: 'POST',
				data: {},
				cache: false,
				contentType: false, //不可缺
				processData: false, //不可缺
				success: function(data) {
					var obj = data;
					uploaderReady(obj);
				}
			});
		},
		edit(id) {
			const that = this;
			that.now = -1;
			that.keywords1 = ''
			that.typeId = ''
			that.supplierId = ''
			that.brandId = ''
			$.ajax({
				type:"post",
				url:config.api_info,
				async:true,
				data:{
					hotGoodsId:id
				},
				success(res){
					if(res.error=='00'){
						that.sortNo = res.result.sortNo
						that.goodsId = res.result.goodsId
					}else{
						layer.msg(res.msg)
					}
				}
			});
			
			that.getSupplierList();
			that.getTypeList();
			that.getBrandList();
			that.getGoodsList();
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var goodsId = that.goodsId,
						sortNo = that.sortNo;
					that.imageUrl = $("#demo1").attr('src')
					if(that.goodsId == "") {
						layer.msg("请选择商品")
						return;
					} else if(sortNo == "") {
						layer.msg("请填写顺序号")
						return;
					}
					$.ajax({
						url: config.api_edit,
						type: 'post',
						data: {
							hotGoodsId:id, 
							hotGoodsTypeId: config.id,
							goodsId: that.goodsId,
							sortNo: that.sortNo
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		}
	}
})