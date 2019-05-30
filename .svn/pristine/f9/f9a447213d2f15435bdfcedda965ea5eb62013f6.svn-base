const config = {
	isKhGh: yo.getQueryString("isKhGh") || 0, //0,客户公海,2潜在客户,3有意向公海,1无意向公海,4大客户公海
	role: localStorage.userRole,
	api_yjzb: '/yjzb/addYjzb', //业绩指标
	api_showSaleCustomer: '/yjzb/showYjzbList', //获取指标标题列表
	api_del: "/yjzb/deleteYjzb", //删除指标

	api_jxxz: "/yjzb/addJxxz", //新增绩效薪资
	api_yjxzList: "/yjzb/showYjxzList", //业绩薪资列表
	api_deleteyjxz: "/yjzb/deleteYjxz", //删除业绩薪资,

	htz_gw: [], //员工列表

	api_money: "/yjzb/showXzDetail", //底薪和特殊员工列表
	api_del_other: '/yjzb/deleteById', //删除底薪和特殊员工

	api_addOrUpdate: '/yjzb/addOrUpdateDxandTs', //修改更新薪资

	api_showRoleListByFdzb: '/yjzb/showRoleListByFdzb', //根据分档指标获取岗位 
	api_addOrUpdateTcgz: '/yjzb/addOrUpdateTcgz', //新增修改提成规则
	api_tcgzList: '/yjzb/showTcgzList', //提成规则列表
	api_deleteTcgzById: '/yjzb/deleteTcgzById', //删除提成规则
	api_tcgzDetail: '/yjzb/findById', //提成详情;
	api_dkje: '/yjzb/getMoneyByUserId', //根据ID获取到款金额
	api_dktcgw: '/yjzb/getDktcGw?flag=0', //获取到款提成岗位
	api_dktcgw1: '/yjzb/getDktcGw?flag=1&roleId=' //获取到款提成岗位

}
//时间选择初始化
require(['dateTimeInit'])

