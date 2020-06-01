var config = {
	role: localStorage.userRole,
	api_list: api_url + '/goods/dataList', //获取品牌列表
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_edit: api_url + '/goods/saveOrupdate', //修改品牌
	api_del: api_url + '/goods/del', //删除品牌
	api_attributeList: api_url + '/supplier/addAttach', //获取属性列表
	api_img: api_url + '/create_image', //二维码
	api_ewm: api_url + '/weixin/getwxTwoEconde',
}

Vue.directive('select2', {
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
var vueApp = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		keywords: '', //关键词(商品名称、条码)
		typeId: '', //一级分类id
		supplierId: '', //供应商id
		brandId: '', //品牌id
		status: '', // 上下架状态
		name: '', // 名称
		bg_show1: false,
		image_ewm: '',
		img_name: '',
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
		that.getData();
		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
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
									that.getData()
									yo.scrollTo('body')
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
					keywords: '',
					type:0
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
		// 新增商品
		jumpToGoods() {
			var index = layer
				.open({
					type: 2,
					title: '新增品牌',
					content: 'add.html',
					area: ['100%', '100%']
				});
		},
		// 查看品牌详情
		view(id) {
			var index = layer.open({
				type: 2,
				title: '查看品牌详情',
				content: 'detail.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 编辑商品
		edit(id) {
			var index = layer.open({
				type: 2,
				title: '编辑品牌',
				content: 'edit.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 搜索商品
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			that.getData(page, keywords);
		},
		// 删除商品
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					goodsId: id,
					delFlag: '1'
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
		ewm(item) {
			let that = this
			let id = ''
			that.img_name = item.name
			id = 'goodsId=' + item.id
			$.ajax({
				type: "post",
				url: config.api_ewm,
				async: true,
				data: {
					page: 'pages/goodsDetail/goodsDetail',
					id: id
				},
				success(res) {
					that.bg_show1 = true
					that.image_ewm = res.result
					that.$nextTick(function() {
						var top = $(document).scrollTop() + 200
						$(".ewm").css('top', top + 'px')
					})
				}
			});
		},
		hide1() {
			let that = this
			that.bg_show1 = false
		},
		downloadIamge(imgsrc, name) {

			//下载图片地址和图片名 
			var image = new Image();
			// 解决跨域 Canvas 污染问题
			image.setAttribute("crossOrigin", "anonymous");
			image.onload = function() {
				var canvas = document.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;
				var context = canvas.getContext("2d");
				context.drawImage(image, 0, 0, image.width, image.height);
				var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据     
				var a = document.createElement("a"); // 生成一个a元素   
				var event = new MouseEvent("click"); // 创建一个单击事件   
				a.download = name || "photo"; // 设置图片名称    
				a.href = url; // 将生成的URL设置为a.href属性    
				a.dispatchEvent(event); // 触发a的单击事件  
			};
			image.src = imgsrc;
		},
		downs() {
			let that = this
			this.downloadIamge(this.image_ewm, that.img_name)
		}
	}
})