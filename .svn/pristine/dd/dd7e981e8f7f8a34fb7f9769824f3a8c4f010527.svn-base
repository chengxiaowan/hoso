var config = {
	id: parameter().id,
	shopsRoomId:parameter().shopsRoomId,
	roomLabels: parameter().roomLabels,
	api_add: api_url + '/shopsLinkMan/addShopsRoom', //新增房间,
	api_typeList: api_url + '/type/typeList', //获取类别
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_brandList: api_url + '/brand/brandList', //获取品牌列表
	api_goodsSku: api_url + '/goodsSku/dataList3', //获取sku
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
	api_selectUsersoodsList: api_url + '/shopsLinkMan/selectUsersoodsList', //房间员工弹窗
	api_selectRoomGoodsList: api_url + '/shopsLinkMan/selectRoomGoodsList', //房间商品弹窗
	api_updateShopsRoom: api_url + '/shopsLinkMan/updateShopsRoom', //修改房间
	api_getRoomsDetail: api_url + '/shopsLinkMan/getRoomsDetail', //房间详情
	api_delShopsRoomPic: api_url + '/shopsLinkMan/delShopsRoomPic', //删除房间图片
	api_delShopsRoomGoods: api_url + '/shopsLinkMan/delShopsRoomGoods', //删除房间商品
	api_delShopsRoomDistributor: api_url + '/shopsLinkMan/delShopsRoomDistributor', //删除房间人员
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		roomName: '',
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
		skipIds: [], //不需要显示的sku-商品
		skipIds1: [], //不需要显示的sku-人员
		now: -1, //加入当前选中状态
		isOpen: 1, //是否公开
		scenePicList: [], //场景图片列表
		summary: '',
		roomUserList: [],
		list1: [],
		keywords1: '',
		tagsinputval:'',
		shopsRoomId:'',
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this
		that.tagsinputval = config.roomLabels
		$('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
		that.getDetail();
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
		getDetail() {
			let that = this;
			that.loading();
			that.skipIds = []
			that.skipIds1 = []
			$.ajax({
				type: "post",
				url: config.api_getRoomsDetail,
				async: true,
				data: {
					shopsId: config.id,
					shopsRoomId:config.shopsRoomId,
				},
				success: function(res) {
					that.loading('close')
					if(res.error == '00') {
						that.goodList = res.result.goodsList
						that.roomName = res.result.roomName
						that.isOpen = res.result.isOpen
						that.scenePicList = res.result.pic
						that.shopsRoomId = res.result.shopsRoomId
						that.summary = res.result.summary
						that.roomUserList=res.result.usersList
						$("#demo2").attr('src',res.result.imageUrl)
						that.goodList.forEach(function(i) {
							that.skipIds.push(i.goodsId)
						})
						that.roomUserList.forEach(function(i) {
							that.skipIds1.push(i.userId)
						})
					} else {
						layer.msg(res.msg)
					}
				}
			});

		},
		//sku商品列表
		getData: function(page, keywords) {
			if(page) this.list.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_selectRoomGoodsList,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords,
					typeId: that.typeId,
					supplierId: that.supplierId,
					brandId: that.brandId,
					pageSize: that.list.pageSize || 5,
					pageNo: that.list.pageNum || 1,
					skipIds: that.skipIds.join(','),
					shopsId: config.id
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
		//用户列表
		getData1: function(page, keywords) {
			if(page) this.list1.pageNum = page
			var that = this;
			that.loading();
			$.ajax({
				url: config.api_selectUsersoodsList,
				async: true,
				type: 'post',
				data: {
					keywords: that.keywords1,
					pageSize: that.list1.pageSize || 5,
					pageNo: that.list1.pageNum || 1,
					skipIds: that.skipIds1.join(','),
					shopsId: config.id
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						that.list1 = res.result;
						//分页
						if(that.pagi1) {
							$('.pagi1').pagination('updatePages', that.list1.pages)
							if(page == 1) $('.pagi1').pagination('goToPage', that.list1.pageNum)
						} else {
							that.pagi1 = $('.pagi1').pagination({
								pages: that.list1.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.list1.pageNum,
								onSelect: function(num) {
									that.now = -1
									that.list1.pageNum = num
									that.getData1()
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
							if(i.goodsId == that.arr[0]) {
								layer.close(dialog)
								that.goodList.push(i)
								that.skipIds.push(i.goodsId)
							}
						})
					}

				}
			});
		},
		// 跳转新增人员页面
		jumpToPeople() {
			let that = this
			that.now = -1
			that.getData1()
			that.arr = []
			const dialog = layer.open({
				type: 1,
				title: '加入人员',
				closeBtn: 1,
				content: $('#peopele'),
				area: ['100%', '100%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					console.log(that.arr)
					if(that.arr.length < 1) {
						layer.msg('请选择人员')
						return
					} else {
						that.list1.list.forEach(function(i) {
							if(i.userId == that.arr[0]) {
								layer.close(dialog)
								that.roomUserList.push(i)
								that.skipIds1.push(i.userId)
							}
						})
					}

				}
			});
		},
		//加入商品组合
		join(id, index, item) {
			let that = this
			var ind;
			that.arr = []
			that.now = index;
			that.arr.push(id)
		},
		//加入人员组合
		join1(id, index, item) {
			let that = this
			var ind;
			that.arr = []
			that.now = index;
			that.arr.push(id)
		},
		save() {
			// console.log(1);
			const that = this;
			var roomName = that.roomName;
			var arr = [];
			var arr1 = [];
			that.goodList.forEach(function(v) {
				var obj = {
					goodsId: v.goodsId,
					shopsRoomGoodsId: v.shopsRoomGoodsId,
					shopsRoomId:that.shopsRoomId
				};
				arr.push(obj)
			})
			that.roomUserList.forEach(function(v) {
				var obj = {
					userId: v.userId,
					shopsRoomDistributorId:v.shopsRoomDistributorId,
					shopsRoomId:that.shopsRoomId
				};
				arr1.push(obj)
			})
			if(roomName == "") {
				layer.msg("请填写房间名称");
				return;
			}
			if(!$("#demo2").attr("src")) {
				layer.msg("请上传房间封面");
				return;
			}
			that.addGroup(arr, arr1);
		},
		addGroup(arr, arr1) {
			const that = this;
			$.ajax({
				url: config.api_updateShopsRoom,
				async: true,
				type: 'post',
				data: {
					shopsRoomId:that.shopsRoomId,
					shopsId: config.id,
					roomGoodsSkuList: JSON.stringify(arr),
					roomUserList: JSON.stringify(arr1),
					roomName: that.roomName,
					isOpen: that.isOpen,
					roomLableList: $('#tagsinputval').val(),
					roomPicList: JSON.stringify(that.scenePicList),
					summary: that.summary,
					imageUrl: $("#demo2").attr("src")
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('修改成功！');
						parent.a()
						parent.layer.close(index);
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
			that.now = -1
			that.getData(1)
		},
		searchGood1() {
			let that = this;
			that.now = -1
			that.getData1(1)
		},
		delGood(index, id,goodsId) {
			let that = this
			var ind
			ind = that.skipIds.indexOf(goodsId)
			if(id) {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delShopsRoomGoods,
						async: true,
						type: 'post',
						data: {
							shopsRoomGoodsId: id
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("删除成功")
								that.skipIds.splice(ind, 1)
								that.goodList.splice(index, 1)
							} else {
								layer.msg(res.msg)
							}
						}
					});
				})
			} else {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					layer.close(dialog)
					layer.msg("删除成功")
					that.skipIds.splice(ind, 1)
					that.goodList.splice(index, 1)
				})
			}
		},
		delUser(index, id,userId) {
			let that = this
			ind = that.skipIds1.indexOf(userId)
			if(id) {
				const dialog = layer.confirm("确认删除该人员吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delShopsRoomDistributor,
						async: true,
						type: 'post',
						data: {
							shopsRoomDistributorId: id
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("删除成功")
								that.skipIds1.splice(ind, 1)
								that.roomUserList.splice(index, 1)
							} else {
								layer.msg(res.msg)
							}
						}
					});
				})
			} else {
				const dialog = layer.confirm("确认删除该商品吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					layer.close(dialog)
					layer.msg("删除成功")
					that.skipIds1.splice(ind, 1)
					that.roomUserList.splice(index, 1)
				})
			}

		},
		delPic(index, id) {
			let that = this
			if(id) {
				const dialog = layer.confirm("确认删除该图片吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					$.ajax({
						url: config.api_delShopsRoomPic,
						async: true,
						type: 'post',
						data: {
							attachId: id
						},
						success: function(res) {
							if(res.error == "00") {
								layer.close(dialog)
								layer.msg("删除成功")
								that.scenePicList.splice(index, 1)
							} else {
								layer.msg(res.msg)
							}
						}
					});
				})
			} else {
				const dialog = layer.confirm("确认删除该图片吗?删除后无法恢复！", {
					title: "提示"
				}, () => {
					layer.close(dialog)
					layer.msg("删除成功")
					that.scenePicList.splice(index, 1)
				})
			}

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