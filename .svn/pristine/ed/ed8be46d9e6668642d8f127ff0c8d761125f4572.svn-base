const config = {
	isKhGh: yo.getQueryString("isKhGh") || 0, //0,客户公海,2潜在客户,3有意向公海,1无意向公海,4大客户公海
	role: localStorage.userRole,
	api_xspmReport: '/report/xspmReport.do', //查询
	api_SaleYjtj: '/mainIndex/showSaleYjtj', //销售业绩统计
	api_Xstj: '/mainIndex/showSwgwXstj', //商务顾问销售统计
	api_Yjmb: '/mainIndex/showSwgwYjmb', //商务顾问业绩目标  
	api_yzjb: '/mainIndex/showYzsjdk', //运作简报 
	api_detail: '/main/showdfSaleProcessDetail.do', //电销业绩目标完成情况
	api_zhou: '/report/showReportDate.do', //周
	api_all: '/mainIndex/showAll', // 电话量、意向客户数、拜访量、签单量
	api_task: '/workBench/taskList.do', //我的任务
	api_shenhe: '/workBench/mysh.do', //我的审核
	api_wdtx: '/workBench/callList.do?flag=2', //我的提醒
	api_gqtx: '/workBench/callList.do?flag=1', //过期提醒
	api_swgw: '/mainIndex/showSwgwYjmb', //商务顾问独有
	flag: yo.getQueryString("flag")
}

if(config.role == '销售精英' || config.role == '经理') {
	config.isKhGh = 4
}
//电话量
var colors = ['#666666', '#666666'];
var option = {
	title: {
		text: '电话量',
		textStyle: {
			//文字颜色
			color: '#3a3a3a',
			//字体风格,'normal','italic','oblique'
			fontStyle: 'normal',
			//字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
			//fontWeight: 'bold',
			//字体大小
			fontSize: 18
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['电话量', '有效电话量']
	},
	xAxis: [{
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五']
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
			name: '有效电话量',
			position: 'right',
			min: 0,
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
			barWidth: 18, //柱图宽度
			itemStyle: {
				normal: {
					color: '#a2b9cb'
				}
			},
		},
		{
			name: '有效电话量',
			type: 'bar',
			yAxisIndex: 1,
			data: [],
			barWidth: 18, //柱图宽度
			itemStyle: {
				normal: {
					color: '#459df5'
				}
			},
		}
	]
}
//电话量跳转
function salerList(id, name, startTime, endTime, flag) {
	layer.open({
		type: 2,
		title: "合同记录详情",
		area: ["100%", "100%"],
		content: "saler_sales_detail.html?saleId=" + id + "&saleName=" + name + "&startTime=" + startTime + "&endTime=" + endTime + "&flag=" + flag
	})
}
//意向客户数
var app1 = {};
var option1 = null;
option1 = {
	title: {
		text: '意向客户数',
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
		data: ['意向客户数']
	},
	xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		itemStyle: {
			normal: {
				color: '#fdb54e'
			}
		},
	}]
};

//拜访量
var app2 = {};
var option2 = null;
option2 = {
	title: {
		text: '拜访量',
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
		data: ['拜访量']
	},
	xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [820, 932, 901, 934, 1290],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		itemStyle: {
			normal: {
				color: '#fdb54e'
			}
		},
	}]
};

//签单量
var app3 = {};
var option3 = null;
option3 = {
	title: {
		text: '签单量',
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
		data: ['签单量']
	},
	xAxis: {
		type: 'category',
		data: ['周一', '周二', '周三', '周四', '周五']
	},
	yAxis: {
		type: 'value'
	},
	series: [{
		data: [],
		type: 'line',
		symbol: 'circle',
		symbolSize: 6,
		itemStyle: {
			normal: {
				color: '#459df5'
			}
		},
	}]
};

//商务顾问销售统计
var option4 = {
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
			fontSize: 18
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['已成交客户数', '订单数量', '订单总金额', '到款金额']
	},
	xAxis: [{
		type: 'category',
		data: []
	}],
	yAxis: [{
			type: 'value',
			name: '数量',
			position: 'left',

		},
		{
			type: 'value',
			name: '金额',
			position: 'right',
		},

	],
	series: [{
			name: '已成交客户数',
			type: 'bar',
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#a2b9cb'
				}
			},
		},
		{
			name: '订单数量',
			type: 'bar',
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#459df5'
				}
			},
		},
		{
			name: '订单总金额',
			type: 'bar',
			yAxisIndex: 1,
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#52c1a6'
				}
			},
		},
		{
			name: '到款金额',
			type: 'bar',
			yAxisIndex: 1,
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#fdb54e'
				}
			},
		},
	]
}

//商务顾问业绩目标完成情况
var app5 = {};
var option5 = null;
option5 = {
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

//电销业绩目标完成情况
var option6 = {
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
			fontSize: 18
		}
	},
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
		},
		{
			type: 'value',
			name: '意向客户数',
			position: 'right',
		},
	],
	series: [{
			name: '电话量',
			type: 'bar',
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#a2b9cb'
				}
			},
		},
		{
			name: '意向客户数',
			type: 'bar',
			yAxisIndex: 1,
			data: [],
			barWidth: 20, //柱图宽度
			itemStyle: {
				normal: {
					color: '#459df5'
				}
			},
		},
	]
}

//运作简报
var app7 = {};
var option7 = null;
option7 = {
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
		data: ['运作简报']
	},
	xAxis: {
		type: 'category',
		data: []
	},
	yAxis: {
		type: 'value',
		max: '',
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

//电销独自拥有 高端大气上档次
//电销业绩目标完成情况
var dxOnly = {
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
			fontSize: 18
		}
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		data: ['电话量', '意向客户数']
	},
	grid: {
		x: 40,
		x2: 40
	},
	xAxis: [{
		type: 'category',
		data: ['四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月', '一月', '二月', '三月', ]
	}],
	yAxis: [{
			type: 'value',
			name: '电话量',
			position: 'left',
		},
		{
			type: 'value',
			name: '意向客户数',
			position: 'right',
		},
	],
	series: [{
			name: '电话量',
			type: 'bar',
			data: [],
			barWidth: 10, //柱图宽度
			itemStyle: {
				normal: {
					color: '#459df5'
				}
			},
		},
		{
			name: '意向客户数',
			type: 'bar',
			yAxisIndex: 1,
			data: [],
			barWidth: 10, //柱图宽度
			itemStyle: {
				normal: {
					color: '#53c1a6'
				}
			},
		},
	]
}
//电销环形进度1
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
				name: '电话量进度',
				value: 0,
				itemStyle: labelBottom
			}
		]
	}]
};

