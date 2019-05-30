var config = {
	role: localStorage.userRole,
	api_list: api_url + '/saleOrder/expressNewsList', //获取物流列表
	api_add: api_url + '/saleOrder/addExpressNews', //新增物流
	api_edit: api_url + '/saleOrder/editExpressNews', //编辑物流
	api_editInfo: api_url + '/saleOrder/editExpressNewsInfo', //获取物流信息详情
	api_del: api_url + '/saleOrder/delExpressNews', //删除物流
	relateId: parameter().relateId,
	orderType: parameter().orderType,
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		postData: {},
		isZw: true,
		goodsSkuPdList:[],
		createTimeStart:'',
		createTimeEnd:'',
		expressTime:'',
		expressInfo:'',
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
                    startDate.config.max={
                        year:date.year,
                        month:date.month-1,//关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds : 0
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
                    endDate.config.min ={
                        year:date.year,
                        month:date.month-1, //关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds : 0
                    };
                }
            });
            //物流时间
            var expressTime=laydate.render({
                elem: '#expressTime',
                type: 'datetime',
                done: function(value, date){
                    that.expressTime = value;
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
//					createTimeStart:that.createTimeStart,
//					createTimeEnd:that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					orderType:config.orderType,
					relateId:config.relateId
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result.expressNewsList;
						if(that.list.length == 0) {
							that.isZw = false
						}else{
							that.isZw = true
						}
						//分页
//						if(that.pagi) {
//							$('.pagi').pagination('updatePages', that.list.pages)
//							if(page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
//						} else {
//							that.pagi = $('.pagi').pagination({
//								pages: that.list.pages, //总页数
//								showCtrl: true,
//								displayPage: 6,
//								currentPage: that.list.pageNum,
//								onSelect: function(num) {
//									that.list.pageNum = num
//									that.getData()
//								}
//							})
//						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 编辑订单
		edit(id) {
			let that = this
			$.ajax({
				type:"post",
				url:config.api_editInfo,
				async:true,
				data:{
					saleOrderExpressNewsId:id
				},
				success(res){
					if(res.error == '00'){
						that.expressTime = res.result.expressTime
						that.expressInfo = res.result.expressInfo
					}else{
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '修改物流信息',
				closeBtn: 1,
				content: $('#wuliu'),
				area: ['60%', '45%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.expressInfo==''||that.expressTime==''){
						layer.msg('请填写所有信息')
					}
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							saleOrderExpressNewsId:id,
							expressTime:that.expressTime,
							expressInfo:that.expressInfo
						},
						success: function(res) {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
			
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
		// 删除品牌
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该物流?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					saleOrderExpressNewsId: id,
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
		add(item) {
			let that = this
			that.expressTime=''
			that.expressInfo=''
			const dialog = layer.open({
				type: 1,
				title: '新增物流信息',
				closeBtn: 1,
				content: $('#wuliu'),
				area: ['60%', '45%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.expressInfo==''||that.expressTime==''){
						layer.msg('请填写所有信息')
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							relateId:config.relateId,
							orderType:config.orderType,
							expressTime:that.expressTime,
							expressInfo:that.expressInfo
						},
						success: function(res) {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("添加成功")
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		}
	}
})