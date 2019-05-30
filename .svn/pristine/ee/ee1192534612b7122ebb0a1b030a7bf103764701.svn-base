var callInfo = {}
var flag = yo.getQueryString("flag");
console.log(flag)
var flags = yo.getQueryString("flags");
var noYunzuo = (flags != 6 && flag != 4) ? 1 : ""
var noxs = flags != 7 ? 1 : ""
var zxr = (flag != 0 && flag != 1 && flag != 4) ? 1 : ""
var config = {
	role: localStorage.userRole,
	api_showSaleProcessDetail: '/main/showSaleProcessDetail'
}

function setCallInfoFlag(flag) {
	if(flag == 1) {
		$("#callInfoTime").hide()
		callInfo.api = '/workBench/callList.do?flag=1';
		callInfo.init(1);
	} else {
		$("#callInfoTime").show()
		callInfo.api = '/workBench/callList.do?flag=2&time=' + $('#callInfoTime').val();
		callInfo.init(1);
	}
}

//定向跳转
function openInit() {
	var btnMore = $(".btn-more-hook");
	$.each(btnMore, function() {
		var name = this.getAttribute("data-name");
		var index = '';
		if(!top.sideBarMenuData) return;
		$.each(top.sideBarMenuData, function() {
			if(this.name == name) {
				index = this.index
			}
		})
		this.setAttribute("data-index", index)
	})

}

