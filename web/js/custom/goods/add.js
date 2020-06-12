var config = {
	role: localStorage.userRole,
	api_add: api_url + '/goods/add', //新增商品
	api_editGoods: api_url + '/goods/edit', // 编辑商品
	api_supplierList: api_url + '/supplier/dataList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_typeList: api_url + '/type/typeList', //获取类别列表
	api_labelList: api_url + '/goodsSku/typeLabelList', //获取标签列表

	api_attributeList: api_url + '/goodsSkuAttribute/dataList', //获取自定义属性列表
	api_addAttribute: api_url + '/goodsSkuAttribute/saveOrupdate', //新增自定义属性
	api_attributeInfo: api_url + '/goodsSkuAttribute/editInfo', //获取商品自定义属性信息
	api_editAttribute: api_url + '/goodsSkuAttribute/saveOrupdate', //编辑自定义属性
	api_delAttribute: api_url + '/goodsSkuAttribute/saveOrupdate', //删除自定义属性

	api_colorDataList: api_url + '/goodsSkuAttribute/colorDataList', //获取商品颜色列表
	api_addColor: api_url + '/goodsSkuAttribute/colorAdd', //新增商品颜色
	api_colorInfo: api_url + '/goodsSkuAttribute/colorEditInfo', //获取商品自定义属性信息
	api_editColor: api_url + '/goodsSkuAttribute/colorEdit', //编辑商品颜色
	api_delColor: api_url + '/goodsSkuAttribute/colorDel', //删除商品颜色

	api_modelList: api_url + '/goodsSkuAttribute/modelDataList', //新增商品规格属性列表
	api_addModel: api_url + '/goodsSkuAttribute/modelAdd', //新增商品规格属性列表
	api_modelInfo: api_url + '/goodsSkuAttribute/modelEditInfo', //获取商品规格属性信息
	api_editModel: api_url + '/goodsSkuAttribute/modelEdit', //编辑商品规格属性
	api_delModel: api_url + '/goodsSkuAttribute/modelDel', //删除商品规格属性

	api_skuList: api_url + '/goodsSku/dataList', // 获取商品sku列表
	api_addSku: api_url + '/goodsSku/add', //新增商品sku
	api_skuInfo: api_url + '/goodsSku/editInfo', //获取商品sku信息
	api_editSku: api_url + '/goodsSku/edit', //编辑商品sku
	api_delSku: api_url + '/goodsSku/del', // 删除商品sku

	api_status: api_url + '/goodsSku/changeIsOnsell', // 更改商品sku上下架状态

	api_saveProductAttach: api_url + '/supplier/addAttach', //保存上传附件

	api_editD: api_url + '/goods/editDescription', //修改描述
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
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
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		index: 0, //
		attrsList: [], // 自定义属性列表
		colorsList: [], // 颜色列表
		modelsList: [], // 规格型号列表
		goodsList: [], // 商品列表
		list: [], // 商品列表
		supplierList: [], // 供应商列表
		typeList: [], // 分类列表
		brandList: [], // 品牌列表
		brandId: '', // 品牌id
		supplierId: '', // 供应商id
		typeId: '', // 一级分类id
		//      goodsId: '1533176751701001', // 商品Id
		goodsId: '', // 商品Id
		name: '', // 商品名称
		goodsCode: '', // 商品编码
		unitName: '', // 单位名称
		shipmentsDays: 0, // 出货天数
		fromArea: '', // 产地
		standard: '', // 执行标准
		distribution: '', // 配送方式
		summary: '', // 简介
		unitValue: '', // 计量单位
		skuAttributeName: '', // 自定义属性名称
		skuSelectValue: '', // 自定义属性可选项值
		colorList: [], // 颜色列表
		colorId: '', // 颜色可选项id
		colorName: '', // 颜色名称
		logo: '', // 颜色图片
		skuSelectCode: '', // 颜色编码
		standard: '', // 规格(mm)
		model: '', // 型号
		materialQuality: '', // 材质
		grossWeight: '', // 毛重(kg)
		suttleWeight: '', // 净重(kg)
		modelList: [], // 分类列表
		modelId: '', // 规格型号可选项id
		barCode: '', // 条形码
		mainImgPath: '', // 主图路径
		quakerImgath: '', // 规格图路径
		mainImgPath1: '', // 主图路径
		quakerImgath1: '', // 规格图路径
		purchasePrice: '', // 采购价
		price: '', // 单价
		isOnsell: '', // 上下架状态 0:下架 1:上架
		commision: {}, // sku佣金, JsonArray形式，多个","分隔, 例: [{"minNum":"数量指标(个)最小值","maxNum":"数量指标(个)最大值","percent":"佣金比例(%)"}]
		colorLabel: '', //颜色标签名称(只有一个)
		labelList: [], // 类型标签列表
		typeLabelId_1: '', //类型标签id
		styleLabels: '', //风格标签名称(多个","分隔)
		otherLabels: '', //其他标签名称(多个","分隔)
		ind: 1,
		skuAttributeId: '', // 自定义属性id
		skuSelectId: '', // 自定义属性可选项id
		skuAttributeName: '', // 自定义属性名称
		skuSelectValue: '', // 自定义属性可选项值
		isShow: 0,
		url: '',
		editor: null,
		editorInfo: '',
		imgPath: '',
		colorPicType: '', //去捏颜色模所属状态
		image: '',
		oldPrice: '', //原价
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		this.editor = UE.getEditor('container', {
			initialFrameHeight: 350,
			// initialContent: "请填写详细描述",
		});

		//    var ue = UE.getEditor('container', {
		//		initialFrameWidth: 800,
		//		initialFrameHeight: 350,
		//		// initialContent: "请填写详细描述",
		//	});

		that.getSupplierList();
		that.getTypeList();
		that.getBrandList();
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
		// 切换tab
		activateTab: function(index_chosen) {
			const that = this;
			that.index = index_chosen;
			if(this.index == 1) {
				if(this.goodsId == '') {
					layer.msg('请先添加商品基本信息', {
						time: 1000
					});
				} else {
					that.getAttributeList();                                                                                                                                 
				}
			}
			if(this.index == 2) {
				if(this.goodsId == '') {
					layer.msg('请先添加商品基本信息', {
						time: 1000
					});
				} else {
					that.getColorList();
				}
			}
			if(this.index == 3) {
				if(this.goodsId == '') {
					layer.msg('请先添加商品基本信息', {
						time: 1000
					});
				} else {
					that.getModelList();
				}
			}
			if(this.index == 4) {
				if(this.goodsId == '') {
					layer.msg('请先添加商品基本信息', {
						time: 1000
					});
				} else {
					that.getSkuList();
					that.getLabelList(that.typeId); // 获取类型列表
				}

			}
			if(this.index == 6) {
				if(this.goodsId == '') {
					layer.msg('请先添加商品基本信息', {
						time: 1000
					});
					return
				}

			}
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
					type:0,
					pageSize:100
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						for(var i in res.result.list) {
							var obj = {};
							obj.id = res.result.list[i].id;
							obj.text = res.result.list[i].name;
							arr.push(obj);
						}
						that.supplierList = arr;
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
		// 获取品牌
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
							var obj = {};
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
		// 保存 判断商品名称 供应商id，商品分类,单位名称是否为空
		save() {
			const that = this;
			var name = that.name,
				supplierId = that.supplierId,
				typeId = that.typeId,
				unitValue = that.unitValue;
			that.image = $("#demo2").attr('src')
			if(name == "") {
				layer.msg("请填写商品名称");
				return;
			} else if(supplierId == "") {
				layer.msg("请选择供应商");
				return;
			} else if(typeId == "") {
				layer.msg("请选择商品分类");
				return;
			} else if(unitValue == "") {
				layer.msg("请输入单位名称");
				return;
			} else if(that.image == "") {
				layer.msg("请上传主图");
				return;
			} else if(that.brandId == "") {
				layer.msg("请选择品牌");
				return;
			} else if(that.goodsId != '') {
				that.addGoods(0);
			} else if(that.goodsId == '') {
				that.addGoods(1);
			}
		},
		// 新增商品
		addGoods(gid) {
			console.log(gid)
			const that = this;
			var url, title;
			var data = {};
			if(gid == 1) {
				url = config.api_add;
				title = '商品添加成功';
				data = {
					name: that.name,
					supplierId: that.supplierId,
					sysTypeId: that.typeId,
					unitValue: that.unitValue,
					sysBrandId: that.brandId,
					fromArea: that.fromArea,
					standard: that.standard,
					distribution: that.distribution,
					summary: that.summary,
					shipmentsDays: that.shipmentsDays,
					image: that.image
				}
			} else {
				url = config.api_editGoods
				title = '商品修改成功';
				data = {
					name: that.name,
					supplierId: that.supplierId,
					sysTypeId: that.typeId,
					unitValue: that.unitValue,
					sysBrandId: that.brandId,
					fromArea: that.fromArea,
					standard: that.standard,
					distribution: that.distribution,
					summary: that.summary,
					shipmentsDays: that.shipmentsDays,
					id: that.goodsId,
					image: that.image
				}
			}

			$.ajax({
				url: url,
				async: true,
				type: 'post',
				data: data,
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg(title);
						if(gid == 1) {
							that.goodsId = res.goodsId;
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 新增自定义属性
		addAttribute() {
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
			} else {
				const that = this;
				that.skuAttributeName = '';
				that.skuSelectValue = '';
				const dialog = layer.open({
					type: 1,
					title: '新增自定义属性',
					closeBtn: 1,
					content: $('#attribute'),
					area: ['80%', '50%'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var skuAttributeName = that.skuAttributeName;
						var skuSelectValue = that.skuSelectValue
						if(skuAttributeName == "") {
							layer.msg("请填写属性名称")
							return;
						} else if(skuSelectValue == "") {
							layer.msg("请填写属性值")
							return;
						}
						$.ajax({
							url: config.api_addAttribute,
							async: true,
							type: 'post',
							data: {
								goodsId: that.goodsId,
								skuAttributeName: that.skuAttributeName,
								skuSelectValue: that.skuSelectValue
							},
							success: function(res) {
								if(res.error == "00") {
									layer.close(dialog)
									layer.msg("添加成功")
									setTimeout(function() {
										parent.app && parent.parentFnc()
									}, 2000);
									that.getAttributeList();
								} else {
									layer.msg(res.msg)
								}
							}
						});
					}
				});
			}
		},
		// 编辑商品自定义属性
		editAttribute(id) {
			const that = this;
			// 获取商品自定义属性信息
			$.ajax({
				url: config.api_attributeInfo,
				async: true,
				type: 'post',
				data: {
					goodsSkuAttributeId: id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						that.skuAttributeName = that.list.skuAttributeName;
						that.skuSelectValue = that.list.skuSelectValue;
						that.skuAttributeId = that.list.skuAttributeId;
						that.skuSelectId = that.list.skuSelectId;
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑商品自定义属性',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['80%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var skuAttributeName = that.skuAttributeName;
					var skuSelectValue = that.skuSelectValue
					if(skuAttributeName == "") {
						layer.msg("请填写属性名称")
						return;
					} else if(skuSelectValue == "") {
						layer.msg("请填写属性值")
						return;
					}
					$.ajax({
						url: config.api_editAttribute,
						async: true,
						type: 'post',
						data: {
							skuAttributeId: that.skuAttributeId,
							skuAttributeName: that.skuAttributeName,
							skuSelectId: that.skuSelectId,
							skuSelectValue: that.skuSelectValue
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.getAttributeList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 删除自定义属性
		delAttribute(item) {
			const that = this;
			const dialog = layer.confirm("确认删除该自定义属性?", {
				title: "提示"
			}, () => {
				$.get(config.api_delAttribute, {
					goodsSkuAttributeId: item.goodsSkuAttributeId,
					skuAttributeId: item.skuAttributeId,
					skuSelectId: item.skuSelectId,
					delFlag: '1'
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getAttributeList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 新增颜色
		addColor(type) {
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
			} else {
				const that = this;
				that.colorPicType = type
				that.colorName = '';
				that.skuSelectCode = '';
				that.imgPath = '';
				$('#demo1').attr('src', '');
				const dialog = layer.open({
					type: 1,
					title: '新增颜色',
					closeBtn: 1,
					content: $('#color'),
					area: ['80%', '50%'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						var colorName = that.colorName;
						that.imgPath = $('#demo1').attr('src')
						if(colorName == "") {
							layer.msg("请填写颜色名称")
							return;
						}
//						if(that.imgPath == "") {
//							layer.msg("请上传颜色图片")
//							return;
//						}
						$.ajax({
							url: config.api_addColor,
							async: true,
							type: 'post',
							data: {
								goodsId: that.goodsId,
								name: that.colorName,
								imgPath: that.imgPath
							},
							success: function(res) {
								if(res.error == "00") {
									layer.close(dialog)
									layer.msg("添加成功")
									that.getColorList();
								} else {
									layer.msg(res.msg)
								}
							}
						});
					}
				});
			}
		},
		// 编辑颜色
		editColor(id, type) {
			const that = this;
			that.colorPicType = type
			// 获取颜色信息
			$.ajax({
				url: config.api_colorInfo,
				async: true,
				type: 'post',
				data: {
					skuSelectId: id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						that.colorName = that.list.name;
						that.skuSelectCode = that.list.skuSelectCode;
						that.imgPath = that.list.imgPath;
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑颜色',
				closeBtn: 1,
				content: $('#color'),
				area: ['80%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var colorName = that.colorName;
					that.imgPath = $('#demo1').attr('src')
					if(colorName == "") {
						layer.msg("请填写颜色名称")
						return;
					} 
//					else if(that.imgPath == "") {
//						layer.msg("请上传颜色图片")
//						return;
//					}
					$.ajax({
						url: config.api_editColor,
						async: true,
						type: 'post',
						data: {
							skuSelectId: id,
							name: that.colorName,
							imgPath: that.imgPath
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getColorList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 删除颜色
		delColor(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该商品颜色?", {
				title: "提示"
			}, () => {
				$.get(config.api_delColor, {
					skuSelectId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getColorList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 新增型号
		addModel() {
			const that = this;
			that.list = '';
			that.standard = '';
			that.model = '';
			that.materialQuality = '';
			that.grossWeight = '';
			that.suttleWeight = '';
			const dialog = layer.open({
				type: 1,
				title: '新增规格型号',
				closeBtn: 1,
				content: $('#model'),
				area: ['80%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var model = that.model;
					if(that.standard == "") {
						layer.msg("请填写规格")
						return;
					}
					if(model == "") {
						layer.msg("请填写型号")
						return;
					}
					$.ajax({
						url: config.api_addModel,
						async: true,
						type: 'post',
						data: {
							goodsId: that.goodsId,
							standard: that.standard,
							model: that.model,
							materialQuality: that.materialQuality,
							grossWeight: that.grossWeight,
							suttleWeight: that.suttleWeight
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("添加成功")
								that.getModelList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 编辑规格型号
		editModel(id) {
			const that = this;
			// 获取商品规格型号信息
			$.ajax({
				url: config.api_modelInfo,
				async: true,
				type: 'post',
				data: {
					skuSelectId: id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list = res.result;
						that.standard = that.list.standard;
						that.model = that.list.model;
						that.materialQuality = that.list.materialQuality;
						that.grossWeight = that.list.grossWeight;
						that.suttleWeight = that.list.suttleWeight;
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑规格型号',
				closeBtn: 1,
				content: $('#model'),
				area: ['80%', '50%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var model = that.model;
					if(that.standard == "") {
						layer.msg("请填写规格")
						return;
					}
					if(model == "") {
						layer.msg("请填写型号")
						return;
					}
					$.ajax({
						url: config.api_editModel,
						async: true,
						type: 'post',
						data: {
							skuSelectId: id,
							standard: that.standard,
							model: that.model,
							materialQuality: that.materialQuality,
							grossWeight: that.grossWeight,
							suttleWeight: that.suttleWeight
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								setTimeout(function() {
									parent.app && parent.parentFnc()
								}, 2000);
								that.getModelList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 新增商品信息
		// 删除规格型号
		delModel(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该规格型号?", {
				title: "提示"
			}, () => {
				$.get(config.api_delModel, {
					skuSelectId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getModelList()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 新增商品信息
		addSubGoods() {
			$("#tagsinputval").val('')
			$("#tagsinputval1").val('')
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
			} else {
				const that = this;
				that.colorId = '';
				that.modelId = '';
				that.barCode = '';
				that.oldPrice = '';
				that.mainImgPath = '';
				that.quakerImgath = '';
				that.purchasePrice = '';
				that.price = '';
				that.isOnsell = '';
				that.commision = '';
				that.colorLabel = '';
				$("#demo3").attr('src', '')
				$("#demo4").attr('src', '')
				that.typeLabelId_1 = '';
				that.getColorList(); // 获取颜色列表
				that.getModelList(); // 获取规格型号列表
				that.getSkuList(); // 获取商品sku信息
				const dialog = layer.open({
					type: 1,
					title: '新增商品信息',
					closeBtn: 1,
					content: $('#subgoods'),
					area: ['100%', '100%'],
					btn: "确定",
					btnAlign: 'c',
					yes() {
						console.log(that.typeLabelId_1)
						var colorId = that.colorId,
							modelId = that.modelId,
							isOnsell = that.isOnsell,
							oldPrice = that.oldPrice,
							price = that.price,
							typeLabelId = that.typeLabelId_1;
						var yjtcList = [];
						$("#commision .htz-td:not(:last-child)").each(function() {
							$(this).find('tr').each(function() {
								var htz = {};
								var minNum;
								var maxNum;
								$(this).find('.num').first().each(function() {
									minNum = $(this).val()
									htz.minNum = minNum;
								})
								$(this).find('.num').last().each(function() {
									maxNum = $(this).val()
									htz.maxNum = maxNum;
									yjtcList.push(htz);
								})
							})
							var input = $(this).find('.percent');
							for(var i = 0; i < input.length; i++) {
								var percent = $("#commision td .percent").eq(i).val();
								yjtcList[i].percent = percent;
							}
						})
						that.commision = yjtcList;
						that.mainImgPath = $("#demo3").attr('src')
						that.quakerImgath = $("#demo4").attr('src')
						if(colorId == "") {
							layer.msg("请选择颜色");
							return;
						} else if(modelId == "") {
							layer.msg("请选择型号");
							return;
						} else if(oldPrice == "") {
							layer.msg("请填写原价");
							return;
						} else if(price == "") {
							layer.msg("请填写单价");
							return;
						} else if(isOnsell == "") {
							layer.msg("请选择上/下架状态");
							return;
						} else if(typeLabelId == "") {
							layer.msg("请选择类型标签");
							return;
						} else if(that.mainImgPath == "") {
							layer.msg("请上传主图");
							return;
						}
						$.ajax({
							url: config.api_addSku,
							async: true,
							type: 'post',
							data: {
								goodsId: that.goodsId, // 商品id
								colorId: that.colorId, //颜色可选项id
								modelId: that.modelId, //规格型号可选项id
								barCode: that.barCode,
								mainImgPath: that.mainImgPath, //主图路径
								quakerImgath: that.quakerImgath,
								purchasePrice: that.purchasePrice,
								price: that.price, //单价
								oldPrice: that.oldPrice,
								isOnsell: that.isOnsell, //上下架状态 0:下架 1:上架
								//								commision: JSON.stringify(that.commision), //sku佣金, JsonArray形式
								colorLabel: that.colorLabel, //颜色标签名称(只有一个)
								typeLabelId: that.typeLabelId_1, //类型标签id
								isShow: that.isShow,
								styleLabels: $('#tagsinputval').val(),
								otherLabels: $('#tagsinputval1').val(),
								stockNum:999,
								stockType: "1"
							},
							success: function(res) {
								if(res.error == "00") {
									$('#tagsinputval').val('')
									$('#tagsinputval1').val('')
									$("#demo3").attr('src', '')
									$("#demo4").attr('src', '')
									layer.close(dialog)
									layer.msg("添加成功")
									that.getSkuList();
								} else {
									layer.msg(res.msg)
								}
							}
						});
					}
				});
			}
		},
		// 编辑商品
		editSubGoods(id, item) {
			const that = this;
			that.getColorList(); // 获取颜色列表
			that.getModelList(); // 获取规格型号列表
			that.getLabelList(that.typeId); // 获取类型列表
			$.ajax({
				url: config.api_skuInfo,
				async: true,
				type: 'post',
				data: {
					goodsSkuId: id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						console.log(that.list.typeLabelId)
						that.list = res.result;
						that.colorId = that.list.colorId;
						that.modelId = that.list.modelId;
						that.barCode = that.list.barCode;
						that.mainImgPath1 = that.list.mainImgPath;
						that.quakerImgath1 = that.list.quakerImgath;
						that.purchasePrice = that.list.purchasePrice;
						that.oldPrice = that.list.oldPrice;
						that.price = that.list.price;
						that.isOnsell = that.list.isOnsell;
						that.isShow = that.list.isShow;
						that.commision = that.list.commision;
						that.colorLabel = that.list.colorLabel;
						that.typeLabelId_1 = that.list.typeLabelId;
						$('#tagsinputval2').val(that.list.styleLabels)
						$('#tagsinputval3').val(that.list.otherLabels)
						
					} else {
						layer.msg(res.msg)
					}
				}
			});
			const dialog = layer.open({
				type: 1,
				title: '编辑商品信息',
				closeBtn: 1,
				content: $('#edit_subgoods'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					var colorId = that.colorId,
						modelId = that.modelId,
						isOnsell = that.isOnsell,
						oldPrice = that.oldPrice,
						price = that.price,
						typeLabelId = that.typeLabelId_1;
					that.mainImgPath1 = $("#demo5").attr('src')
					that.quakerImgath1 = $("#demo6").attr('src')
					if(colorId == "") {
						layer.msg("请选择颜色");
						return;
					} else if(modelId == "") {
						layer.msg("请选择型号");
						return;
					} else if(oldPrice == "") {
						layer.msg("请填写原价");
						return;
					} else if(price == "") {
						layer.msg("请填写单价");
						return;
					} else if(isOnsell == "") {
						layer.msg("请选择上/下架状态");
						return;
					} else if(typeLabelId == "") {
						layer.msg("请选择类型标签");
						return;
					} else if(that.mainImgPath1 == "") {
						layer.msg("请上传主图");
						return;
					}
					$.ajax({
						url: config.api_editSku,
						async: true,
						type: 'post',
						data: {
							goodsId: that.goodsId, // 商品id
							goodsSkuId: id,
							colorId: that.colorId, //颜色可选项id
							modelId: that.modelId, //规格型号可选项id
							barCode: that.barCode,
							mainImgPath: that.mainImgPath1, //主图路径
							quakerImgath: that.quakerImgath1,
							purchasePrice: that.purchasePrice,
							oldPrice: that.oldPrice,
							price: that.price, //单价
							isOnsell: that.isOnsell, //上下架状态 0:下架 1:上架
							//							commision: JSON.stringify(that.commision), //sku佣金, JsonArray形式
							colorLabel: that.colorLabel, //颜色标签名称(只有一个)
							typeLabelId: that.typeLabelId_1, //类型标签id
							styleLabels: $('#tagsinputval2').val(),
							otherLabels: $('#tagsinputval3').val(),
							isShow: that.isShow,
							stockNum:999,
							stockType:1
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("修改成功")
								that.getSkuList();
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		//删除商品
		delSubGoods(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该商品?", {
				title: "提示"
			}, () => {
				$.get(config.api_delSku, {
					goodsId: that.goodsId,
					goodsSkuId: id,
				}, function(data) { // 回调函数
					if(data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.getSkuList();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		// 更改商品sku上下架状态 - 上架
		slotting(id, onSell) {
			const that = this;
			layer.confirm('确认要上架吗？', function(index) {
				$.ajax({
					url: config.api_status,
					async: true,
					type: 'post',
					data: {
						goodsId: that.goodsId,
						goodsSkuId: id,
						isOnsell: onSell
					},
					success: function(res) {
						if(res.error == "00") {
							layer.msg('已上架!', {
								icon: 6,
								time: 1000
							});
							that.getSkuList();
						}
					}
				});
			});
		},
		// 更改商品sku上下架状态 - 下架
		driver(id, onSell) {
			const that = this;
			$.ajax({
				url: config.api_status,
				async: true,
				type: 'post',
				data: {
					goodsId: that.goodsId,
					goodsSkuId: id,
					isOnsell: onSell
				},
				success: function(res) {
					if(res.error == "00") {
						layer.msg('已下架!', {
							icon: 6,
							time: 1000
						});
						that.getSkuList();
					}
				}
			});
		},
		// 获取颜色名称
		look: function(ele) {
			let that = this;
			that.colorId = ele.target.value;
			that.colorLabel = $(ele.target).find("option:selected").text();
		},
		// 获取属性列表
		getAttributeList: function(page) {
			$('body,html').scrollTop(0)
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_attributeList,
				async: true,
				type: 'post',
				data: {
					goodsId: that.goodsId,
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
									that.getAttributeList();
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
		// 获取商品颜色列表
		getColorList: function(page) {
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
			} else {
				$('body,html').scrollTop(0)
				if(page) this.list.pageNum = page
				var that = this;
				that.loading();
				$.ajax({
					url: config.api_colorDataList,
					async: true,
					type: 'post',
					data: {
						goodsId: that.goodsId,
						pageSize: that.list.pageSize || 10,
						pageNo: that.list.pageNum || 1,
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							that.list = res.result;
							that.colorList = res.result.list;
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
										that.getColorList()
										yo.scrollTo('body')
									}
								})
							}
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		},
		// 获取规格型号
		getModelList(page) {
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
			} else {
				$('body,html').scrollTop(0)
				if(page) this.list.pageNum = page
				var that = this;
				that.loading();
				$.ajax({
					url: config.api_modelList,
					async: true,
					type: 'post',
					data: {
						goodsId: that.goodsId,
						pageSize: that.list.pageSize || 10,
						pageNo: that.list.pageNum || 1,
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							that.list = res.result;
							that.modelList = res.result.list;
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
										that.getModelList()
										yo.scrollTo('body')
									}
								})
							}
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		},
		// 获取商品sku列表
		getSkuList(page) {
			$('body,html').scrollTop(0)
			if(page) this.goodsList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_skuList,
				async: true,
				type: 'post',
				data: {
					goodsId: that.goodsId,
					pageSize: that.goodsList.pageSize || 10,
					pageNo: that.goodsList.pageNum || 1,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.goodsList = res.result;
						//分页
						if(that.pagi) {
							$('.pagi').pagination('updatePages', that.goodsList.pages)
							if(page == 1) $('.pagi').pagination('goToPage', that.goodsList.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.goodsList.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.goodsList.pageNum,
								onSelect: function(num) {
									that.goodsList.pageNum = num
									that.getSkuList()
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
		// 获取标签列表
		getLabelList(id) {
			const that = this;
			$.ajax({
				url: config.api_labelList,
				data: {
					goodsSysTypeId: id,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.labelList = res.result;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 编辑商品
		editGoods(id) {
			const that = this;
			var index = layer.open({
				type: 2,
				title: '编辑商品信息',
				content: '../subgoods/edit.html?id=' + id + '&goodsId=' + that.goodsId,
				area: ['100%', '100%']
			});
		},
		// 新增佣金
		add() {
			this.ind += 1;
			var html = '';
			html += '<tr>'
			html += '<td align="middle">'
			html += '<input type="number" class="form-control num"/>'
			html += '<span class="htz-label">&lt;</span>'
			html += '<span class="indicator">X</span>'
			html += '<span class="htz-label">&le;</span>'
			html += '<input type="number" class=" form-control num"/></td></tr>';
			var html1 = '<div class="percentage"><input type="number" class="cancel_dom form-control htz-select percent" /></div>'
			$(".increase").append(html);
			$(".commission").append(html1);
		},
		editD() {
			const that = this;
			if(this.goodsId == '') {
				layer.msg('请先添加商品基本信息', {
					time: 1000
				});
				return
			} else {
				$.ajax({
					url: config.api_editD,
					data: {
						goodsId: that.goodsId,
						description: this.editor.getContent()
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							layer.msg('保存成功')
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}

		},
		getTokenMessage() {
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
					uploaderReady4(obj);
					uploaderReady5(obj);
					uploaderReady6(obj);
				}
			});
		}
	}
})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}