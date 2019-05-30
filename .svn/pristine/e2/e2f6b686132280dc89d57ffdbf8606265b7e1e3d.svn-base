const config = {
	isKhGh: yo.getQueryString("isKhGh") || 0, //0,客户公海,2潜在客户,3有意向公海,1无意向公海,4大客户公海
	role: localStorage.userRole,
	api_detail: '/mainIndex/showSwgwYjmbDetatil', //商务顾问业绩目标完成情况
	time: yo.getQueryString("time"),
	id: yo.getQueryString("id"),
	saleName: yo.getQueryString("saleName"),
	api_user: '/user/getUserInfo',
	ch: yo.getQueryString("ch"),
	jidu: yo.getQueryString("jidu"),
	type: yo.getQueryString("type")
}

if(config.role == '销售精英' || config.role == '经理') {
	config.isKhGh = 4
}

var app = {};
var app2 = {};
var app3 = {};
var app4 = {};
var option = null;
var option2 = null;
var option3 = null;
var option4 = null;
option = {
	title: {
		text: '',
		textStyle: {
			//文字颜色
			color: '#3a3a3a',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			//fontWeight: 'bold',
			//字体大小
			fontSize: 16
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['商务顾问业绩目标完成情况']
	},
	xAxis: {
		type: 'category',
		data: []
	},
	yAxis: {
		type: 'value',
		max: ''
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
							offset: 0,
							color: '#d9ebfd'
						},
						{
							offset: 0.5,
							color: '#f6fafe'
						},
						{
							offset: 0.8,
							color: '#ffffff'
						}
					]
				)
			}
		},
		itemStyle: {
			normal: {
				color: '#459df5'
			}
		},
	}]
};
option2 = {
	title: {
		text: '',
		textStyle: {
			//文字颜色
			color: '#3a3a3a',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			//fontWeight: 'bold',
			//字体大小
			fontSize: 16
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['商务顾问业绩目标完成情况']
	},
	xAxis: {
		type: 'category',
		data: []
	},
	yAxis: {
		type: 'value',
		max: ''
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
							offset: 0,
							color: '#d9ebfd'
						},
						{
							offset: 0.5,
							color: '#f6fafe'
						},
						{
							offset: 0.8,
							color: '#ffffff'
						}
					]
				)
			}
		},
		itemStyle: {
			normal: {
				color: '#459df5'
			}
		},
	}]
};
option3 = {
	title: {
		text: '',
		textStyle: {
			//文字颜色
			color: '#3a3a3a',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			//fontWeight: 'bold',
			//字体大小
			fontSize: 16
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['商务顾问业绩目标完成情况']
	},
	xAxis: {
		type: 'category',
		data: []
	},
	yAxis: {
		type: 'value',
		max: ''
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
							offset: 0,
							color: '#d9ebfd'
						},
						{
							offset: 0.5,
							color: '#f6fafe'
						},
						{
							offset: 0.8,
							color: '#ffffff'
						}
					]
				)
			}
		},
		itemStyle: {
			normal: {
				color: '#459df5'
			}
		},
	}]
};
option4 = {
	title: {
		text: '',
		textStyle: {
			//文字颜色
			color: '#3a3a3a',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			//fontWeight: 'bold',
			//字体大小
			fontSize: 16
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['商务顾问业绩目标完成情况']
	},
	xAxis: {
		type: 'category',
		data: []
	},
	yAxis: {
		type: 'value',
		max: ''
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		areaStyle: {
			normal: {
				color: new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [{
							offset: 0,
							color: '#d9ebfd'
						},
						{
							offset: 0.5,
							color: '#f6fafe'
						},
						{
							offset: 0.8,
							color: '#ffffff'
						}
					]
				)
			}
		},
		itemStyle: {
			normal: {
				color: '#459df5'
			}
		},
	}]
};
//商务顾问环形进度1
var labelTop = { //上层样式
	normal: {
		color: '#fdb54e',
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'top',
				fontSize: 14
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter = { //环内样式
	normal: { //默认样式
		label: { //标签
			formatter: function(params) {
				return 100 - params.value + '%'
			},
			// labelLine.length：30,  //线长，从外边缘起计算，可为负值
			textStyle: { //标签文本样式
				baseline: 'top' //垂直对其方式
			}
		}
	},
};
var labelBottom = { //底层样式
	normal: {
		color: '#d3d6da',
		label: {
			show: true,
			position: 'center',
			fontSize: 12
		},
		labelLine: {
			show: false
		}
	},
	emphasis: { //悬浮式样式
		color: '#d3d6da'
	}
};
var radius = ['80%', '90%']; // 半径[内半径，外半径]

var pieChartOption = {
	title: {
		text: '',
		subtext: '',
		x: 'center',
	},
	animation: false,
	tooltip: { // 提示框. Can be overwrited by series or data
		trigger: 'axis',
		//show: true,   //default true
		showDelay: 0,
		hideDelay: 50,
		transitionDuration: 0,
		borderRadius: 8,
		borderWidth: 2,
		padding: 10, // [5, 10, 15, 20]
	},
	series: [{
		type: 'pie',
		center: ['50%', '55%'], //圆心坐标（div中的%比例）
		radius: radius, //半径
		x: '0%', // for funnel
		itemStyle: labelTop, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop
			},
			{
				name: '到款金额进度',
				value: 0,
				itemStyle: labelBottom
			}
		]
	}]
};