//电销环形进度2
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
		itemStyle: labelTop, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop2
			},
			{
				name: '意向客户数进度',
				value: 0,
				itemStyle: labelBottom2
			}
		]
	}]
};

//商务顾问独有
//业绩到款
var labelTop_1 = { //上层样式
	normal: {
		color: '#ea5849',
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
var labelFromatter_1 = { //环内样式
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
var labelBottom_1 = { //底层样式
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

var pieChartOption_1 = {
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
		center: ['50%', '50%'], //圆心坐标（div中的%比例）
		radius: radius, //半径
		x: '0%', // for funnel
		itemStyle: labelTop_1, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop_1
			},
			{
				name: '业绩到款(季度)',
				value: 0,
				itemStyle: labelBottom_1
			}
		]
	}]
};

//合同数量
var labelTop_2 = { //上层样式
	normal: {
		color: '#fdb64e',
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
var labelFromatter_2 = { //环内样式
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
var labelBottom_2 = { //底层样式
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

var pieChartOption_2 = {
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
		center: ['50%', '50%'], //圆心坐标（div中的%比例）
		radius: radius, //半径
		x: '0%', // for funnel
		itemStyle: labelTop_2, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop_2
			},
			{
				name: '合同数量(月)',
				value: 0,
				itemStyle: labelBottom_2
			}
		]
	}]
};

//委案金额
var labelTop_3 = { //上层样式
	normal: {
		color: '#ea584b',
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
var labelFromatter_3 = { //环内样式
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
var labelBottom_3 = { //底层样式
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

var pieChartOption_3 = {
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
		center: ['50%', '50%'], //圆心坐标（div中的%比例）
		radius: radius, //半径
		x: '0%', // for funnel
		itemStyle: labelTop_3, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop_3
			},
			{
				name: '委案金额(月)',
				value: 0,
				itemStyle: labelBottom_3
			}
		]
	}]
};

