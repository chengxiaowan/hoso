var config = {
	role: localStorage.userRole,
	api_info: api_url + '/distribution/withdrawInfo', //获取佣金提现设置信息
	api_add: api_url + '/distribution/setWithdraw', //设置佣金提现
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		skillPercent:'',
		withdrawDay:'',
		skillPercent1:'',
		withdrawDay1:'',
		show:true,
		showTr:false,
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

		getData: function() {
			$('body,html').scrollTop(0)
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_info,
				async: true,
				type: 'post',
				data: {
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						if(res.result==null){
							
						}else{
							that.show =false
							that.showTr =true
							that.skillPercent = res.result.skillPercent;
							that.withdrawDay = res.result.withdrawDay;
						}
						
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 新增标签
		add() {
			let that = this
			that.skillPercent1 = '';
			that.withdrawDate1 = '';
			var index = layer.open({
				type: 1,
				title: '佣金提现设置',
				closeBtn: 1,
				content: $('#addRule'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.skillPercent1 == '' || that.withdrawDay1 == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							skillPercent: that.skillPercent1,
							withdrawDay: that.withdrawDay1,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('设置成功')
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
		// 编辑标签
		edit(id) {
			let that = this
			that.skillPercent1 = that.skillPercent
			that.withdrawDay1 = that.withdrawDay
			var index = layer.open({
				type: 1,
				title: '编辑佣金提现设置',
				closeBtn: 1,
				content: $('#addRule'),
				area: ['40%', '40%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.skillPercent1 == '' || that.withdrawDay1 == '' ) {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							skillPercent: that.skillPercent1,
							withdrawDay: that.withdrawDay1,
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