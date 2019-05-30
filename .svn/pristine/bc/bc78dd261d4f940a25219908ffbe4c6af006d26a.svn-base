var config = {
	role: localStorage.userRole,
	api_list: api_url + '/coupon/couponList', //获取优惠券列表
	api_add: api_url + '/coupon/add', //新增优惠券
	api_info: api_url + '/coupon/editInfo', //优惠券详情
	api_edit: api_url + '/coupon/edit', ///编辑优惠券
	api_del: api_url + '/coupon/del', ///删除优惠券
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入姓名,联系方式
		selected: '',
		limitType1: '', // 类型  
		postData: {},
		name: '', //姓名
		money: '', //金额
		conditionMoney: 0, //条件金额
		timeLimit: '', //时限
		receiveTimes: '', //可领次数
		startDateLimit: '',
		endDateLimit: '',
		limitType: 0,
		timeLimit: '',
		type: 0,
		status: 0,
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

			//日期范围
			var endDateLimit = laydate.render({
				elem: '#end1', //选择器结束时间
				type: 'datetime',
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDateLimit = value;
					console.log(date)
					startDateLimit.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: date.hours,
						minutes: date.minutes,
						seconds: date.seconds
					}
				}
			});
			//日期范围
			var startDateLimit = laydate.render({
				elem: '#start1',
				type: 'datetime',
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startDateLimit = value;
					endDateLimit.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: date.hours,
						minutes: date.minutes,
						seconds: date.seconds
					};
				}
			});
		});
		that.getData();
	},
	watch: {
		'limitType': {
			immediate: false,
			handler: function(val, oldval) {
				console.log(val, oldval)
				if(val == 0) {
					this.startDateLimit = ''
					this.endDateLimit = ''
				}
				if(val == 1) {
					this.timeLimit = ''
				}
				if(val == 2) {
					this.startDateLimit = ''
					this.endDateLimit = ''
					this.timeLimit = ''
				}
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

		getData: function(page, keywords, type, startDate, endDate) {
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
					limitType: that.limitType1,
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
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
			let that = this
			that.name = ''
			that.money = ''
			that.conditionMoney = 0
			that.timeLimit = ''
			that.receiveTimes = ''
			that.endDateLimit = ''
			that.startDateLimit = ''
			that.type = 0
			that.status = 0
			that.limitType = 0
			var index = layer.open({
				type: 1,
				title: '新增优惠券',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.money == '' || that.conditionMoney == '' || that.receiveTimes == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					if(that.limitType == 0) {
						if(that.timeLimit == '') {
							layer.msg('请填写时限')
							return false
						}
					}
					if(that.limitType == 1) {
						if(that.startDateLimit == '') {
							layer.msg('请选择开始日期')
							return false
						}
						if(that.endDateLimit == '') {
							layer.msg('请选择结束日期')
							return false
						}
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							name: that.name,
							money: that.money,
							conditionMoney: that.conditionMoney,
							limitType: that.limitType,
							timeLimit: that.timeLimit,
							startDateLimit: that.startDateLimit,
							endDateLimit: that.endDateLimit,
							receiveTimes: that.receiveTimes,
							type: that.type,
							status: that.status,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('添加成功')
								layer.close(index)
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 编辑优惠券
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					couponId: id
				},
				success(res) {
					if(res.error == '00') {
						if(that.limitType == 0) {
							that.startDateLimit = ''
							that.endDateLimit = ''
						}
						if(that.limitType == 1) {
							that.timeLimit = ''
						}
						if(that.limitType == 2) {
							that.startDateLimit = ''
							that.endDateLimit = ''
							that.timeLimit = ''
						}
						that.name = res.result.name;
						that.money = res.result.money;
						that.limitType = res.result.limitType;
						that.conditionMoney = res.result.conditionMoney;
						that.timeLimit = res.result.timeLimit;
						that.receiveTimes = res.result.receiveTimes;
						that.endDateLimit = res.result.endDateLimit;
						that.startDateLimit = res.result.startDateLimit;
						that.type = res.result.type;
						that.status = res.result.status;
					} else {
						layer.msg(res.msg)
					}
				}
			});

			var index = layer.open({
				type: 1,
				title: '编辑优惠券',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.money == '' || that.conditionMoney == '' || that.receiveTimes == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					if(that.limitType == 0) {
						if(that.timeLimit == '') {
							layer.msg('请填写时限')
							return false
						}
					}
					if(that.limitType == 1) {
						if(that.startDateLimit == '') {
							layer.msg('请选择开始日期')
							return false
						}
						if(that.endDateLimit == '') {
							layer.msg('请选择结束日期')
							return false
						}
					}
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							couponId: id,
							name: that.name,
							money: that.money,
							conditionMoney: that.conditionMoney,
							limitType: that.limitType,
							timeLimit: that.timeLimit,
							startDateLimit: that.startDateLimit,
							endDateLimit: that.endDateLimit,
							receiveTimes: that.receiveTimes,
							type: that.type,
							status: that.status,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('编辑成功')
								layer.close(index)
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		search() {
			const that = this;
			that.getData(1);
		},
		manage(id) {
			var index = layer.open({
				type: 2,
				title: '商品',
				content: 'coupon_good.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 删除标签
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该优惠券?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					couponId: id,
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