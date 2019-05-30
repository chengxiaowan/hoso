const config = {
	id: yo.getQueryString("id"),
	type: yo.getQueryString("type"),
	index: yo.getQueryString("index"),
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
			c: {},
			d: [],
			dtype: '',
			xinxi: false,
			xinxi_1: true,
			btn_edit: false,
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
			//	详情数据初始化
			list_Get() {
				const that = this;
				$.get(config.api_detail, {
					parentId: config.id,
					type: config.type,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						that.btn_edit = true;
						that.c = data.result;
						if(data.result[0].xinxi.length > 1) {
							that.xinxi = true;
							that.xinxi_1 = false;
						}

					}

				});
			},

			//保存数据
			save() {
				const that = this;
				var yjList = [];
				$("#htz_zb tr").each(function() {
					var user_id = $(this).attr('data-id')
					var conditions = $(this).find('#condition').val();
					$(this).find('td input[name=yyy]').each(function() {
						var htz = {};
						var monthOrjd = $(this).attr('data-month');
						var targetDetail = $(this).val();
						htz.userId = user_id;
						htz.conditions = conditions;
						htz.monthOrjd = monthOrjd;
						htz.targetDetail = targetDetail;
						yjList.push(htz)
					})
				})
				//				console.log(yjList)
				yocto.json(config.api_add, {
					type: config.type,
					parentId: config.id,
					yjList: yjList
				}, (res) => {
					if(res.error == '00') {
						layer.msg("保存成功");
						setTimeout("colseThis()", 2000)
					}
				})

			},
			//关闭
			cancel() {
				colseThis();
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

function colseThis() {
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭
}