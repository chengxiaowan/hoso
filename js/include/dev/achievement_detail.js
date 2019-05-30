const config = {
	id: yo.getQueryString("id"),
	type: yo.getQueryString("type"),
	role: localStorage.userRole,
	api_detail: '/yjzb/showYjzbDetail',
	api_add: '/yjzb/addOrUpdateYjzb',
}

//时间选择初始化
require(['dateTimeInit'])

require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {
				list: [],
			},
		},

		computed: {

		},
		created() {

		},

		mounted() {
			//			数据初始化
			this.list_Get();
		},

		methods: {

			//			数据初始化
			list_Get() {
				const that = this;
				$.get(config.api_detail, {
					parentId: config.id,
					type: config.type
				}, function(data) { // 回调函数
					if(data.error == '00') {
						that.c.list = data.result;
					}

				});
			},

			//保存数据
			save() {
				const that = this;
				var yjList = [];
				$("#htz_zb tr").each(function() {
					var user_id = $(this).attr('data-id')
					console.log(user_id);
					$(this).find('td input').each(function() {
						var htz = {};
						var monthOrjd = $(this).attr('data-month');
						var targetDetail = $(this).val();
						htz.userId = user_id;
						htz.monthOrjd = monthOrjd;
						htz.targetDetail = targetDetail;
						yjList.push(htz)
					})
				})
				console.log(yjList)
				yocto.json(config.api_add, {
					type: config.type,
					parentId: config.id,
					yjList: yjList
				}, {
					id: that.checks,
				}, (res) => {
					if(res.error == '00') {
						layer.close(dialog)
						layer.msg("保存成功")
					}
					//							
				})
			}

		},
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}