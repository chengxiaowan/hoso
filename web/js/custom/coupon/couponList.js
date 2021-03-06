var config = {
	role: localStorage.userRole,
	api_list: api_url + '/coupon/couponImageBindList', //获取优惠券图片绑定列表
	api_del:  api_url + '/coupon/delCouponImageBind',//删除
	id:parameter().id
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入姓名,联系方式
		startDateLimit: '',
		endDateLimit: '',
		limitType: '',
		createTimeStart: '',
		createTimeEnd: '',
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var createTimeEnd = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.createTimeEnd = value;
					if(value !== '') {
						createTimeStart.config.max.year = date.year;
						createTimeStart.config.max.month = date.month - 1;
						createTimeStart.config.max.date = date.date;
					} else {
						createTimeStart.config.max.year = '2099';
						createTimeStart.config.max.month = '12';
						createTimeStart.config.max.date = '31';
					}
				}
			});
			//日期范围
			var createTimeStart = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.createTimeStart = value;
					if(value !== '') {
						createTimeEnd.config.min.year = date.year;
						createTimeEnd.config.min.month = date.month - 1;
						createTimeEnd.config.min.date = date.date;
					} else {
						endDcreateTimeEndate.config.min.year = '1970';
						createTimeEnd.config.min.month = '1';
						createTimeEnd.config.min.date = '1';
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

		getData: function(page) {
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
					limitType: that.limitType,
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					couponImageId:config.id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						// console.log(that.list);
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
		//新增优惠券
		add() {
			var index = layer.open({
				type: 2,
				title: '优惠券列表',
				content: 'addCouponList.html?id='+config.id,
				area: ['100%', '100%']
			});
		},
		search(){
			this.getData(1)
		},
		// 删除
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该绑定优惠券?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					couponImageBindId: id,
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