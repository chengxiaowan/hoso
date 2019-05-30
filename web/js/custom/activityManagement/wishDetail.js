var config = {
	role: localStorage.userRole,
	api_detail: api_url + '/customerWish/auditCustomerWishInfo', //用户信息
	id: parameter().id,
	api_saleList: api_url + '/customerWish/customerAdmiredWishList', //点赞数
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		c: {},
		isZw:false,
		isZw1:false,
		picPath:[],
		bg_show: false,
		pic_show: false,
		picList:[]
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getDetail()
		that.getSaleList();
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

		tab(type) {
			let that = this
		},
		getSaleList: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_saleList,
				async: true,
				type: 'post',
				data: {
					customerWishId: config.id,
					createTimeStart: that.createTimeStart,
					createTimeEnd: that.createTimeEnd,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						if(that.list.list.length == 0) {
							that.isZw = false
						} else {
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
									that.getSaleList()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getDetail() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_detail,
				data: {
					customerWishId: config.id
				},
				async: true,
				success(res) {
					if(res.error == '00') {
						that.c = res.result
						that.picPath = res.result.picPath.split(',')
					} else {
						layer.msg(res.msg)
					}

				}
			});
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
	}
})