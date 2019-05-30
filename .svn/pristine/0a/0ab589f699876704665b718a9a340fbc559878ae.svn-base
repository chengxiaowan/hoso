var config = {
	role: localStorage.userRole,
	api_list: api_url + '/depot/depotList', //获取仓库列表
	api_add: api_url + '/depot/addDepot', //新增仓库
	api_editInfo: api_url + '/depot/editDepotInfo ', // 获取仓库信息
	api_edit: api_url + '/depot/editDepot', //修改仓库
	api_del: api_url + '/depot/delDepot', //删除仓库
	api_province: api_url + '/region/provinceList', // 获取省份
	api_city: api_url + '/region/cityList', //获取城市
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		provinceId: "", //省-搜索
		cityId: "", //市-搜索
		provinceName: '',
		cityName: '',
		name: '', //仓库名称
		province: '', //省
		city: '', //市-新增
		address: '', //地区-新增
		keywords: '',
		provinceList: [],
		cityList: [],
		provinceList1: [],
		cityList1: [],
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");

	},
	watch: {
		provinceId(val, oldVal) {
			let that = this
			that.cityList = ''
			that.cityId = ''
			if(val != '') {
				$.ajax({
					url: config.api_city,
					async: true,
					type: 'post',
					data: {
						parentId: val,
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var arr = [];
							var res_result = res.result;
							for(var i in res_result) {
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
		},
		province(val, oldVal) {
			let that = this
			that.cityList1 = ''
			that.city = ''
			if(val != '') {
				$.ajax({
					url: config.api_city,
					async: true,
					type: 'post',
					data: {
						provinceName: val,
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var arr = [];
							var res_result = res.result;
							for(var i in res_result) {
								var obj = {};
								obj.id = res_result[i].cityId;
								obj.text = res_result[i].cityName;
								arr.push(obj);
							}
							that.cityList1 = arr;
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		}
	},
	mounted: function() {
		const that = this;
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		that.getData(); //获取供应商列表
		that.getProvince(); //获取省份
		that.getProvince1(); //获取省份
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
		// 获取列表数据
		getData: function(page, provinceName, cityName) {
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
					province: that.provinceName,
					city: that.cityName,
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
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						var res_result = res.result;
						for(var i in res_result) {
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
		// 获取省份1
		getProvince1() {
			const that = this;
			$.ajax({
				url: config.api_province,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						var res_result = res.result;
						for(var i in res_result) {
							var obj = {};
							obj.id = res_result[i].provinceId;
							obj.text = res_result[i].provinceName;
							arr.push(obj);
						}
						that.provinceList1 = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		selectProvince(Pid) {
			let obj = {},
				that = this;
			obj = this.provinceList.find((item) => {
				return item.id === Pid
			})
			if(obj == undefined) {
				that.provinceName = ''
				that.cityName = ''
			} else {
				that.provinceName = obj.text
			}
		},
		selectCity(Cid) {
			let obj = {},
				that = this;
			obj = this.cityList.find((item) => {
				return item.id === Cid
			})
			if(obj == undefined) {
				that.cityName = ''
			} else {
				that.cityName = obj.text
			}

		},
		// 新增供应商
		add() {
			let that = this
			that.name = ''
			that.province = ''
			that.city = ''
			that.address = ''
			var index = layer.open({
				type: 1,
				title: '新增仓库',
				closeBtn: 1,
				content: $('#add'),
				area: ['60%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.province == '' || that.city == '' || that.address == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_add,
						async: true,
						data: {
							name: that.name,
							province: that.province,
							city: that.city,
							address: that.address,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('添加成功')
								layer.close(index)
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		// 编辑标签
		edit(id) {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_editInfo,
				async: true,
				data: {
					depotId: id
				},
				success(res) {
					if(res.error == '00') {
						that.name= res.result.depotName
						that.province= res.result.province
						that.$nextTick(function(){
							that.city= res.result.city
						})
						that.address= res.result.address
					} else {
						layer.msg(res.msg)
					}
				}
			});
			var index = layer.open({
				type: 1,
				title: '编辑仓库',
				closeBtn: 1,
				content: $('#add'),
				area: ['60%', '60%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.name == '' || that.province == '' || that.city == '' || that.address == '') {
						layer.msg('请填写全部必填项')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_edit,
						async: true,
						data: {
							depotId:id,
							name: that.name,
							province: that.province,
							city: that.city,
							address: that.address,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('修改成功')
								layer.close(index)
								that.getData()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
			
		},
		// 搜索
		search() {
			const that = this;
			that.getData(1);
		},
		// 删除供应商
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该仓库信息嘛?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					depotId: id,
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
	}
})