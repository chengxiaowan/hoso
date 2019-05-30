var config = {
	role: localStorage.userRole,
	api_list: api_url + '/coupon/couponList2', //获取商品列表
	api_check: api_url + '/coupon/checkCouponImageBind', //校验
	api_add: api_url + '/coupon/addCouponImageBind', //新增
	id:parameter().id
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表1
		keywords: '', // 名称
		now: -1,
		relateId: '',
		limitType: '',
		createTimeStart: '',
		createTimeEnd: ''
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
		that.getData()
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
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
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
									that.now = -1
									that.relateId = ''
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
		//加入组合
		join(id, index, item) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_check,
				async: true,
				data: {
					couponId: id,
					couponImageId: config.id
				},
				success(res) {
					if(res.error == '00') {
						that.now = index;
						that.relateId = id
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		search() {
			let that = this
			that.now = -1
			that.relateId = ''
			this.getData(1)
		},
		save() {
			let that = this;
			if(that.relateId == '') {
				layer.msg('请选择优惠券')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					couponImageId:config.id,
					couponId: that.relateId,
				},
				success(res) {
					if(res.error == '00') {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('添加成功！');
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
	}
})