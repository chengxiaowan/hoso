const config = {
	id: yo.getQueryString("id"),
	type: yo.getQueryString("type"),
	index: yo.getQueryString("index"),
	role: localStorage.userRole,
	api_detail: '/yjzb/showXzDetail',
	api_role: '/yjzb/showRoleList',//岗位
	api_addOrUpdate:'/yjzb/addOrUpdateDxandTs',//修改或者更新岗位绩效
	api_del:'/yjzb/deleteById',//删除
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
			dtype: '',
			postData: {},
			saleRole: {},
		},

		computed: {

		},
		created() {

		},

		mounted() {
			const that = this;
			//			数据初始化
			this.list_Get();
			that.saleRole = that.select_init('[name=saleRole]', '请选择岗位', 1)
		},

		methods: {
			//	详情数据初始化
			list_Get() {
				const that = this;
				$.get(config.api_detail, {
					parentId: config.id,
					flag: 0
				}, function(data) { // 回调函数
					if(data.error == '00') {
						that.c.list = data.result;
					}

				});
			},
			//	新增绩效薪资
			addSalary() {
				const that = this;
				this.saleRole.val(null).trigger('change');
				$("#salaryName").val('');
				const dialog = layer.open({
					type: 1,
					title: '新增岗位绩效薪资',
					closeBtn: 1,
					content: $('#salaryBox'),
					area: ['480px', '220px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var type = $("#saleRole  option:selected").val();
						var name = $("#salaryName").val();
						that.postData.targetDetail = name;
						that.postData.userId = type;
						that.postData.parentId=config.id;
						that.postData.flag = 0;
						if(type == "") {
							layer.msg("请选择岗位")
							return;
						}
						if(name == "") {
							layer.msg("绩效薪资不能为空")
							return;
						}
						$.get(config.api_addOrUpdate, that.postData, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功") 
								that.list_Get();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//	编辑绩效薪资
			edit(el) {
				const that = this;
				$("#gangwei").val(el.name);
				const dialog = layer.open({
					type: 1,
					title: '编辑岗位绩效薪资',
					closeBtn: 1,
					content: $('#salaryBox1'),
					area: ['480px', '220px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var name = $("#salaryName1").val();
						if(name == "") {
							layer.msg("请输入绩效薪资")
							return;
						}
						that.postData.id = el.id;
						that.postData.targetDetail = name;
						
						$.get(config.api_addOrUpdate, that.postData, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("修改成功") 
								that.list_Get();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//			删除业绩目标
			del(id) {
				const that = this;
				const dialog = layer.confirm("删除该岗位绩效薪资后，该岗位的员工后续将不会享受到该绩效薪资提成，受否确定删除该岗位绩效薪资?", {
					title: "提示"
				}, () => {
					$.get(config.api_del, {
						id: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							that.list_Get()
						} else {
							layer.msg(data.msg)
						}
					})
				})
			},
			//保存数据
//			save() {
//				const that = this;
//				var yjList = [];
//				$("#htz_zb tr").each(function() {
//					var user_id = $(this).attr('data-id')
//					console.log(user_id);
//					$(this).find('td input').each(function() {
//						var htz = {};
//						var monthOrjd = $(this).attr('data-month');
//						var targetDetail = $(this).val();
//						htz.userId = user_id;
//						htz.monthOrjd = monthOrjd;
//						htz.targetDetail = targetDetail;
//						yjList.push(htz)
//					})
//				})
//				//				console.log(yjList)
//				yocto.json(config.api_add, {
//					type: config.type,
//					parentId: config.id,
//					yjList: yjList
//				}, (res) => {
//					if(res.error == '00') {
//						layer.msg("保存成功");
//						setTimeout("colseThis()", 2000)
//					}
//				})
//			},

			select_init(el, placeholder, clearbtn, roleId) {
				return $(el).select2({
					placeholder: placeholder || "请选择",
					language: 'zh-CN',
					allowClear: clearbtn || false,
					ajax: {
						url: config.api_role,
						dataType: 'json',
						type: "get",
						delay: 250,
						data: function(params) {
							return {
								type: config.type,
							};
						},
						processResults: function(data, params) {
							$.each(data.result, function() {
								this.id = this.roleId;
								this.text = this.name;
							})
							return {
								results: data.result,
								pagination: {
									more: data.result.length == 10
								}
							};
						},
						cache: true
					},
					minimumInputLength: 0
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

function colseThis() {
	var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
	parent.layer.close(index); //再执行关闭
}