var config = {
	id: parameter().id,
	activityId: parameter().activityId,
	role: localStorage.userRole,
	api_list: api_url + '/activity/activityGroupShoppingCreateList', //获取拼团列表
	api_info: api_url + '/activity/activityGroupShoppingCreateInfo', // 拼团详情
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入商品名称
		startDate: '',
		endDate: '',
		info: '',
		peopleList: '',
	},
	created: function() {
		var that = this;
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
		that.getData();
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

		getData: function(page, keywords, type, startDate, endDate) {
			$('body,html').scrollTop(0)
			if(config.id == 'undefined') {
				config.id = ''
			}
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
					activityId: config.activityId,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					activityGroupShoppingGoodsId: config.id
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
		// 详情
		look(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					activityGroupShoppingCreateId: id
				},
				success(res) {
					if(res.error == '00') {
						that.info = res.result
						that.peopleList = res.result.activityGroupShoppingJoinList
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '拼团详情',
				closeBtn: 1,
				content: $('#audit'),
				area: ['85%', '75%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					layer.close(dialog)
				},
			});

		},
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			var type = that.roleType;
			that.getData(page, keywords, type);
		},
		// 订单详情
		edit(id, orderType) {
			var index = layer.open({
				type: 2,
				title: '订单详情',
				content: 'edit.html?id=' + id + "&orderType=" + orderType,
				area: ['100%', '100%']
			});
		},
	}
})