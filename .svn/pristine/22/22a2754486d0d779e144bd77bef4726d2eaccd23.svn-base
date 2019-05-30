var config = {
	role: localStorage.userRole,
	api_list: api_url + '/user/userList', //获取用户列表
	api_info: api_url + '/user/editUserInfo', //获取用户详情
	api_add: api_url + '/user/addUser', //新增用户
	api_edit: api_url + '/user/editUser', //编辑用户
	api_del: api_url + '/user/delUser', //删除用户
	api_quit: api_url + '/user/changeIsQuit', //离职
	api_roleList: api_url + '/role/roleList', //角色列表
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		keywords: '', // 名称
		isZw: true,
		list: [],
		roleList: [],
		roleId: '',
		show: false,
		form: {
			userName: '',
			name: '',
			password: '',
			password1: '',
			mobilePhone: '',
			QQ: '',
			weChatId: '',
			email: '',
			remark: '',
			roleId: '',
			radio: '0',
		}
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
					that.createTimeEnd = value;
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
					that.createTimeStart = value;
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
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		that.getData();
		that.getRole();
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
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					roleId: that.roleId,
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
		getRole() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_roleList,
				async: true,
				data: {
					roleType: '1'
				},
				success(res) {
					that.roleList = res.result
				}
			});
		},
		//新增用户
		add() {
			let that = this
			that.show = false
			that.form = {
				userName: '',
				name: '',
				password: '',
				password1: '',
				mobilePhone: '',
				email: '',
				QQ: '',
				weChatId: '',
				remark: '',
				isUrl: '0',
				roleId: ''
			}
			var index = layer.open({
				type: 1,
				title: '新增用户',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['70%', '600px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.form.userName == '' || that.form.name == '' || that.form.roleId == '' || that.form.password == '' || that.form.password1 == '' || that.form.mobilePhone == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					if(that.form.password != that.form.password1) {
						layer.msg('两次密码保持相等')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							userName: that.form.userName,
							mobilePhone: that.form.mobilePhone,
							password: that.form.password,
							name: that.form.name,
							email: that.form.email,
							remark: that.form.remark,
							weChatId: that.form.weChatId,
							QQ: that.form.QQ,
							roleId: that.form.roleId,
							isUrl: that.form.isUrl,
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
		// 修改客户
		edit(id) {
			let that = this;
			that.show = true
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					userId: id
				},
				success(res) {
					if(res.error == '00') {
						that.form = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});

			var index = layer.open({
				type: 1,
				title: '编辑用户',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['60%', '560px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.show = false) {
						if(that.form.userName == '' || that.form.name == '' || that.form.roleId == '' || that.form.password == '' || that.form.password1 == '' || that.form.mobilePhone == '') {
							layer.msg('请填写全部必填项')
							return false
						}
						if(!that.form.password) {
							layer.msg('请输入密码')
							return false
						}
						if(that.form.password != that.form.password1) {
							layer.msg('两次密码保持相等')
							return false
						}
					} else {
						if(that.form.userName == '' || that.form.name == '' || that.form.roleId == '' || that.form.mobilePhone == '') {
							layer.msg('请填写全部必填项')
							return false
						}
						
					}

					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							userId: id,
							userName: that.form.userName,
							mobilePhone: that.form.mobilePhone,
							password: that.form.password,
							name: that.form.name,
							email: that.form.email,
							remark: that.form.remark,
							QQ: that.form.QQ,
							roleId: that.form.roleId,
							isUrl: that.form.isUrl,
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
		// 删除用户
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该用户 ?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					userId: id
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getData();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 删除用户
		quit(id) {
			const that = this;
			const dialog = layer.confirm("确认离职?", {
				title: "提示"
			}, () => {
				$.get(config.api_quit, {
					userId: id
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("操作成功")
						that.getData();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
	}
})