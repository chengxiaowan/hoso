var config = {
	role: localStorage.userRole,
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_list: api_url + '/coupon/couponImageInfo', //获取热门商品列表
	api_add: api_url + '/coupon/setCouponImage', //添加热门场景
	api_info: api_url + '/coupon/couponImageInfo', //获取热门场景信息

}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		status:1,
		imageUrl:'',
		aa:false,
		state:'',
		id:'',
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getHotList();
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
		// 获取热门列表
		getHotList: function() {
			let that = this
			that.loading();
			$.ajax({
				url: config.api_list,
				type: 'post',
				data: {
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						if(res.result != null){
							that.aa=true
							that.imageUrl = res.result.imageUrl
							that.status = res.result.status
							that.id = res.result.couponImageId
						}else{
							that.aa=false
						}
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
			var name = that.name;
			var startDate = that.startDate;
			var endDate = that.endDate;
			that.getHotList(page, name, startDate, endDate);
		},
		// 删除
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该热门商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					hotArticleId: id
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
			that.status = 1
			$("#demo1").attr('src','')
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					that.imageUrl = $("#demo1").attr('src')
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							imageUrl: that.imageUrl,
							status: that.status,
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
				},
				cancel(){
				}
			});
		},
		// 编辑
		edit(id) {
			const that = this;
			$.ajax({
				type:"post",
				url:config.api_info,
				async:true,
				data:{
				},
				success(res){
					if(res.error=='00'){
						$("#demo1").attr('src',res.result.imageUrl)
						that.status = res.result.status
					}else{
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							imageUrl: $("#demo1").attr('src'),
							status: that.status,
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
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
		bind() {
			let  that = this
			var index = layer.open({
				type: 2,
				title: '已绑定优惠券列表',
				content: 'couponList.html?id='+that.id,
				area: ['100%', '100%']
			});
		},
	}
})