// var shopsId = parameter().id;
// console.log(shopsId)
var config = {
	role: localStorage.userRole,
	id: parameter().id,
	ids: parameter().ids,
	labels: parameter().labels,
	api_add: api_url + '/shops/edit', //编辑,
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/goods/dataList2', //获取商品大列表
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_edit: api_url + '/shops/editInfo', //获取详情
	api_delShopsPic: api_url + '/shops/delShopsPic', //删除图片
	api_getDistributorInfo: api_url + '/shopsLinkMan/getDistributorInfo', //员工初始列表
	api_addorUpdateLinkMan: api_url + '/shopsLinkMan/addorUpdateLinkMan', //新增/修改员工
	api_deleteSysUser: api_url + '/shopsLinkMan/deleteSysUser', //员工离职
	api_roleList: api_url + '/role/roleList', //角色列表
	api_shopsGoodsList: api_url + '/shops/shopsGoodsList', //产品列表-已审核
	api_shopsGoodsList1: api_url + '/shops/shopsGoodsApplicationList', //产品列表-待审核
	api_shopsGoodsList2: api_url + '/shops/shopsGoodsApplicationList', //产品列表-待审核
	api_addShopsGoodsApplication: api_url + '/shops/addShopsGoodsApplication', //加入至待审核
	api_del: api_url + '/shops/delShopsGoods', //删除已审核单个商品
	api_del1: api_url + '/shops/delShopsGoodsApplication', //删除未审核单个商品
	api_editShopsGoods: api_url + '/shops/editShopsGoods', //编辑商品
	api_changeShopsGoodsIsOnsell: api_url + '/shops/changeShopsGoodsIsOnsell', //上下架商品
	//新增房间
	api_getRoomsList: api_url + '/shopsLinkMan/getRoomsList', //房间列表
	api_deleteShopsRoom: api_url + '/shopsLinkMan/deleteShopsRoom', //删除房间
	api_img: api_url + '/create_image', //二维码
	api_ewm: api_url + '/weixin/getwxTwoEconde',
	api_user: api_url + '/user/userList2', //新增店铺,
	api_delrole: api_url + '/shops/delShopsRole', //删除角色

	api_province: api_url + '/region/provinceList', // 获取省份
	api_city: api_url + '/region/cityList', //获取城市
	api_brandServiceList: api_url + '/shops/showAShopsService', //获取品牌服务列表
	api_delBrandService: api_url + '/shops/deleteTable', //获取品牌服务列表

	/*
	迭代详细：
			2019年6月26日09:17:26
			1.人员信息重做，但是不知道调用了哪些方法和接口 故能在源代码的基础上添加，望日后有空优化
			2.edit增加了三个下拉框选择的字段
	*/

	api_getpro: api_url + "/region/provinceList", //获取省份
	api_getcity: api_url + "/region/cityList", //根据省份获取城市
	api_getbrands: api_url + '/shopsBrand/shopsBrandList2', //获取自定义品牌列表
	api_getrole: api_url + '/shops/shopsRoleList', //获取角色列表
	api_addrole: api_url + '/shops/addShopsRole', //添加角色
	api_getAlluser: api_url + '/shops/shopsDistributorList', //获取店铺人员列表
	api_userDel: api_url + '/user/changeIsQuit', //员工离职
	api_goodsList: api_url + '/shops/showShopsGoods', //获取商品列表
	api_getsort: api_url + '/type/dataList', //获取分类 level1
	api_delgoods: api_url + '/shops/deleteTable', //删除商品

	/*
			2019年7月30日17:14:21
			添加了小程序码
	
	*/
	api_ewm: api_url + '/weixin/getwxTwoEconde', //小程序码

	api_houseList: api_url + '/roomTicket/list', //房券列表
    api_delHouseList: api_url + '/shops/deleteTable', //房券列表删除

}

