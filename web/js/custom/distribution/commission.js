var config = {
	role: localStorage.userRole,
	api_list: api_url + '/distribution/distributorList3', //获取销售人员佣金列表
	api_list2: api_url + '/distribution/getCommissionList', //获取佣金提现列表
	api_list3: api_url + '/distribution/getWithdrawList', //佣金提现列表
	api_getCommission: api_url + '/distribution/getCommission', //佣金金额
	api_getWithdraw: api_url + '/distribution/getWithdraw', //提现金额

}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		list2: [], // 列表
		list3: [], // 列表
		roleType: '', //角色
		keywords: '', // 请输入姓名,联系方式
		createTimeStart: '',
		createTimeEnd: '',
		createTimeStart1: '',
		createTimeEnd1: '',
		distributorId:'',//人员id
		countCommission:'',//佣金总金额
		countWithdraw:'',//提现总金额
		type:"1",
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var createTimeEnd = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.createTimeEnd = value;
					createTimeStart.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				}
			});
			//日期范围
			var createTimeStart = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.createTimeStart = value;
					console.log(that.createTimeStart);
					createTimeEnd.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}
			});
			
			var createTimeEnd1 = laydate.render({
				elem: '#end1', //选择器结束时间
				type:'month',
				format: 'yyyy-MM', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.createTimeEnd1 = value;
					createTimeStart1.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				}
			});
			//日期范围
			var createTimeStart1 = laydate.render({
				elem: '#start1',
				type:'month',
				format: 'yyyy-MM', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.createTimeStart1 = value;
					createTimeEnd1.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
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

		getData: function(page) {
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
					roleType: that.roleType,
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
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getData2: function(page) {
			$('body,html').scrollTop(0)
			if(page) this.list2.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list2,
				async: true,
				type: 'post',
				data: {
					distributorId:that.distributorId,
					createTimeStart:that.createTimeStart,
					createTimeEnd:that.createTimeEnd,
					pageSize: that.list2.pageSize || 10,
					pageNo: that.list2.pageNum || 1,
					type:that.type
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list2 = res.result;
						//分页
						if(that.pagi) {
							$('.pagi2').pagination('updatePages', that.list2.pages)
							if(page == 1) $('.pagi2').pagination('goToPage', that.list2.pageNum)
						} else {
							that.pagi = $('.pagi2').pagination({
								pages: that.list2.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list2.pageNum,
								onSelect: function(num) {
									that.list2.pageNum = num
									that.getData2()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getData3: function(page) {
			$('body,html').scrollTop(0)
			if(page) this.list3.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list3,
				async: true,
				type: 'post',
				data: {
					distributorId:that.distributorId,
					createTimeStart:that.createTimeStart1,
					createTimeEnd:that.createTimeEnd1,
					pageSize: that.list2.pageSize || 10,
					pageNo: that.list2.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list3 = res.result;
						//分页
						if(that.pagi) {
							$('.pagi3').pagination('updatePages', that.list3.pages)
							if(page == 1) $('.pagi3').pagination('goToPage', that.list3.pageNum)
						} else {
							that.pagi = $('.pagi3').pagination({
								pages: that.list3.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list3.pageNum,
								onSelect: function(num) {
									that.list3.pageNum = num
									that.getData3()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getCommission(){
			let that = this
			$.ajax({
				type:"post",
				url:config.api_getCommission,
				async:true,
				data:{
					distributorId:that.distributorId,
					createTimeStart:that.createTimeStart,
					createTimeEnd:that.createTimeEnd,
					type:that.type
				},
				success(res){
					if(res.error=='00'){
						that.countCommission = res.result.countCommission
					}else{
						layer.msg(res.msg)
					}
				}
			});
		},
		getWithdraw(){
			let that = this
			$.ajax({
				type:"post",
				url:config.api_getWithdraw,
				async:true,
				data:{
					distributorId:that.distributorId,
					createTimeStart:that.createTimeStart1,
					createTimeEnd:that.createTimeEnd1,
				},
				success(res){
					if(res.error=='00'){
						that.countWithdraw = res.result.countWithdraw
					}else{
						layer.msg(res.msg)
					}
				}
			});
		},
		
		// 新增标签
		add() {
			let that = this
			that.name = '';
			that.phone = '';
			that.email = '';
			that.wxAccount = '';
			that.addRoleType = '';
			that.remark = '';
			var index = layer.open({
				type: 1,
				title: '新增销售人员',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.phone == '' || that.addRoleType == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							name: that.name,
							phone: that.phone,
							email: that.email,
							wxAccount: that.wxAccount,
							roleType: that.addRoleType,
							remark: that.remark,
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
		//佣金金额列表
		totalAmount(item) {
			let that = this
			that.createTimeStart = '';
			that.createTimeEnd = '';
			$("#start").val();
			$("#end").val();
			that.distributorId = item.distributorId
			that.getCommission()
			that.getData2();
			var index = layer.open({
				type: 1,
				title: '佣金金额列表',
				closeBtn: 1,
				content: $('#getCommissionList'),
				area: ['100%', '100%'],
				yes() {

				}
			});
		},
		
		
		//提现金额列表
		withdrawed(item) {
			let that = this
			that.createTimeStart1 = '';
			that.createTimeEnd1 = '';
			$("#start1").val();
			$("#end1").val();
			that.distributorId = item.distributorId
			that.getWithdraw()
			that.getData3();
			var index = layer.open({
				type: 1,
				title: '提现金额列表',
				closeBtn: 1,
				content: $('#getWithdrawList'),
				area: ['100%', '100%'],
				yes() {

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
				title: '编辑销售人员',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.phone == '' || that.wxAccount == '' || that.addRoleType == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							distributorId: id,
							name: that.name,
							phone: that.phone,
							email: that.email,
							wxAccount: that.wxAccount,
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
			that.getData(1);
		},
		searchCommission(){
			const that = this;
			that.getData2(1);
			that.getCommission()
		},
		searchWithdraw(){
			const that = this;
			that.getData3(1);
			that.getWithdraw()
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