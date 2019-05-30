var config = {
	flag: yo.getQueryString("flag"),
	role: localStorage.userRole || "",
	api_showDetail: '/main/xszs', //查询
	api_hasName: '/saleCustomer/hasName', //查重
	api_updateSaleCustomer: '/saleCustomer/updateSaleCustomer', //保存客户信息
	api_call: "/saleCustomer/call.do",
}

require(['module_dialog_saleoffollow', 'module_dialog_importExcel'], (dialog_follow, importExcel) => {
	window.app = new Vue({
		el: '#app',
		data: {
			flag: config.flag,
			role: config.role,
			c: [],
			callId: '',
			//编辑模式
			hoverEl: {
				name: {
					show: 0,
					el: {}
				},
				linkmanLandline: {
					show: 0,
					el: {}
				},
				linkmanMobilePhone: {
					show: 0,
					el: {}
				},
				email: {

				},
				postion: {
					show: 0,
					el: {}
				},
				linkmanName: {
					show: 0,
					el: {}
				},
				remark: {
					show: 0,
					el: {}
				}
			},
			editEl: {
				show: '',
				el: {},
				oldValue: ""
			},
			saleFollowMode: 0,
		},
		created: function() {
			var that = this;
			document.getElementById("app").classList.remove("hide");
		},
		mounted: function() {
			this.getData()
			$(document).on("mouseover", ".remark-hook", function() {
				var _text = $(this).find('.hide').text()
				if(_text) layer.yoTips('<span style="color:#337ab7">' + _text + '</span>', this, {
					tips: [2, '#fff']
				})
			})
		},
		directives: {
			focus: {
				inserted(el) {
					el.focus();
					if(el.dataset.tips) {
						layer.yoTips(`<span style="color:#337ab7">${el.dataset.tips}</span>`, el, {
							tips: [2, '#fff']
						})
					}
				}
			}
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
				if(page) this.c.pageNum = page
				var that = this;
				that.loading();
				$.ajax({
					url: config.api_showDetail,
					async: false,
					data: {
						flag: config.flag,
						pageSize: that.c.pageSize || 10,
						page: that.c.pageNum || 1,
					},
					success: function(res) {
						if(res.error == "00") {
							that.c = res.result;
							//分页
							if(that.pagi) {
								$('.pagi').pagination('updatePages', that.c.pages)
								if(page == 1) $('.pagi').pagination('goToPage', that.c.pageNum)
							} else {
								require(['pagination'], (pagination) => {
									that.pagi = $('.pagi').pagination({
										pages: that.c.pages, //总页数
										showCtrl: true,
										displayPage: 6,
										currentPage: that.c.pageNum,
										onSelect: function(num) {
											that.c.pageNum = num
											that.getData()
											yo.scrollTo('body')
										}
									})
								});
							}
							that.loading('close')
						} else {
							layer.msg(res.msg)
						}
					}
				});
			},
			edit_hover(key, el) {
				Vue.set(this.hoverEl, key, {
					show: 1,
					el: el
				})

			},
			edit_el(key, el) {
				this.editEl.show = key;
				this.editEl.el = el;
				this.editEl.oldValue = el.name
			},
			edit_submit(key, el) {
				console.log(2);
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
				this.saveData(key, el)
			},
			edit_keyup(key, el) {
				this.editEl.show = '';
				this.editEl.el = {};
				Vue.set(this.hoverEl, key, {
					show: 0,
					el: {}
				})
			},
			overTips(el) {
				layer.yoTips(`<span style="color:#337ab7">${el.remark}</span>`, "#remark_" + el.id, {
					tips: [2, '#fff']
				})
			},
			saveData(key, el) {
				if(key == 'name' && el.name == '') {
					el.name = this.editEl.oldValue
					return;
				}
				if(key == 'name' && el.name == this.editEl.oldValue) {
					return;
				}
				if(key == 'name') {
					$.post(config.api_hasName, {
						name: $.trim(el.name)
					}).done((res) => {
						if(res.result == 'error') {
							layer.msg('客户名称已存在,请检查重试')
							el.name = this.editEl.oldValue
							return;
						} else {
							save()
						}
					})
				} else {
					save()
				}

				function save() {
					let postData = {
						id: el.id,
					};
					postData[key] = $.trim(el[key])

					$.post(config.api_updateSaleCustomer, postData, (res) => {})
				}

			},
			//电话
			call(el, phone) {
				const that = this;
				this.hoverEl.linkmanMobilePhone.show = 0
				this.hoverEl.linkmanLandline.show = 0
				that.loading();
				top.callId = "";
				$.post(config.api_call, {
					mobilePhone: phone
				}).done((res) => {
					that.loading("close");
					//写跟进弹出框
					that.saleFollowMode = 0
					Vue.nextTick(() => {
						this.$refs.follow.init(el)
					})
				})
			},
			customer_detail(el) {
				var index = layer.open({
					type: 2,
					title: ' ',
					content: '/static/page/workreport/customer_detail.html?id=' + el.id,
					area: ['100%', '100%']
				});

			},

		}
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.list_Get()
}