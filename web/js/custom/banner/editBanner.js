var config = {
	role: localStorage.userRole,
	api_list: api_url + '/goods/dataList2', //获取商品列表
	api_list2: api_url + '/scene/dataList', //获取场景列表
	api_list3: api_url + '/specialTopic/specialTopicList', //获取专题列表
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/supplier/addAttach', //获取属性列表
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_add: api_url + '/carousel/edit', //编辑
	api_info: api_url + '/carousel/editInfo', //获取轮播
	id: parameter().id
}
Vue.directive('select2', {
	inserted: function(el, binding, vnode) {
		let options = binding.value || {};
		$(el).select2(options).on("select2:select", (e) => {
			el.dispatchEvent(new Event('change', {
				target: e.target
			}));
		});
	},
	update: function(el, binding, vnode) {
		for(var i = 0; i < vnode.data.directives.length; i++) {
			if(vnode.data.directives[i].name == "model") {
				$(el).val(vnode.data.directives[i].value);
			}
		}
		$(el).trigger("change");
	}
});
Vue.directive('select22', {
	inserted: function(el, binding, vnode) {
		let options = binding.value || {};
		$(el).select2(options).on("select2:select", (e) => {
			// v-model looks for
			//  - an event named "change"
			//  - a value with property path "$event.target.value"
			el.dispatchEvent(new Event('change', {
				target: e.target
			})); //说好的双向绑定，竟然不安套路
		});
	},
	update: function(el, binding, vnode) {
		for(var i = 0; i < vnode.data.directives.length; i++) {
			if(vnode.data.directives[i].name == "model") {
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
		list: [], // 列表1
		list2: [], // 列表2
		list3: [], // 列表3
		keywords: '', // 名称
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		keywords: '', //关键词
		keywords2: '', //关键词
		keywords3: '', //关键词
		typeId: '', //一级分类id
		supplierId: '', //供应商id
		brandId: '', //品牌id
		sortNo: '', //顺序号
		now: -1,
		startDate: '',
		endDate: '',
		startDate1: '',
		endDate1: '',
		relateId: '',
		name: '',
		type: 1,
		sortNo2: '',
		sortNo3: '',
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getData()
		that.getInfo()
		that.getData2()
		that.getData3()
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
		that.getTokenMessage();
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate = value;
					startDate.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
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
					console.log(that.startDate);
					endDate.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}
			});

			var endDate1 = laydate.render({
				elem: '#end1', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate1 = value;
					startDate1.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
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
					console.log(that.startDate1);
					endDate1.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}
			});

		});
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
		getInfo() {
			let that = this;
			$.ajax({
				type: "post",
				url: config.api_info,
				async: true,
				data: {
					carouselId: config.id
				},
				success(res) {
					if(res.error == '00') {
						that.relateId = res.result.relateId
						that.type = res.result.type
						that.name = res.result.name
						$(".nav li").eq(res.result.type-1).addClass('active').siblings().removeClass('active')
						if(res.result.type == 1) {
							$("#tab-1").addClass('active')
							$("#tab-2").removeClass('active')
							$("#tab-3").removeClass('active')
							that.sortNo = res.result.sortNo
							$("#demo1").attr('src',res.result.imageUrl)
						} else if(res.result.type == 2) {
							$("#tab-2").addClass('active')
							$("#tab-1").removeClass('active')
							$("#tab-3").removeClass('active')
							that.sortNo2 = res.result.sortNo
							$("#demo2").attr('src',res.result.imageUrl)
						} else if(res.result.type == 3) {
							$("#tab-3").addClass('active')
							$("#tab-1").removeClass('active')
							$("#tab-2").removeClass('active')
							that.sortNo3 = res.result.sortNo
							$("#demo3").attr('src',res.result.imageUrl)
						}
					}else{
						layer.msg(res.msg)
					}

				}
			});
		},
		getData: function(page, keywords) {
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
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					isOnsell: that.status,
					pageSize: that.list.pageSize || 5,
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
									that.now = -1
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
		getData2: function(page, keywords) {
			$('body,html').scrollTop(0)
			if(page) this.list2.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list2,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords2,
					isOpen: 1,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
					pageSize: that.list2.pageSize || 5,
					pageNo: that.list2.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list2 = res.result;
						//分页
						if(that.pagi) {
							$('.pagi2').pagination('updatePages', that.list2.pages)
							if(page == 1) $('.pagi2').pagination('goToPage', that.list2.pageNum)
						} else {
							that.pagi = $('.pagi2').pagination({
								pages: that.list2.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list2.pageNum,
								onSelect: function(num) {
									that.now = -1
									that.list2.pageNum = num
									that.getData2()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		getData3: function(page, keywords) {
			$('body,html').scrollTop(0)
			if(page) this.list3.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_list3,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords3,
					createTimeStart: that.startDate1,
					createTimeEnd: that.endDate1,
					pageSize: that.list3.pageSize || 5,
					pageNo: that.list3.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list3 = res.result;
						//分页
						if(that.pagi) {
							$('.pagi3').pagination('updatePages', that.list3.pages)
							if(page == 1) $('.pagi3').pagination('goToPage', that.list3.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.list3.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list3.pageNum,
								onSelect: function(num) {
									that.now = -1
									that.list3.pageNum = num
									that.getData3()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取类别
		getTypeList() {
			const that = this;
			$.ajax({
				url: config.api_typeList,
				async: true,
				type: 'post',
				data: {
					level: 1
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.typeList = res.result;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取供应商
		getSupplierList() {
			const that = this;
			$.ajax({
				url: config.api_supplierList,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = []
						for(var i in res.result) {
							var obj = {};
							obj.id = res.result[i].id;
							obj.text = res.result[i].name;
							arr.push(obj);
						}
						that.supplierList = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 获取品牌列表
		getBrandList() {
			const that = this;
			$.ajax({
				url: config.api_brandList,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						for(var i in res.result) {
							var obj = {}
							obj.id = res.result[i].id;
							obj.text = res.result[i].name;
							arr.push(obj);
						}
						that.brandList = arr;
					} else {
						layer.msg(res.msg)
					}
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
					uploaderReady2(obj);
					uploaderReady3(obj);
				}
			});
		},
		//加入组合
		join(id, index, item) {
			let that = this
			var ind;
			that.now = index;
			that.relateId = id
			that.name = item.name
		},
		join2(id, index, item) {
			let that = this
			var ind;
			that.now = index;
			that.relateId = id
			that.name = item.sceneName
		},
		join3(id, index, item) {
			let that = this
			var ind;
			that.now = index;
			that.relateId = id
			that.name = item.title
		},
		search() {
			this.getData()
		},
		search2() {
			this.getData2()
		},
		search3() {
			this.getData3()
		},
		tab(type) {
			let that = this
			that.relateId = ''
			that.now = -1
			that.name = '',
				that.type = type
			that.imageUrl = ''
			if(type == 1) {
				that.getData()
			} else if(type == 2) {
				that.getData2()
			} else if(type == 3) {
				that.getData3()
			}

		},
		save() {
			let that = this;
			that.imageUrl = $("#demo1").attr('src')
			if(that.relateId == '') {
				layer.msg('请选择商品')
				return
			}
			if(that.imageUrl == '') {
				layer.msg('请上传图片')
				return
			}
			if(that.sortNo == '') {
				layer.msg('请填写顺序号')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					carouselId:config.id,
					relateId: that.relateId,
					name: that.name,
					type: that.type,
					imageUrl: that.imageUrl,
					sortNo: that.sortNo
				},
				success(res) {
					if(res.error == '00') {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						setTimeout(function() {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		save2() {
			let that = this;
			that.imageUrl = $("#demo2").attr('src')
			if(that.relateId == '') {
				layer.msg('请选择场景')
				return
			}
			if(that.imageUrl == '') {
				layer.msg('请上传图片')
				return
			}
			if(that.sortNo2 == '') {
				layer.msg('请填写顺序号')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					carouselId:config.id,
					relateId: that.relateId,
					name: that.name,
					type: that.type,
					imageUrl: that.imageUrl,
					sortNo: that.sortNo2
				},
				success(res) {
					if(res.error == '00') {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						setTimeout(function() {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		save3() {
			let that = this;
			that.imageUrl = $("#demo3").attr('src')
			if(that.relateId == '') {
				layer.msg('请选择场景')
				return
			}
			if(that.imageUrl == '') {
				layer.msg('请上传图片')
				return
			}
			if(that.sortNo3 == '') {
				layer.msg('请填写顺序号')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					carouselId:config.id,
					relateId: that.relateId,
					name: that.name,
					type: that.type,
					imageUrl: that.imageUrl,
					sortNo: that.sortNo3
				},
				success(res) {
					if(res.error == '00') {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						setTimeout(function() {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
	}
})