//商务顾问环形进度2
var labelTop2 = { //上层样式
	normal: {
		color: '#53c1a6',
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'top',
				fontSize: 14
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter2 = { //环内样式
	normal: { //默认样式
		label: { //标签
			formatter: function(params) {
				return 100 - params.value + '%'
			},
			// labelLine.length：30,  //线长，从外边缘起计算，可为负值
			textStyle: { //标签文本样式
				baseline: 'top' //垂直对其方式
			}
		}
	},
};
var labelBottom2 = { //底层样式
	normal: {
		color: '#d3d6da',
		label: {
			show: true,
			position: 'center',
			fontSize: 12
		},
		labelLine: {
			show: false
		}
	},
	emphasis: { //悬浮式样式
		color: '#d3d6da'
	}
};
var radius2 = ['80%', '90%']; // 半径[内半径，外半径]

var pieChartOption2 = {
	title: {
		text: '',
		subtext: '',
		x: 'center',
	},
	animation: false,
	tooltip: { // 提示框. Can be overwrited by series or data
		trigger: 'axis',
		//show: true,   //default true
		showDelay: 0,
		hideDelay: 50,
		transitionDuration: 0,
		borderRadius: 8,
		borderWidth: 2,
		padding: 10, // [5, 10, 15, 20]
	},
	series: [{
		type: 'pie',
		center: ['50%', '55%'], //圆心坐标（div中的%比例）
		radius: radius2, //半径
		x: '0%', // for funnel
		itemStyle: labelTop2, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop2
			},
			{
				name: '合同数量进度',
				value: 0,
				itemStyle: labelBottom2
			}
		]
	}]
};

//商务顾问环形进度3
var labelTop3 = { //上层样式
	normal: {
		color: '#fdb54e',
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'top',
				fontSize: 14
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter3 = { //环内样式
	normal: { //默认样式
		label: { //标签
			formatter: function(params) {
				return 100 - params.value + '%'
			},
			// labelLine.length：30,  //线长，从外边缘起计算，可为负值
			textStyle: { //标签文本样式
				baseline: 'top' //垂直对其方式
			}
		}
	},
};
var labelBottom3 = { //底层样式
	normal: {
		color: '#d3d6da',
		label: {
			show: true,
			position: 'center',
			fontSize: 12
		},
		labelLine: {
			show: false
		}
	},
	emphasis: { //悬浮式样式
		color: '#d3d6da'
	}
};
var radius3 = ['80%', '90%']; // 半径[内半径，外半径]

var pieChartOption3 = {
	title: {
		text: '',
		subtext: '',
		x: 'center',
	},
	animation: false,
	tooltip: { // 提示框. Can be overwrited by series or data
		trigger: 'axis',
		//show: true,   //default true
		showDelay: 0,
		hideDelay: 50,
		transitionDuration: 0,
		borderRadius: 8,
		borderWidth: 2,
		padding: 10, // [5, 10, 15, 20]
	},
	series: [{
		type: 'pie',
		center: ['50%', '55%'], //圆心坐标（div中的%比例）
		radius: radius3, //半径
		x: '0%', // for funnel
		itemStyle: labelTop3, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop3
			},
			{
				name: '委案金额进度',
				value: 0,
				itemStyle: labelBottom3
			}
		]
	}]
};

