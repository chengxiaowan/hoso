var config = {
	role: localStorage.userRole,
	api_list: api_url + '/hotArticle/hotArticleList', //获取热门商品列表
	api_add: api_url + '/hotArticle/addHotArticle', //添加热门场景
	api_edit: api_url + '/hotArticle/editHotArticle', //编辑热门场景
	api_info: api_url + '/hotArticle/editHotArticleInfo', //获取热门场景信息
	api_del: api_url + '/hotArticle/delHotArticle', // 删除热门场景
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token

}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		name: '', // 搜索关键词
		keywords: '', // 搜索关键词
		keywords1: '', // 搜索关键词
		startDate: '', // 开始日期
		endDate: '', // 结束日期
		startDate1: '', // 开始日期
		endDate1: '', // 结束日期
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		brandId: '', // 品牌id
		supplierId: '', // 供应商id
		typeId: '', // 一级分类id
		hotList: [], // 热门商品列表
		goodsList: [], // 弹框商品列表
		sortNo: '', // 顺序号
		goodsId: '', // 商品Id
		isShow: true, // 是否显示
		url: '', // 图片
		now: -1,
		title:'',
		linkUrl:'',
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
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

			var endDate1 = laydate.render({
				elem: '#end1', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate1 = value;
					if(value !== '') {
						startDate1.config.max.year = date.year;
						startDate1.config.max.month = date.month - 1;
						startDate1.config.max.date = date.date;
					} else {
						startDate1.config.max.year = '2099';
						startDate1.config.max.month = '12';
						startDate1.config.max.date = '31';
					}
				}
			});
			//日期范围
			var startDate1 = laydate.render({
				elem: '#start1',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.startDate1 = value;
					if(value !== '') {
						endDate1.config.min.year = date.year;
						endDate1.config.min.month = date.month - 1;
						endDate1.config.min.date = date.date;
					} else {
						endDate1.config.min.year = '1970';
						endDate1.config.min.month = '1';
						endDate1.config.min.date = '1';
					}
				}
			});

		});
		that.getHotList();
		that.getTokenMessage()
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
		// 获取热门列表
		getHotList: function(page, name, startDate, endDate) {
			if(page) this.hotList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list,
				type: 'post',
				data: {
					keywords: that.keywords,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
					type: 2,
					pageSize: that.hotList.pageSize || 10,
					pageNo: that.hotList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.hotList = res.result;
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.hotList.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.hotList.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								// pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.hotList.pageNum,
								onSelect: function(num) {
									that.hotList.pageNum = num
									that.getHotList()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},

		// 搜索
		search() {
			const that = this;
			var page = 1;
			var name = that.name;
			var startDate = that.startDate;
			var endDate = that.endDate;
			that.getHotList(page, name, startDate, endDate);
		},
		// 删除合同
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该热门商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					hotArticleId: id
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getHotList();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 新增
		add() {
			const that = this;
			that.title = ''
			that.imageUrl=''
			that.linkUrl = ''
			$("#demo1").attr('src','')
			const dialog = layer.open({
				type: 1,
				title: '新增',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					that.imageUrl = $("#demo1").attr('src')
					if(that.title == "") {
						layer.msg("请输入文章标题")
						return;
					}if(that.linkUrl == "") {
						layer.msg("请输入文章地址")
						return;
					} else if(that.imageUrl == "") {
						layer.msg("请上传封面图片")
						return;
					}
					$.ajax({
						url: config.api_add,
						type: 'post',
						data: {
							title: that.title,
							imageUrl: that.imageUrl,
							linkUrl: that.linkUrl,
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("添加成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				},
				cancel(){
					that.title=''
            		that.imageUrl=''
            		that.linkUrl=''
				}
			});
		},
		// 编辑
		edit(id) {
			const that = this;
			that.goodsList.pageNum =1
			that.goodsList.pageSize=10
			that.keywords1=''
			$.ajax({
				type:"post",
				url:config.api_info,
				async:true,
				data:{
					hotArticleId:id
				},
				success(res){
					if(res.error=='00'){
						that.title = res.result.title
						that.linkUrl = res.result.linkUrl
						$("#demo1").attr('src',res.result.imageUrl)
					}else{
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑',
				closeBtn: 1,
				content: $('#hot_goods'),
				area: ['80%', '80%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					that.imageUrl = $("#demo1").attr('src')
					if(that.title == "") {
						layer.msg("请输入文章标题")
						return;
					}if(that.linkUrl == "") {
						layer.msg("请输入文章地址")
						return;
					} else if(that.imageUrl == "") {
						layer.msg("请上传封面图片")
						return;
					}
					$.ajax({
						url: config.api_edit,
						type: 'post',
						data: {
							hotArticleId:id,
							title: that.title,
							imageUrl: that.imageUrl,
							linkUrl: that.linkUrl,
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getHotList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		getTokenMessage() {
			let that = this
			$.ajax({
				url: config.api_getToken,
				type: 'POST',
				data: {},
				cache: false,
				contentType: false, //不可缺
				processData: false, //不可缺
				success: function(data) {
					var obj = data;
					uploaderReady(obj);
				}
			});
		},
	}
})