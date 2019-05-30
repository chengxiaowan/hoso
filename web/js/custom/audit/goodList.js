var config = {
	role: localStorage.userRole,
	api_list: api_url + '/shops/auditShopsGoodsApplicationList', //店铺产品批次列表
	api_audit: api_url + '/shops/auditShopsGoodsApplication', //审核
	api_shopsList: api_url + '/shops/shopsList', //店铺列表
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		startDate: '', // 开始时间
		endDate: '', // 结束时间
		auditStatus:'0',
		auditStatus1:'1',
		commissionPercent:'',
		reason:'',
		shopsList:[],
		shopsId:'',
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate = value;
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
			var startDate = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startDate = value;
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
		that.getShop();
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
		getShop(){
			let that = this
			$.ajax({
				type:"post",
				url:config.api_shopsList,
				async:true,
				success(res){
					if(res.error=='00'){
						that.shopsList = res.result
					}else{
						layer.msg(res.msg)
					}
				}
			});
		},
		getData: function(page) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
//					createTimeStart: that.startDate,
//					createTimeEnd: that.endDate,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					shopsId:that.shopsId,
					auditStatus:that.auditStatus
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
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
									console.log(that.list.pageNum)
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		search() {
			const that = this;
			that.getData(1);
		},
		//审核
		sh(item){
			let that = this
			that.auditStatus1='1'
			that.commissionPercent=''
			that.reason=''
			var index = layer.open({
				type: 1,
				title: '审核',
				closeBtn: 1,
				content: $('#shenhe'),
				area: ['500px', '300px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.auditStatus1=='1'&&that.commissionPercent==''){
						layer.msg('请填写提成比例')
						return false;
					}
					if(that.auditStatus1=='2'&&that.reason==''){
						layer.msg('请输入驳回原因')
						return false;
					}
					$.ajax({
						type:"post",
						url:config.api_audit,
						async:true,
						data:{
							userId:window.sessionStorage.getItem("userId"),
							shopsGoodsApplicationId:item.shopsGoodsApplicationId,
							auditStatus:that.auditStatus1,
							commissionPercent:that.commissionPercent,
							reason:that.reason,
						},
						success: function(res) {
							if(res.error=='00'){
								layer.msg('操作成功')
								layer.close(index)
								that.getData()
							}else{
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
	}
})