var config = {
	role: localStorage.userRole,
	api_add: api_url + '/scene/add', //新增场景,
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_attributeList: api_url + '/goods/dataList', //获取商品大列表
	api_goodsSku: api_url + '/goodsSku/dataList3', //获取sku
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_salerList: api_url + '/scene/salerList', //获取sku
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		title: '',
		selected: 0,
		postData: {},
		keywords: '', //请输入分类商品名称,编号
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
		isOpen: 1, //是否公开
		scenePicList: [], //场景图片列表
		summary: '',
		roleType: '', //销售角色
		salerId: '', //销售人员
		commissionPercent: '', //销售角色
		salerList: [],
		sceneType:'',
	},
	watch: {
		roleType: function(value, oldValue) {
			let that = this
			that.salerId=''
			that.commissionPercent=''
			if(value != '') {
				$.ajax({
					type: "post",
					url: config.api_salerList,
					async: true,
					data: {
						roleType: value
					},
					success(res) {
						if(res.error == '00') {
							that.salerList = res.result.salerList
						}
					}
				});
			}
		}
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		that.getTokenMessage()
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
		//sku商品列表
		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_goodsSku,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					skipGoodsSkuIds: that.skipGoodsIds.join(','),
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
									that.now=-1
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
		// 跳转新增商品页面
		jumpToGoods() {
			let that = this
			that.now = -1
			that.getData()
			that.arr = []
			const dialog = layer.open({
				type: 1,
				title: '加入商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					console.log(that.arr)
					if(that.arr.length < 1) {
						layer.msg('请加入至少一个商品')
						return
					} else {
						that.list.list.forEach(function(i) {
							if(i.goodsSkuId == that.arr[0]) {
								layer.close(dialog)
								that.goodList.push(i)
								that.skipGoodsIds.push(i.goodsSkuId)
							}
						})
					}

				}
			});
		},
		//加入组合
		join(id, index, item) {
			let that = this
			var ind;
			that.arr = []
			that.now = index;
			that.arr.push(id)
		},
		save() {
			// console.log(1);
			const that = this;
			var title = that.title;
			var arr = [];
			var sz = 0,
				sz1 = 0;
			that.goodList.forEach(function(v) {
				var obj = {
					goodsSkuId: v.goodsSkuId,
					num: v.num
				};
				arr.push(obj)
			})
			if(title == "") {
				layer.msg("请填写场景名称");
				return;
			}
			arr.forEach(function(v) {
				sz++
				if(v.num == '' || v.num == undefined) {
					that.isgo = false
					return;
				} else {
					that.isgo = true
					sz1++
				}
			})
			if(sz != sz1) {
				layer.msg("请填写全部的数量");
				return;
			}
			if(that.roleType == '' ){
				layer.msg("请选择销售角色");
				return;
			}
			
			if(that.roleType != '' && that.roleType != 0) {
				if(that.salerId == '') {
					layer.msg("请选择销售人员");
					return;
				}
				if(that.commissionPercent == '') {
					layer.msg("请填写佣金比例");
					return;
				}
			}
			if($("#demo2").attr("src")==''){
				layer.msg("请上传场景封面");
					return;
			}
			that.addGroup(arr);
		},
		addGroup(arr) {
			const that = this;
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					sceneGoodsSkuList: JSON.stringify(arr),
					sceneName: that.title,
					sceneType:that.sceneType,
					isOpen: that.isOpen,
					sceneLabels: $('#tagsinputval').val(),
					roleType:that.roleType,
					scenePicList: JSON.stringify(that.scenePicList),
					summary: that.summary,
					roleType:that.roleType,
					salerId:that.salerId||0,
					commissionPercent:that.commissionPercent,
					imageUrl:$("#demo2").attr("src")
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('添加成功！');
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
		searchGood() {
			let that = this;
			that.now=-1
			that.getData(1)
		},
		delGood(index, id) {
			let that = this
			var ind, ind1;
			const dialog = layer.confirm("确认删除该商品组合吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				layer.close(dialog)
				layer.msg("删除成功")
				that.goodList.splice(index, 1)
				ind = that.arr.indexOf(id)
				that.arr.splice(ind, 1)
				that.list.list.forEach(function(v, num) {
					if(v.goodsId == id) {
						that.list.list[num].isShow = false
					}
				})
			})

			console.log(that.list.list)
		},
		delGoodSku(index, id) {
			let that = this
			const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				layer.close(dialog)
				layer.msg("删除成功")
				that.goodList.splice(index, 1),
					that.skipGoodsIds.splice(that.skipGoodsIds.indexOf(id), 1)
			})

		},
		delPic(index, id) {
			let that = this
			const dialog = layer.confirm("确认删除该图片吗?删除后无法恢复！", {
				title: "提示"
			}, () => {
				layer.close(dialog)
				layer.msg("删除成功")
				that.scenePicList.splice(index, 1)
			})

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
					'FilesAdded': function(up, files) {
						plupload.each(files, function(file) {
							// 文件添加进队列后，处理相关的事情
						});
					},
					'BeforeUpload': function(up, file) {
						// 每个文件上传前，处理相关的事情
					},
					'UploadProgress': function(up, file) {
						//文件上传时，处理相关的事情

						/*可能是文件大小
						var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
						*/

						//上传进度 class="layui-btn" type="button"
						$('#qiniupercent').attr('style', 'width:' + file.percent + '%');
						//console.log(file.percent + "%");
					},
					'UploadComplete': function() {
						//do something
					},
					'FileUploaded': function(up, file, info) {
						//每个文件上传成功后,处理相关的事情
						//其中 info 是文件上传成功后，服务端返回的json，形式如
						//{
						//  "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
						//  "key": "gogopher.jpg"
						//}
						var obj = {}
						var domain = up.getOption('domain');
						var res = eval('(' + info + ')');
						var sourceLink = domain + res.url; //获取上传文件的链接地址
						res.url = domain + res.url
						obj.uploadTime = getCurrentTime()
						obj.originalFilename = res.original
						obj.url = res.url
						that.scenePicList.push(obj)
						//do something
					},
					'Error': function(up, err, errTip) {
						alert(errTip);
					},
					'Key': function(up, file) {
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
		}

	}
})