window.app = new Vue({
	el: '#app',
	data: {
		flag: flag,
		flags: flags,
		role: localStorage.userRole || "",
		select2: {
			forecast: {}
		},
		//数据储存
		prcessDetail: {
			"gj": {
				"dhzcs": 0,
				"zcs": 0,
				"bfl": 0
			},
			"yc": {
				"khs": 0,
				price: 0
			},
			"xz": {
				"khs": 0,

			},
			"cj": {
				"price": 0,
				"khsl": 0,
				"htsl": 0
			}
		}
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide")
	},
	mounted: function() {
		var that = this
		//当前月份日期
		var thisMonth = new Date().getMonth() + 1
		thisMonth = thisMonth < 10 ? ("0" + thisMonth) : thisMonth
		var thisYear = new Date().getFullYear()
		var thisTime = thisYear.toString() + "-" + thisMonth.toString()

		var firstDay = date("Y-m-d", getCurrentMonthFirst().getTime())
		var lastDay = date("Y-m-d", getCurrentMonthLast().getTime())


		//销售简报_初始化

		$('#salerTimeStart_hook').val(firstDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", dateChange);

		$('#salerTimeEnd_hook').val(lastDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", dateChange);

		function dateChange() {
			var ld = $('#salerTimeEnd_hook').val();
			var fd = $('#salerTimeStart_hook').val();
			if(ld && fd) {
				that.forecast_get()
			}
		}
		

		//销售转化率_初始化

		$('#transTimeStart_hook').val(firstDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", trans_dateChange);

		$('#transTimeEnd_hook').val(lastDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", trans_dateChange);

		function trans_dateChange() {
			var ld = $('#transTimeEnd_hook').val();
			var fd = $('#transTimeStart_hook').val();
			if(ld && fd) {
				that.trans_get()
			}
		}
		$("[name='transFlag']").change(function() {
			that.trans_get()
		})
		

		//销售排名_初始化

		$('#ratingTimeStart_hook').val(firstDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", rating_dateChange);

		$('#ratingTimeEnd_hook').val(lastDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", rating_dateChange);

		function rating_dateChange() {
			var ld = $('#ratingTimeEnd_hook').val();
			var fd = $('#ratingTimeStart_hook').val();
			if(ld && fd) {
				that.rating_get()
			}
		}
		

		//销售有意向排名_初始化

		$('#intentionalStart_hook').val(firstDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", intertional_dateChange);

		$('#intentionalTimeEnd_hook').val(lastDay).datepicker({
			autoclose: true,
			todayHighlight: true,
			format: "yyyy-mm-dd"
		}).on("changeDate", intertional_dateChange);

		function intertional_dateChange() {
			var ld = $('#intentionalTimeEnd_hook').val();
			var fd = $('#intentionalStart_hook').val();
			if(ld && fd) {
				that.intentional_get()
			}
		}

		//初始化
		if(this.role=='销售精英'||this.role=='电访销售'||this.role=='销售总监'||this.role=='经理'||this.role=='电话销售总监'){
			this.forecast_get()
			that.trans_get()
			if(this.role!="电访销售"){
				that.rating_get()
			}
		}
		if(this.role=='经理'){
			that.funnel_get()
		}
		if(this.role=='经理'||this.role=='电访销售'){
			that.intentional_get()
		}
		this.select2.forecast = $('[name="customerId"]').select2({
			placeholder: "请选择客户",
			language: 'zh-CN',
			ajax: {
				url: "/saleCustomer/getSaleCustomerInfo.do",
				dataType: 'json',
				type: "post",
				delay: 250,
				data: function(params) {
					return {
						page: params.page || 1,
						data: {
							q: params.term || "", // search term
						}
					};
				},
				processResults: function(data, params) {
					params.page = params.page || 1;
					$.each(data, function() {
						this.id = this.id;
						this.text = this.name;
					})
					return {
						results: data,
						pagination: {
							more: data.length == 10
						}
					};
				},
				cache: true
			},
			minimumInputLength: 0
		})

		$('#newRemind').click(function() {
			var dialog = layer.open({
				type: 1,
				title: '新增提醒',
				closeBtn: 1,
				content: $("#remind_box"),
				area: ['600px', '300px'],
				btn: "保存",
				btnAlign: 'c',
				success: function() {
					$('#remind_time').val(date('Y-m-d h:i:s',new Date()))
				},
				yes: function() {
					var form = $('#remind_box')
					$.post("/order/saveCallInfo", {
						remark: form.find("[name=remark]").val(),
						time: form.find("[name=time]").val()
					}).done(function(res) {
						location.reload()
						layer.close(dialog)
					})
				}
			})
		})

		$(document).on("click", ".btn-more-hook", function(e) {
			e.preventDefault;
			top.menuItem.call(this);
			return false;
		})

		//提醒
		callInfo = new WorkSpaceRow();
		callInfo.boxName = '.row-hook-callInfo';
		laydate.render(
			{
				elem: '#remind_time' ,
				type: 'datetime',
				min: date('Y-m-d h:i:s',new Date()),
		})
		callInfo.api = '/workBench/callList.do?flag=2&time=';
		callInfo.render = function(dataArray) {
			var html = ''
			if(!dataArray && !dataArray.length) return;
			$.each(dataArray, function() {
				//提醒包装
				if(this.orderId){
					this.remark = '<a onclick="case_view('+this.orderId+')" href="javascript:;">'+this.remark+'</a>'
				}
				
				if(this.customerId){
					this.remark = '<a onclick="customer_view('+this.customerId+')" href="javascript:;">'+this.remark+'</a>'
				}
				
				html += '<tr><td>' + this.remark + '</td><td>' + this.time + '</td><td><button class="btn btn-primary btn-sm" title="完成" onclick="setSuccess(' + this.id + ')"><i class="fa fa-check"></i> 完成</button></td></tr>'
			});
			callInfo.container.find('.render-container-hook').html(html);
		};
		callInfo.init(1);

		var selectTime = date('Y-m-d',new Date());
		laydate.render({
			elem:'#callInfoTime',
			btns: ['clear','now', 'confirm'],
			done: function(value, date, endDate){
				callInfo.api = '/workBench/callList.do?flag=2&time=' + value
				callInfo.init(1);
			}
		})

		//我的审核
		if($('.row-hook-5').length) {
			var mysh = new WorkSpaceRow();
			mysh.api = '/workBench/mysh.do';
			mysh.boxName = '.row-hook-5';
			mysh.render = function(dataArray) {
				var html = ''
				if(!dataArray && !dataArray.length) return;
				$.each(dataArray, function() {
					html += '<tr><td>' + this.type + '</td><td>' + this.createTime + '</td><td>' + this.sqname + '</td><td width="200"><button class="btn btn-primary btn-sm" title="审核" onclick="sh(\'' + this.type + '\',' + this.id + ')"><i class="fa fa-gavel"></i> 审核</button></td></tr>'
				});
				mysh.container.find('.render-container-hook').html(html);
			};
			mysh.init(1);
		}

		var myTask = new WorkSpaceRow();
		myTask.api = '/workBench/taskList.do';
		myTask.render = function(dataArray) {
			var html = '';
			if(!dataArray && !dataArray.length) return;
			$.each(dataArray, function() {
				var url = 'vistsh/list.do';
				var open = 'viewTask(\'' + this.id + '\')';
				var complete = '';
				var menuName = ''
				switch(this.type) {
					case "指派任务":
						complete = '<button title="点击查看详情" class="btn btn-success btn-sm" onclick="doUpdate(' + this.id + ')"><i class="fa fa-check"></i> 完成</button>'
						menuName = 'data-name="任务指派"'
						url = ''
						break;
					case "申请外访":
						url = "vist/list.do"
						menuName = 'data-name="申请外访"'
						if(flag == '5') {
							url = "vistsh/list.do"
							menuName = 'data-name="外访审核"'
						}
						break;
					case "待开发票":
						url = "invoice/list.do"
						menuName = 'data-name="发票管理"'
						break;
					case "待发快递":
						url = "express/list.do"
						open = 'viewExpress(\'' + this.relateId + '\')'
						menuName = 'data-name="快递收发"'
						break;
					case "待发报告":
						url = "workBench/orderReportList.do"
						menuName = 'data-name="案件报告"'
						break;
					default:
						break;
				}
				var typeHTML = '<a href="' + url + '" ' + menuName + ' class="btn-more-hook">' + this.type + '</a>'
				if(this.type == "指派任务") typeHTML = this.type
				html += '<tr><td>' + typeHTML + '</td><td>' + this.isCompleted + '</td><td>' + this.fqrName + '</td>'
				if(zxr) html += '<td>' + this.zxrName + '</td>' //如果是执行人自己
				if(flag == 5) complete = ''; //如果是经理不显示完成
				html += '<td>' + this.createTime + '</td><td width="200"><button class="btn btn-primary btn-sm" title="查看详情" onclick="' + open + '"><i class="fa fa-search"></i> 查看详情</button> ' + complete + '</td></tr>'
			});
			myTask.container.find('.render-container-hook').html(html);
			openInit()
		};
		myTask.init(1);
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

		//预测部分
		forecast_add: function() {
			var that = this;
			var dialog = layer.open({
				type: 1,
				title: '新增预测',
				closeBtn: 1,
				content: $("#forecast_box"),
				area: ['600px', '300px'],
				btn: "保存",
				btnAlign: 'c',
				end: function() {
					that.select2.forecast.val(null).trigger("change");
					$("#forecast_box")[0].reset()
				},
				yes: function() {
					var form = $('#remind_box')
					var saleCustomerId = $("#customerId").val();
					var price = $("#price").val()
					if(!saleCustomerId) {
						layer.msg("请选择客户")
						return;
					}
					if(that.role!='电访销售' &&(!price || Number(price) <= 0)) {
						layer.msg("请填写正确的金额")
						return;
					}
					$.post("/main/hasName", {
						saleCustomerId: saleCustomerId
					}, (res) => {
						if(res.result == 'success') {
							$.post("/main/saveSaleyc", {
								saleCustomerId: saleCustomerId,
								price: price
							}).done(function(res) {
								that.forecast_get()
								layer.close(dialog)
							})
						} else {
							layer.msg("已有相同客户预测记录")
						}
					})
				}
			})
		},
		//销售简报数据
		forecast_get: function() {
			var that = this
			$.post(config.api_showSaleProcessDetail, {
				startTime: $("#salerTimeStart_hook").val(),
				endTime: $("#salerTimeEnd_hook").val()
			}, function(res) {
				that.prcessDetail = res
				Vue.nextTick(() => {
					var box = $("#sale_box_hook").find(".btn-more-hook")
					box.attr("data-name", "客户委托案件明细")
					box.attr("data-startTime", $("#salerTimeStart_hook").val())
					box.attr("data-endTime", $("#salerTimeEnd_hook").val())
					openInit()
				})
			})

		},
		//转化率
		trans_get: function() {
			var startTime = $("#transTimeStart_hook").val()
			var endTime = $("#transTimeEnd_hook").val()
			var flag = $("[name='transFlag']").val()
			if(!startTime || !endTime) return
			$.post("/main/xszhRate", {
				startTime: startTime,
				endTime: endTime,
				flag: flag
			}).done(function(res) {
				echarts.dispose(document.querySelector('.transChart-hook'));
				var option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '10%',
						containLabel: true
					},
					legend: {
						data: [],
					},
					xAxis: {
						data: [],
						axisLabel: {
							rotate: -90,
							interval: 0
						},
					},
					yAxis: {
						splitLine: {
							show: false
						},
					},
					series: [{
						name: '电话量',
						type: 'bar',
						barGap: '-100%',
						data: []
					}, {
						name: '有意向客户',
						type: 'bar',
						data: []
					}]
				};

				var legendData;
				var names = [];
				var s1 = [];
				var s2 = [];
				var s3 = [];

				if(flag == 0) {
					legendData = ['电话量', '有效电话','有意向客户']
					$.each(res.result, function() {
						names.push(this.name);
						s1.push(this.dhsl);
						s2.push(this.yxdhsl);
						s3.push(this.yxsl)
					});
				} else if(flag == 1) {
					legendData = ['有意向', '拜访', '成交量']
					$.each(res.result, function() {
						names.push(this.name);
						s1.push(this.yxsl);
						s2.push(this.wfsl)
						s3.push(this.cjsl)
					});
				} else if(flag == 2) {
					legendData = ['目标签单量', '成交量']
					$.each(res.result, function() {
						names.push(this.name);
						s1.push(this.qdl);
						s2.push(this.cjl)
					});
				} else if(flag == 3) {
					legendData = ['目标委托金额', '委托金额']
					$.each(res.result, function() {
						names.push(this.name);
						s1.push(this.mbje);
						s2.push(this.wtje)
					});
				}
				option.xAxis.data = names;
				option.legend.data = legendData

				option.series[0].data = s1;
				option.series[1].data = s2;
				option.series[0].name = legendData[0]
				option.series[1].name = legendData[1]
				if(s3.length) {
					option.series[1].barGap = '-100%'
					option.series[2] = {
						name: legendData[2],
						type: 'bar',
						data: s3
					};
				}
				var myChart = echarts.init(document.querySelector('.transChart-hook'));
				myChart.setOption(option)
			})

		},
		//漏斗图
		funnel_get: function() {
				$.ajax({
				url: '/main/xsld.do',
				success: function(res) {
					option = {
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '10%',
						containLabel: true
					},
					legend: {
						data: ['潜在客户','有意向','外访客户','成交客户'],
					},
					xAxis: {
						  type : 'category',
						data: ['销售漏斗'],
					},
					yAxis: {
						type:'value'
					},
					series: [{
						name: '潜在客户',
						type: 'bar',
						data: []
					}, {
						name: '有意向',
						type: 'bar',
						data: []
					},{
						name: '外访客户',
						type: 'bar',
						data: []
					}, {
						name: '成交客户',
						type: 'bar',
						data: []
					}]
			};
				var data = []
				$.each(res.result, function(i) {
						option.series[Number(this.status)-1].data = [this.sl]
				});
			var myChart = echarts.init(document.querySelector('.funnelChart-hook'));
			myChart.setOption(option)
			myChart.off('click')
						myChart.on("click", function (params) {
							console.log(params);
							var url = ''
							var flag = ''
							if(params.seriesName=='潜在客户'){
								url = '/static/page/customer_potential.html'
							}else if(params.seriesName=='成交客户'){
								url='/customer/list.do'
							}else if(params.seriesName=='有意向'){
								url='/static/page/index/funnel_customer_list.html?flag=1'
							}else{
								url='/static/page/index/funnel_customer_list.html?flag=2'
							}
							layer.open({
								type:2,
								area:['100%','100%'],
								title:'查看详情',
								content:url
							})
				})
			
			
			}})
		},
		//销售排名
		rating_get: function() {
			var that = this;
			$.ajax({
				url: '/report/xspmReport.do',
				async: false,
				data: {
					startTime: $("#ratingTimeStart_hook").val(),
					endTime: $("#ratingTimeEnd_hook").val(),
					flag: $("[name='ratingSort']").val(),
				},
				success: function(res) {
					if(res.error == "00") {
						var colors = ['#c23431', '#2f4554', '#675bba'];
						var option = {
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['合同金额', '客户数量']
							},
							xAxis: [{
								type: 'category',
								data: []
							}],
							yAxis: [{
									type: 'value',
									name: '合同金额',
									position: 'left',
									axisLine: {
										lineStyle: {
											color: colors[0]
										}
									},
								},
								{
									type: 'value',
									name: '客户数量',
									position: 'right',
									min: 0,
									max: 100,
									axisLine: {
										lineStyle: {
											color: colors[1]
										}
									},
								},
							],
							series: [{
									name: '合同金额',
									type: 'bar',
									data: [],
								},
								{
									name: '客户数量',
									type: 'bar',
									yAxisIndex: 1,
									data: [],
								}
							]
						}

						var myChart = echarts.init(document.querySelector('.ratingChart-hook'));
						var price = []
						var amount = []
						var names = []
						var ids = []
						for(var i = 0; i < res.result.length; i++) {
							var el = res.result[i];
							price.push(el.price || 0)
							amount.push(el.sl || 0)
							names.push(el.name || "")
							ids.push(el.saleId)
						}

						var amount_MAX = Number(Math.max.apply(null, amount))
						amount_MAX = (amount_MAX + amount_MAX * 0.1)
						option.yAxis[1].max = Math.ceil(amount_MAX)
						option.series[0].data = price
						option.series[1].data = amount
						option.xAxis[0].data = names
						myChart.setOption(option)
						myChart.off('click')
						myChart.on("click", function (params) {
							if(that.role!='经理') return;
							var flag = params.seriesName=='客户数量' ? 1 : 2
							var content =  '/static/page/chart_center/saler_sales_detail.html?saleId='+ids[params.dataIndex]+'&saleName='+params.name+'&startTime='+$("#ratingTimeStart_hook").val()+'&endTime=' + $("#ratingTimeEnd_hook").val() + '&flag=' + flag
							if(flag==1){
								content = '/customer/list.do?saleIds='+ids[params.dataIndex]+'&saleName='+params.name+'&createTimeStart='+$("#ratingTimeStart_hook").val()+'&createTimeEnd=' + $("#ratingTimeEnd_hook").val()
							}
							layer.open({
								type:2,
								area:['100%','100%'],
								title:'查看详情',
								/*content:'/static/page/chart_center/saler_sales_detail.html?saleId='+ids[params.dataIndex]+'&saleName='+params.name+'&startTime='+$("#ratingTimeStart_hook").val()+'&endTime=' + $("#ratingTimeEnd_hook").val() + '&flag=' + flag*/
								//flag=1/合同//flag=2/案件
								content:content
							})
				})
					} else {
						layer.msg(res.msg)
					}
				}
			});

		},
		//销售有意向排名
		intentional_get: function() {
			$.ajax({
				url: '/main/showdfSaleProcessDetail.do',
				async: false,
				data: {
					startTime: $("#intentionalStart_hook").val(),
					endTime: $("#intentionalTimeEnd_hook").val(),
					flag: $("[name='intentionalSort']").val(),
				},
				success: function(res) {
					if(res.error == "00") {
						var colors = ['#c23431', '#2f4554', '#675bba'];
						var option = {
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: ['电话量', '意向客户数']
							},
							xAxis: [{
								type: 'category',
								data: []
							}],
							yAxis: [{
									type: 'value',
									name: '电话量',
									position: 'left',
									axisLine: {
										lineStyle: {
											color: colors[0]
										}
									},
								},
								{
									type: 'value',
									name: '意向客户数',
									position: 'right',
									axisLine: {
										lineStyle: {
											color: colors[1]
										}
									},
								},
							],
							series: [{
									name: '电话量',
									type: 'bar',
									data: [],
								},
								{
									name: '意向客户数',
									type: 'bar',
									yAxisIndex: 1,
									data: [],
								}
							]
						}

						var myChart = echarts.init(document.querySelector('.IntentionalChart-hook'));
						var dhl = []
						var yxkhs = []
						var names = []
						var ids = []
						for(var i = 0; i < res.result.length; i++) {
							var el = res.result[i];
							dhl.push(el.dhl || 0)
							yxkhs.push(el.yxkhs || 0)
							names.push(el.name || "")
							ids.push(el.saleId)
						}

						option.series[0].data = dhl
						option.series[1].data = yxkhs
						option.xAxis[0].data = names
						myChart.setOption(option)
						myChart.off('click')
						myChart.on("click", function (params) {
							if(params.seriesName=='意向客户数')
							{
							layer.open({
								type:2,
								area:['100%','100%'],
								title:'查看详情',
								content:'/static/page/index/saler_customer_list.html?startTime='+$("#intentionalStart_hook").val()+'&endTime=' + $("#intentionalTimeEnd_hook").val()+'&dfSaleId=' + ids[params.dataIndex]+'&dfSaleName=' + names[params.dataIndex]
							})
}else{
	
							layer.open({
								type:2,
								area:['100%','100%'],
								title:'查看详情',
								content:'/static/page/index/saler_follow_list.html?startTime='+$("#intentionalStart_hook").val()+'&endTime=' + $("#intentionalTimeEnd_hook").val()+'&saleId=' + ids[params.dataIndex] +'&saleName='+names[params.dataIndex]
							})
}
				})

					} else {
						layer.msg(res.msg)
					}
				}
			});

		}

	}
})

//完成提醒
function setSuccess(id) {
	var dialog = layer.confirm("确认完成?", function() {
		$.post('/order/updateCallInfo', {
			id: id
		}).done(function(res) {
			if(res.error == '00') {
				layer.close(dialog)
				callInfo.init(callInfo.page);
			} else {
				layer.close(dialog)
				layer.msg(res.msg)
			}
		})
	})
}
//查看预测客户
function forecast_view(type) {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/index/saler_forecast_list.html?startTime=' + $("#salerTimeStart_hook").val() + '&endTime=' + $("#salerTimeEnd_hook").val()+'&type=' + type,
			area: ['100%', '100%']
		});
}