// console.log(config.id)

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		shopsName: '', //店铺名称
		selected: 0,
		postData: {},
		shopsType: '',
		keywords: '', //请输入分类商品名称,编号
		keywords1: '', //姓名搜索条件
		typeId: '', //商品分类
		supplierId: '', //请选择供应商
		brandId: '', //请选择品牌
		typeList: [],
		supplierList: [],
		brandList: [],
		arr: [],
		goodList: [],
		isgo: true,
		arr1: [], //记忆添加id
		arr2: [], //记忆删除id
		skipGoodsIds: [], //不需要显示的sku
		now: -1, //加入当前选中状态
		scenePicList: [], //场景图片列表
		businessHours: '', //营业时间
		phone: '', //联系电话
		address: '', //详细地址
		summary: '', //店铺简介
		commissionPercent: '',
		logoPath: '',
		tagsinputval: '',
		roleList: [],
		roleId: '',
		peopleList: [],
		form: {
			userName: '',
			name: '',
			password: '',
			password1: '',
			mobilePhone: '',
			QQ: '',
			weChatId: '',
			email: '',
			roleId: '',
			commissionPercent: ''
		},
		auditStatus: '0',
		auditList: [{
				text: '审核通过'
			},
			{
				text: '审核失败'
			},
			{
				text: '待审核'
			},
		],
		shopShow: false,
		roomsList: [], //房间列表
		bg_show1: false,
		realName: '',
		image_ewm: '',
		img_name: '',
		status: '',
		reason: '',
		roleType: window.sessionStorage.getItem("roleType"),
		roleName: window.sessionStorage.getItem("roleName"),
		userId: '',
		userList: [],

		//2019年6月27日 迭代
		prolist: [], //省份列表
		province: '', //选择的省份
		citylist: [], //城市列表
		city: "", //选择的城市
		brandslist: [],
		shopsBrandId: "", //选择的品牌
		userrolelist: [], //角色列表
		newrole: "",
		alluser: '',
		bobodrool: '', //角色过滤
		goods: [],
		key: '',
		sort: [],
		maxp: '',
		minp: '',
		typeName: '',

		//服务
		serviceKeywords: '', // 服务名称
		provinceList: [], //省份列表
		provinceId: '', // 省份Id
		provinces: '', // 省份
		cityList: [], // 城市别表
		cityId: '', // 城市Id
		citys: '', // 城市
		brandServiceList: [], // 品牌服务列表
		bg_show1: false,
		image_ewm: '',
		img_name: '',


		// 房券
        houseKeywords:'',//房券搜索
        houseList:[],    //房券列表数据
	},
	watch: {
		provinceId(val, oldVal) {
			let that = this
			that.cityList = ''
			that.cityId = ''
			if (val != '') {
				$.ajax({
					url: config.api_city,
					async: true,
					type: 'post',
					data: {
						parentId: val,
					},
					success: function (res) {
						that.loading('close')
						if (res.error == "00") {
							var arr = [];
							var res_result = res.result;
							for (var i in res_result) {
								var obj = {};
								obj.id = res_result[i].cityId;
								obj.text = res_result[i].cityName;
								arr.push(obj);
							}
							that.cityList = arr;
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		}
	},
	created: function () {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function () {
		const that = this
		that.getbrands()
		//		layui.use('laydate', function() {
		//			var laydate = layui.laydate;
		//			laydate.render({
		//				elem: '#test9',
		//				type: 'time',
		//				range: true,
		//				format: 'HH:mm', //可任意组合
		//				done: function(value, date) {
		//					that.businessHours = value
		//				}
		//			});
		//		})

		that.tagsinputval = config.labels
		that.getTokenMessage()
		that.getSupplierList();
		that.getTypeList();
		that.getDetail();
		that.getBrandList();
		that.getRole();
		$('.el-input').each(function () {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		});

		that.getpro()
		that.getCity()
		// console.log(config.id)
		that.getsort()
		that.getUser()

	},
	methods: {
		/**
		 * 载入中方法
		 *
		 * @param {string} s 是否关闭
		 */
		getUser() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_user,
				async: true,
				data: {
					shopsBrandId: config.ids
				},
				success(res) {
					if (res.error == "00") {
						that.userList = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		tab(num) {
			let that = this
			if (num == 1) {

			} else if (num == 2) {
				// that.getDistributorInfo(1);
				that.getRolelist()
				that.getAlluser()
			} else if (num == 3) {
				that.getshopGoods()
			} else if (num == 4) {
				this.getRoom(1);
			} else if (num == 5) {
				that.getProvince();
				that.showAShopsBrandService();
			}else if (num == 6) {
                that.getHouseCoupon(1,that.houseKeywords) //获取房券列表数据
            }
		},
		getItem(index) {
			this.auditStatus = index;
			if (index == 0) {
				this.shopShow = false
				this.getGoods(1, 1); //审核通过
			} else if (index == 1) {
				this.shopShow = false
				this.getGoods(1, 2); //审核失败
			} else if (index == 2) {
				this.shopShow = true
				this.getGoods(1, 3); //待审核
			}

		},
		loading: function (s) {
			if (s == "close") layer.close(this.loadingSwitch)
			else this.loadingSwitch = layer.load(3);
		},
		getDetail() {
			let that = this;
			that.loading();
			that.skipGoodsIds = []
			$.ajax({
				type: "post",
				url: config.api_edit,
				async: true,
				data: {
					shopsId: config.id
				},
				success: function (res) {
					that.loading('close')
					if (res.error == '00') {
						that.shopsName = res.result.shopsName
						that.shopsType = res.result.shopsType
						that.phone = res.result.phone
						that.businessHours = res.result.businessHours
						that.address = res.result.address
						that.summary = res.result.summary
						that.scenePicList = res.result.shopsPicList
						that.shopsId = res.result.shopsId
						that.logoPath = res.result.logoPath
						that.status = res.result.status
						that.reason = res.result.reason
						that.realName = res.result.realName
						that.userId = res.result.userId
						that.city = res.result.city
						that.province = res.result.province
						that.shopsBrandId = String(res.result.shopsBrandId)
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//弹窗商品列表
		getData: function (page) {
			if (page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_attributeList,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					pageSize: that.list.pageSize || 5,
					pageNo: that.list.pageNum || 1,
					skipType: 1,
					shopsId: config.id
				},
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						that.list = res.result;
						//分页
						if (that.pagi) {
							$('.pagi').pagination('updatePages', that.list.pages)
							if (page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list.pageNum,
								onSelect: function (num) {
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
		//工作人员列表
		// getDistributorInfo: function (page) {
		// 	if (page) this.peopleList.pageNum = page
		// 	var that = this;
		// 	that.loading();
		// 	$.ajax({
		// 		url: config.api_getDistributorInfo,
		// 		async: true,
		// 		type: 'post',
		// 		data: {
		// 			shopsId: config.id,
		// 			keywords: that.keywords1,
		// 			roleId: that.roleId,
		// 			pageSize: that.peopleList.pageSize || 5,
		// 			pageNo: that.peopleList.pageNum || 1,
		// 		},
		// 		success: function (res) {
		// 			that.loading('close')
		// 			if (res.error == "00") {
		// 				that.peopleList = res.result;
		// 				//分页
		// 				if (that.pagi1) {
		// 					$('.pagi1').pagination('updatePages', that.peopleList.pages)
		// 					if (page == 1) $('.pagi1').pagination('goToPage', that.peopleList.pageNum)
		// 				} else {
		// 					that.pagi1 = $('.pagi1').pagination({
		// 						pages: that.peopleList.pages, //总页数
		// 						showCtrl: true,
		// 						displayPage: 6,
		// 						currentPage: that.peopleList.pageNum,
		// 						onSelect: function (num) {
		// 							that.peopleList.pageNum = num
		// 							that.getDistributorInfo()
		// 						}
		// 					})
		// 				}
		// 			} else {
		// 				layer.msg(res.msg)
		// 			}
		// 		}
		// 	});
		// },
		// 工作人员列表
		getRoom: function (page) {
			if (page) this.roomsList.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_getRoomsList,
				async: true,
				type: 'post',
				data: {
					shopsId: config.id,
					pageSize: that.roomsList.pageSize || 5,
					pageNo: that.roomsList.pageNum || 1,
				},
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						that.roomsList = res.result;
						//分页
						if (that.pagi3) {
							$('.pagi3').pagination('updatePages', that.roomsList.pages)
							if (page == 1) $('.pagi3').pagination('goToPage', that.roomsList.pageNum)
						} else {
							that.pagi3 = $('.pagi3').pagination({
								pages: that.roomsList.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.roomsList.pageNum,
								onSelect: function (num) {
									that.roomsList.pageNum = num
									that.getRoom()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//获取角色
		getRole() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_roleList,
				async: true,
				data: {
					roleType: '2'
				},
				success(res) {
					that.roleList = res.result
				}
			});
		},
		// 跳转新增商品页面
		jumpToGoods() {
			let that = this
			var index = layer.open({
				type: 2,
				title: '加入商品',
				content: 'addgoods.html?id=' + config.id + '&shopsBrandId=' + that.shopsBrandId,
				area: ['100%', '100%'],
				end: function () {
					that.getshopGoods()
				}
			});
		},
		//新增工作人员
		addPeople() {
			let that = this
			that.form = {
				userName: '',
				name: '',
				password: '',
				password1: '',
				mobilePhone: '',
				email: '',
				QQ: '',
				commissionPercent: '',
				weChatId: '',
				roleId: ''
			}
			var index = layer.open({
				type: 1,
				title: '新增工作人员',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['70%', '420px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if (that.form.userName == '' || that.form.name == '' || that.form.name == '' || that.form.commissionPercent == '' || that.form.password == '' || that.form.password1 == '' || that.form.mobilePhone == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					if (that.form.password != that.form.password1) {
						layer.msg('两次密码保持相等')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_addorUpdateLinkMan,
						async: true,
						data: {
							shopsId: config.id,
							userName: that.form.userName,
							mobilePhone: that.form.mobilePhone,
							password: that.form.password,
							name: that.form.name,
							email: that.form.email,
							weChatId: that.form.weChatId,
							commissionPercent: that.form.commissionPercent,
							QQ: that.form.QQ,
							roleId: that.form.roleId,

						},
						success(res) {
							if (res.error == '00') {
								layer.msg('添加成功')
								layer.close(index)
								that.getDistributorInfo()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		//编辑工作人员
		editPeople(el) {
			let that = this
			that.form = el
			var index = layer.open({
				type: 1,
				title: '新增工作人员',
				closeBtn: 1,
				content: $('#addPeople'),
				area: ['70%', '420px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if (that.form.userName == '' || that.form.name == '' || that.form.name == '' || that.form.commissionPercent == '' || that.form.password == '' || that.form.password1 == '' || that.form.mobilePhone == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					if (!that.form.password) {
						layer.msg('请输入密码')
						return false
					}
					if (that.form.password != that.form.password1) {
						layer.msg('两次密码保持相等')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_addorUpdateLinkMan,
						async: true,
						data: {
							shopsId: config.id,
							id: el.id,
							userId: el.userId,
							userName: that.form.userName,
							mobilePhone: that.form.mobilePhone,
							password: that.form.password,
							name: that.form.name,
							email: that.form.email,
							weChatId: that.form.weChatId,
							commissionPercent: that.form.commissionPercent,
							QQ: that.form.QQ,
							roleId: that.form.roleId,
						},
						success(res) {
							if (res.error == '00') {
								layer.msg('修改成功')
								layer.close(index)
								that.getDistributorInfo()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 删除用户
		quit(el) {
			const that = this;
			const dialog = layer.confirm("确认离职?", {
				title: "提示"
			}, () => {
				$.get(config.api_deleteSysUser, {
					userId: el.userId
				}, function (data) { // 回调函数
					if (data.error == '00') {
						layer.close(dialog)
						layer.msg("离职成功")
						that.getDistributorInfo();
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},
		//加入至待审核
		join(item) {
			let that = this
			const dialog = layer.confirm("确认加入该商品?", {
				title: "提示"
			}, () => {
				$.ajax({
					url: config.api_addShopsGoodsApplication,
					async: true,
					type: 'post',
					data: {
						shopsId: config.id,
						goodsId: item.goodsId,
					},
					success: function (res) {
						if (res.error == "00") {
							layer.close(dialog)
							layer.msg("加入成功")
							that.getData();
							if (that.shopShow) {
								that.getGoods(1, 3);
							}
						} else {
							layer.msg(res.msg)
						}
					}
				});
			})
		},
		edit() {
			const that = this;
			if (that.roleName == "系统人员" && that.userId == "") {
				layer.msg("请选择店铺店主");
				return;
			}
			if (that.shopsName == "") {
				layer.msg("请填写店铺名称");
				return;
			}
			if (that.shopsType == "") {
				layer.msg("请选择店铺类型");
				return;
			}
			that.addGroup();
		},
		addGroup() {
			const that = this;
			var userId;
			if (that.userId != "") {
				userId = that.userId
			} else {
				userId = window.sessionStorage.getItem('userId')
			}
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					shopsId: config.id,
					shopsName: that.shopsName,
					phone: that.phone,
					businessHours: that.businessHours,
					address: that.address,
					summary: that.summary,
					logoPath: $("#demo2").attr('src'),
					shopsPicList: JSON.stringify(that.scenePicList),
					labels: $('#tagsinputval').val(),
					shopsType: that.shopsType,
					userId: userId,
					province: that.province,
					city: that.city,
					// address:that.address,
					shopsBrandId: that.shopsBrandId
				},
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						setTimeout(function () {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//店铺商品列表
		getGoods(page, type) {
			if (page) this.goodList.pageNum = page
			var that = this;
			that.loading();
			var data = {};
			var url;
			if (type == 1 || type == 2) {
				url = config.api_shopsGoodsList
				data = {
					shopsId: config.id,
					pageSize: that.goodList.pageSize || 20,
					pageNo: that.goodList.pageNum || 1,
					auditStatus: type,
				}
			} else if (type == 3) {
				url = config.api_shopsGoodsList1
				data = {
					shopsId: config.id,
					pageSize: that.goodList.pageSize || 20,
					pageNo: that.goodList.pageNum || 1,
				}
			}
			$.ajax({
				url: url,
				async: true,
				type: 'post',
				data: data,
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						that.goodList = res.result;
						//分页
						if (that.pagi2) {
							$('.pagi2').pagination('updatePages', that.goodList.pages)
							if (page == 1) $('.pagi2').pagination('goToPage', that.goodList.pageNum)
						} else {
							that.pagi2 = $('.pagi2').pagination({
								pages: that.goodList.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.goodList.pageNum,
								onSelect: function (num) {
									that.goodList.pageNum = num
									that.getGoods(num, that.auditStatus + 1)
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
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
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
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						var arr = []
						for (var i in res.result) {
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
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						var arr = [];
						for (var i in res.result) {
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
		search() {
			let that = this;
			that.getAlluser();
		},
		searchGood() {
			let that = this;
			that.getData()
		},
		delGood(el, auditStatus) {
			let that = this
			var url;
			var data = {

			};
			if (auditStatus == 0 || auditStatus == 1) {
				url = config.api_del
				data = {
					shopsGoodsId: el.shopsGoodsId
				}
			} else
			if (auditStatus == 2) {
				url = config.api_del1
				data = {
					shopsGoodsApplicationId: el.shopsGoodsApplicationId
				}
			}
			const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				$.ajax({
					type: "post",
					url: url,
					async: true,
					data: data,
					success(res) {
						if (res.error == '00') {
							layer.close(dialog)
							if (auditStatus == 0) {
								that.getGoods('', 1)
							} else if (auditStatus == 1) {
								that.getGoods('', 2)
							} else if (auditStatus == 2) {
								that.getGoods('', 3)
							}
						} else {
							layer.msg(res.msg)
						}
					}
				});
			})
		},
		addRoom() {
			var index = layer.open({
				type: 2,
				title: '新增房间',
				content: 'addRoom.html?id=' + config.id,
				area: ['100%', '100%']
			});
		},
		editRoom(shopsRoomId, roomLabels) {
			var index = layer.open({
				type: 2,
				title: '编辑房间',
				content: 'editRoom.html?id=' + config.id + '&shopsRoomId=' + shopsRoomId + '&roomLabels=' + roomLabels,
				area: ['100%', '100%']
			});
		},
		delRoom(id) {
			let that = this
			const dialog = layer.confirm("确认删除该房间吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				$.ajax({
					url: config.api_deleteShopsRoom,
					async: true,
					type: 'post',
					data: {
						shopsRoomId: id
					},
					success: function (res) {
						that.loading('close')
						if (res.error == "00") {
							layer.close(dialog)
							layer.msg("删除成功")
							that.getRoom()
						} else {
							layer.msg(res.msg)
						}
					}
				});
			})

		},
		delPic(index, el) {
			let that = this
			const dialog = layer.confirm("确认删除该图片吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				layer.close(dialog)
				layer.msg("删除成功")
				that.scenePicList.splice(index, 1)
				if (el.attachId) {
					$.ajax({
						url: config.api_delShopsPic,
						async: true,
						type: 'post',
						data: {
							attachId: el.attachId
						},
						success: function (res) {
							that.loading('close')
							if (res.error == "00") {} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			})

		},
		// ewm(item) {
		// 	let that = this
		// 	let id = ''
		// 	that.img_name = item.roomName
		// 	id = 'shopsRoomId=' + item.shopsRoomId
		// 	$.ajax({
		// 		type: "post",
		// 		url: config.api_ewm,
		// 		async: true,
		// 		data: {
		// 			page: 'pages/room/room',
		// 			id: id
		// 		},
		// 		success(res) {
		// 			that.bg_show1 = true
		// 			that.image_ewm = res.result
		// 			that.$nextTick(function () {
		// 				var top = $(document).scrollTop() + 200
		// 				$(".ewm").css('top', top + 'px')
		// 			})
		// 		}
		// 	});
		// },
		ewm1(item) {
			let that = this
			let id = ''
			that.img_name = item.name
			id = 'goodsId=' + item.goodsId + ',shopsId=' + that.shopsId
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
					that.$nextTick(function () {
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
			image.onload = function () {
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
				success: function (data) {
					var obj = data;
					that.uploaderReady(obj);
					uploaderReady2(obj);
				}
			});
		},
		uploaderReady(token) {
			let that = this
			var uploader = Qiniu.uploader({
				runtimes: 'html5,flash,html4',
				browse_button: 'pickfiles', //上传按钮的ID
				container: 'btn-uploader', //上传按钮的上级元素ID
				drop_element: 'btn-uploader',
				max_file_size: '100mb', //最大文件限制
				flash_swf_url: '/static/js/plupload/Moxie.swf',
				dragdrop: false,
				chunk_size: '4mb', //分块大小
				//uptoken_url: '',              //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
				uptoken: token, //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
				// save_key: true,              // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK在前端将不对key进行任何处理
				domain: 'https://images.homeplus.fun/', //自己的七牛云存储空间域名
				multi_selection: false, //是否允许同时选择多文件
				filters: {
					mime_types: [ //文件类型过滤，这里限制为图片类型
						{
							title: "Image files",
							extensions: "jpg,jpeg,gif,png"
						}
					]
				},
				auto_start: true,
				unique_names: true, //自动生成文件名,如果值为false则保留原文件名上传
				init: {
					'FilesAdded': function (up, files) {
						plupload.each(files, function (file) {
							// 文件添加进队列后，处理相关的事情
						});
					},
					'BeforeUpload': function (up, file) {
						// 每个文件上传前，处理相关的事情
					},
					'UploadProgress': function (up, file) {
						//文件上传时，处理相关的事情

						/*可能是文件大小
						var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
						*/

						//上传进度 class="layui-btn" type="button"
						$('#qiniupercent').attr('style', 'width:' + file.percent + '%');
						//console.log(file.percent + "%");
					},
					'UploadComplete': function () {
						//do something
					},
					'FileUploaded': function (up, file, info) {
						console.log(info)
						//每个文件上传成功后,处理相关的事情
						//其中 info 是文件上传成功后，服务端返回的json，形式如
						//{
						//  "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
						//  "key": "gogopher.jpg"
						//}
						var obj = {}
						var domain = up.getOption('domain');
						var res = eval('(' + info + ')');
						console.log(res)
						var sourceLink = domain + res.url; //获取上传文件的链接地址
						res.url = domain + res.url
						obj.uploadTime = getCurrentTime()
						obj.originalFilename = res.original
						obj.url = res.url
						that.scenePicList.push(obj)
						console.log(that.scenePicList);
						//do something
					},
					'Error': function (up, err, errTip) {
						alert(errTip);
					},
					'Key': function (up, file) {
						//当save_key和unique_names设为false时，该方法将被调用
						var key = "";
						//              $.ajax({
						//                  url: api_url+'/qiniu/qiNiuCallback',
						//                  type: 'GET',
						//                  async: false,//这里应设置为同步的方式
						//                  success: function (data) {
						//                      var ext = Qiniu.getFileExtension(file.name);
						//                      key = data + '.' + ext;
						//                  },
						//                  cache: false
						//              });
						return key;
					}
				}
			});
			uploader.start();
		},

		//获取省份
		getpro() {
			var that = this;
			$.ajax({
				url: config.api_getpro,
				type: "post",
				async: true,
				success: res => {
					if (res.error == "00") {
						that.prolist = res.result
						// console.log(that.prolist)
					} else {
						layer.msg(res.error)
					}
				}

			})
		},
		//获取城市
		getCity() {
			var that = this;
			$.ajax({
				url: config.api_getcity,
				type: "post",
				async: true,
				data: {
					provinceName: that.province
				},
				success: res => {
					// console.log(res)
					that.citylist = res.result
					// console.log(that.citylist)
				}
			})
		},

		//获取品牌列表
		getbrands(id) {
			var that = this
			$.ajax({
				url: config.api_getbrands,
				type: "post",
				// async:true,
				success: res => {
					that.brandslist = res.result
					// console.log(that.brandslist)
					// console.log(res)
				}
			});
		},

		//人员信息获取店铺角色列表
		getRolelist() {
			var that = this;
			$.ajax({
				url: config.api_getrole,
				type: "post",
				async: true,
				data: {
					shopsId: config.id
				},
				success: res => {
					if (res.error == "00") {
						console.log(res)
						that.userrolelist = res.result.list;
						// console.log(that.userrolelist)
					} else {
						layer.msg(res.msg)
					}
				}
			})
		},

		addNewrole() {
			let that = this
			var drool = layer.open({
				type: 1,
				title: '新增店铺角色',
				closeBtn: 1,
				content: $('#addrole'),
				area: ['517px', '355px'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if (that.newrole == "") {
						layer.msg("请输入角色名")
					} else {
						$.ajax({
							url: config.api_addrole,
							type: 'post',
							async: true,
							data: {
								shopsId: config.id, //店铺ID
								roleName: that.newrole //名称
							},
							success: res => {
								if (res.error == "00") {
									layer.msg("添加角色成功")
									that.newrole = "";
									layer.close(drool)
								} else {
									layer.msg(res.msg)
								}
							}
						})
					}
				},
				end: function () {
					that.getRolelist()
				}
			});
		},

		//获取店铺人员列表
		getAlluser(page, keywords) {
			var that = this
			$('body,html').scrollTop(0)
			if (page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_getAlluser,
				async: true,
				type: 'post',
				data: {
					shopsId: config.id,
					shopsRoleId: that.bobodrool,
					keywords: that.keywords1,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function (res) {
					that.loading('close')
					// console.log(res)
					if (res.error == "00") {
						that.list = res.result;
						//排序 本来应该后端排序，但是后端没排 前端临时拍一下，后端排序后该代码不影响先有效果
						var newlist = []
						for (var i = 0; i < res.result.list.length; i++) {
							if (res.result.list[i].isQuit == "1") {
								newlist.push(res.result.list[i])
							} else {
								newlist.unshift(res.result.list[i])
							}
						}
						console.log(newlist)
						that.list.list = newlist
						//分页
						if (that.pagi) {
							$('.pagi').pagination('updatePages', that.list.pages)
							if (page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
						} else {
							that.pagi = $('.pagi').pagination({
								pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list.pageNum,
								onSelect: function (num) {
									that.list.pageNum = num
									that.getAlluser()
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

		//添加店铺人员
		adduser() {
			var that = this;
			var index = layer
				.open({
					type: 2,
					title: '新建销售人员',
					content: 'adduser.html?id=' + config.id,
					area: ['80%', '80%'],
					end: function () {
						that.getAlluser();
					}
				})
		},

		//修改某店铺人员的信息
		changeUser(id, user) {
			var that = this;
			console.log(item)
			var index = layer
				.open({
					type: 2,
					title: "详情",
					content: 'adduser1.html?id=' + id + '&shopsId=' + config.id + '&userid=' + user,
					area: ['70%', '420px'],
					end: function () {
						that.getAlluser();
					}

				})
		},
		//员工离职
		deluser(id) {
			const that = this;
			const dialog = layer.confirm("确认该负责人已经离职？", {
				title: "提示"
			}, () => {
				$.ajax({
					url: config.api_userDel,
					data: {
						userId: id
					},
					success: res => {
						layer.msg(res.msg);
						that.getAlluser()
					}
				})
			})
		},
		//按照角色显示人员
		userRole(id) {
			var that = this
			if (id) {
				that.bobodrool = id
			} else {
				that.bobodrool = ''
			}
			that.getAlluser()

		},
		//删除角色
		delRole(id) {
			var that = this
			$.ajax({
				url: config.api_delrole,
				type: "post",
				async: true,
				data: {
					shopsRoleId: id
				},
				success: res => {
					if (res.error == "00") {
						layer.msg("删除角色成功")
						that.getRolelist()
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},

		//添加店铺人员
		adduser() {
			var that = this;
			var index = layer
				.open({
					type: 2,
					title: '新建销售人员',
					content: 'adduser.html?id=' + config.id,
					area: ['80%', '80%'],
					end: function () {
						that.getAlluser();
					}
				})
		},

		//修改某店铺人员的信息
		changeUser(id, user) {
			var that = this;
			var index = layer
				.open({
					type: 2,
					title: "详情",
					content: 'adduser1.html?id=' + id + '&shopsId=' + config.id + '&userId=' + user,
					area: ['80%', '80%'],
					end: function () {
						that.getAlluser();
					}

				})
		},
		//员工离职
		deluser(id) {
			const that = this;
			const dialog = layer.confirm("确认该负责人已经离职？", {
				title: "提示"
			}, () => {
				$.ajax({
					url: config.api_userDel,
					data: {
						userId: id
					},
					success: res => {
						layer.msg(res.msg);
						that.getAlluser()
					}
				})
			})
		},
		//按照角色显示人员
		userRole(id) {
			var that = this
			if (id) {
				that.bobodrool = id
			} else {
				that.bobodrool = ''
			}
			that.getAlluser()
		},
		//编辑角色
		editRole(id) {
			var that = this;
			var index = layer
			var that = this;
			var index = layer
				.open({
					type: 2,
					title: "详情",
					content: 'editRole.html?shopsRoleId=' + id + '&shopsId=' + config.id,
					area: ['517px', '355px'],
					end: function () {
						that.getRolelist();
					}

				})
		},

		// 服务搜索
		serviceSearch() {
			const that = this;
			console.log(that.serviceKeywords)
			console.log(that.provinces)
			console.log(that.citys)
			that.showAShopsBrandService(that.serviceKeywords, that.provinces, that.citys)
		},
		// 新增品牌服务
		serviceAdd() {
			console.log('ids=' + config.ids)
			const that = this;
			var index = layer.open({
				type: 2,
				title: '加入服务',
				content: 'serviceAdd.html?id=' + config.id + '&ids=' + config.ids,
				area: ['100%', '100%'],
				end: function () {
					that.showAShopsBrandService();
				}
			});
		},
		// 获取省份
		getProvince() {
			const that = this;
			$.ajax({
				url: config.api_province,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						var arr = [];
						var res_result = res.result;
						for (var i in res_result) {
							var obj = {};
							obj.id = res_result[i].provinceId;
							obj.text = res_result[i].provinceName;
							arr.push(obj);
						}
						that.provinceList = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 选择省份
		selectProvince(Pid) {
			let obj = {},
				that = this;
			console.log(Pid)
			obj = that.provinceList.find((item) => {
				return item.id === Pid
			})
			if (obj == undefined) {
				that.provinces = ''
				that.citys = ''
			} else {
				that.provinces = obj.text
			}
		},
		// 获取城市
		selectCity(Cid) {
			let obj = {},
				that = this;
			obj = this.cityList.find((item) => {
				return item.id === Cid
			})
			if (obj == undefined) {
				that.citys = ''
			} else {
				that.citys = obj.text
			}

		},
		// 获取品牌服务列表
		showAShopsBrandService(keywords, province, city) {
			const that = this;
			$.ajax({
				url: config.api_brandServiceList,
				async: true,
				type: 'post',
				data: {
					// shopsBrandId: shopsBrandId,
					shopsId: config.id,
					province: province,
					city: city,
					keywords: that.serviceKeywords,
					pageSize: that.list.pageSize || 10,
					pageNo: that.list.pageNum || 1,
				},
				success: function (res) {
					that.loading('close')
					// console.log(res)
					if (res.error == "00") {
						that.brandServiceList = res.result;
						for (var i in that.brandServiceList.list) {
							if (that.brandServiceList.list[i].price != undefined) {
								that.brandServiceList.list[i].price = that.brandServiceList.list[i].price.toFixed(2);
							}
						}
						//分页
						if (that.pagi1) {
							$('.pagi1').pagination('updatePages', that.list.pages)
							if (page == 1) $('.pagi1').pagination('goToPage', that.list.pageNum)
						} else {
							that.pagi = $('.pagi1').pagination({
								pages: that.list.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.brandServiceList.pageNum,
								onSelect: function (num) {
									that.brandServiceList.pageNum = num
									that.getbranduser()
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
		// 删除品牌服务列表
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该服务吗?", {
				title: "提示"
			}, () => {
				$.get(config.api_delBrandService, {
					id: id,
					tableName: 'shops_service'
				}, function (data) { // 回调函数
					if (data.error == '00') {
						layer.close(dialog)
						layer.msg("删除成功")
						that.showAShopsBrandService()
					} else {
						layer.msg(data.msg)
					}
				})
			})
		},

		//获取商品列表
		getshopGoods(page, key) {
			var that = this
			$('body,html').scrollTop(0)
			if (page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_goodsList,
				async: true,
				type: 'post',
				data: {
					shopsId: config.id,
					keywords: that.key,
					typeName: that.typeName,
					minPrice: that.minp,
					maxPrice: that.maxp,
					pageSize: that.goods.pageSize || 10,
					pageNo: that.goods.pageNum || 1,
				},
				success: function (res) {
					that.loading('close')
					if (res.error == "00") {
						that.goods = res.result;
						//分页
						if (that.pagi5) {
							$('.pagi5').pagination('updatePages', that.goods.pages)
							if (page == 1) $('.pagi5').pagination('goToPage', that.goods.pageNum)
						} else {
							that.pagi3 = $('.pagi5').pagination({
								pages: that.goods.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.goods.pageNum,
								onSelect: function (num) {
									that.goods.pageNum = num
									that.getshopGoods()
								}
							})
						}
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//获取分类
		getsort() {
			var that = this;
			$.ajax({
				url: config.api_getsort,
				type: 'post',
				data: {
					level: 1,
					pageSize: 100,
				},
				success: res => {
					if (res.error == "00") {
						that.sort = res.result.list
						console.log(res)
					}
				}
			})
		},

		//删除商品
		delgoods(id) {
			var that = this
			var dialog = layer.confirm("确认删除该商品?", {
				title: "提示"
			}, () => {
				$.ajax({
					url: config.api_delgoods,
					type: 'post',
					async: true,
					data: {
						id: id,
						tableName: "shops_goods"
					},
					success: res => {
						if (res.error == "00") {
							layer.msg("删除成功")
							that.getshopGoods()
						}
					}
				})

			})
		},
		userchange() {
			var that = this;
			that.userId = ""
			$.ajax({
				type: "post",
				url: config.api_user,
				async: true,
				data: {
					shopsBrandId: that.shopsBrandId,
				},
				success(res) {
					if (res.error == "00") {
						that.userList = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		//二维码
		ewm(item, type) {
			console.log(item)
			if (type == 1) {
				let that = this
				let id = ''
				that.img_name = item.name
				id = 'goodsId=' + item.goodsId + ",relateId=" + config.id + ",type=1"
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
						that.$nextTick(function () {
							var top = $(document).scrollTop() + 200
							$(".ewm").css('top', top + 'px')
						})
					}
				});
			} else if (type == 2) {
				let that = this
				let id = ''
				that.img_name = item.brandName
				id = 'serviceId=' + item.serviceId + ",relateId=" + config.id + ",type=1"
				$.ajax({
					type: "post",
					url: config.api_ewm,
					async: true,
					data: {
						page: 'pages/clap/clap',
						id: id
					},
					success(res) {
						that.bg_show1 = true
						that.image_ewm = res.result
						that.$nextTick(function () {
							var top = $(document).scrollTop() + 200
							$(".ewm").css('top', top + 'px')
						})
					}
				});
			} else if (type == 3) {
				let that = this
				let id = ''
				that.img_name = item.roomName
				id = 'roomId=' + item.shopsRoomId + ",relateId=" + config.id + ",type=1"
				$.ajax({
					type: "post",
					url: config.api_ewm,
					async: true,
					data: {
						page: 'pages/room/room',
						id: id
					},
					success(res) {
						that.bg_show1 = true
						that.image_ewm = res.result
						that.$nextTick(function () {
							var top = $(document).scrollTop() + 200
							$(".ewm").css('top', top + 'px')
						})
					}
				});
			}
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
			image.onload = function () {
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
		},



		//房券 新增addHouseCoupon
        addHouse() {
            var that = this
            var index = layer.open({
                    type: 2,
                    title: '新增房券',
                    content: 'addHouseCoupon.html?id=' + config.id,
                    area: ['700px', '90%'],
                    end: function () {
                        that.getHouseCoupon()
                    }
                });
        },
        // 房券搜索
        searchHouse(){
            this.getHouseCoupon(1, this.houseKeywords)
        },
        // 时间戳转年月日
       gettime(timestamp) {
            var d = new Date(timestamp)
            var year = d.getFullYear();
            var month = change(d.getMonth() + 1);
            var day = change(d.getDate());
            function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            }
            var time = year + '-' + month + '-' + day;
            return time;
        },
        //获取房券列表数据
        getHouseCoupon(page,houseKeywords){
            var that = this
            $('body,html').scrollTop(0)
            if (page) this.houseList.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_houseList,
                async: true,
                type: 'post',
                data: {
                    shopsId: config.id,
                    keywords: houseKeywords,
                    pageSize: that.houseList.pageSize || 10,
                    pageNo: that.houseList.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    console.log(res)
                    if (res.error == "00") {
                        
                        const testList = res.result
                        for(let i = 0;i<testList.list.length;i++){
                            testList.list[i].time=that.gettime(testList.list[i].time)
                        }
                        that.houseList = testList;
                        //分页
                        if (that.pagi3) {
                            $('.pagi3').pagination('updatePages', that.houseList.pages)
                            if (page3 == 1) $('.pagi3').pagination('goToPage', that.houseList.pageNum)
                        } else {
                            that.pagi = $('.pagi3').pagination({
                                pages: that.houseList.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.houseList.pageNum,
                                onSelect: function (num) {
                                    that.houseList.pageNum = num
                                    that.getHouseCoupon()
                                   
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        //房券 编辑 editorHouseCoupon
        editorHouseCoupon(id) {
            var that = this
            var index = layer.open({
                    type: 2,
                    title: '编辑房券',
                    content: 'editorHouseCoupon.html?id=' + id,
                    area: ['700px', '90%'],
                    end: function () {
                        that.getHouseCoupon()
                    }
                });
        },
        // 房券 删除
        delHouseCoupon(id) {
            console.log(id,typeof(id))
            const that = this;
            const dialog = layer.confirm("确认删除该数据吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_delHouseList, {
                    id: id,
                    tableName: 'room_ticket'
                }, function (data) { // 回调函数
                    console.log(data)
                    if (data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getHouseCoupon()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
	}
})

function a() {
	app.getRoom();
}