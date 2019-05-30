var config = {
	role: localStorage.userRole,
	api_list: api_url + '/hotCustomerWish/hotCustomerWishList', //获取热门客户许愿列表
	api_add: api_url + '/hotCustomerWish/addHotCustomerWish', //新增热门客户许愿
	api_edit: api_url + '/hotCustomerWish/editHotCustomerWish', //修改热门客户许愿
	api_info: api_url + '/hotCustomerWish/editHotCustomerWishInfo', //获取热门客户许愿信息
	api_del: api_url + '/hotCustomerWish/delHotCustomerWish', // 删除热门客户许愿
	api_list1: api_url + '/customerWish/customerWishList',//许愿列表

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
		startDate1: '', // 开始日期
		endDate1: '', // 结束日期
		typeId: '', // 一级分类id
		hotList: [], // 热门商品列表
		goodsList: [], // 弹框商品列表
		sortNo: '', // 顺序号
		goodsId: '', // 商品Id
		isShow: true, // 是否显示
		now: -1,
		bg_show: false,
		pic_show: false,
		picList:[],
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
					that.startDate = value;
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

			var endDate1 = laydate.render({
				elem: '#end1', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate1 = value;
					startDate1.config.max = {
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
			var startDate1 = laydate.render({
				elem: '#start1',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startDate1 = value;
					console.log(that.startDate1);
					endDate1.config.min = {
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
					pageSize: that.hotList.pageSize || 10,
					pageNo: that.hotList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						res.result.list.forEach(function(i) {
							i.picPath = i.picPath.split(',')
						})
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
		// 许愿列表
		getGoodsList(page) {
			if(page) this.goodsList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list1,
				type: 'post',
				data: {
					keywords: that.keywords1,
					createTimeStart: that.startDate1,
					createTimeEnd: that.endDate1,
					pageSize: that.goodsList.pageSize || 10,
					pageNo: that.goodsList.pageNum || 1,
					auditStatus:1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						res.result.list.forEach(function(i) {
							i.picPath = i.picPath.split(',')
						})
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
									that.now=-1
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
		show(picPath) {
			let that = this
			that.picList = picPath;
			that.$nextTick(function() {
				var swiper = new Swiper('.swiper-container', {
					spaceBetween: 30,
					centeredSlides: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
			})
			that.bg_show = true
			that.pic_show = true
		},
		hide() {
			let that = this
			that.bg_show = false
			that.pic_show = false
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
			that.getGoodsList(page);
		},
		// 删除热门许愿
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该热门许愿?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					hotCustomerWishId: id
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
			that.customerWishId = ''
			that.keywords1=''
			that.getGoodsList(1);
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.customerWishId == "") {
						layer.msg("请选择许愿")
						return;
					}else if(that.sortNo == "") {
						layer.msg("请填写顺序号")
						return;
					}
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							customerWishId: that.customerWishId,
							sortNo: that.sortNo,
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
				},
			});
		},
		// 编辑
		edit(id) {
			const that = this;
			that.goodsList.pageNum =1
			that.goodsList.pageSize=10
			that.keywords1=''
			that.now = -1;
			$.ajax({
				type:"post",
				url:config.api_info,
				async:true,
				data:{
					hotCustomerWishId:id
				},
				success(res){
					if(res.error=='00'){
						that.sortNo = res.result.sortNo
						that.customerWishId = res.result.customerWishId
					}else{
						layer.msg(res.msg)
					}
				}
			});
			that.getGoodsList(1);
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.customerWishId == "") {
						layer.msg("请选择许愿")
						return;
					} else if(that.sortNo == "") {
						layer.msg("请填写顺序号")
						return;
					}
					$.ajax({
						url: config.api_edit,
						type: 'post',
						data: {
							hotCustomerWishId:id,
							customerWishId: that.customerWishId,
							sortNo: that.sortNo,
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
		},
		// 加入
		join(id, index) {
			const that = this;
			that.customerWishId = id;
			that.now = index;
		},
	}
})