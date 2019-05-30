var config = {
	api_list: api_url + '/activity/activityDateList', //获取限时购活动日期列表
	api_dataList2: api_url + '/goods/dataList2', //获取商品大列表
	api_add: api_url + '/activity/addActivityDate', //新增限时购活动日期
	api_del: api_url + '/activity/delActivityDate', //删除限时购活动日期
	api_editInfo: api_url + '/activity/editActivityDateInfo', //修改时获取信息
	api_edit: api_url + '/activity/editActivityDate', //修改
	api_list1: api_url + '/activity/activityDateTimeList', //获取限时购活动日期与时间段关系列表
	api_add1: api_url + '/activity/addActivityDateTime', //新增限时购活动日期与时间段关系
	api_editInfo1: api_url + '/activity/editActivityDateTimeInfo', //修改时获取时间段信息
	api_edit1: api_url + '/activity/editActivityDateTime', //修改时间段
	api_del1: api_url + '/activity/delActivityDateTime', //删除时间段
	id: parameter().id,
	startTime:parameter().startTime,
	endTime:parameter().endTime,
}

var vueApp = new Vue({
	el: '#app',
	data: {
		list: [], //日期裂变
		list1: [], //时间段列表
		startTime: '',
		activityDateId: '',
		startTime1: '',
		endTime1: '',
		activityDate:''
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			//日期范围
			var endTime = laydate.render({
				elem: '#end1', //选择器结束时间
				type: 'datetime',
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endTime = value;
					console.log(date)
					startTime.config.max = {
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
			var startTime = laydate.render({
				elem: '#start1',
				min: config.startTime,
				max: config.endTime, //设置一个默认最大值
				done: function(value, date) {
					that.startTime = value;
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
		//节日活动商品列表
		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					activityId: config.id,
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
		//获取时间段列表
		getData1: function(page,activityDate) {
			if(page) this.list1.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list1,
				async: true,
				type: 'post',
				data: {
					activityDateId: that.activityDateId,
					pageSize: that.list1.pageSize || 10,
					pageNo: that.list1.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						res.result.list.forEach(function(i){
							i.activityDate = activityDate
						})
						that.list1 = res.result;
						//分页
						if(that.pagi1) {
							$('.pagi1').pagination('updatePages', that.list1.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.list1.pageNum)
						} else {
							that.pagi1 = $('.pagi1').pagination({
								pages: that.list1.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list1.pageNum,
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

		// 新增日期
		addGoods() {
			let that = this
			that.startTime = ''
			const dialog = layer.open({
				type: 1,
				title: '新增日期',
				closeBtn: 1,
				content: $('#newdate'),
				area: ['40%', '30%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.startTime == ''){
						layer.msg("请填写日期")
						return
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							activityId: config.id,
							activityDate: that.startTime
						},
						success(res) {
							console.log(res.error)
							if(res.error == '00') {
								layer.msg("添加成功")
								that.getData()
								layer.close(dialog)
							} else {
								layer.msg(res.msg)
							}
						}
					});

				}
			});
		},
		// 新增时间段
		addGoods1() {
			let that = this
			that.startTime1 = ''
			that.endTime1 = ''
			const dialog = layer.open({
				type: 1,
				title: '新增时间段',
				closeBtn: 1,
				content: $('#newdate1'),
				area: ['50%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.startTime1 == ''){
						layer.msg("请填写开始时间")
						return
					}
					if(that.endTime1 == ''){
						layer.msg("请填写结束时间")
						return
					}
					if(that.startTime1.split(':')[0]>that.endTime1.split(':')[0]){
						layer.msg("开始时间不能大于结束时间")
						return
					}
					$.ajax({
						type: "post",
						url: config.api_add1,
						async: true,
						data: {
							activityDateId: that.activityDateId,
							startTime: that.startTime1,
							endTime: that.endTime1,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg("添加成功")
								that.getData1(1,that.activityDate)
								layer.close(dialog)
							} else {
								lay.msg(res.msg)
							}
						}
					});

				}
			});

		},
		//编辑日期
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_editInfo,
				async: true,
				data: {
					activityDateId: id,
				},
				success(res) {
					if(res.error == '00') {
						that.startTime = res.result.activityDate
					} else {
						lay.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑日期',
				closeBtn: 1,
				content: $('#newdate'),
				area: ['40%', '30%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							activityId: config.id,
							activityDateId: id,
							activityDate: that.startTime
						},
						success(res) {
							if(res.error == '00') {
								layer.msg("添加成功")
								that.getData(1)
								layer.close(dialog)
							} else {
								lay.msg(res.msg)
							}
						}
					});

				}
			});
		},
		//编辑时间段
		edit1(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_editInfo1,
				async: true,
				data: {
					activityDateTimeId: id,
				},
				success(res) {
					if(res.error == '00') {
						that.startTime1 = res.result.startTime
						that.endTime1 = res.result.endTime
					} else {
						lay.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '新增时间段',
				closeBtn: 1,
				content: $('#newdate1'),
				area: ['50%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.startTime1 == ''){
						layer.msg("请填写开始时间")
						return
					}
					if(that.endTime1 == ''){
						layer.msg("请填写结束时间")
						return
					}
					if(that.startTime1.split(':')[0]>that.endTime1.split(':')[0]){
						layer.msg("开始时间不能大于结束时间")
						return
					}
					$.ajax({
						type: "post",
						url: config.api_edit1,
						async: true,
						data: {
							activityDateTimeId: id,
							startTime: that.startTime1,
							endTime: that.endTime1,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg("修改成功")
								that.getData1(1,that.activityDate)
								layer.close(dialog)
							} else {
								lay.msg(res.msg)
							}
						}
					});

				}
			});

		},
		// 删除时间
		del(id) {
			let that = this;
			const dialog = layer.confirm("确认删除该日期?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					activityDateId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getData(1)
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 删除时间段
		del1(id,activityDate) {
			let that = this;
			const dialog = layer.confirm("确认删除该时间段?", {
				title: "提示"
			}, () => {
				$.get(config.api_del1, {
					activityDateTimeId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getData1(1,activityDate)
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		set(id,activityDate) {
			let that = this;
			that.activityDateId = id
			that.activityDate = activityDate
			that.getData1(1,activityDate)
			const dialog = layer.open({
				type: 1,
				title: '时间段设置',
				closeBtn: 1,
				content: $('#timelist'),
				area: ['100%', '100%'],
			});

		},
		manage(id) {
			var index = layer.open({
				type: 2,
				title: '商品管理',
				content: 'activitylist_limit1.html?id=' + id,
				area: ['100%', '100%']
			});
		},
	}
})