//查看案件列表
function order_customer_view(id) {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/index/saler_customer_list.html?startTime=' + $("#salerTimeStart_hook").val() + '&endTime=' + $("#salerTimeEnd_hook").val(),
			area: ['100%', '100%']
		});
}

//查看案件详情
function case_view(id) {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/case_detail.html?id='+ id,
			area: ['100%', '100%']
		});
}

//查看客户详情
function customer_view(id) {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/customer_detail.html?id='+ id,
			area: ['100%', '100%']
		});
}
//查看客户委托案件明细

function customer_case_view(flag){
		var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/index/saler_turnover_list.html?startTime=' + $("#salerTimeStart_hook").val() + '&endTime=' + $("#salerTimeEnd_hook").val() +'&flag=' + flag,
			area: ['100%', '100%']
		});
}

//写跟进次数
function gj_view(type,valid) {
	console.log(valid);
	var html = '/static/page/index/saler_follow_list.html?startTime=' + $("#salerTimeStart_hook").val() + '&endTime=' + $("#salerTimeEnd_hook").val() + '&type=' + type;
	valid&&(html+='&valid=')
	valid&&(html+= valid)
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: html,
			area: ['100%', '100%']
		});
}
//拜访
function visit_view() {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/static/page/index/saler_visit_list.html?startTime=' + $("#salerTimeStart_hook").val() + '&endTime=' + $("#salerTimeEnd_hook").val(),
			area: ['100%', '100%']
		});
}


