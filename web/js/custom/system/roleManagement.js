var config = {
	role: localStorage.userRole,
	api_list: api_url + '/role/roleList2', //获取角色列表
	api_info: api_url + '/role/editRoleInfo', //获取角色详情
	api_add: api_url + '/role/addRole', //新增角色
	api_edit: api_url + '/role/editRole', //编辑用角色
	api_del: api_url + '/role/delRole', //删除角色
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		keywords: '', // 名称
		roleType:'',
		roleType1:'',
		roleName:'',
		list:{}
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
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
					roleType: that.roleType,
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
		//新增角色
		add() {
			let that = this
			that.roleType1 =''
			that.roleName=''
			var index = layer.open({
				type: 1,
				title: '新增角色',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['60%', '300px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.roleType1 == '' || that.roleName == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							roleType:that.roleType1,
							roleName:that.roleName
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
		// 修改角色
		edit(id) {
			let that = this;
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					roleId: id
				},
				success(res) {
					if(res.error == '00') {
						that.roleType1 = res.result.roleType
						that.roleName = res.result.roleName
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
				area: ['60%', '300px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.roleType1 == '' || that.roleName == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							roleId:id,
							roleType:that.roleType1,
							roleName:that.roleName
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
		// 删除角色
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该角色 ?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					roleId: id
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
					roleId: id
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