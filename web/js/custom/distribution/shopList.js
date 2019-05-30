var config = {
	role: localStorage.userRole,
	api_list: api_url + '/shops/shopsApplicationList', //获取店铺申请列表
	api_info: api_url + '/shops/auditShopsApplicationInfo', //审核 --- 获取店铺详情
	api_audit: api_url + '/shops/auditShopsApplication', //审核线下店铺
	api_del: api_url + '/shops/delShopsApplication', //删除线下店铺
	api_getToken:api_url+'/qiniu/getUpToken',//获取七牛云token
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入姓名,联系方式
		selected: '',
		roleType: '', // 类型  
		postData: {},
		shopsName: '', //店铺名称
		phone: '', //联系电话
		businessHours: '', //营业时间
		address: '', //详细地址
		summary: '', //店铺简介
		logoPath: '', //店铺Logo
		startDate:'',
		endDate:'',
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
		that.getTokenMessage()
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
					createTimeStart:that.startDate,
					createTimeEnd:that.endDate,
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
		// 编辑店铺
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					shopsApplicationId: id
				},
				success(res) {
					if(res.error == '00') {
						that.shopsName = res.result.shopsName;
						that.phone = res.result.phone;
						that.businessHours = res.result.businessHours;
						that.address = res.result.address;
						that.summary = res.result.summary;
						that.remark = res.result.remark;
						that.logoPath = res.result.logoPath;
					} else {
						layer.msg(res.msg)
					}
				}
			});

			var index = layer.open({
				type: 1,
				title: '审核店铺',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.shopsName == '' || that.phone == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_audit,
						async: true,
						data: {
							shopsApplicationId:id,
							name: that.shopsName,
							phone: that.phone,
							businessHours: that.businessHours,
							address: that.address,
							summary: that.summary,
							logoPath:$("#demo1").attr('src'),
							status:1,
							userId:window.sessionStorage.getItem('userId'),
							reason:''
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('审核成功')
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
			var page = 1;
			var keywords = that.keywords;
			var type = that.roleType;
			that.getData(page, keywords, type);
		},
		// 删除店铺
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该店铺申请?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					shopsApplicationId: id,
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