var config = {
	role: localStorage.userRole,
	api_list: api_url + '/customerWish/customerWishList', //获取许愿列表
	api_del: api_url + '/customerWish/delCustomerWish', ///删除许愿
	api_auditInfo: api_url + '/customerWish/auditCustomerWishInfo', //审核-获取详情
	api_audit: api_url + '/customerWish/auditCustomerWish', //审核
	api_edit: api_url + '/customerWish/editCustomerWish', //修改
	api_editInfo: api_url + '/customerWish/editCustomerWishInfo', //修改
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 请输入姓名,联系方式
		selected: '',
		roleType: '', // 类型  
		postData: {},
		polishTimeStart: '',
		polishTimeEnd: '',
		reason: '',
		auditStatus:'1',
		status: '',
		picPath: '',
		title: '',
		description: '',
		createTime: '',
		bg_show: false,
		pic_show: false,
		picList:[],
		nickName:''
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
			var polishTimeEnd = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.polishTimeEnd = value;
					if(value !== '') {
						polishTimeStart.config.max.year = date.year;
						polishTimeStart.config.max.month = date.month - 1;
						polishTimeStart.config.max.date = date.date;
					} else {
						polishTimeStart.config.max.year = '2099';
						polishTimeStart.config.max.month = '12';
						polishTimeStart.config.max.date = '31';
					}
				}
			});
			//日期范围
			var polishTimeStart = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.polishTimeStart = value;
					if(value !== '') {
						polishTimeEnd.config.min.year = date.year;
						polishTimeEnd.config.min.month = date.month - 1;
						polishTimeEnd.config.min.date = date.date;
					} else {
						polishTimeEnd.config.min.year = '1970';
						polishTimeEnd.config.min.month = '1';
						polishTimeEnd.config.min.date = '1';
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
		getData: function(page, keywords, type, startDate, endDate) {
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
					polishTimeStart: that.polishTimeStart,
					polishTimeEnd: that.polishTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
					auditStatus: that.status,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						res.result.list.forEach(function(i) {
							i.picPath = i.picPath.split(',')
						})
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
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 审核许愿
		audit(item, id) {
			const that = this;
			that.auditStatus = '1'
			that.reason = ''
			that.picPath = item.picPath
			that.createTime = item.createTime
			that.title = item.title
			that.nickName = item.nickName
			that.description = item.description
			const dialog = layer.open({
				type: 1,
				title: '审核',
				closeBtn: 1,
				content: $('#audit'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.auditStatus == '') {
						layer.msg('请选择审核状态')
						return false;
					}
					$.ajax({
						url: config.api_audit,
						type: 'post',
						data: {
							customerWishId: id,
							auditStatus: that.auditStatus,
							reason: that.reason,
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("操作成功")
								that.getData();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				},
			});
		},
		search() {
			const that = this;
			that.getData(1);
		},
		show(picPath) {
			let that = this
			that.picList = picPath;
			that.$nextTick(function() {
				var swiper = new Swiper('.swiper-container', {
					spaceBetween: 30,
					centeredSlides: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
			})
			that.bg_show = true
			that.pic_show = true
		},
		hide() {
			let that = this
			that.bg_show = false
			that.pic_show = false
		},
		// 删除标签
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该许愿?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					customerWishId: id,
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
		// 客户详情
		look(id) {
			var index = layer.open({
				type: 2,
				title: '我爱我家详情',
				content: 'wishDetail.html?id=' + id,
				area: ['100%', '100%']
			});
		},
	}
})