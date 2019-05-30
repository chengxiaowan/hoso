const config = {
	id: yo.getQueryString("id"),
	type: yo.getQueryString("type"),
	index: yo.getQueryString("index"),
	role: localStorage.userRole,
	api_detail: '/yjzb/showYjzbDetail',
	api_add: '/yjzb/addOrUpdateYjzb',

	api_add1: '/yjzb/add', //商务顾问辞退待定指标上传
}

//时间选择初始化
require(['dateTimeInit'])

require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {
			},
			d:[],
			dtype: '',
			xinxi: false,
			xinxi_1: true,
			btn_edit: false,
			qiehuan: true,
			qiehuan1: false,
			qiehuan2: false,
			qiehuan3: false,
			y7: true,
			a:'',
			b:'',
			c:''
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
				if(config.type == 2) {
					that.qiehuan = false;
					that.qiehuan1 = true;
					that.qiehuan2 = false;
					that.y7 = true;
				} else if(config.type == 6) {
					that.qiehuan = false;
					that.qiehuan1 = false;
					that.qiehuan2 = true;
					that.y7 = true;
				} else if(config.type == 7) {
					that.qiehuan = false;
					that.qiehuan1 = false;
					that.qiehuan2 = false;
					that.qiehuan3 = true;
					that.y7 = false;
				}
				$.get(config.api_detail, {
					parentId: config.id,
					type: config.type,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						that.btn_edit = true;
						if(config.type == 7) {
							that.d = data.result;
							that.xinxi = true;
							that.xinxi_1 = false;
						} else {
							that.c = data.result;
							if(data.result[0].xinxi.length > 1) {
								that.xinxi = true;
								that.xinxi_1 = false;
							}
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
				//				console.log(yjList)
				if(config.type == 7) {
					$.get(config.api_add1, {
						parentId: config.id,
						zbA: that.a,
						zbB: that.b,
						bfzb: that.c,
					}, (res) => {
						if(res.error == '00') {
							layer.msg("保存成功");
							setTimeout("colseThis()", 2000)
						}
					})
				} else {
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
				}

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