var config = {
	role: localStorage.userRole,
	api_list: api_url + '/distribution/distributorApplyList', //获取分销人员申请列表
	api_info: api_url + '/distribution/auditDistorbutorInfo', //审核 --- 获取分销人员详情
	api_audit: api_url + '/distribution/auditDistributor', ///distribution/auditDistributor
	api_del: api_url + '/distribution/delDistributorApply', ///distribution/delDistributorApply
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
		name: '', //姓名
		phone: '', //手机
		email: '', //邮箱
		wxAccount: '', //微信账号
		addRoleType: '', //类型
		remark: '', //备注
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
		// 编辑标签
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					distributorId: id
				},
				success(res) {
					if(res.error == '00') {
						that.name = res.result.name;
						that.phone = res.result.phone;
						that.email = res.result.email;
						that.wxAccount = res.result.wxAccount;
						that.addRoleType = res.result.roleType;
						that.remark = res.result.remark;
					} else {
						layer.msg(res.msg)
					}
				}
			});

			var index = layer.open({
				type: 1,
				title: '审核销售人员',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.phone == '' || that.addRoleType == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_audit,
						async: true,
						data: {
							distributorId:id,
							name: that.name,
							phone: that.phone,
							email: that.email,
							roleType: that.addRoleType,
							remark: that.remark,
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
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			var type = that.roleType;
			that.getData(page, keywords, type);
		},
		// 删除标签
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该销售人员?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					distributorId: id,
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