//商务顾问环形进度4
var labelTop4 = { //上层样式
	normal: {
		color: '#53c1a6',
		label: {
			show: true,
			position: 'center',
			formatter: '{b}',
			textStyle: {
				baseline: 'top',
				fontSize: 14
			}
		},
		labelLine: {
			show: false
		}
	}
};
var labelFromatter4 = { //环内样式
	normal: { //默认样式
		label: { //标签
			formatter: function(params) {
				return 100 - params.value + '%'
			},
			// labelLine.length：30,  //线长，从外边缘起计算，可为负值
			textStyle: { //标签文本样式
				baseline: 'top' //垂直对其方式
			}
		}
	},
};
var labelBottom4 = { //底层样式
	normal: {
		color: '#d3d6da',
		label: {
			show: true,
			position: 'center',
			fontSize: 12
		},
		labelLine: {
			show: false
		}
	},
	emphasis: { //悬浮式样式
		color: '#d3d6da'
	}
};
var radius4 = ['80%', '90%']; // 半径[内半径，外半径]

var pieChartOption4 = {
	title: {
		text: '',
		subtext: '',
		x: 'center',
	},
	animation: false,
	tooltip: { // 提示框. Can be overwrited by series or data
		trigger: 'axis',
		//show: true,   //default true
		showDelay: 0,
		hideDelay: 50,
		transitionDuration: 0,
		borderRadius: 8,
		borderWidth: 2,
		padding: 10, // [5, 10, 15, 20]
	},
	series: [{
		type: 'pie',
		center: ['50%', '55%'], //圆心坐标（div中的%比例）
		radius: radius4, //半径
		x: '0%', // for funnel
		itemStyle: labelTop4, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop4
			},
			{
				name: '拜访量进度',
				value: 0,
				itemStyle: labelBottom4
			}
		]
	}]
};
require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			dxmonth: new Date().getFullYear().toString(),
			dxmonth2: config.time.split('-')[0],
			dxmonth3: config.time.split('-')[0],
			dxmonth4: config.time.split('-')[0],
			dx: {
				dkje: '',
				mbdkje: '',
				htsl: '',
				mbhtsl: '',
				ddje: '',
				mbddje: '',
				list: [],
				list2: [],
				list3: [],
				list4: [],
				idchange2: '',
				idchange3: '',
				gxtime: '',
				gxtime2: '',
				gxtime3: '',
				gxtime4: '',
			},
			saleId: config.id,
			saleId2: config.id,
			saleId3: config.id,
			saleId4: config.id,
			listId: []
		},
		watch: {
			'dxmonth': function(val) {
				this.getYjmb(this.dxmonth, 0, this.saleId);
			},
			'saleId': function(val) {
				this.getYjmb(this.dxmonth, 0, this.saleId);
			},
			'dxmonth2': function(val) {
				this.getYjmb2(this.dxmonth2, 1, this.saleId2, 1); //最后的1为了控制时间切换时进度盘更新
			},
			'saleId2': function(val) {
				this.getYjmb2(this.dxmonth2, 1, this.saleId2, 2); //最后的2为了控制人员切换时进度盘跟着切换
			},
			'dxmonth3': function(val) {
				this.getYjmb3(this.dxmonth3, 2, this.saleId3, 1);
			},
			'saleId3': function(val) {
				this.getYjmb3(this.dxmonth3, 2, this.saleId3, 2);
			},
			'dxmonth4': function(val) {
				this.getYjmb4(this.dxmonth4, 3, this.saleId4);
			},
			'saleId4': function(val) {
				this.getYjmb4(this.dxmonth4, 3, this.saleId4);
			},
		},

		computed: {

		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide");
		},

		mounted() {
			const that = this
			//电销独有
			laydate.render({
				elem: '#dxmonth',
				type: 'year',
				done: function(value, date) {
					that.dxmonth = value;
				}
			});
			laydate.render({
				elem: '#dxmonth2',
				type: 'year',
				done: function(value, date) {
					that.dxmonth2 = value;
				}
			});
			laydate.render({
				elem: '#dxmonth3',
				type: 'year',
				done: function(value, date) {
					that.dxmonth3 = value;
				}
			});
			laydate.render({
				elem: '#dxmonth4',
				type: 'year',
				done: function(value, date) {
					that.dxmonth4 = value;
				}
			});
			this.getYjmb(that.dxmonth, 0, config.id); //商务顾问
			this.getYjmb2(that.dxmonth2, 1, config.id); //商务顾问2
			this.getYjmb3(that.dxmonth3, 2, config.id); //商务顾问3
			this.getYjmb4(that.dxmonth4, 3, config.id); //商务顾问4
			this.getUser()
		},

		methods: {
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
			getUser() {
				const that = this;
				that.loading();
				$.ajax({
					type: "post",
					url: config.api_user,
					async: true,
					data: {
						ROLE_ID: 'b729e9334ad64c15a4e47d88b8c2638f,e350acd05a6244c79136616302b7dfd6,008615f04f39499fb73e5f323add988a,6f247fed28e94194ac66020e55957496,28f1842e2463492a9eb6ddf0def91658,73340766cf3d43af91daff3128adad84,b62d6d19bed64ee199f2c1a5b252b57b'
					},
					success: function(res) {
						that.loading('close')
						that.listId = res
					}
				});
			},
			getYjmb(time, type, saleId) {
				const that = this
				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31';
				var hhd, hhd1;
				$.ajax({
					type: 'post',
					url: config.api_detail,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime,
						type: type,
						saleId: saleId
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var list = [];
							var list1 = [];
							for(var i = 0; i < res.result.length; i++) {
								var el = res.result[i];
								list.push(el.name);
								list1.push(el.dkje)
							}
							if(config.jidu == 0 || config.jidu == 1 || config.jidu == 2 || config.jidu == 3) {
								that.dx.gxtime = config.jidu;
								that.dx.dkje = res.result[config.jidu].dkje || 0;
								that.dx.mbdkje = res.result[config.jidu].mbdkje || 0;
								hhd = Math.round(that.dx.dkje / that.dx.mbdkje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
							} else {
								that.dx.gxtime = 0;
								that.dx.dkje = res.result[0].dkje || 0;
								that.dx.mbdkje = res.result[0].mbdkje || 0;
								hhd = Math.round(that.dx.dkje / that.dx.mbdkje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
							}

							hhd1 = hhd + "%"
							that.dxhx(hhd, hhd1, time, that.dx.gxtime,saleId)
							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var myChart = echarts.init(document.getElementById('main'));
							option.xAxis.data = ['一季度', '二季度', '三季度', '四季度'];
							option.yAxis.max = Math.ceil(max);
							option.series[0].data = list1;
							myChart.setOption(option);
							myChart.off("click");
							myChart.on('click', function(params) {
								that.dx.gxtime = params.dataIndex;
								that.dx.dkje = res.result[params.dataIndex].dkje || 0;
								that.dx.mbdkje = res.result[params.dataIndex].mbdkje || 0;
								hhd = Math.round(that.dx.dkje / that.dx.mbdkje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx(hhd, hhd1, time, that.dx.gxtime,saleId)
							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},

			getYjmb2(time, type, saleId, ischange) {
				const that = this
				var nowDate = that.nowMonth()
				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31';
				var hhd, hhd1;
				$.ajax({
					type: 'post',
					url: config.api_detail,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime,
						type: type,
						saleId: saleId
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var list = [];
							var list1 = [];
							for(var i = 0; i < res.result.length; i++) {
								var el = res.result[i];
								list.push(el.name);
								list1.push(el.htsl)
							}
							if(ischange == undefined) {
								if(config.jidu == 0 || config.jidu == 1 || config.jidu == 2 || config.jidu == 3) {
									for(var i = 0; i < res.result.length; i++) {
										if(nowDate == res.result[i].time) {
											that.dx.gxtime2 = res.result[i].time
											that.dx.idchange2 = i
											that.dx.htsl = res.result[i].htsl || 0;
											that.dx.mbhtsl = res.result[i].mbhtsl || 0;
											hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
											if(hhd == 'Infinity') {
												hhd = 100
											} else if(isNaN(hhd)) {
												hhd = 0
											}
										}
									}

								} else {
									for(var i = 0; i < res.result.length; i++) {
										if(config.jidu == res.result[i].time) {
											that.dx.gxtime2 = res.result[i].time
											that.dx.idchange2 = i
											that.dx.htsl = res.result[i].htsl || 0;
											that.dx.mbhtsl = res.result[i].mbhtsl || 0;
											hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
											if(hhd == 'Infinity') {
												hhd = 100
											} else if(isNaN(hhd)) {
												hhd = 0
											}
										}
									}
								}
								hhd1 = hhd + "%"
								that.dxhx2(hhd, hhd1, that.dx.gxtime2)
							} else if(ischange == 1) {
								that.dx.gxtime2 = res.result[that.dx.idchange2].time
								that.dx.gxtime2 = res.result[that.dx.idchange2].time
								that.dx.htsl = res.result[that.dx.idchange2].htsl || 0;
								that.dx.mbhtsl = res.result[that.dx.idchange2].mbhtsl || 0;
								hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx2(hhd, hhd1, that.dx.gxtime2)
							} else if(ischange == 2) {
								that.dx.gxtime2 = res.result[that.dx.idchange2].time
								that.dx.htsl = res.result[that.dx.idchange2].htsl || 0;
								that.dx.mbhtsl = res.result[that.dx.idchange2].mbhtsl || 0;
								hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx2(hhd, hhd1, that.dx.gxtime2)
							}

							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var myChart = echarts.init(document.getElementById('main2'));
							option2.xAxis.data = ['四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份', '一月份', '二月份', '三月份'];
							option2.yAxis.max = Math.ceil(max);
							option2.series[0].data = list1;
							myChart.setOption(option2);
							myChart.off("click");
							myChart.on('click', function(params) {
								that.dx.gxtime2 = res.result[params.dataIndex].time
								that.dx.idchange2 = params.dataIndex
								that.dx.htsl = res.result[params.dataIndex].htsl || 0;
								that.dx.mbhtsl = res.result[params.dataIndex].mbhtsl || 0;
								hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx2(hhd, hhd1, that.dx.gxtime2)
							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},

			getYjmb3(time, type, saleId, ischange) {
				const that = this
				var nowDate = that.nowMonth()
				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31';
				var hhd, hhd1;
				$.ajax({
					type: 'post',
					url: config.api_detail,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime,
						type: type,
						saleId: saleId
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var list = [];
							var list1 = [];
							for(var i = 0; i < res.result.length; i++) {
								var el = res.result[i];
								list.push(el.name);
								list1.push(el.ddje)
							}
							if(ischange == undefined) {
								if(config.jidu == 0 || config.jidu == 1 || config.jidu == 2 || config.jidu == 3) {
									for(var i = 0; i < res.result.length; i++) {
										if(nowDate == res.result[i].time) {
											that.dx.gxtime3 = res.result[i].time
											that.dx.idchange3 = i
											that.dx.ddje = res.result[i].ddje || 0;
											that.dx.mbddje = res.result[i].mbddje || 0;
											hhd = Math.round(that.dx.ddje / that.dx.mbddje * 10000) / 100.00
											if(hhd == 'Infinity') {
												hhd = 100
											} else if(isNaN(hhd)) {
												hhd = 0
											}
										}
									}

								} else {
									for(var i = 0; i < res.result.length; i++) {
										if(config.jidu == res.result[i].time) {
											that.dx.gxtime3 = res.result[i].time
											that.dx.idchange3 = i
											that.dx.ddje = res.result[i].ddje || 0;
											that.dx.mbddje = res.result[i].mbddje || 0;
											hhd = Math.round(that.dx.ddje / that.dx.mbddje * 10000) / 100.00
											if(hhd == 'Infinity') {
												hhd = 100
											} else if(isNaN(hhd)) {
												hhd = 0
											}
										}
									}
								}
								hhd1 = hhd + "%"
								that.dxhx3(hhd, hhd1, that.dx.gxtime3)
							} else if(ischange == 1) {
								that.dx.gxtime3 = res.result[that.dx.idchange3].time
								that.dx.ddje = res.result[that.dx.idchange3].ddje || 0;
								that.dx.mbddje = res.result[that.dx.idchange3].mbddje || 0;
								hhd = Math.round(that.dx.ddje / that.dx.mbddje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx3(hhd, hhd1, that.dx.gxtime3)
							} else if(ischange == 2) {
								that.dx.gxtime3 = res.result[that.dx.idchange3].time
								that.dx.ddje = res.result[that.dx.idchange3].ddje || 0;
								that.dx.mbddje = res.result[that.dx.idchange3].mbddje || 0;
								hhd = Math.round(that.dx.ddje / that.dx.mbddje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx3(hhd, hhd1, that.dx.gxtime3)
							}
							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var myChart = echarts.init(document.getElementById('main3'));
							option3.xAxis.data = ['四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份', '一月份', '二月份', '三月份'];
							option3.yAxis.max = Math.ceil(max);
							option3.series[0].data = list1;
							myChart.setOption(option3);
							myChart.off("click");
							myChart.on('click', function(params) {
								that.dx.idchange3 = params.dataIndex
								that.dx.gxtime3 = res.result[params.dataIndex].time
								that.dx.ddje = res.result[params.dataIndex].ddje || 0;
								that.dx.mbddje = res.result[params.dataIndex].mbddje || 0;
								console.log(that.dx.ddje)
								hhd = Math.round(that.dx.ddje / that.dx.mbddje * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%"
								that.dxhx3(hhd, hhd1, that.dx.gxtime3)
							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},

			getYjmb4(time, type, saleId) {
				const that = this
				var nowDate = that.nowMonth()
				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31';
				var hhd, hhd1;
				$.ajax({
					type: 'post',
					url: config.api_detail,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime,
						type: type,
						saleId: saleId
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							//							var list = [];
							//							var list1 = [];
							//							for(var i = 0; i < res.result.length; i++) {
							//								var el = res.result[i];
							//								list.push(el.name);
							//								list1.push(el.htsl)
							//							}
							//							if(config.jidu == 0 || config.jidu == 1 || config.jidu == 2 || config.jidu == 3) {
							//								for(var i = 0; i < res.result.length; i++) {
							//									if(nowDate == res.result[i].time) {
							//										that.dx.htsl = res.result[i].htsl || 0;
							//										that.dx.mbhtsl = res.result[i].mbhtsl || 0;
							//										hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
							//										if(hhd == 'Infinity') {
							//											hhd = 100
							//										} else if(isNaN(hhd)) {
							//											hhd = 0
							//										}
							//									}
							//								}
							//
							//							}else{
							//								for(var i = 0; i < res.result.length; i++) {
							//									if(config.jidu == res.result[i].time) {
							//										that.dx.htsl = res.result[i].htsl || 0;
							//										that.dx.mbhtsl = res.result[i].mbhtsl || 0;
							//										hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
							//										if(hhd == 'Infinity') {
							//											hhd = 100
							//										} else if(isNaN(hhd)) {
							//											hhd = 0
							//										}
							//									}
							//								}
							//							}
							//							hhd1 = hhd + "%"
							//							that.dxhx3(hhd, hhd1)
							//							var max = Number(Math.max.apply(null, list1));
							//							max = (max + max * 0.2)
							//							var myChart = echarts.init(document.getElementById('main2'));
							//							option3.xAxis.data = ['四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份', '一月份', '二月份', '三月份'];
							//							option3.yAxis.max = Math.ceil(max);
							//							option3.series[0].data = list1;
							//							myChart.setOption(option3);
							//							myChart.off("click");
							//							myChart.on('click', function(params) {
							//								that.dx.htsl = res.result[params.dataIndex].htsl || 0;
							//								that.dx.mbhtsl = res.result[params.dataIndex].mbhtsl || 0;
							//								hhd = Math.round(that.dx.htsl / that.dx.mbhtsl * 10000) / 100.00
							//								if(hhd == 'Infinity') {
							//									hhd = 100
							//								} else if(isNaN(hhd)) {
							//									hhd = 0
							//								}
							//								hhd1 = hhd + "%"
							//								that.dxhx2(hhd, hhd1)
							//							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},

			//环形1
			dxhx(hhd, hhd1, time, gxtime,saleId) {
				
				//环形1
				pieChartOption.series[0].data[0].name = hhd1
				pieChartOption.series[0].data[0].value = hhd
				pieChartOption.series[0].data[1].value = 100 - hhd
				var dx;
				if(gxtime == 0) {
					dx = '一';
				} else if(gxtime == 1) {
					dx = '二';
				} else if(gxtime == 2) {
					dx = '三';
				} else if(gxtime == 3) {
					dx = '四';
				}
				gxtime1 = Number(gxtime)+1 
				pieChartOption.title.text = time + '年' + dx + '季度'
				var asd = document.getElementById('pie');
				var pieChart = echarts.init(asd);
				pieChart.setOption(pieChartOption);
				pieChart.off("click");
				pieChart.on("click", function(params) {
					var html = '/static/page/index/saler_turnover_list.html?year=' + time + '&gxtime=' + gxtime1 + '&USER_ID='+saleId+'&flag=3';
					var index = layer.open({
						type: 2,
						title: '商务顾问业绩目标-到款金额完成情况',
						content: html,
						area: ['100%', '100%']
					});

				});

			},
			//环形2
			dxhx2(hhd, hhd1, gxtime) {
				const that = this;
				pieChartOption2.series[0].data[0].name = hhd1
				pieChartOption2.series[0].data[0].value = hhd
				pieChartOption2.series[0].data[1].value = 100 - hhd
				pieChartOption2.title.text = gxtime + '月份';
				var asd = document.getElementById('pie2');
				var pieChart = echarts.init(asd);
				pieChart.setOption(pieChartOption2);
				pieChart.off("click");
				pieChart.on("click", function(params) {
					var html = '/static/page/index/saler_hetong_list.html?gxtime=' + gxtime + '&saleId=' + that.saleId2 ;
					var index = layer.open({
						type: 2,
						title: '商务顾问业绩目标-合同数量完成情况',
						content: html,
						area: ['100%', '100%']
					});

				});

			},
			//环形3
			dxhx3(hhd, hhd1, gxtime) {
				const that = this;
				pieChartOption3.series[0].data[0].name = hhd1
				pieChartOption3.series[0].data[0].value = hhd
				pieChartOption3.series[0].data[1].value = 100 - hhd
				var asd = document.getElementById('pie3');
				pieChartOption3.title.text = gxtime + '月份';
				var pieChart = echarts.init(asd);
				pieChart.setOption(pieChartOption3);
				pieChart.off("click");
				pieChart.on("click", function(params) {
					var html = '/static/page/index/saler_weian_list.html?gxtime=' + gxtime + '&saleId=' + that.saleId3;
					var index = layer.open({
						type: 2,
						title: '商务顾问业绩目标-委案金额',
						content: html,
						area: ['100%', '100%']
					});

				});

			},
			//环形4
			dxhx4(hhd, hhd1) {
				//				var n = nextTime.split('-');
				//				var year = n[0];
				//				var month = n[1];
				//				var d = new Date(year, month, 0);
				//				var day = d.getDate();
				//				t0 = nextTime + '-01';
				//				t1 = nextTime + '-' + day
				//环形1
				pieChartOption4.series[0].data[0].name = hhd1
				pieChartOption4.series[0].data[0].value = hhd
				pieChartOption4.series[0].data[1].value = 100 - hhd
				var asd = document.getElementById('pie4');
				var pieChart = echarts.init(asd);
				pieChart.setOption(pieChartOption4);
				pieChart.off("click");
				pieChart.on("click", function(params) {
					var html = '/static/page/index/saler_follow_list.html?startTime=' + t0 + '&endTime=' + t1 + '&type=1' + '&saleId=' + id + '&saleName=' + config.saleName;
					var index = layer.open({
						type: 2,
						title: '电话量',
						content: html,
						area: ['100%', '100%']
					});

				});

			},

			//获取当前月
			nowMonth() {
				var date = new Date;
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				month = (month < 10 ? "0" + month : month);
				var nowDate = (year.toString() + '-' + month.toString());
				return nowDate;
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