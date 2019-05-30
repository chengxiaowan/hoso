var config = {
	role: localStorage.userRole,
	api_list: api_url + '/carousel/carouselList', //获取轮播图列表
	api_del: api_url + '/carousel/del', //删除品牌
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		name: '', // 品牌名称
		postData: {},
		isZw: true,
		info: {},
		createTimeStart: '',
		createTimeEnd: '',
		type: '',
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
					type: that.type,
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						if(that.list.list.length == 0) {
							that.isZw = false
						} else {
							that.isZw = true
						}
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
		//新增轮播
		add() {
			var index = layer.open({
				type: 2,
				title: '新增',
				content: 'addBanner.html',
				area: ['100%', '100%']
			});
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
		// 删除品牌
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该轮播图?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					carouselId: id,
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
		//		编辑
		edit(id) {
			var index = layer.open({
				type: 2,
				title: '编辑',
				content: 'editBanner.html?id=' + id,
				area: ['100%', '100%']
			});
		}
	}
})