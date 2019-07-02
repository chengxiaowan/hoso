var config = {
	role: localStorage.userRole,
	api_add: api_url + '/supplier/saveOrupdate', //新增供应商联系人
	api_province: api_url + '/region/provinceList', // 获取省份
	api_city: api_url + '/region/cityList', //获取城市
	api_saveProductAttach: api_url + '/supplier/addAttach', //保存上传附件
}
window.app = new Vue({
	el: '#app',
	data: {
		c: {
			attachs: [],
		},
		uploader: 0, //上传组件状态
		role: config.role,
		list: [], // 供应商列表
		linkmanList: [], // 联系人列表
		// id: id, // id
		name: '', // 供应商名称
		provinceList: [], // 省份列表
		provinceId: "", //城市Id
		provinceName: '', //省份名称
		cityList: [], // 城市列表
		cityId: "", //城市Id
		cityName: '', //城市名称
		supplierCode: '', // 供应商编号
		address: '', // 地址
		bankName: '', // 开户行
		bankNumber: '', // 开户账号
		taxIdentificationNumber: '', // 纳税人识别号
		fax: '', // 传真
		postcode: '', // 邮编
		remark: '', // 备注
		linkmanName: '', // 联系人姓名
		linkmanPhone: '', // 联系人手机
		linkmanTel: '', // 联系人电话
		linkmanEmail: '', // 联系人邮箱
		linkmanFax: '', // 联系人传真
		linkmanJob: '', // 职务
		linkmanRemark: '', // 备注
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		that.getProvince(); //获取省份
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
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
	computed: {
		//合成上传附件列表
		attachs() {
			const attachs = this.c.attachs
			let data = {
				"type": [],
			}
			$.each(attachs, function() {
				for(var i in this) {
					if(data[i] == undefined) {
						data[i] = []
					}
					data[i].push(this[i])
				}
			})
			for(var i in data) {
				data[i] = data[i].join(",")
			}
			//			data.contractId = config.customerId
			return data
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
				async: false,
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
		save() {
			const that = this;
			var name = that.name;
			if(name == "") {
				layer.msg("请填写供应商名称 ");
				return;
			} else {
				that.addProvider();
			}
		},
		// 添加供应商信息
		addProvider() {
			const that = this;
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					name: that.name,
					province: that.provinceName,
					city: that.cityName,
					address: that.address,
					bankAccountName: that.bankAccountName,
					bankName: that.bankName,
					bankNumber: that.bankNumber,
					taxIdentificationNumber: that.taxIdentificationNumber,
					postcode: that.postcode,
					fax: that.fax,
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
		initUploader() {
			if(this.uploader) return;
			const that = this;
			that.uploader = 1

			var uploader = WebUploader.create({

				// 文件接收服务端。
				server: api_url + "/attach/upload",
				runtimeOrder: 'html5',
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: {
					id: '#fileUp',
					innerHTML: '上传附件'
				},
				resize: false,
				fileNumLimit: 10
			});
			//上传成功
			uploader.on('uploadSuccess', function(file, res) {
				that.c.attachs.push(res)
			});

			uploader.on('uploadStart', function() {
				that.loading()
			})
			//上传出错
			uploader.on('uploadError', function(file) {
				layer.msg('上传出错');
			});
			//出错
			uploader.on('error', function(res) {
				if(res == 'Q_TYPE_DENIED') {
					layer.msg('上传文件格式错误，请检查')
				}
			});
			//上传完成
			uploader.on('uploadFinished', function(file) {
				uploader.reset();
				$.post(config.api_saveProductAttach, that.attachs)
					.done(() => {
						that.loading("close")
					})
			});
			//文件加入队列
			uploader.on('fileQueued', function() {
				uploader.upload()
			})
		},
		look() {},
		del() {},
		/*// 获取联系人列表数据
		        getLinkmanList: function(page) {
		            $('body,html').scrollTop(0)
		            if(page) this.linkmanList.pageNum = page
		            var that = this;
		            that.loading();
		            $.ajax({
		                url: config.api_linkman_list,
		                async: true,
		                type: 'post',
		                data: {
		                    supplierId: that.id,
		                    pageSize: that.linkmanList.pageSize || 10,
		                    pageNo: that.linkmanList.pageNum || 1,
		                },
		                success: function(res) {
		                    that.loading('close')
		                    if(res.error == "00") {
		                        that.linkmanList = res.result;
		                        //分页
		                        if(that.pagi) {
		                            $('.pagi').pagination('updatePages', that.linkmanList.pages)
		                            if(page == 1) $('.pagi').pagination('goToPage', that.linkmanList.pageNum)
		                        } else {
		                            that.pagi = $('.pagi').pagination({
		                                pages: that.linkmanList.pages, //总页数
		                                showCtrl: true,
		                                displayPage: 6,
		                                currentPage: that.linkmanList.pageNum,
		                                onSelect: function(num) {
		                                    that.linkmanList.pageNum = num
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
		        // 跳转新增联系人页面
		        jumpToLinkman(){
		            var index = layer.open({
		                type : 2,
		                title : '联系人详情',
		                content: 'addLinkman.html?id='+id,
		                area : [ '100%', '100%' ]
		            });
		        },*/
		/*// 新增联系人
		addLinkman(){
		    const that = this;
		    $.ajax({
		        url: config.api_addLinkman,
		        async: true,
		        type: 'post',
		        data: {
		            id: that.id,
		            name: that.linkmanName,
		            phone: that.linkmanPhone,
		            tel: that.linkmanTel,
		            mail: that.linkmanEmail,
		            job: that.linkmanJob,
		            remark: that.linkmanRemark
		        },
		        success: function(res) {
		            that.loading('close')
		            if(res.error == "00") {
		                var index=parent.layer.getFrameIndex(window.name);
		                layer.msg('联系人添加成功！');
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
		// 查看联系人详情
		viewLinkman(id){
		    var index = layer.open({
		        type : 2,
		        title : '点击查看详情',
		        content: 'linkmanDetail.html?id='+id,
		        area : [ '100%', '100%' ]
		    });
		},
		// 编辑联系人
		editLinkman(id){
		    var index = layer.open({
		        type : 2,
		        title : '编辑标签',
		        content: 'editLinkman.html?id='+id,
		        area : [ '100%', '100%' ]
		    });
		},
		// 删除联系人
		delLinkman(id) {
		    const that = this;
		    const dialog = layer.confirm("确认删除该联系人吗?", {
		        title: "提示"
		    }, () => {
		        $.get(config.api_delLinkman, {
		            id: id,
		            delFlag:'1'
		        }, function(data) { // 回调函数
		            if(data.error == '00') {
		                layer.close(dialog)
		                setTimeout(function () {
		                    window.location.reload();
		                }, 1000);
		                layer.msg("删除成功")
		                that.getData()
		            } else {
		                layer.msg(data.msg)
		            }
		        })
		    })
		},*/
	}
})