//销售助手
function assis_view(flag,title) {
	var index = layer
		.open({
			type: 2,
			title: title,
			content: '/static/page/index/saler_assistant.html?flag='+flag,
			area: ['100%', '100%']
		});
}


function viewOrder(id) {
	var index = layer
		.open({
			type: 2,
			title: '查看详情',
			content: '/order/viewOrder.do?id=' +
				id,
			area: ['100%', '100%']
		});
}

function viewCustomer(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/customer/view.do?id=' +
			id,
		area: ['100%', '100%']
	});
}

function viewDetail(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/order/view.do?id=' + id,
		area: ['100%', '100%']
	});
}

function viewLinkMan(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/linkman/view.do?id=' +
			id,
		area: ['100%', '100%']
	});
}

function viewTask(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/workBench/views.do?id=' +
			id,
		area: ['100%', '100%']
	});
}

function viewTask(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/workBench/views.do?id=' +
			id,
		area: ['100%', '100%']
	});
}

//查看快递
function viewExpress(id) {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/express/view.do?id=' + id + '#taskViewer',
		area: ['100%', '100%'],
	});
}

//完成任务
function doUpdate(id) {
	layer
		.confirm(
			"确定要完成任务吗?",
			function(result) {
				if(result) {
					var url = "/workBench/doUpdate.do?id=" +
						id + "&tm=" + new Date().getTime();
					$.get(url, function(data) {
						location.reload()
					});
				};
			});
}
//审核
function sh(type, id) {
	var url = '/vistsh/goEdit.do?id=';
	switch(type) {
		case "外访":
			break;
		case "诉讼/仲裁":
			url = '/lawsuitaudit/goEdit.do?id='
			break;
		case "案件报告":
			url = '/workBench/views1.do?id='
			break;
		default:
			break;
	}
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: url + id,
		area: ['100%', '100%'],
	});

}