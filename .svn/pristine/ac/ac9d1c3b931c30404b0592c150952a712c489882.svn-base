var config = {
	role: localStorage.userRole,
	api_list: api_url + '/saleOrder/dataList', //获取订单列表
	api_edit: api_url + '/brand/saveOrupdate', //修改品牌
	api_del: api_url + '/saleOrder/delSaleOrder', //删除订单
	api_auditInfo: api_url + '/saleOrder/auditInfo', //销售订单审核详情
	api_audit: api_url + '/saleOrder/audit', //审核销售订单
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		name: '', // 品牌名称
		postData: {},
		isZw: true,
		info:{},
		goodsSkuPdList:[],
		createTimeStart:'',
		createTimeEnd:'',
		orderType:'',
		orderStatus:''
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function(){
            var laydate = layui.laydate;
            var endDate= laydate.render({
                elem: '#end',//选择器结束时间
                format: 'yyyy-MM-dd',//可任意组合
                min:"1970-1-1",//设置min默认最小值
                done: function(value,date){
                    that.createTimeEnd = value;
                    if(value !== '') {
						startDate.config.max.year = date.year;
						startDate.config.max.month = date.month - 1;
						startDate.config.max.date = date.date;
					} else {
						startDate.config.max.year = '2099';
						startDate.config.max.month = '12';
						startDate.config.max.date = '31';
					}
                }
            });
            //日期范围
            var startDate=laydate.render({
                elem: '#start',
                format: 'yyyy-MM-dd',//可任意组合
                max:"2099-12-31",//设置一个默认最大值
                done: function(value, date){
                    that.createTimeStart = value;
                    if(value !== '') {
						endDate.config.min.year = date.year;
						endDate.config.min.month = date.month - 1;
						endDate.config.min.date = date.date;
					} else {
						endDate.config.min.year = '1970';
						endDate.config.min.month = '1';
						endDate.config.min.date = '1';
					}
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

		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					orderType:that.orderType,
					orderStatus:that.orderStatus,
					createTimeStart:that.createTimeStart,
					createTimeEnd:that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						if(that.list.list.length == 0) {
							that.isZw = false
						}else{
							that.isZw = true
						}
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
		// 新增品牌
		jumpToBrand() {
			var index = layer
				.open({
					type: 2,
					title: '新增品牌',
					content: 'add.html',
					area: ['80%', '80%']
				});
		},
		// 编辑订单
		edit(id, orderType) {
			var index = layer.open({
				type: 2,
				title: '编辑订单',
				content: 'edit.html?id=' + id + "&orderType=" + orderType,
				area: ['100%', '100%']
			});
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
		// 删除订单
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该订单?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					saleOrderId: id,
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
		audit(item) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_auditInfo,
				async: true,
				data: {
					saleOrderId: item.saleOrderId,
					orderType: item.orderType,
				},
				success: function(res) {
					if(res.error == '00') {
						that.info= res.result
						that.goodsSkuPdList = res.result.goodsSkuPdList
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '审核订单',
				closeBtn: 1,
				content: $('#audit'),
				area: ['85%', '75%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var x =0,y=0,arr=[]
					console.log(that.goodsSkuPdList)
					that.goodsSkuPdList.forEach(function(i){
						x++
						var obj={};
						obj.relateId = i.relateId
						obj.deliveryType = i.deliveryType
						arr.push(obj)
						if(i.deliveryType !='' ){
							y++
						}
					})
					if(x!=y){
						layer.msg('请选择配送方式')
					}
					$.ajax({
						type: "post",
						url: config.api_audit,
						async: true,
						data: {
							saleOrderId: item.saleOrderId,
							orderType: item.orderType,
							goodsSkuList: JSON.stringify(arr),
						},
						success: function(res) {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("审单成功")
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				},
				cancel() {
					
				}
			});
		}
	}
})