if(config.role == '销售精英' || config.role == '经理') {
	config.isKhGh = 4
}
require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			c: {
				list: [],
			},
			d: {
				list: [],
			},
			dixin: {
				list: [],
			},
			teshu: {
				list: [],
			},
			swgwList: {
				list: [],
			},
			dxswgwList: {
				list: [],
			},
			postDataswgwList:{},
			ind: 1,
			role: config.role,
			isKhGh: config.isKhGh,
			type: 0,
			postData: {},
			postData1: {},
			postData2: {},
			postRule: {},
			postDktc: {},
			postdxswgw: {},
			rule: {
				ruleName: '', //规则名称
				ruleList: '', //提成规则
				ruleBracket: '', //分档指标
				ruleBonus: '', //提成指标
				ruleJob: '', //提成岗位
				job: [], //岗位列表
				list: [], //提成规则列表
				ruleBracket1: '',
				ruleJob1: '',
				job1: [],
				list1: [], //到款提成列表
				ruleBracket2: '',
				ruleJob2: '',
				job2: [],
			},
			dxswgw: {
				ruleName: '', //规则名称
				ruleList: '', //提成规则
				ruleBracket: '', //分档指标
				ruleBonus: '', //提成指标
				ruleJob: '', //提成岗位
				job: [], //岗位列表
				list: [], //提成规则列表
				ruleBracket1: '',
				ruleJob1: '',
				job1: [],
				list1: [], //到款提成列表
				ruleBracket2: '',
				ruleJob2: '',
				job2: [],
			},
			checkAll: 0,
			checks: [],
			posting: false, //是否正在上传数据
			hoverParam: '', //鼠标覆盖项目
			editParam: '', //正在编辑的项目
			oldData: '', //编辑项目的旧值
			s: {
				lastSaleName: {},
				lastSaleName1: {},
				lastSaleName2: {},
				lastSaleName3: {},
				name: '',
				gwName: '',
				dkName: '',
				job: [],
				jobName: [],
			},
			select2: {
				saleId: {},
			},
			saleFollowMode: 1, //写跟进弹框状态
			htz_gw: [],

			htz_tczb: true, //提成规则弹窗-提成指标状态
			htz_table: {
				dhl: false,
				khs: false,
				zg: false,
				qdl: false,
				bfl: false,
				fdzb: [], //分档指标
				tc: [], //支撑
			}, //提成种类
			jobName: '提成岗位',
			kind: '',
			//编辑模式
			hoverEl: {
				name: {
					show: 0,
					el: {}
				},
				linkmanLandline: {
					show: 0,
					el: {}
				},
				linkmanMobilePhone: {
					show: 0,
					el: {}
				},
				email: {

				},
				postion: {
					show: 0,
					el: {}
				},
				linkmanName: {
					show: 0,
					el: {}
				},
				remark: {
					show: 0,
					el: {}
				}
			},
			editEl: {
				show: '',
				el: {},
				oldValue: ""
			},
			newYear: new Date().getFullYear().toString(),
			aType: '',
			newYear1: new Date().getFullYear().toString(),
			newYear2: ''

		},
		watch: {
			'rule.ruleJob1': function(val) {
				if(val != '') {
					$.get(config.api_dkje, {
						userId: val
					}, function(data) {
						$(".dkje").val(data.result.targetDetail);
					})
				} else {

				}
				$(".dkje").val('0');
			},
		},
		computed: {},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
		},

		mounted() {
			const that = this;
			//获取列表
			this.list_Get();
			this.changeSale();
			laydate.render({
				elem: '#newYear',
				type: 'year',
				done: function(value, date) {
					that.newYear = value;
				}
			});
			laydate.render({
				elem: '#newYear1',
				type: 'year',
				done: function(value, date) {
					that.newYear1 = value;
				}
				
			});
			laydate.render({
				elem: '#newYear2',
				type: 'year',
				done: function(value, date) {
					that.newYear2 = value;
				}
			});
			laydate.render({
				elem: '#year',
				type: 'year',
				done: function(value, date) {
					that.year = value;
				}
			});

		},
		directives: {
			focus: {
				inserted(el) {
					el.focus();
				}
			}
		},
		methods: {
			//重置
			reset() {
				this.s.lastSaleName.val(null).trigger('change');
			},
			reset1() {
				this.s.lastSaleName1.val(null).trigger('change');
			},
			//	新增业绩目标
			addAchievement() {
				const that = this;
				$('#year').val('')
				$("#achievementType").val('0');
				const dialog = layer.open({
					type: 1,
					title: '新增业绩指标',
					closeBtn: 1,
					content: $('#achievementBox'),
					area: ['480px', '220px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var year = $('#year').val();
						var type = $("#achievementType  option:selected").val();
						that.postData.year = year;
						that.postData.type = type
						if(year == "") {
							layer.msg("请选择年度")
							return;
						}
						$.get(config.api_yjzb, that.postData, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//			编辑业绩目标
			customer_edit(el) {
				var name;
				if(el.type == 0) {
					name = '电销电话量指标'
				} else if(el.type == 1) {
					name = '电销意向客户数指标'
				} else if(el.type == 2) {
					name = '商务顾问到款任务指标'
				} else if(el.type == 3) {
					name = '商务顾问合同数量指标'
				} else if(el.type == 4) {
					name = '商务顾问订单金额指标'
				} else if(el.type == 5) {
					name = '商务顾问拜访量指标'
				} else if(el.type == 6) {
					name = '运作到款任务'
				} else if(el.type == 7) {
					name = '商务顾问辞退待定指标'
				} else if(el.type == 8) {
					name = '电销商务顾问客户约访数'
				} else if(el.type == 9) {
					name = '电销商务顾问客户签约数'
				} else if(el.type == 10) {
					name = '电销商务顾问订单标的金额'
				}

				var index = layer.open({
					type: 2,
					title: el.year + '年度' + name,
					closeBtn: 1,
					content: 'achievement_edit.html?id=' + el.id + '&type=' + el.type + '&index=' + index,
					area: ['100%', '100%']
				});

			},
			//			删除业绩目标
			del(id) {
				const that = this;
				const dialog = layer.confirm("删除该业绩指标后，该业绩指标的考核方案同样删除，是否确定删除该业绩指标?", {
					title: "提示"
				}, () => {
					$.get(config.api_del, {
						parentId: id
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
			//新增商务顾问提成规则设置
			s1() {
				const that = this;
				$('#newYear2').val('')
				$("#h1").val('0');
				const dialog = layer.open({
					type: 1,
					title: '新增商务顾问提成规则设置',
					closeBtn: 1,
					content: $('#s1'),
					area: ['480px', '220px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var year = $('#newYear2').val();
						var type = $(".hello  option:selected").val();
						that.postData.year = year;
						that.postData.type = type
						if(year == "") {
							layer.msg("请选择年度")
							return;
						}
						$.get(config.api_yjzb, that.postData, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_GetSwgw();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
            //删除商务顾问提成规则设置
			del_sw(id) {
				const that = this;
				const dialog = layer.confirm("删除该提成规则，员工不再享有提成，是否确定删除该提成规则?", {
					title: "提示"
				}, () => {
					$.get(config.api_del, {
						parentId: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							that.list_GetSwgw()
						} else {
							layer.msg(data.msg)
						}
					})
				})
			},
			//			编辑业绩目标
			customer_editSw(el) {
				var name;
				if(el.type == 11) {
					name = '拜访量'
				} else if(el.type == 12) {
					name = '签单量'
				} 

				var index = layer.open({
					type: 2,
					title: el.year + '年度' + name,
					closeBtn: 1,
					content: 'achievementsw_edit.html?id=' + el.id + '&type=' + el.type + '&index=' + index,
					area: ['100%', '100%']
				});

			},
			//	新增绩效薪资
			addSalary() {
				const that = this;
				$("#salaryType").val('0');
				$("#salaryName").val('');
				const dialog = layer.open({
					type: 1,
					title: '新增业绩指标',
					closeBtn: 1,
					content: $('#salaryBox'),
					area: ['480px', '220px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var type = $("#salaryType  option:selected").val();
						var name = $("#salaryName").val();
						that.postData.name = name;
						that.postData.type = type
						if(name == "") {
							layer.msg("请输入绩效名称")
							return;
						}
						$.get(config.api_jxxz, that.postData, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get1();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//			删除业绩薪资
			del_xz(id) {
				const that = this;
				const dialog = layer.confirm("删除该绩效薪资后，员工后续将不会享受到该绩效薪资提成，是否确定删除该绩效薪资?", {
					title: "提示"
				}, () => {
					$.get(config.api_deleteyjxz, {
						parentId: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							that.list_Get1()
						} else {
							layer.msg(data.msg)
						}
					})
				})
			},
			//删除底薪和特殊员工
			del_other(id) {
				const that = this;
				const dialog = layer.confirm("删除该员工的底薪后，该员工不再享有基础薪资，是否确定删除该员工的底薪?", {
					title: "提示"
				}, () => {
					$.get(config.api_del_other, {
						id: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							that.list_Get2()
						} else {
							layer.msg(data.msg)
						}
					})
				})
			},
			//删除提成规则
			deltc(id, bz) {
				const that = this;
				const dialog = layer.confirm("删除该提成规则，员工不再享有提成，是否确定删除该提成规则?", {
					title: "提示"
				}, () => {
					$.get(config.api_deleteTcgzById, {
						id: id
					}, function(data) { // 回调函数
						if(data.error == '00') {
							layer.close(dialog)
							layer.msg("删除成功")
							if(bz == 3) {
								that.list_Get4();
							} else if(bz == 5){
								that.list_Getdxswgw();
							}else {
								that.list_Get5();
							}

						} else {
							layer.msg(data.msg)
						}
					})
				})
			},
			//	编辑绩效薪资
			Salary_edit(el) {
				var name;
				if(el.type == 0) {
					name = '电销绩效薪资'
				} else if(el.type == 1) {
					name = '团队管理绩效薪资'
				} else if(el.type == 2) {
					name = '商务顾问浮动薪资'
				}

				var index = layer.open({
					type: 2,
					title: name,
					closeBtn: 1,
					content: 'achievement_jxxz.html?id=' + el.id + '&type=' + el.type,
					area: ['100%', '100%']
				});

			},
			//	新增底薪
			adddixin() {
				const that = this;
				this.s.lastSaleName.val(null).trigger('change');
				$(".yggw").val('')
				$("#dixin").val('');
				const dialog = layer.open({
					type: 1,
					title: '新增底薪',
					closeBtn: 1,
					content: $('#dixinBox'),
					area: ['480px', '270px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var userId = $("#salechange").val();
						var targetDetail = $("#dixin").val();
						that.postData1.userId = userId
						that.postData1.targetDetail = targetDetail;
						that.postData1.flag = 1
						if(userId == "") {
							layer.msg("请输入员工姓名")
							return;
						}
						if(targetDetail == "") {
							layer.msg("请输入薪资")
							return;
						}
						$.get(config.api_addOrUpdate, that.postData1, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.postData1.userId = ''
								that.postData1.targetDetail = ''
								that.list_Get2();

							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//修改底薪
			dixi_edit(el) {
				const that = this;
				$(".xgsale").val(el.name);
				$(".xgsaleJob").val(el.roleName);
				$("#xgdixin").val(el.targetDetail);
				const dialog = layer.open({
					type: 1,
					title: '新增底薪',
					closeBtn: 1,
					content: $('#xgdixinBox'),
					area: ['480px', '270px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var targetDetail = $("#xgdixin").val();
						that.postData1.id = el.id
						that.postData1.targetDetail = targetDetail;
						if(targetDetail == "") {
							layer.msg("请输入薪资")
							return;
						}
						$.get(config.api_addOrUpdate, that.postData1, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get2();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//	新增特殊员工
			addteshu() {
				const that = this;
				this.s.lastSaleName1.val(null).trigger('change');
				$(".tsyggw").val('');
				$("#tcbl").val('');
				const dialog = layer.open({
					type: 1,
					title: '新增特殊员工提成',
					closeBtn: 1,
					content: $('#teshuBox'),
					area: ['480px', '270px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var userId = $("#tssalechange").val();
						var targetDetail = $("#tcbl").val();
						that.postData2.userId = userId
						that.postData2.targetDetail = targetDetail;
						that.postData2.flag = 2
						if(userId == "") {
							layer.msg("请输入员工姓名")
							return;
						}
						if(targetDetail == "") {
							layer.msg("请输入提成比例")
							return;
						}
						$.get(config.api_addOrUpdate, that.postData2, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.postData2.userId = ''
								that.postData2.targetDetail = ''
								that.list_Get3();

							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			//修改特殊员工
			teshu_edit(el) {
				const that = this;
				$(".xgsale1").val(el.name);
				$(".xgsaleJob1").val(el.roleName);
				$("#xgdixin1").val(el.targetDetail);
				const dialog = layer.open({
					type: 1,
					title: '修改特殊员工提成',
					closeBtn: 1,
					content: $('#xgdixinBox1'),
					area: ['480px', '270px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var targetDetail = $("#xgdixin1").val();
						that.postData1.id = el.id
						that.postData1.targetDetail = targetDetail;
						if(targetDetail == "") {
							layer.msg("请输入提成比例")
							return;
						}
						$.get(config.api_addOrUpdate, that.postData1, function(data) { // 回调函数
							if(data.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get3();
							} else {
								layer.msg(data.msg)
							}

						});
					}
				});
			},
			/**
			 * 载入中方法
			 * 
			 * @param {string} s 是否关闭
			 */
			loading(s) {
				if(s == "close") layer.close(this.loadingSwitch)
				else this.loadingSwitch = layer.load(3);
				// else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
			},
			//切换
			tab(num) {
				const that = this;
				if(num == 1) {
					that.list_Get();
				}
				if(num == 2) {
					that.list_Get1();
				}
				if(num == 3) {
					that.list_Get4();
				}
				if(num == 4) {
					that.list_Get5();
					that.dkjob();
					$("select[name=saleName]").val('')
				}
				if(num == 5) {
					this.s.gwName = '';
					this.s.dkName = '';
					that.list_Get2();
					that.kind = ''
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', that.kind, 1)
				}
				if(num == 6) {
					that.list_Get3();
					that.kind = 'fbe6f2f9535c4fce9f024f6cb999b2bd';
					this.s.lastSaleName1 = this.select_init('[name=saleName1]', '请选择员工', that.kind, 1)
				}
				if(num ==7){
					that.list_Getdxswgw();
				}
				if(num ==8){
					that.list_GetSwgw();
				}
			},
			//搜索
			search() {
				this.postData1.userId = $(".searchName_1").val();
				this.list_Get2()
			},
			search1() {
				this.postData2.userId = $("#searchName1").val();
				this.list_Get3()
			},
			searchDk() {
				this.postDktc.roleId = this.s.gwName;
				this.postDktc.userId = this.s.dkName;
				this.list_Get5()
			},
			dSearch(){
				let that = this
				that.list_Get() 
			},
			dSearch1(){
				let that = this
				that.list_GetSwgw() 
			},
			//获取业绩指标列表数据
			list_Get() {
				const that = this;
				that.postData.flag=0
				that.postData.year=that.newYear;
				that.postData.type=that.aType;
				that.loading();
				$.ajax({
					url: config.api_showSaleCustomer,
					data: that.postData
				}).done((res) => {
					that.c.list = res.result;
					that.loading('close');
				})
			},
			//获取业绩薪资列表
			list_Get1() {
				const that = this;
				that.loading();
				$.ajax({
					url: config.api_yjxzList,
					data: that.postData
				}).done((res) => {
					that.d.list = res.result;
					that.loading('close');
				})
			},
			//底薪
			list_Get2() {
				const that = this;
				that.loading();
				that.postData1.flag = 1;
				$.ajax({
					url: config.api_money,
					data: that.postData1,
				}).done((res) => {
					that.dixin.list = res.result;
					that.loading('close');
				})
			},
			//特殊员工
			list_Get3() {
				const that = this;
				that.loading();
				that.postData2.flag = 2;
				$.ajax({
					url: config.api_money,
					data: that.postData2,
				}).done((res) => {
					that.teshu.list = res.result;
					that.loading('close');
				})
			},
			//提成规则列表
			list_Get4() {
				const that = this;
				that.loading();
				$.ajax({
					url: config.api_tcgzList,
					data: {
						flag: 0
					},
				}).done((res) => {
					that.rule.list = res.result;
					that.loading('close');
				})
			},
			//到款提成列表
			list_Get5() {
				const that = this;
				that.postDktc.flag = 1;
				that.loading();
				$.ajax({
					url: config.api_tcgzList,
					data: that.postDktc,
				}).done((res) => {
					that.rule.list1 = res.result;
					that.loading('close');
				})
			},
			//商务顾问提成规则
			list_GetSwgw() {
				const that = this;
				that.postDataswgwList.flag=1
				that.postDataswgwList.year=that.newYear1;
				that.loading();
				$.ajax({
					url: config.api_showSaleCustomer,
					data: that.postDataswgwList
				}).done((res) => {
					that.swgwList.list = res.result;
					that.loading('close');
				})
			},
			//电销商务顾问提成规则列表
			list_Getdxswgw() {
				const that = this;
				that.loading();
				$.ajax({
					url: config.api_tcgzList,
					data: {
						flag: 2
					},
				}).done((res) => {
					that.dxswgwList.list = res.result;
					that.loading('close');
				})
			},
			//销售select2
			/**
			 * @param {el} param_name
			 * @param {placeholder} param_name
			 * @param {clearbtn} param_name
			 * @param {roleId} aram_name
			 */
			select_init(el, placeholder, kind, clearbtn, roleId) {
				const that = this;
				return $(el).select2({
					placeholder: placeholder || "请选择",
					language: 'zh-CN',
					allowClear: clearbtn || false,
					ajax: {
						url: "/user/getUserInfo",
						dataType: 'json',
						type: "post",
						delay: 250,
						data: function(params) {
							return {
								page: params.page || 1,
								ROLE_ID: roleId || kind,
								data: {
									q: params.term || "", // search term
								}
							};
						},
						processResults: function(data, params) {
							params.page = params.page || 1;
							config.htz_gw = data;
							$.each(data, function() {
								this.id = this.USER_ID;
								this.text = this.NAME;
							})

							return {
								results: data,
								pagination: {
									more: data.length == 10
								},
							};
						},
						cache: true
					},
					minimumInputLength: 0
				})
			},
			//到款提成岗位
			dkjob() {
				const that = this
				$.get(config.api_dktcgw, {}, function(data) {
					that.s.job = data.result;
				})
			},
			gwName() {
				const that = this;
				var val = that.s.gwName;
				if(val != '') {
					$.get(config.api_dktcgw1 + val, {}, function(data) {
						that.s.jobName = data.result;
					})
				} else {
					that.s.dkName = ''
					that.s.jobName = []
				}
			},
			changeSale() {
				const that = this;
				$("#salechange").on('change', function() {
					var id = $(this).val()
					for(var i = 0; i < config.htz_gw.length; i++) {
						if(config.htz_gw[i].USER_ID == id) {
							console.log(config.htz_gw[i].USER_ID, id)
							$(".yggw").val(config.htz_gw[i].ROLE_NAME)
						}
					}
				})
				$("#tssalechange").on('change', function() {
					var id = $(this).val()
					for(var i = 0; i < config.htz_gw.length; i++) {
						if(config.htz_gw[i].USER_ID == id) {
							console.log(config.htz_gw[i].USER_ID, id)
							$(".tsyggw").val(config.htz_gw[i].ROLE_NAME)
						}
					}
				})
			},
			//提成规则
			//	新增提成规则
			addRule() {
				const that = this;
				that.rule.ruleName = '';
				that.rule.ruleList = '';
				that.rule.ruleBracket = '';
				that.rule.ruleBonus = '';
				that.rule.ruleJob = '';
				that.htz_table.dhl = false;
				that.htz_table.khs = false;
				that.htz_table.zg = false;
				that.htz_table.qdl = false;
				that.htz_table.bfl = false;
				const dialog = layer.open({
					type: 1,
					title: '新增电销提成规则',
					closeBtn: 1,
					content: $('#ruleBox'),
					area: ['850px', '600px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						that.postRule.name = that.rule.ruleName;
						that.postRule.tcStandard = that.rule.ruleList;
						that.postRule.fdStandard = that.rule.ruleBracket;
						that.postRule.yjStandard = that.rule.ruleBonus;
						that.postRule.roleId = that.rule.ruleJob;
						var yjtcList = [];
						var a;
						$(".aaa td:not(:last-child)").each(function() {
							$(this).find('.a1').each(function() {
								var htz = {};
								htz.fdzb = $(this).val()
								yjtcList.push(htz)
							})

							var input = $(this).find('.a2');
							for(var i = 0; i < input.length; i++) {
								a = $(".aaa td .a2").eq(i).val();
								if(i < 2) {
									yjtcList[i].tc = a;
								} else {
									var b = $(".aaa td .a2").eq(2).val();
									var c = $(".aaa td .a2").eq(3).val();
									yjtcList[2].tc = b + ',' + c;
								}

							}
						})
						that.postRule.yjtcList = yjtcList;
						if(that.postRule.name == '') {
							layer.msg('请输入规则名称');
							return
						} else if(that.postRule.tcStandard == '') {
							layer.msg('请选择提成规则');
							return
						} else if(that.postRule.fdStandard == '') {
							layer.msg('请选择分档指标');
							return
						} else if(that.postRule.yjStandard == '' && that.htz_tczb == true) {
							layer.msg('请选择提成指标');
							return
						} else if(that.postRule.roleId == '') {
							layer.msg('请选择岗位');
							return
						} else {
							var guize = $(".aaa input");
							for(var g = 0; g < guize.length; g++) {
								if(guize[g].value == '') {
									layer.msg('请填写规则');
									return
								}
							}
						}
						yocto.json(config.api_addOrUpdateTcgz, that.postRule, (res) => {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get4();
							} else if(res.error == '01') {
								layer.msg(res.msg)
							}

						})

					}
				});
			},
			//分档指标触发岗位
			changeRule: function() {
				const that = this;
				that.rule.ruleJob = '';
				if(that.rule.ruleBracket != '') {
					if(that.rule.ruleBracket == 3 || that.rule.ruleBracket == 4) {
						that.htz_tczb = false;
						that.jobName = '提成部门'
					} else {
						that.htz_tczb = true;
						that.jobName = '提成岗位'
					}
					if(that.rule.ruleBracket == 0) {
						that.htz_table.dhl = true;
					} else {
						that.htz_table.dhl = false;
					}
					if(that.rule.ruleBracket == 1) {
						that.htz_table.khs = true;
					} else {
						that.htz_table.khs = false;
					}
					if(that.rule.ruleBracket == 2) {
						that.htz_table.zg = true;
					} else {
						that.htz_table.zg = false;
					}
					if(that.rule.ruleBracket == 3) {
						that.htz_table.qdl = true;
					} else {
						that.htz_table.qdl = false;
					}
					if(that.rule.ruleBracket == 4) {
						that.htz_table.bfl = true;
					} else {
						that.htz_table.bfl = false;
					}

					$.ajax({
						url: config.api_showRoleListByFdzb,
						async: false,
						data: {
							fdStandard: that.rule.ruleBracket
						}
					}).done((res) => {
						that.rule.job = res.result;
					})
				} else {
					that.rule.ruleJob = '';
				}
			},
			//修改提成规则
			xg_tc(el) {
				const that = this;
				$.get(config.api_tcgzDetail, {
					id: el.id,
					flag: 0,
				}, function(data) { // 回调函数
					var result = data.result
					that.rule.ruleName = result.name;
					that.rule.ruleList = result.tcStandard;
					that.rule.ruleBracket = result.fdStandard;
					if(result.yjStandard == undefined) {
						that.htz_tczb = false
						that.jobName = "提成部门"
					} else {
						that.htz_tczb = true
						that.jobName = "提成岗位"
						that.rule.ruleBonus = result.yjStandard;
					}

					if(result.fdStandard == 0) {
						that.htz_table.dhl = true;
					} else {
						that.htz_table.dhl = false;
					}
					if(result.fdStandard == 1) {
						that.htz_table.khs = true;
					} else {
						that.htz_table.khs = false;
					}
					if(result.fdStandard == 2) {
						that.htz_table.zg = true;
					} else {
						that.htz_table.zg = false;
					}
					if(result.fdStandard == 3) {
						that.htz_table.qdl = true;
					} else {
						that.htz_table.qdl = false;
					}
					if(result.fdStandard == 4) {
						that.htz_table.bfl = true;
					} else {
						that.htz_table.bfl = false;
					}
					setTimeout(function() {
						for(var i = 0; i < result.yjtcList.length; i++) {
							$(".aaa td:not(:last-child)").each(function() {
								var input1 = $(this).find('.a1');
								for(var b = 0; b < input1.length; b++) {
									$(".aaa td .a1").eq(b).val(result.yjtcList[b].fdzb);
								}
								var input = $(this).find('.a2');
								for(var n = 0; n < input.length; n++) {
									if(result.yjtcList.length > 2) {
										$(".aaa td .a2").eq(0).val(result.yjtcList[0].tc);
										$(".aaa td .a2").eq(1).val(result.yjtcList[1].tc);
										var str = result.yjtcList[2].tc.split(",");
										for(var v = 0; v < str.length; v++) {
											$(".aaa td .a2").eq(2).val(str[0]);
											$(".aaa td .a2").eq(3).val(str[1]);
										}
									} else {
										$(".aaa td .a2").eq(i).val(result.yjtcList[i].tc);
									}

								}

							})
						}
					}, 100);
					$.ajax({
						url: config.api_showRoleListByFdzb,
						async: false,
						data: {
							fdStandard: that.rule.ruleBracket
						}
					}).done((res) => {
						that.rule.job = res.result;
						that.rule.ruleJob = result.roleId
					})
				});

				const dialog = layer.open({
					type: 1,
					title: '修改电销提成规则',
					closeBtn: 1,
					content: $('#ruleBox'),
					area: ['850px', '600px'],
					btn: "保存",
					btnAlign: 'c',
					yes() {
						that.postRule.name = that.rule.ruleName;
						that.postRule.tcStandard = that.rule.ruleList;
						that.postRule.fdStandard = that.rule.ruleBracket;
						that.postRule.yjStandard = that.rule.ruleBonus;
						that.postRule.roleId = that.rule.ruleJob;
						that.postRule.id = el.id;
						var yjtcList = [];
						$(".aaa td:not(:last-child)").each(function() {
							$(this).find('.a1').each(function() {
								var htz = {};
								htz.fdzb = $(this).val()
								yjtcList.push(htz)
							})

							var input = $(this).find('.a2');
							for(var i = 0; i < input.length; i++) {
								var a = $(".aaa td .a2").eq(i).val();
								if(i < 2) {
									yjtcList[i].tc = a;
								} else {
									console.log('进入')
									var b = $(".aaa td .a2").eq(2).val();
									var c = $(".aaa td .a2").eq(3).val();
									yjtcList[2].tc = b + ',' + c;
								}

							}
						})
						that.postRule.yjtcList = yjtcList;
						console.log(that.postRule.tcStandard);
						if(that.postRule.name == '') {
							layer.msg('请输入规则名称');
							return
						} else if(that.postRule.tcStandard < 0) {
							layer.msg('请选择提成规则');
							return
						} else if(that.postRule.fdStandard < 0) {
							layer.msg('请选择分档指标');
							return
						} else if(that.postRule.yjStandard < 0 && that.htz_tczb == true) {
							layer.msg('请选择提成指标');
							return
						} else if(that.postRule.roleId < 0) {
							layer.msg('请选择岗位');
							return
						} else {
							var guize = $(".aaa input");
							for(var g = 0; g < guize.length; g++) {
								if(guize[g].value == '') {
									layer.msg('请填写规则');
									return
								}
							}
						}
						yocto.json(config.api_addOrUpdateTcgz, that.postRule, (res) => {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("修改成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get4();
							} else {
								layer.msg(res.msg)
							}

						})
					}
				});
			},
			//新增电销商务顾问提成规则
			s2() {
				const that = this;
				that.dxswgw.ruleName='';
				that.dxswgw.ruleList='';
				that.dxswgw.ruleBracket='';
				that.dxswgw.ruleJob='';
				const dialog = layer.open({
					type: 1,
					title: '新增电销商务顾问提成规则',
					closeBtn: 1,
					content: $('#s2'),
					area: ['850px', '550px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						that.postdxswgw.name = that.dxswgw.ruleName;
						that.postdxswgw.tcStandard = that.dxswgw.ruleList;
						that.postdxswgw.fdStandard = that.dxswgw.ruleBracket;
						that.postdxswgw.roleId = '90564dd8b75a4f6d815ce418462d401c';
						var yjtcList = [];
						var a;
						$(".eee td:not(:last-child)").each(function() {
							$(this).find('.a1').each(function() {
								var htz = {};
								htz.fdzb = $(this).val()
								yjtcList.push(htz)
							})

							var input = $(this).find('.a2');
							for(var i = 0; i < input.length; i++) {
								a = $(".eee td .a2").eq(i).val();
								if(i < 2) {
									yjtcList[i].tc = a;
								} else {
									var b = $(".eee td .a2").eq(2).val();
									var c = $(".eee td .a2").eq(3).val();
									yjtcList[2].tc = b + ',' + c;
								}

							}
						})
						that.postdxswgw.yjtcList = yjtcList;
						if(that.postdxswgw.name == '') {
							layer.msg('请输入规则名称');
							return
						} else if(that.postdxswgw.tcStandard == '') {
							layer.msg('请选择提成规则');
							return
						} else if(that.postdxswgw.fdStandard == '') {
							layer.msg('请选择分档指标');
							return
						} else {
							var guize = $(".aaa input");
							for(var g = 0; g < guize.length; g++) {
								if(guize[g].value == '') {
									layer.msg('请填写规则');
									return
								}
							}
						}
						yocto.json(config.api_addOrUpdateTcgz, that.postdxswgw, (res) => {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Getdxswgw();
							} else if(res.error == '01') {
								layer.msg(res.msg)
							}

						})

					}
				});
			},
			changedxswgw(){
				let that = this
				if(that.dxswgw.ruleBracket==7){
					that.dxswgw.a =true
				}else{
					that.dxswgw.a = false
				}
				if(that.dxswgw.ruleBracket==8){
					that.dxswgw.b =true
				}else{
					that.dxswgw.b = false
				}
				if(that.dxswgw.ruleBracket==9){
					that.dxswgw.c =true
				}else{
					that.dxswgw.c = false
				}
			},
			//修改电销商务顾问提成规则
			xg_dxswgwtc(el) {
				const that = this;
				$.get(config.api_tcgzDetail, {
					id: el.id,
					flag: 0,
				}, function(data) { // 回调函数
					var result = data.result
					that.dxswgw.ruleName = result.name;
					that.dxswgw.ruleList = result.tcStandard;
					that.dxswgw.ruleBracket = result.fdStandard;
					
					if(result.fdStandard == 7) {
						that.dxswgw.a = true;
					} else {
						that.dxswgw.a = false;
					}
					if(result.fdStandard == 8) {
						that.dxswgw.b  = true;
					} else {
						that.dxswgw.b  = false;
					}
					if(result.fdStandard == 9) {
						that.dxswgw.c = true;
					} else {
						that.dxswgw.c  = false;
					}
					
					setTimeout(function() {
						for(var i = 0; i < result.yjtcList.length; i++) {
							$(".eee td:not(:last-child)").each(function() {
								var input1 = $(this).find('.a1');
								for(var b = 0; b < input1.length; b++) {
									$(".eee td .a1").eq(b).val(result.yjtcList[b].fdzb);
								}
								var input = $(this).find('.a2');
								for(var n = 0; n < input.length; n++) {
									if(result.yjtcList.length > 2) {
										$(".eee td .a2").eq(0).val(result.yjtcList[0].tc);
										$(".eee td .a2").eq(1).val(result.yjtcList[1].tc);
										var str = result.yjtcList[2].tc.split(",");
										for(var v = 0; v < str.length; v++) {
											$(".eee td .a2").eq(2).val(str[0]);
											$(".eee td .a2").eq(3).val(str[1]);
										}
									} else {
										$(".eee td .a2").eq(i).val(result.yjtcList[i].tc);
									}

								}

							})
						}
					}, 100);
				});

				const dialog = layer.open({
					type: 1,
					title: '修改电销商务顾问提成规则',
					closeBtn: 1,
					content: $('#s2'),
					area: ['850px', '550px'],
					btn: "保存",
					btnAlign: 'c',
					yes() {
						that.postdxswgw.name = that.dxswgw.ruleName;
						that.postdxswgw.tcStandard = that.dxswgw.ruleList;
						that.postdxswgw.fdStandard = that.dxswgw.ruleBracket;
						that.postdxswgw.roleId = '90564dd8b75a4f6d815ce418462d401c';
						that.postdxswgw.id = el.id;
						var yjtcList = [];
						$(".eee td:not(:last-child)").each(function() {
							$(this).find('.a1').each(function() {
								var htz = {};
								htz.fdzb = $(this).val()
								yjtcList.push(htz)
							})

							var input = $(this).find('.a2');
							for(var i = 0; i < input.length; i++) {
								var a = $(".eee td .a2").eq(i).val();
								if(i < 2) {
									yjtcList[i].tc = a;
								} else {
									console.log('进入')
									var b = $(".eee td .a2").eq(2).val();
									var c = $(".eee td .a2").eq(3).val();
									yjtcList[2].tc = b + ',' + c;
								}

							}
						})
						that.postdxswgw.yjtcList = yjtcList;
						if(that.postdxswgw.name == '') {
							layer.msg('请输入规则名称');
							return
						} else if(that.postdxswgw.tcStandard < 0) {
							layer.msg('请选择提成规则');
							return
						} else if(that.postdxswgw.fdStandard < 0) {
							layer.msg('请选择分档指标');
							return
						} else {
							var guize = $(".eee input");
							for(var g = 0; g < guize.length; g++) {
								if(guize[g].value == '') {
									layer.msg('请填写规则');
									return
								}
							}
						}
						yocto.json(config.api_addOrUpdateTcgz, that.postdxswgw, (res) => {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("修改成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Getdxswgw();
							} else {
								layer.msg(res.msg)
							}

						})
					}
				});
			},
			//到款提成设置
			//	新增到款提成设置
			adddk() {
				$(".cancel_dom ").remove();
				$(".ymd1").val('0');
				$(".ymd2").val('');
				$(".ymd3").val('');
				const that = this;
				that.rule.ruleBracket1 = "";
				that.rule.ruleJob1 = "";
				const dialog = layer.open({
					type: 1,
					title: '新增到款提成',
					closeBtn: 1,
					content: $('#daokuanBox'),
					area: ['850px', '400px'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						that.postRule.fdStandard = that.rule.ruleBracket1;
						that.postRule.roleId = that.rule.ruleJob1;
						var yjtcList = [];
						$(".bbb .htz-td:not(:last-child)").each(function() {
							$(this).find('tr').each(function() {
								var htz = {};
								var first;
								var second;
								$(this).find('.a1').first().each(function() {
									first = $(this).val()
								})
								$(this).find('.a1').last().each(function() {
									second = $(this).val()
									htz.fdzb = first + ',' + second;
									yjtcList.push(htz);
								})
							})

							var input = $(this).find('.a2');
							for(var i = 0; i < input.length; i++) {
								var a = $(".bbb td .a2").eq(i).val();
								yjtcList[i].tc = a;

							}
						})
						that.postRule.yjtcList = yjtcList;
						if(that.postRule.fdStandard == '') {
							layer.msg('请输入分档指标');
							return
						} else if(that.postRule.roleId == '') {
							layer.msg('请选择员工');
							return
						} else {
							var guize = $(".bbb input");
							for(var g = 0; g < guize.length; g++) {
								if(guize[g].value == '') {
									layer.msg('请填写规则');
									return
								}
							}
						}
						yocto.json(config.api_addOrUpdateTcgz, that.postRule, (res) => {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.list_Get5();

							} else if(res.error == '01') {
								console.log('111')
								layer.msg(res.msg)
							}

						})

					}
				});
			},
			//分档指标触发岗位
			changeRule1: function() {
				const that = this;
				that.rule.ruleJob1 = '';
				that.rule.job1 = [];
				if(that.rule.ruleBracket1 != '') {
					$.ajax({
						url: config.api_showRoleListByFdzb,
						async: false,
						data: {
							fdStandard: that.rule.ruleBracket1
						}
					}).done((res) => {
						that.rule.job1 = res.result;
					})
				} else {
					that.rule.ruleJob1 = '';
				}

			},
			changeRule2: function() {
				const that = this;
				that.rule.ruleJob2 = '';
				that.rule.job2 = [];
				if(that.rule.ruleBracket2 != '') {
					$.ajax({
						url: config.api_showRoleListByFdzb,
						async: false,
						data: {
							fdStandard: that.rule.ruleBracket2
						}
					}).done((res) => {
						that.rule.job2 = res.result;

					})
				} else {
					that.rule.ruleJob2 = '';
				}

			},
			xinzen() {
				this.ind += 1;
				var html = '';
				html += '<tr class="cancel_dom">'
				html += '<td>'
				html += '<input type="number"  class=" form-control pull-left a1"  style="width: 35%;margin-top: 12px;"/>'
				html += '<span class=" htz-label pull-left" style="margin-top: 12px;width: 10%;">&le;</span>'
				html += '<span class=" pull-left" style="margin-top: 12px;display: block;width: 10%; text-align: center;line-height: 34px;">X</span>'
				html += '<span class=" htz-label pull-left" style="margin-top: 12px; width: 10%;">&lt;</span>'
				html += '<input type="number"  class=" form-control pull-left a1"  style="width: 35%;margin-top: 12px;"/></td></tr>';
				var html1 = '<input type="number" class="cancel_dom form-control htz-select a2" />'
				$(".xinzeng").append(html);
				$(".xinzeng1").append(html1);
			},
			//修改到款提成
			xg_dk(el) {
				const that = this;
				$(".cancel_dom ").remove();
				$.get(config.api_tcgzDetail, {
					id: el.id,
					flag: 1,
				}, function(data) { // 回调函数
					that.rule.ruleBracket2 = data.result.fdStandard;
					var html = '';
					var shuju;
					var arr = [];
					var arr1 = [];
					var aa;
					html += '<tr class="cancel_dom">'
					html += '<td>'
					html += '<input type="number"  class=" form-control pull-left a1"  style="width: 35%;margin-top: 12px;"/>'
					html += '<span class=" htz-label pull-left" style="margin-top: 12px;width: 10%;">&le;</span>'
					html += '<span class=" pull-left" style="margin-top: 12px;display: block;width: 10%; text-align: center;line-height: 34px;">X</span>'
					html += '<span class=" htz-label pull-left" style="margin-top: 12px; width: 10%;">&lt;</span>'
					html += '<input type="number"  class=" form-control pull-left a1"  style="width: 35%;margin-top: 12px;"/></td></tr>';
					var html1 = '<input type="number" class="cancel_dom form-control htz-select a2" />'
					for(var i = 0; i < data.result.yjtcList.length; i++) {
						if(i >= 1) {
							$(".xz1").append(html);
							$(".xz2").append(html1);
						}
						shuju = data.result.yjtcList;
					}
					$(".ccc .htz-td1:not(:last-child)").each(function() {
						var input1 = $(this).find('tr');
						console.log(input1.length)
						var tr = $(this).find('tr');
						for(var n = 0; n < tr.length; n++) {
							arr = shuju[n].fdzb.split(",")
							aa = $(this).find('tr .a1');
							arr1.push(arr)
							for(var h = 0; h < aa.length; h++) {
								input1.eq(n).find('.a1:first-child').val(arr1[n][0])
								input1.eq(n).find('.a1:last-child').val(arr1[n][1])
							}
						}

						var input = $(this).find('.a2');
						for(var i = 0; i < input.length; i++) {
							$(".ccc td .a2").eq(i).val(shuju[i].tc);
						}
					})
					$.ajax({
						url: config.api_showRoleListByFdzb,
						async: false,
						data: {
							fdStandard: that.rule.ruleBracket2
						}
					}).done((res) => {
						that.rule.job2 = res.result;
						that.rule.ruleJob2 = data.result.userId
					})

					const dialog = layer.open({
						type: 1,
						title: '修改到款提成',
						closeBtn: 1,
						content: $('#daokuanBox1'),
						area: ['850px', '400px'],
						btn: "保存",
						btnAlign: 'c',
						yes() {
							that.postRule.fdStandard = that.rule.ruleBracket2;
							that.postRule.roleId = that.rule.ruleJob2;
							that.postRule.id = el.id;
							var yjtcList = [];
							$(".ccc .htz-td1:not(:last-child)").each(function() {
								$(this).find('tr').each(function() {
									var htz = {};
									var first;
									var second;
									$(this).find('.a1').first().each(function() {
										first = $(this).val()
									})
									$(this).find('.a1').last().each(function() {
										second = $(this).val()
										htz.fdzb = first + ',' + second;
										yjtcList.push(htz);
									})
								})

								var input = $(this).find('.a2');
								for(var i = 0; i < input.length; i++) {
									var a = $(".ccc td .a2").eq(i).val();
									yjtcList[i].tc = a;

								}
							})
							that.postRule.yjtcList = yjtcList;
							if(that.postRule.fdStandard < 0) {
								layer.msg('请输入分档指标');
								return
							} else if(that.postRule.roleId == '') {
								layer.msg('请选择员工');
								return
							} else {
								var guize = $(".ccc input");
								for(var g = 0; g < guize.length; g++) {
									if(guize[g].value == '') {
										layer.msg('请填写规则');
										return
									}
								}
							}
							yocto.json(config.api_addOrUpdateTcgz, that.postRule, (res) => {
								if(res.error == '00') {
									layer.close(dialog)
									layer.msg("修改成功")
									$(".cancel_dom").remove();
									console.log(".cancel_dom")
									setTimeout(function() {
										parent.app && parent.parentFnc()
									}, 2000);
									that.list_Get5();
								} else {
									layer.msg(res.msg)
								}

							})
						},
						cancel() {
							console.log($(".cancel_dom"));
							$(".cancel_dom").remove();
						}

					});
				});

			},
			edit_hover(key, el) {
				Vue.set(this.hoverEl, key, {
					show: 1,
					el: el
				})

			},
			edit_el(key, el) {
				this.editEl.show = key;
				this.editEl.el = el;
				this.editEl.oldValue = el.name
			},
			edit_submit(key, el) {
				console.log(2);
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
				this.saveData(key, el)
			},
			edit_keyup(key, el) {
				console.log(1);
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
			},
			saveData(key, el) {
				if(key == 'name' && el.name == '') {
					el.name = this.editEl.oldValue
					return;
				}
				if(key == 'name' && el.name == this.editEl.oldValue) {
					return;
				}
				if(key == 'name') {
					//					$.post(config.api_hasName, {
					//						name: $.trim(el.name)
					//					}).done((res) => {
					//						if(res.result == 'error') {
					//							layer.msg('客户名称已存在,请检查重试')
					//							el.name = this.editEl.oldValue
					//							return;
					//						} else {
					//							save()
					//						}
					//					})
					save()
				} else {
					save()
				}

				function save() {
					let postData = {
						id: el.id,
						type: el.type,
					};
					postData[key] = $.trim(el[key])

					$.post(config.api_jxxz, postData, (res) => {})
				}

			},
		}
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}