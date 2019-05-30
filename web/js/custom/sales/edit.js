var config = {
	role: localStorage.userRole,
	api_edit: api_url + '/saleOrder/edit', //修改详情
	api_detail: api_url + '/saleOrder/info', //订单详情
	id: parameter().id,
	orderType: parameter().orderType,
	api_goodSkuList: api_url + '/saleOrder/goodsSkuList', //子商品列表
	api_delGoodsSku: api_url + '/saleOrder/delGoodsSku', //删除子商品
	api_editGoodsSku: api_url + '/saleOrder/editGoodsSku', //修改子商品
	api_editInfo:api_url+'/saleOrder/editGoodsSkuInfo',//获取详情
	api_qs:api_url+'/saleOrder/changeIsSigned',//签收
}
Vue.directive('select2', {
    inserted: function (el, binding, vnode) {
        let options = binding.value || {};
        $(el).select2(options).on("select2:select", (e) => {
            // v-model looks for
            //  - an event named "change"
            //  - a value with property path "$event.target.value"
            el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
        });
    },
    update: function (el, binding, vnode) {
        for (var i = 0; i < vnode.data.directives.length; i++) {
            if (vnode.data.directives[i].name == "model") {
                $(el).val(vnode.data.directives[i].value);
            }
        }
        $(el).trigger("change");
    }
});

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		name: '', // 品牌名称
		postData: {},
		c: {},
		editParam: '', //正在编辑的项目
		hoverParam: '', //鼠标覆盖项目
		oldData: '', //编辑项目的旧值
		posting: false, //是否正在上传数据
		invoiceId: '',
		deliveryType: '', //配送方式
		expressNo: '', //物流单号
		deliveryNum: '', //配送数量
		deliveryStatus: '', //状态
		expressCompanyCodeId:'',
		expressCompanyCodeList:[],
		orderType:''
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getDetail()
		//      that.getData();
	},
	directives: {
		focus: {
			//自动聚焦和销毁select2
			inserted(el) {
				el.focus();
				//如果是选择框
				if(el.tagName == 'SELECT') {
					$(el).select2({
						language: "zh-CN",
						placeholder: '请选择'
					}).on("select2:close", function(e) {
						const newData = e.target.value || app.c[app.editParam];
						const $this = $(this)
						if(app.c[app.editParam] == newData) {
							$this.select2("destroy");
							app.editParam = ''
						} else {
							var changeParam = app.editParam
							Vue.set(app.c, changeParam, newData);
							Vue.nextTick(() => {
								app.saveData()
								$this.select2("destroy")
								app.editParam = ''
							})
						}
					}).select2("open")
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
		enter(p, e) {
			const that = this;
			//如果返回的是数字序号
			if(typeof(p) == 'number') {
				if(e.target.id) {
					if(this.editParam == e.target.id) return;
					this.hoverParam = e.target.id;
					this.editParam = e.target.id;
				} else if(that.c.linkmans && that.c.linkmans[p].remark) {
					that.toolTips_tips = layer.yoTips(`<span style="color:#337ab7">${that.c.linkmans[p].remark}</span>`, e.target, {
						tips: [3, '#fff']
					})
				}
			} else { //如果返回的是字符串键值
				if(this.editParam == p) return;
				this.hoverParam = p;
				if(e && that.c[p]) {
					that.toolTips_tips = layer.yoTips(`<span style="color:#337ab7">${that.c[p]}</span>`, e.target, {
						tips: [3, '#fff']
					})
				}
			}
		},
		leave() {
			if(this.hoverParam == this.editParam) this.hoverParam = ''
			if(this.editParam.indexOf("_") > 0) this.editParam = ''
			if(this.toolTips_tips) layer.close(this.toolTips_tips)
		},
		/**
		 * 保存数据
		 * 
		 * @param {any} data 当前值 
		 * @returns 
		 */
		saveData(el) {
			const that = this;
			if(that.posting) return;
			//做一些数据验证
			if(this.c.name == "") this.c.name = this.oldData
			//验证end
			if(this.oldData == this.c[this.editParam]) {
				this.editParam = '';
				return;
			} else {
				save()
			}
			//			if(this.editParam == 'name') {
			//				that.posting = true;
			//				$.post(config.api_hasName, {
			//					name: that.c[that.editParam]
			//				}).done((res) => {
			//					if(res.result == 'error') {
			//						layer.msg('客户名称已存在,请检查重试')
			//						Vue.set(that.c, that.editParam, that.oldData)
			//						that.posting = false;
			//						return;
			//					} else {
			//						that.posting = false;
			//						save()
			//					}
			//				})
			//			} else {
			//				save()
			//			}

			function save() {
				let postData = {
					saleOrderId: config.id,
					invoiceId: that.invoiceId
				};
				that.posting = true;
				postData[that.editParam] = $.trim(that.c[that.editParam])
				Vue.set(that.c, that.editParam, $.trim(that.c[that.editParam]))
				//				if(that.editParam == 'province1') {
				//					postData.province = that.c.province
				//				} else if(that.editParam == 'cityName1') {
				//					postData.cityName = that.c.cityName
				//				} else if(that.editParam == 'area1') {
				//					postData.area = that.c.area
				//				} else {
				//					
				//				}
				if(!that.editParam) {
					that.posting = false;
					return;
				}
				$.post(config.api_edit, postData, (res) => {
					that.editParam = '';
					that.posting = false;
				})
			}

		},
		/**
		 * 修改项目
		 * 
		 * @param {any} param 项目名称
		 */
		change(param) {
			this.hoverParam = '';
			this.editParam = param;
			this.oldData = this.c[param];
		},
		tab(type) {
			let that = this
			if(type == 2) {
				that.goodSkuList()
			}
		},
		getDetail() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_detail,
				data: {
					saleOrderId: config.id
				},
				async: true,
				success(res) {
					that.c = res.result
					that.invoiceId = res.result.invoiceId
					that.orderType = res.result.orderType
				}
			});
		},
		goodSkuList: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_goodSkuList,
				async: true,
				type: 'post',
				data: {
					saleOrderId: config.id,
					orderType: config.orderType,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
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
									that.goodSkuList()
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
		wl(item) {
			let that = this;
			var index = layer
				.open({
					type: 2,
					title: '物流信息',
					content: 'logistics.html?relateId='+item.relateId+'&orderType='+that.orderType,
					area: ['100%', '100%']
				});
		},
		// 编辑订单
		editSku(item) {
			let that = this
			that.deliveryType = item.deliveryType
			that.expressNo = ""
			that.deliveryNum = ""
			that.expressCompanyCodeId = ''
			$.ajax({
				type:"post",
				url:config.api_editInfo,
				async:true,
				data:{
					relateId:item.relateId,
					orderType:that.orderType
				},
				success(res){
					if(res.error=='00'){
						that.expressCompanyCodeList = res.result.expressCompanyCodeList
						that.expressCompanyCodeId = res.result.expressCompanyCodeId
						that.expressNo = res.result.expressNo
						that.deliveryNum = res.result.deliveryNum
					}else{
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '修改订单',
				closeBtn: 1,
				content: $('#editSku'),
				area: ['50%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.deliveryType == '') {
						layer.msg('请选择配送方式')
						return
					} else if(that.deliveryType == 1) {
						if(that.expressCompanyCodeId == '' || that.expressNo == '' || that.deliveryNum == '' ) {
							layer.msg('请填写全部信息')
							return
						}
					} else if(that.deliveryType == 2) {
						if(that.deliveryNum == '') {
							layer.msg('请填写全部信息')
							return
						}
					}
					$.ajax({
						type: "post",
						url: config.api_editGoodsSku,
						async: true,
						data: {
							relateId: item.relateId,
							orderType: config.orderType,
							deliveryType: that.deliveryType,
							expressCompanyCodeId: that.expressCompanyCodeId,
							expressNo: that.expressNo,
							deliveryNum: that.deliveryNum,
						},
						success: function(res) {
							if(res.error == '00') {
								layer.close(dialog)
								layer.msg("修改成功")
								that.goodSkuList()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				},
				cancel() {
					that.deliveryType = ""
					that.expressCompany = ""
					that.expressNo = ""
					that.deliveryNum = ""
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
		delSku(item) {
			const that = this;
			const dialog = layer.confirm("确认删除改商品?删除后无法恢复", {
				title: "提示"
			}, () => {
				$.get(config.api_delGoodsSku, {
					relateId: item.relateId,
					orderType: config.orderType
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.goodSkuList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		//是否签收
		qs(item){
			let that = this;
			const dialog = layer.confirm("用户是否已签收该商品", {
				title: "提示"
			}, () => {
				$.get(config.api_qs, {
					relateId: item.relateId,
					orderType:that.orderType,
					isSigned:item.isSigned
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("操作成功")
						that.goodSkuList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		}
	}
})