var config = {
	role: localStorage.userRole,
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_list: api_url + '/activity/activityList', //获取活动 列表
	api_add: api_url + '/activity/addActivity', //新增活动
	api_info: api_url + '/activity/editActivityInfo', //活动详情
	api_edit: api_url + '/activity/editActivity', ///编辑活动
	api_del: api_url + '/activity/delActivity', ///删除活动
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入活动名称
		type: '',
		type1: '',
		createTimeStart: '',
		createTimeEnd: '',
		startTime: '',
		endTime: '',
		label: '',
		title: '',
		imageUrl:''
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
						createTimeEnd.config.min.year = '1970';
						createTimeEnd.config.min.month = '1';
						createTimeEnd.config.min.date = '1';
					}
				}
			});

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
				type: 'datetime',
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startTime = value;
					endTime.config.min = {
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
		that.getTokenMessage();
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
					type: that.type1,
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
		//新增活动
		add() {
			let that = this
			that.title = ''
			that.type = ''
			that.label = ''
			that.startTime = ''
			that.endTime = ''
			$("#demo1").attr('src','')
			var index = layer.open({
				type: 1,
				title: '新增活动',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['60%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.title == '' || that.type == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					that.imageUrl = $("#demo1").attr('src')
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							title: that.title,
							type: that.type,
							imageUrl: that.label,
							startTime: that.startTime,
							endTime: that.endTime,
							imageUrl: that.imageUrl,
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
		// 编辑活动名称
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					activityId: id
				},
				success(res) {
					if(res.error == '00') {
						that.title = res.result.title;
						that.type = res.result.type;
						that.startTime = res.result.startTime;
						that.endTime = res.result.endTime;
						$("#demo1").attr('src',res.result.imageUrl)
					} else {
						layer.msg(res.msg)
					}
				}
			});

			var index = layer.open({
				type: 1,
				title: '编辑活动',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['60%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.title == '' || that.type == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					that.imageUrl = $("#demo1").attr('src')
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							activityId: id,
							title: that.title,
							type: that.type,
							label: that.label,
							startTime: that.startTime,
							endTime: that.endTime,
							imageUrl: that.imageUrl,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('修改成功')
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
		manage(id, type,item) {
			var html,title;
			
			if(type == 1) {
				html = 'activitylist_holiday.html?id='
				title='商品管理'
			} else if(type == 2) {
				html = 'activitylist_limit.html?id='
				title='日期管理'
			}
			 else if(type == 3) {
				html = 'activitylist_good.html?id='
				title='商品管理'
			}
			var index = layer.open({
				type: 2,
				title: title,
				content: html + id+'&startTime='+item.startTime+'&endTime='+item.endTime,
				area: ['100%', '100%']
			});
		},
		// 删除标签
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该活动?", {
				activityId: "提示"
			}, () => {
				$.get(config.api_del, {
					activityId: id,
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
	}
})