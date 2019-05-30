var config = {
	role: localStorage.userRole,
	api_list: api_url + '/label/dataList', //获取标签列表
	api_del: api_url + '/label/del', //删除标签
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		selected: '',
		startDate: '', // 开始时间
		endDate: '', // 结束时间
		type: 0, // 标签类型   0:其他 1: 类型标签 2:颜色标签 3:风格标签 4: 其他标签
		name: '', // 标签名称
		createTimeStart: '', // 开始时间
		postData: {},
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})

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
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					type: that.selected,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
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
									yo.scrollTo('body')
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 新增标签
		add() {
			var index = layer.open({
				type: 2,
				title: '新增标签',
				content: 'add.html',
				area: ['80%', '80%']
			});
		},
		// 编辑标签
		edit(id, name, type) {
			var index = layer.open({
				type: 2,
				title: '编辑标签',
				content: '../label/edit.html?id=' + id + '&name=' + name + '&type=' + type,
				area: ['80%', '80%']
			});
		},
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			var type = that.selected;
			var startDate = that.startDate;
			var endDate = that.endDate;
			that.getData(page, keywords, type, startDate, endDate);
		},
		// 删除标签
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该关键词?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					id: id,
					delFlag: '1'
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