//拜访量
var labelTop_4 = { //上层样式
	normal: {
		color: '#51c1a8',
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
var labelFromatter_4 = { //环内样式
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
var labelBottom_4 = { //底层样式
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

var pieChartOption_4 = {
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
		center: ['50%', '50%'], //圆心坐标（div中的%比例）
		radius: radius, //半径
		x: '0%', // for funnel
		itemStyle: labelTop_4, //graphStyleA,//图形样式 // 当查到的数据不存在（并非为0），此属性隐藏
		data: [{
				name: '0%',
				value: 0,
				itemStyle: labelTop_4
			},
			{
				name: '拜访客户量(月)',
				value: 0,
				itemStyle: labelBottom_4
			}
		]
	}]
};

require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			year: new Date().getFullYear().toString(), //销售业绩统计年份
			startyear: '', //销售简报时间
			endyear: '',
			isactive: true,
			month: '',
			monthShow: true,
			jiduShow: false,
			show: true,
			show1: false,
			show2: true,
			show3: false,
			show4: false,
			show5: false,
			c: [],
			c1: [],
			c2: [], //商务顾问业绩目标
			c4: [], //运作简报
			year1: new Date().getFullYear().toString(),
			month1: '',
			SaleYjtj: { //销售业绩统计
				ycj: '',
				dd: '',
				ddzje: '',
				yhk: '',
				dk: ''
			},
			Salejb: { //销售简报
				ddzje: '',
				hkje: '',
				ycjkh: '',
				yjje: '',
				yxkhs: ''
			},
			postSaleYjtj: {}, //销售业绩统计参数
			postSalejb: {}, //销售简报参数
			cainian: new Date().getFullYear().toString(), //运作简报财年
			YjmbTime: '0', //商务顾问业绩目标完成情况时间
			YjmbType: '0', //商务顾问业绩目标完成情况类型
			yjmbMonth: '',
			qubie: false, //商务顾问月份
			qubie1: true, //商务顾问季度
			sevens: [], //周列表
			cjd: '', //all季度
			task: {
				list: [], //我的任务
			},
			shenhe: {
				list: [], //我的审核
			},
			mytx: {
				list: [], //我的提醒
			},
			gqtx: {
				list: [], //过期提醒
			},
			postDataTask: {},
			postDataShenhe: {},
			postDataMytx: {},
			postDataGqtx: {},
			dxmonth: new Date().getFullYear().toString(), //电销独有
			dx: {
				dhl: '',
				mbdhl: '',
				yxkhs: '',
				mbyxkhs: '',
				list: []
			},
			swgw: {
				ddzje: '',
				htsl: '',
				mbddzje: '',
				mbhtsl: '',
				mbyjdk: '',
				yjdk: ''
			},
			idchange3: ''
		},
		watch: {
			'year': function(val) {
				this.getSaleYjtj(val);
			},
			'startyear': function(val) {
				this.getSalejb(this.startyear, this.endyear);
			},
			'endyear': function(val) {
				this.getSalejb(this.startyear, this.endyear);
			},
			'year1': function(val) {
				this.getData1(val);
			},
			'cainian': function(val) {
				this.getCainian(val);
			},
			'YjmbTime': function(val) {
				this.getYjmb(val, this.YjmbType, 0);
			},
			'YjmbType': function(val) {
				console.log(val);
				if(val == 0) {
					this.getYjmb(this.YjmbTime, val, 0);
					this.qubie1 = true;
					this.qubie = false;
				} else {
					this.getYjmb(this.yjmbMonth, val, 1);
					this.qubie1 = false;
					this.qubie = true;
				}
			},
			'month1': function(val) {
				this.getData2(this.month1);
			},
			'month': function(val) {
				this.getData(val, 0, 0);
			},
			'dxmonth': function(val) {
				this.getDataDx(val, 1);
			}
		},

		computed: {
			dhl: function() {
				var list = []
				for(var i = 0; i < this.c.length; i++) {
					var el = this.c[i];
					list.push(el.dhl || 0)
				}
				return list;
			},
			yxdhl: function() {
				var list = []
				for(var i = 0; i < this.c.length; i++) {
					var el = this.c[i];
					list.push(el.yxdhl || 0)
				}
				return list;
			},
			//商务顾问销售统计
			name1: function() {
				var list = []
				for(var i = 0; i < this.c1.length; i++) {
					var el = this.c1[i];
					list.push(el.name)
				}
				return list;
			},
			khsl: function() {
				var list = []
				for(var i = 0; i < this.c1.length; i++) {
					var el = this.c1[i];
					list.push(el.khsl || 0)
				}
				return list;
			},
			ddsl: function() {
				var list = []
				for(var i = 0; i < this.c1.length; i++) {
					var el = this.c1[i];
					list.push(el.ddsl || 0)
				}
				return list;
			},
			ddzje: function() {
				var list = []
				for(var i = 0; i < this.c1.length; i++) {
					var el = this.c1[i];
					list.push(el.ddzje || 0)
				}
				return list;
			},
			dkje: function() {
				var list = []
				for(var i = 0; i < this.c1.length; i++) {
					var el = this.c1[i];
					list.push(el.dkje || 0)
				}
				return list;
			},
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide");
		},

		mounted() {
			//			this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, this.kind)
			const that = this;
			that.showMonthFirstDay();
			//销售业绩统计选择年份
			laydate.render({
				elem: '#year',
				type: 'year',
				done: function(value, date) {
					that.year = value;
				}
			});

			laydate.render({
				elem: '#year1',
				type: 'year',
				done: function(value, date) {
					that.year1 = value;
				}
			});
			var startyear = laydate.render({
				elem: '#startyear',
				max: that.endyear,
				done: function(value, date) {
					that.startyear = value;
					if(value !== '') {
						endyear.config.min.year = date.year;
						endyear.config.min.month = date.month - 1;
						endyear.config.min.date = date.date;
					} else {
						endyear.config.min.year = '';
						endyear.config.min.month = '';
						endyear.config.min.date = '';
					}
				}
			});
			var endyear = laydate.render({
				elem: '#endyear',
				min: that.startyear,
				done: function(value, date) {
					that.endyear = value;
					if(value !== '') {
						startyear.config.max.year = date.year;
						startyear.config.max.month = date.month - 1;
						startyear.config.max.date = date.date;
					} else {
						startyear.config.max.year = '';
						startyear.config.max.month = '';
						startyear.config.max.date = '';
					}
				}
			});
			laydate.render({
				elem: '#month1',
				type: 'month',
				done: function(value, date) {
					that.month1 = value;
				}
			});
			laydate.render({
				elem: '#yjmbMonth',
				type: 'month',
				done: function(value, date) {
					that.yjmbMonth = value;
					that.getYjmb(that.yjmbMonth, that.YjmbType, 1);
				}
			});
			laydate.render({
				elem: '#cainian',
				type: 'year',
				done: function(value, date) {
					that.cainian = value;
				}
			});
			//电销独有
			laydate.render({
				elem: '#dxmonth',
				type: 'year',
				done: function(value, date) {
					that.dxmonth = value;
				}
			});
			this.month1 = this.nowMonth();
			this.yjmbMonth = this.nowMonth();
			this.getSaleYjtj(new Date().getFullYear().toString());
			this.getSalejb(this.startyear, this.endyear); //销售简报
			this.getData1(new Date().getFullYear().toString()); //商务顾问销售统计初始化
			this.getData2(this.month1); //电销业绩目标完成情况
			this.getCainian(this.cainian); //运作简报
			this.getYjmb(this.YjmbTime, this.YjmbType, 0); //商务顾问业绩目标完成情况类型
			this.showWen();
			this.taskList(); //我的任务初始化
			this.shen(); //我的审核初始化
			this.tx1(); //我的提醒初始化
			this.tx2(); //过期提醒初始化
			this.getDataDx(this.dxmonth); //电销独有
			this.getDataSwgw(); //商务顾问独有
			this.loop();


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

			//切换数据
			changeActive(e) {
				const that = this;
				if(e == 1) {
					that.show = true;
					that.show1 = false;
					that.monthShow = true;
					that.jiduShow = false;
					that.getData(that.month, 0, 0);
				} else {
					that.show = false;
					that.show1 = true;
					that.monthShow = false;
					that.jiduShow = true;
					var date = new Date().getFullYear().toString();
					that.cjd = date + '-04-01' + '~' + date + '-06-30';
					that.getData(that.cjd, 1, 1);
					that.show2 = true;
					that.show3 = false;
					that.show4 = false;
					that.show4 = false;
				}
			},
			//季度切换
			htzjd(e) {
				const that = this;
				var fbw;
				var date = new Date().getFullYear().toString();
				if(e == 1) {
					that.cjd = date + '-04-01' + '~' + date + '-06-30';
					that.show2 = true;
					that.show3 = false;
					that.show4 = false;
					that.show5 = false;
					fbw = 1;
				} else if(e == 2) {
					that.cjd = date + '-07-01' + '~' + date + '-09-30';
					that.show2 = false;
					that.show3 = true;
					that.show4 = false;
					that.show4 = false;
					fbw = 2;
				} else if(e == 3) {
					that.cjd = date + '-10-01' + '~' + date + '-12-31';
					that.show2 = false;
					that.show3 = false;
					that.show4 = true;
					that.show5 = false;
					fbw = 3;
				} else if(e == 4) {
					date = Number(date) + 1
					that.cjd = date + '-01-01' + '~' + date + '-03-31';
					that.show2 = false;
					that.show3 = false;
					that.show4 = false;
					that.show5 = true;
					fbw = 4;
				}
				that.getData(that.cjd, 1, fbw);
			},
			//销售select2
			/**
			 * @param {el} param_name
			 * @param {placeholder} param_name
			 * @param {clearbtn} param_name
			 * @param {roleId} aram_name
			 */
			select_init(el, placeholder, clearbtn, kind, roleId) {
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
			//销售业绩统计
			getSaleYjtj(time) {
				const that = this;
				that.loading();
				that.postSaleYjtj.time = time;
				$.ajax({
					type: "post",
					url: config.api_SaleYjtj,
					data: that.postSaleYjtj,
					async: true
				}).done((res) => {
					that.SaleYjtj.ycj = res.result.ycjkh;
					that.SaleYjtj.dd = res.result.ddsl;
					that.SaleYjtj.ddzje = res.result.ddzje;
					that.SaleYjtj.yhk = res.result.hkje;
					that.SaleYjtj.dk = res.result.yjje;
					that.loading('close');
				});
			},
			//销售简报
			getSalejb(time1, time2) {
				const that = this;
				that.loading();
				var startTime = time1;
				var endTime = time2;
				that.postSalejb.startTime = startTime;
				that.postSalejb.endTime = endTime;
				$.ajax({
					type: "post",
					url: config.api_SaleYjtj,
					data: that.postSalejb,
					async: true
				}).done((res) => {
					that.Salejb.ddzje = res.result.ddzje;
					that.Salejb.hkje = res.result.hkje;
					that.Salejb.ycjkh = res.result.ycjkh;
					that.Salejb.yjje = res.result.yjje;
					that.Salejb.yxkhs = res.result.yxkhs;
					that.loading('close');
				});
			},
			// 电话量、意向客户数、拜访量、签单量
			getData: function(time, type, fbw) {
				var that = this;
				$('body,html').scrollTop(0)
				var t = time.split('~')
				var t0 = t[0];
				var t1 = t[1];
				that.loading();
				$.ajax({
					url: config.api_all,
					async: true,
					data: {
						flag: type,
						startTime: t0,
						endTime: t1
						//						startTime: '2017-07-24',
						//						endTime: '2017-07-30'
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var sjList = [];
							for(i = 0; i < res.result1.length; i++) {
								sjList.push(res.result1[i].time)
							}

							if(fbw == 0) {
								option1.xAxis.data = ['周一', '周二', '周三', '周四', '周五']
								option2.xAxis.data = ['周一', '周二', '周三', '周四', '周五']
								option3.xAxis.data = ['周一', '周二', '周三', '周四', '周五']
								option.xAxis[0].data = ['周一', '周二', '周三', '周四', '周五']
							} else if(fbw == 1) {
								option1.xAxis.data = ['四月', '五月', '六月']
								option2.xAxis.data = ['四月', '五月', '六月']
								option3.xAxis.data = ['四月', '五月', '六月']
								option.xAxis[0].data = ['四月', '五月', '六月']

							} else if(fbw == 2) {
								option1.xAxis.data = ['七月', '八月', '九月']
								option2.xAxis.data = ['七月', '八月', '九月']
								option3.xAxis.data = ['七月', '八月', '九月']
								option.xAxis[0].data = ['七月', '八月', '九月']
							} else if(fbw == 3) {
								option1.xAxis.data = ['十月', '十一月', '十二月']
								option2.xAxis.data = ['十月', '十一月', '十二月']
								option3.xAxis.data = ['十月', '十一月', '十二月']
								option.xAxis[0].data = ['十月', '十一月', '十二月']
							} else if(fbw == 4) {
								option1.xAxis.data = ['一月', '二月', '三月']
								option2.xAxis.data = ['一月', '二月', '三月']
								option3.xAxis.data = ['一月', '二月', '三月']
								option.xAxis[0].data = ['一月', '二月', '三月']
							}
							that.c = res.result1;
							that.chart_init(t0, t1, fbw, type)
							//意向客户数
							var result2 = res.result2
							var result2List = [];
							for(var i = 0; i < result2.length; i++) {
								var el = result2[i];
								result2List.push(el.yxkhs);
							}
							var max = Number(Math.max.apply(null, result2List));
							max = (max + max * 0.2)
							var myChart1 = echarts.init(document.getElementById('main1'));
							option1.yAxis.max = Math.ceil(max);
							option1.series[0].data = result2List;
							myChart1.setOption(option1);
							myChart1.off("click");
							myChart1.on("click", function(params) {
								if(type == 0) {
									t0 = sjList[params.dataIndex];
									t1 = sjList[params.dataIndex];
								} else if(type == 1) {
									var sj = sjList[params.dataIndex];
									var n = sj.split('-');
									var year = n[0];
									var month = n[1];
									var d = new Date(year, month, 0);
									var day = d.getDate();
									t0 = sj + '-01';
									t1 = sj + '-' + day
								}
								var index = layer.open({
									type: 2,
									title: '意向客户数列表',
									content: '/static/page/index/saler_customer_list.html?startTime=' + t0 + '&endTime=' + t1,
									area: ['100%', '100%']
								});
							})
							
							//拜访量
							var result3 = res.result3
							var result3List = [];
							for(var i = 0; i < result3.length; i++) {
								var el = result3[i];
								result3List.push(el.bfl);
							}
							var max = Number(Math.max.apply(null, result3List));
							max = (max + max * 0.2)
							var myChart2 = echarts.init(document.getElementById('main2'));
							option2.yAxis.max = Math.ceil(max);
							option2.series[0].data = result3List;
							myChart2.setOption(option2);
							myChart2.off("click");
							myChart2.on("click", function(params) {
								if(type == 0) {
									t0 = sjList[params.dataIndex];
									t1 = sjList[params.dataIndex];
								} else if(type == 1) {
									var sj = sjList[params.dataIndex];
									var n = sj.split('-');
									var year = n[0];
									var month = n[1];
									var d = new Date(year, month, 0);
									var day = d.getDate();
									t0 = sj + '-01';
									t1 = sj + '-' + day
								}
								var index = layer.open({
									type: 2,
									title: '拜访量列表',
									content: '/static/page/index/saler_bfl_list.html?startTime=' + t0 + '&endTime=' + t1,
									area: ['100%', '100%']
								});
							})

							//签单量
							var result4 = res.result4
							var result4List = [];
							for(var i = 0; i < result4.length; i++) {
								var el = result4[i];
								result4List.push(el.qdl);
							}
							var max = Number(Math.max.apply(null, result4List));
							max = (max + max * 0.2)
							var myChart3 = echarts.init(document.getElementById('main3'));
							option3.yAxis.max = Math.ceil(max);
							option3.series[0].data = result4List;
							myChart3.setOption(option3);
							myChart3.off("click");
							myChart3.on("click", function(params) {
								if(type == 0) {
									t0 = sjList[params.dataIndex];
									t1 = sjList[params.dataIndex];
								} else if(type == 1) {
									var sj = sjList[params.dataIndex];
									var n = sj.split('-');
									var year = n[0];
									var month = n[1];
									var d = new Date(year, month, 0);
									var day = d.getDate();
									t0 = sj + '-01';
									t1 = sj + '-' + day
								}
								var index = layer.open({
									type: 2,
									title: '签单量列表',
									content: '/static/page/index/saler_qdl_list.html?startTime=' + t0 + '&endTime=' + t1,
									area: ['100%', '100%']
								});
							})

						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			chart_init: function(t0, t1, fbw, type) {
				this.myChart = echarts.init(document.getElementById('main'));
				var dhl = this.dhl;
				var yxdhl = this.yxdhl;

				amount_MAX = Number(Math.max.apply(null, dhl))
				amount_MAX = (amount_MAX + amount_MAX * 0.1)
				amount_MAX1 = Number(Math.max.apply(null, yxdhl))
				amount_MAX1 = (amount_MAX1 + amount_MAX1)
				option.yAxis[0].max = Math.ceil(amount_MAX)
				option.yAxis[1].max = Math.ceil(amount_MAX1)
				option.series[0].data = dhl
				option.series[1].data = yxdhl

				this.myChart.setOption(option)
				this.myChart.off("click");
				this.myChart.on("click", function(params) {
					if(type == 0) {
						t0 = sjList[params.dataIndex];
						t1 = sjList[params.dataIndex];
					} else if(type == 1) {
						var sj = sjList[params.dataIndex];
						var n = sj.split('-');
						var year = n[0];
						var month = n[1];
						var d = new Date(year, month, 0);
						var day = d.getDate();
						t0 = sj + '-01';
						t1 = sj + '-' + day
					}
					var html = '/static/page/index/saler_follow_list.html?startTime=' + t0 + '&endTime=' + t1 + '&type=1';
					if(params.seriesIndex == 0) {
						var index = layer.open({
							type: 2,
							title: '电话量',
							content: html,
							area: ['100%', '100%']
						});
					} else if(params.seriesIndex == 1) {
						var index = layer.open({
							type: 2,
							title: '有效电话量',
							content: html + '&valid=1',
							area: ['100%', '100%']
						});
					}
				})
			},
			//商务顾问销售统计
			getData1: function(time) {
				var that = this;
				that.loading();
				$.ajax({
					url: config.api_Xstj,
					async: true,
					data: {
						time: time
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							that.c1 = res.result;
							that.chart_init1(time, that.c1)
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			chart_init1: function(time, listId) {
				this.myChart4 = echarts.init(document.getElementById('main4'));
				option4.xAxis[0].data = this.name1;
				var khsl = this.khsl;
				var ddsl = this.ddsl;
				var ddzje = this.ddzje;
				var dkje = this.dkje;

				option4.series[0].data = khsl;
				option4.series[1].data = ddsl;
				option4.series[2].data = ddzje;
				option4.series[3].data = dkje;

				amount_MAX = Number(Math.max.apply(null, khsl.concat(ddsl)))
				amount_MAX = (amount_MAX + amount_MAX)
				option4.yAxis[0].max = Math.ceil(amount_MAX)

				amount_MAX1 = Number(Math.max.apply(null, ddzje.concat(dkje)))
				amount_MAX1 = (amount_MAX1 + amount_MAX1 * 0.1)
				option4.yAxis[1].max = Math.ceil(amount_MAX1)

				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31'
				this.myChart4.setOption(option4)
				this.myChart4.off("click");
				this.myChart4.on("click", function(params) {
					console.log(params);
					var id = listId[params.dataIndex].userId
					if(params.seriesIndex == 0) {
						var index = layer.open({
							type: 2,
							title: '已成交客户列表',
							content: '/static/page/index/saler_turnover_list.html?startTime=' + startTime + '&endTime=' + endTime + '&flag=1&USER_ID=' + id,
							area: ['100%', '100%']
						});
					} else if(params.seriesIndex == 1) {
						var index = layer.open({
							type: 2,
							title: '订单列表',
							content: '/static/page/index/saler_turnover_list.html?startTime=' + startTime + '&endTime=' + endTime + '&flag=2&USER_ID=' + id,
							area: ['100%', '100%']
						});
					} else if(params.seriesIndex == 2) {
						var index = layer.open({
							type: 2,
							title: '订单列表',
							content: '/static/page/index/saler_turnover_list.html?startTime=' + startTime + '&endTime=' + endTime + '&flag=2&USER_ID=' + id,
							area: ['100%', '100%']
						});
					} else if(params.seriesIndex == 3) {
						var index = layer.open({
							type: 2,
							title: '回款列表',
							content: '/static/page/index/saler_turnover_list.html?startTime=' + startTime + '&endTime=' + endTime + '&flag=3&USER_ID=' + id,
							area: ['100%', '100%']
						});
					}

				});

			},
			//电销业绩目标完成情况
			getData2: function(time) {
				var that = this;
				var n = time.split('-');
				var year = n[0];
				var month = n[1];
				var d = new Date(year, month, 0);
				var day = d.getDate();
				that.loading();
				$.ajax({
					url: config.api_detail,
					async: true,
					data: {
						startTime: time + '-01',
						endTime: time + '-' + day
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var list = [];
							var list1 = [];
							var list2 = [];
							for(var i = 0; i < res.result.length; i++) {
								var el = res.result[i];
								list.push(el.name);
								list1.push(el.dhl)
								if(el.yxkhs != undefined) {
									list2.push(el.yxkhs)
								}
							}
							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var max1 = Number(Math.max.apply(null, list2));
							max1 = (max1 + max1)
							var myChart6 = echarts.init(document.getElementById('main6'));
							option6.xAxis[0].data = list;
							option6.series[0].data = list1;
							option6.series[1].data = list2;
							option6.yAxis[0].max = Math.ceil(max);
							option6.yAxis[1].max = Math.ceil(max1);
							myChart6.setOption(option6);
							myChart6.off("click");
							myChart6.on("click", function(params) {
								console.log(params);
								var id = res.result[params.dataIndex].saleId;
								var name = res.result[params.dataIndex].name;
								var html = '/static/page/dxPerson.html?time=' + that.month1 + '&id=' + id + '&saleName=' + name;
								var index = layer.open({
									type: 2,
									title: '电销业绩目标完成情况',
									content: html,
									area: ['100%', '100%']
								});

							});

						} else {
							layer.msg(res.msg)
						}
					}
				});
			},

			//电销独有————电销业绩目标完成情况
			getDataDx: function(time, ischange) {
				var that = this;
				var nowDate = that.nowMonth()
				var hhd, hhd1;
				var nextTime = nowDate;
				that.loading();
				$.ajax({
					url: config.api_detail,
					async: true,
					data: {
						startTime: time + '-04',
						endTime: Number(time) + 1 + '-03',
						saleId: '81236178199f4c5d83098178749fe6e1'
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							that.dx.list = res.result
							var list1 = [];
							var list2 = [];
							if(ischange == undefined) {
								for(var i = 0; i < res.result.length; i++) {
									var el = res.result[i];
									list1.push(el.dhl)
									list2.push(el.yxkhs)
									if(nowDate == el.time) {
										that.idchange3 = i
										that.dx.dhl = el.dhl || 0;
										that.dx.mbdhl = el.mbdhl || 0;
										that.dx.yxkhs = el.yxkhs || 0;
										that.dx.mbyxkhs = el.mbyxkhs || 0;
										hhd = Math.round(that.dx.dhl / that.dx.mbdhl * 10000) / 100.00
										hhd1 = hhd + "%";
										if(hhd == 'Infinity') {
											hhd = 100
										} else if(isNaN(hhd)) {
											hhd = 0
										}

										mmd = Math.round(that.dx.yxkhs / that.dx.mbyxkhs * 10000) / 100.00
										if(mmd == 'Infinity') {
											mmd = 100
										} else if(isNaN(mmd)) {
											hhd = 0
										}
										mmd1 = mmd + "%";
									}
								}
							} else {
								for(var i = 0; i < res.result.length; i++) {
									var el = res.result[i];
									list1.push(el.dhl)
									list2.push(el.yxkhs)
								}
								that.dx.dhl = res.result[that.idchange3].dhl || 0;
								that.dx.mbdhl = res.result[that.idchange3].mbdhl || 0;
								that.dx.yxkhs = res.result[that.idchange3].yxkhs || 0;
								that.dx.mbyxkhs = res.result[that.idchange3].mbyxkhs || 0;
								hhd = Math.round(that.dx.dhl / that.dx.mbdhl * 10000) / 100.00
								if(hhd == 'Infinity') {
									hhd = 100
								} else if(isNaN(hhd)) {
									hhd = 0
								}
								hhd1 = hhd + "%";

								mmd = Math.round(that.dx.yxkhs / that.dx.mbyxkhs * 10000) / 100.00
								if(mmd == 'Infinity') {
									mmd = 100
								} else if(isNaN(mmd)) {
									mmd = 0
								}
								mmd1 = mmd + "%";
							}

							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var max1 = Number(Math.max.apply(null, list2));
							max1 = (max1 + max1)
							var myChartDx = echarts.init(document.getElementById('dxOnly'));
							dxOnly.series[0].data = list1;
							dxOnly.series[1].data = list2;
							dxOnly.yAxis[0].max = Math.ceil(max);
							dxOnly.yAxis[1].max = Math.ceil(max1);
							myChartDx.setOption(dxOnly);
							that.dxhx(hhd, hhd1, mmd, mmd1, nextTime)
							myChartDx.off("click");
							myChartDx.on("click", function(params) {
								if(params.seriesIndex == 0 || params.seriesIndex == 1) {
									nextTime = that.dx.list[params.dataIndex].time
									var shuju = that.dx.list[params.dataIndex];
									that.dx.dhl = shuju.dhl || 0;
									that.dx.mbdhl = shuju.mbdhl || 0;
									that.dx.yxkhs = shuju.yxkhs || 0;
									that.dx.mbyxkhs = shuju.mbyxkhs || 0;
									hhd = Math.round(shuju.dhl / shuju.mbdhl * 10000) / 100.00
									if(hhd == 'Infinity') {
										hhd = 100
									}
									hhd1 = hhd + "%"
									mmd = Math.round(shuju.yxkhs / shuju.mbyxkhs * 10000) / 100.00;
									if(mmd == 'Infinity') {
										mmd = 100
									}
									mmd1 = mmd + "%"

									that.dxhx(hhd, hhd1, mmd, mmd1, nextTime);
								}
							})

						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			//电销环形
			dxhx(hhd, hhd1, mmd, mmd1, nextTime) {
				var n = nextTime.split('-');
				var year = n[0];
				var month = n[1];
				var d = new Date(year, month, 0);
				var day = d.getDate();
				t0 = nextTime + '-01';
				t1 = nextTime + '-' + day
				//环形1
				pieChartOption.series[0].data[0].name = hhd1
				pieChartOption.series[0].data[0].value = hhd
				pieChartOption.series[0].data[1].value = 100 - hhd
				var asd = document.getElementById('pie');
				var pieChart = echarts.init(asd);
				pieChart.setOption(pieChartOption);
				pieChart.off("click");
				pieChart.on("click", function(params) {
					var html = '/static/page/index/saler_follow_list.html?startTime=' + t0 + '&endTime=' + t1 + '&type=1';
					var index = layer.open({
						type: 2,
						title: '电话量',
						content: html,
						area: ['100%', '100%']
					});

				});

				//环形2
				pieChartOption2.series[0].data[0].name = mmd1
				pieChartOption2.series[0].data[0].value = mmd
				pieChartOption2.series[0].data[1].value = 100 - mmd
				var asd2 = document.getElementById('pie2');
				var pieChart2 = echarts.init(asd2);
				pieChart2.setOption(pieChartOption2);
				pieChart2.off("click");
				pieChart2.on("click", function(params) {
					var index = layer.open({
						type: 2,
						title: '查看详情',
						content: '/static/page/index/saler_customer_list.html?startTime=' + t0 + '&endTime=' + t1,
						area: ['100%', '100%']
					});
				});
			},
			//商务顾问独有
			getDataSwgw() {
				var that = this;
				var aa, bb, cc, dd;
				$.ajax({
					type: "post",
					url: config.api_swgw,
					async: true,
					data: {
						saleId: '0fa773564df74733b6ba66f448ff9acb'
					},
					success: function(res) {
						var result = res.result2
						that.swgw.yjdk = result.yjdk || 0;
						that.swgw.mbyjdk = result.mbyjdk || 0;
						that.swgw.htsl = result.htsl || 0;
						that.swgw.mbhtsl = result.mbhtsl || 0;
						that.swgw.ddzje = result.ddzje || 0;
						that.swgw.mbddzje = result.mbddzje || 0;
						aa = Math.round(result.yjdk / result.mbyjdk * 10000) / 100.00
						if(aa == 'Infinity') {
							aa = 100
						}
						aa1 = aa + "%"
						bb = Math.round(result.htsl / result.mbhtsl * 10000) / 100.00;
						if(bb == 'Infinity') {
							bb = 100
						}
						bb1 = bb + "%"
						cc = Math.round(result.ddzje / result.mbddzje * 10000) / 100.00;
						if(cc == 'Infinity') {
							cc = 100
						}
						cc1 = cc + "%"

						//业务到款
						pieChartOption_1.series[0].data[0].name = aa1
						pieChartOption_1.series[0].data[0].value = aa
						pieChartOption_1.series[0].data[1].value = 100 - aa
						var s1 = document.getElementById('swgw1');
						var swgw1 = echarts.init(s1);
						swgw1.setOption(pieChartOption_1);
						swgw1.off("click");
						swgw1.on('click', function(params) {
							var html = '/static/page/swPerson_self.html';
							var index = layer.open({
								type: 2,
								title: '商务顾问业绩目标完成情况',
								content: html,
								area: ['100%', '100%']
							});
						})

						//合同数量
						pieChartOption_2.series[0].data[0].name = bb1
						pieChartOption_2.series[0].data[0].value = bb
						pieChartOption_2.series[0].data[1].value = 100 - bb
						var s2 = document.getElementById('swgw2');
						var swgw2 = echarts.init(s2);
						swgw2.setOption(pieChartOption_2);
						swgw2.off("click");
						swgw2.on('click', function(params) {
							var html = '/static/page/swPerson_self.html';
							var index = layer.open({
								type: 2,
								title: '商务顾问业绩目标完成情况',
								content: html,
								area: ['100%', '100%']
							});
						})
						//委案金额
						pieChartOption_3.series[0].data[0].name = cc1
						pieChartOption_3.series[0].data[0].value = cc
						pieChartOption_3.series[0].data[1].value = 100 - cc
						var s3 = document.getElementById('swgw3');
						var swgw3 = echarts.init(s3);
						swgw3.setOption(pieChartOption_3);
						swgw3.off("click");
						swgw3.on('click', function(params) {
							var html = '/static/page/swPerson_self.html';
							var index = layer.open({
								type: 2,
								title: '商务顾问业绩目标完成情况',
								content: html,
								area: ['100%', '100%']
							});
						})
						//拜访量
						pieChartOption_3.series[0].data[0].name = cc1
						pieChartOption_3.series[0].data[0].value = cc
						pieChartOption_3.series[0].data[1].value = 100 - cc
						var s3 = document.getElementById('swgw4');
						var swgw3 = echarts.init(s3);
						swgw3.setOption(pieChartOption_3);
						swgw3.off("click");
						swgw3.on('click', function(params) {
							var html = '/static/page/swPerson_self.html';
							var index = layer.open({
								type: 2,
								title: '商务顾问业绩目标完成情况',
								content: html,
								area: ['100%', '100%']
							});
						})

					}
				});
			},
			//商务顾问业绩目标完成情况
			getYjmb(time, type, ch) {
				const that = this
				var date = new Date().getFullYear().toString()
				var startTime, endTime;
				if(ch == 0) {
					if(time == 0) {
						startTime = date + '-04-01';
						endTime = date + '-06-30';
					} else if(time == 1) {
						startTime = date + '-07-01';
						endTime = date + '-09-30';
					} else if(time == 2) {
						startTime = date + '-10-01';
						endTime = date + '-12-31';
					} else if(time == 3) {
						startTime = Number(date) + 1 + '-01-01';
						endTime = Number(date) + 1 + '-03-31';
					}
				} else if(ch == 1) {
					var n = time.split('-');
					var year = n[0];
					var month = n[1];
					var d = new Date(year, month, 0);
					var day = d.getDate();
					startTime = time + '-01';
					endTime = time + '-' + day
				}

				$.ajax({
					type: 'post',
					url: config.api_Yjmb,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime,
						type: type
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

							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var myChart5 = echarts.init(document.getElementById('main5'));
							option5.xAxis.data = list;
							option5.yAxis.max = Math.ceil(max);
							option5.series[0].data = list1;
							myChart5.setOption(option5);
							myChart5.off("click");
							myChart5.on('click', function(params) {
								var id = res.result[params.dataIndex].userId;
								var name = res.result[params.dataIndex].name;
								var swTime;
								if(type == 0) {
									swTime = new Date().getFullYear().toString()
								} else {
									swTime = time
								}
								var html = '/static/page/swPerson.html?time=' + swTime + '&id=' + id + '&saleName=' + name + '&jidu=' + time + '&type=' + type + '&ch=' + ch;
								var index = layer.open({
									type: 2,
									title: '商务顾问业绩目标完成情况',
									content: html,
									area: ['100%', '100%']
								});
							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			//运作简报
			getCainian(time) {
				var that = this;
				var startTime = time + '-04-01';
				var endTime = Number(time) + 1 + '-03-31';
				$.ajax({
					type: 'post',
					url: config.api_yzjb,
					async: true,
					data: {
						startTime: startTime,
						endTime: endTime
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							that.c4 = res.result;
							var list = [];
							var list1 = [];

							for(var i = 0; i < res.result.length; i++) {
								var el = res.result[i];
								list.push(el.NAME);
								list1.push(el.je)
							}
							var max = Number(Math.max.apply(null, list1));
							max = (max + max * 0.2)
							var myChart7 = echarts.init(document.getElementById('main7'));
							option7.xAxis.data = list;
							option7.yAxis.max = Math.ceil(max);
							option7.series[0].data = list1;
							myChart7.setOption(option7);
							myChart7.off("click");
							myChart7.on('click', function(params) {
								var id = res.result[params.dataIndex].userId;
								var name = res.result[params.dataIndex].NAME;
								var html = '/static/page/yunzuo.html?time=' + that.cainian + '&id=' + id + '&saleName=' + name;
								var index = layer.open({
									type: 2,
									title: '运作业绩目标完成情况',
									content: html,
									area: ['100%', '100%']
								});
							})
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			//本月范围
			showMonthFirstDay() {
				const that = this;
				var d = new Date();
				d.setMonth(d.getMonth() + 1);
				d.setDate(0);
				var day = new Date(d).getDate();
				var year = new Date().getFullYear().toString();
				var month = new Date().getMonth() + 1;
				month = (month < 10 ? "0" + month : month);
				var riqi = year + '-' + month + '-01';
				var riqi1 = year + '-' + month + '-' + day;
				that.startyear = riqi;
				that.endyear = riqi1;
			},
			showWen() {
				const that = this
				$.get(config.api_zhou, {
					type: 0
				}, function(res) {
					that.sevens = res.result;
					that.month = that.sevens[0];
					that.getData(that.month, 0, 0);
				})
			},
			tab(e) {
				const that = this;
				if(e == 1) {
					that.taskList();
				} else if(e == 2) {
					that.shen();
				} else if(e == 3) {
					that.tx1();
				} else if(e == 4) {
					that.tx2();
				}
			},
			//我的任务
			taskList(page) {
				const that = this;
				if(page) this.task.pageNum = page
				that.loading();
				that.postDataTask.pageSize = this.task.pageSize;
				that.postDataTask.pageNo = this.task.pageNum;
				require(['pagination'], (pagination) => {
					$.ajax({
						url: config.api_task,
						async: true,
						data: that.postDataTask
					}).done((res) => {
						that.task = res.result;
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.task.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.task.pageNum)
						} else {
							that.pagi = 1
							$('.pagi').pagination({
								pages: that.task.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.task.pageNum,
								onSelect: function(num) {
									that.task.pageNum = num
									that.taskList()
								}

							});
						}
						that.loading('close');
					})
				})
			},
			//我的审核
			shen(page) {
				const that = this;
				if(page) this.shenhe.pageNum = page
				that.loading();
				that.postDataShenhe.pageSize = this.shenhe.pageSize;
				that.postDataShenhe.pageNo = this.shenhe.pageNum;
				require(['pagination'], (pagination) => {
					$.ajax({
						url: config.api_shenhe,
						async: true,
						data: that.postDataShenhe
					}).done((res) => {
						that.shenhe = res.result;
						//分页
						if(that.pagi1) {
							$('.pagi1').pagination('updatePages', that.shenhe.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.shenhe.pageNum)
						} else {
							that.pagi1 = 1;
							$('.pagi1').pagination({
								pages: that.shenhe.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.shenhe.pageNum,
								onSelect: function(num) {
									that.shenhe.pageNum = num;
									that.shen();
								}
							});
						}
						that.loading('close');
					})
				})
			},
			//我的提醒
			tx1(page) {
				const that = this;
				if(page) this.mytx.pageNum = page
				that.loading();
				that.postDataMytx.pageSize = this.mytx.pageSize;
				that.postDataMytx.pageNo = this.mytx.pageNum;
				require(['pagination'], (pagination) => {
					$.ajax({
						url: config.api_wdtx,
						async: true,
						data: that.postDataMytx
					}).done((res) => {
						that.mytx = res.result;
						//分页
						if(that.pagi2) {
							$('.pagi2').pagination('updatePages', that.mytx.pages)
							if(page == 1) $('.pagi2').pagination('goToPage', that.mytx.pageNum)
						} else {
							that.pagi2 = 1;
							$('.pagi2').pagination({
								pages: that.mytx.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.mytx.pageNum,
								onSelect: function(num) {
									that.mytx.pageNum = num
									that.tx1()
								}

							});
						}
						that.loading('close');
					})
				})
			},
			//过期提醒
			tx2(page) {
				const that = this;
				if(page) this.gqtx.pageNum = page
				that.loading();
				that.postDataGqtx.pageSize = this.gqtx.pageSize;
				that.postDataGqtx.pageNo = this.gqtx.pageNum;
				require(['pagination'], (pagination) => {
					$.ajax({
						url: config.api_gqtx,
						async: true,
						data: that.postDataGqtx
					}).done((res) => {
						that.gqtx = res.result;
						//分页
						if(that.pagi3) {
							$('.pagi3').pagination('updatePages', that.gqtx.pages)
							if(page == 1) $('.pagi3').pagination('goToPage', that.gqtx.pageNum)
						} else {
							that.pagi3 = 1;
							$('.pagi3').pagination({
								pages: that.gqtx.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.gqtx.pageNum,
								onSelect: function(num) {
									that.gqtx.pageNum = num
									that.tx2()
								}

							});
						}
						that.loading('close');
					})
				})
			},
			//头部两行跳转
			customer_case_view(flag, type) {
				const that = this;
				var startyear, endyear;
				var year = that.year;
				if(type == 0) {
					startyear = year + '-04-01'
					endyear = Number(year) + 1 + '-03-31'
				} else {
					startyear = that.startyear
					endyear = that.endyear
				}
				var index = layer
					.open({
						type: 2,
						title: '查看详情',
						content: '/static/page/index/saler_turnover_list.html?startTime=' + startyear + '&endTime=' + endyear + '&flag=' + flag,
						area: ['100%', '100%']
					});
			},
			order_customer_view() {
				const that = this;
				var index = layer
					.open({
						type: 2,
						title: '查看详情',
						content: '/static/page/index/saler_customer_list.html?startTime=' + that.startyear + '&endTime=' + that.endyear,
						area: ['100%', '100%']
					});
			},
			viewTask(id, fqr, dfbgId, type, relateId) {
				if(type == '待发快递') {
					var index = layer.open({
						type: 2,
						title: '查看详情',
						content: '/express/goEdit.do?id=' + relateId + "&mark1=1",
						area: ['100%', '100%']
					});
				} else {
					var index = layer.open({
						type: 2,
						title: '查看详情',
						content: '/workBench/views.do?id=' + id + "&fqr=" + fqr + "&dfbgId=" + dfbgId,
						area: ['100%', '100%']
					});
				}

			},
			sh(type, id, debtorId) {
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
					content: url + id + "&debtorId=" + debtorId,
					area: ['100%', '100%'],
				});

			},
			setSuccess(id, en) {
				const that = this;
				var dialog = layer.confirm("确认完成?", function() {
					$.post('/order/updateCallInfo', {
						id: id
					}).done(function(res) {
						if(res.error == '00') {
							if(en == 1) {
								that.tx1();
							} else if(en == 2) {
								that.tx2();
							}

							layer.close(dialog);

						} else {
							layer.close(dialog)
							layer.msg(res.msg)
						}
					})
				})
			},
			//销售助手
			assis_view(flag, title) {
				var index = layer
					.open({
						type: 2,
						title: title,
						content: '/static/page/index/saler_assistant.html?flag=' + flag,
						area: ['100%', '100%']
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
			},
			//循环提醒接口 api_wdtx
			loop() {
				const that = this
				var n=0
				setInterval(function() {
					$.ajax({
						url: config.api_wdtx,
						async: true,
						data: that.postDataMytx
					}).done((res) => {
						var now = new Date();
						now.setMinutes(now.getMinutes() + 10);
						var next10 = now.getTime()
						var list = res.result.list
						for(var i = 0; i < list.length; i++) {
							var target = new Date(list[i].time).getTime()
							var jian = target - next10
							console.log(next10, target, jian);
							if(jian <= 60000 && jian >0) {
								layer.msg('你有提醒即将过期');
							}
						}
					})
				}, 60000)
			},

		},
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}