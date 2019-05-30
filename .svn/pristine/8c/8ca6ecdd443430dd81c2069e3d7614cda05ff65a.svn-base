var config = {
	role: localStorage.userRole,
	api_list: api_url + '/goodsSku/dataList3', //获取商品列表
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/supplier/addAttach', //获取属性列表
	api_add: api_url + '/todayRecommend/edit', //编辑
	api_info: api_url + '/todayRecommend/editInfo', //获取
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	id:parameter().id,
	label: parameter().label,
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
		keywords: '', // 名称
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		typeId: '', //一级分类id
		supplierId: '', //供应商id
		brandId: '', //品牌id
		now: -1,
		relateId:'',
		tagsinputval:'',
		imageUrl:''
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.tagsinputval = config.label
		that.getData()
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
		that.getInfo();
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
									that.list.pageNum = num
									that.now = -1
									that.relateId = ''
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
		getInfo(){
			let that = this;
			$.ajax({
				type:"post",
				url:config.api_info,
				async:true,
				data:{
					todayRecommendId:config.id
				},
				success(res){
					if(res.error=='00'){
						that.relateId = res.result.goodsSkuId
						$("#demo1").attr('src',res.result.imageUrl)
					}else{
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
		//加入组合
		join(id, index, item) {
			let that = this
			var ind;
			that.now = index;
			that.relateId = id
		},
		search() {
			let that = this
			that.now = -1
			that.relateId = ''
			this.getData(1)
		},
		save() {
			let that = this;
			that.imageUrl = $("#demo1").attr('src')
			if(that.relateId == '') {
				layer.msg('请选择商品')
				return
			}else if(that.imageUrl ==''){
				layer.msg('请上传封面图')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					goodsSkuId: that.relateId,
					todayRecommendId:config.id,
					label: $('#tagsinputval').val(),
					imageUrl:that.imageUrl,
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