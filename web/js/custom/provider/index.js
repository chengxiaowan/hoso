var config = {
	role: localStorage.userRole,
	api_list: api_url + '/supplier/dataList', //获取供应商列表
	api_add: api_url + '/supplier/saveOrupdate', //新增供应商
	api_edit: api_url + '/supplier/editInfo ', // 编辑供应商
	api_view: api_url + '/supplier/saveOrupdate', //查看供应商
	api_del: api_url + '/supplier/saveOrupdate', //删除供应商
	api_province: api_url + '/region/provinceList', // 获取省份
	api_city: api_url + '/region/cityList', //获取城市
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		id: '', // 供应商Id
		list: [], // 列表
		keywords: '', // 搜索关键词
		name: '', // 供应商名称
		supplierCode: '', // 供应商编号
		address: '', // 地址
		bankName: '', // 开户行
		bankNumber: '', // 开户行账号
		taxIdentificationNumber: '', // 纳税人识别号
		fax: '', // 传真
		postcode: '', // 邮编
		remark: '', // 备注
		provinceList: [], // 省份列表
		provinceId: "", //城市Id
		provinceName: '', //省份名称
		cityList: [], // 城市列表
		cityId: "", //城市Id
		cityName: '', //城市名称
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
						console.log(res_result)
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
		selectProvince(Pid){
			let obj={},
				that = this;
			obj = this.provinceList.find((item)=>{
				return item.id ===Pid
			})
			if(obj==undefined){
				that.provinceName = ''
				that.cityName = ''
			}else{
				that.provinceName = obj.text
			}
		},
		selectCity(Cid){
			let obj={},
				that = this;
			obj = this.cityList.find((item)=>{
				return item.id ===Cid
			})
			if(obj==undefined){
				that.cityName = ''
			}else{
				that.cityName = obj.text
			}
			
		},
		// 跳转新增供应商页面
		jumpToProvider() {
			var index = layer.open({
				type: 2,
				title: '新增供应商',
				content: 'add.html',
				area: ['100%', '100%']
			});
		},
		// 保存新增供应商列表
		save() {
			const that = this;
			if(that.name == "") {
				layer.msg("请填写供应商名称");
				return;
			} else {
				that.addProvider();
			}
		},
		// 新增供应商
		addProvider() {
			const that = this;
			$.ajax({
				url: config.api_add,
				async: false,
				type: 'post',
				data: {
					name: that.name,
					province: that.province,
					city: that.city,
					province: that.province,
					address: that.address,
					bankAccountName: that.bankAccountName,
					bankName: that.bankName,
					bankNumber: that.bankNumber,
					taxIdentificationNumber: that.taxIdentificationNumber,
					fax: that.fax,
					postcode: that.postcode,
					remark: that.remark,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('供应商添加成功！');
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
		// 查看供应商详情
		view(id) {
			var index = layer.open({
				type: 2,
				title: '点击查看详情',
				content: 'detail.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 编辑标签
		edit(id) {
			var index = layer.open({
				type: 2,
				title: '编辑供应商',
				content: 'edit.html?id=' + id,
				area: ['100%', '100%']
			});
		},
		// 搜索
		search() {
			const that = this;
			var page = 1;
			var provinceName = that.provinceName;
			var cityName = that.cityName;
			var keywords = that.keywords;
			that.getData(page, provinceName, cityName, keywords);
		},
		// 删除供应商
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该供应商吗?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					id: id,
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
	}
})