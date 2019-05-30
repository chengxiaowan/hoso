var config = {
	role: localStorage.userRole,
	api_detail: api_url + '/customer/customerInfo', //用户信息
	id: parameter().id,
	api_saleList: api_url + '/saleOrder/dataList', //获取订单列表
	api_goodsSkuList: api_url + '/customerShoppingCart/goodsSkuList', //购物车列表
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		c: {},
		customerAddressList: [],
		isZw:false,
		isZw1:false,
		list1: [], // 购物车列表
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getDetail()
		that.getSaleList();
		that.getData1();
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

		tab(type) {
			let that = this
		},
		getSaleList: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_saleList,
				async: true,
				type: 'post',
				data: {
					customerId: config.id,
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
									that.getSaleList()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getData1: function(page, keywords) {
			if(page) this.list1.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_goodsSkuList,
				async: true,
				type: 'post',
				data: {
					customerId: config.id,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list1 = res.result;
						if(that.list.list.length == 0) {
							that.isZw1 = false
						} else {
							that.isZw1 = true
						}
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.list1.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.list1.pageNum)
						} else {
							that.pagi = $('.pagi1').pagination({
								pages: that.list1.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list.pageNum,
								onSelect: function(num) {
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
		getDetail() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_detail,
				data: {
					customerId: config.id
				},
				async: true,
				success(res) {
					if(res.error == '00') {
						that.c = res.result
						that.customerAddressList = res.result.customerAddressList
					} else {
						layer.msg(res.msg)
					}

				}
			});
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