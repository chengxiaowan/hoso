var config = {
	role: localStorage.userRole,
	api_list: api_url + '/hotGoods/hotGoodsTypeList', //获取热门商品列表
	api_add: api_url + '/hotGoods/addHotGoodsType', //添加热门商品
	api_del: api_url + '/hotGoods/delHotGoodsType', // 删除热门商品
	api_edit: api_url + '/hotGoods/editHotGoodsType', // 修改热门商品
	api_typeList: api_url + '/type/typeList', //一级分类
	api_info: api_url + '/hotGoods/editHotGoodsTypeInfo', //详情
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		chName: '',
		enName: '',
		sysTypeId: '',
		keywords: '',
		hotList: [],
		startDate: '',
		endDate: '',
		chName: '',
		enName: '',
		typeList: '',
		sysTypeId: '',
		sortNo:''
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
		});

		that.getHotList();
		that.getTypeList();
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
			$('body,html').scrollTop(0)
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
					type: 3,
					pageSize: that.hotList.pageSize || 10,
					pageNo: that.hotList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
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

		// 获取类别
		getTypeList() {
			const that = this;
			$.ajax({
				url: config.api_typeList,
				type: 'post',
				data: {
					level: 1
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.typeList = res.result;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			that.getHotList(page);
		},
		// 删除合同
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该热门商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					hotGoodsTypeId: id
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
			that.chName = '';
			that.enName = ''
			that.sysTypeId = ''
			that.sortNo=''
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['40%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.chName == "" || that.enName == "" || that.sysTypeId == ""||that.sortNo=='') {
						layer.msg("请填入所有必选项")
						return;
					}
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							chName: that.chName,
							enName: that.enName,
							sortNo:that.sortNo,
							sysTypeId: that.sysTypeId,
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
				}
			});
		},
		edit(id) {
			const that = this;
			$.ajax({
				url: config.api_info,
				type: 'post',
				data: {
					hotGoodsTypeId: id
				},
				success: function(res) {
					if(res.error == "00") {
						that.chName = res.result.chName;
						that.enName = res.result.enName;
						that.sysTypeId = res.result.sysTypeId;
						that.sortNo = res.result.sortNo;
					} else {
						layer.msg(res.msg)
					}
				}
			});

			const dialog = layer.open({
				type: 1,
				title: '编辑',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['40%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.chName == "" || that.enName == "" || that.sysTypeId == ""||that.sortNo=='') {
						layer.msg("请填入所有必选项")
						return;
					}
					$.ajax({
						url: config.api_edit,
						type: 'post',
						data: {
							hotGoodsTypeId: id,
							chName: that.chName,
							enName: that.enName,
							sysTypeId: that.sysTypeId,
							sortNo:that.sortNo,
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("编辑成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		hot(id,typeId){
			var index = layer.open({
				type: 2,
				title: '新增热门商品',
				content: 'index.html?id='+id+'&typeId='+typeId,
				area: ['100%', '100%']
			});
		},
	}
})