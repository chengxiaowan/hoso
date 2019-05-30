var config = {
	role: localStorage.userRole,
	api_list: api_url + '/scene/dataList', //获取场景列表
	api_del: api_url + '/scene/del', //删除场景
	api_getScenePicList: api_url + '/scene/getScenePicList', //获取场景图片
	api_getGoodsSkuList: api_url + '/scene/getGoodsSkuList', //获取场景sku
	api_addScenePicLabel: api_url + '/scene/addScenePicLabel', //新增场景标签
	api_editScenePicLabel: api_url + '/scene/editScenePicLabel', //修改标签
	api_delScenePicLabel: api_url + '/scene/delScenePicLabel', //修改标签
	api_img: api_url + '/create_image', //二维码
	api_ewm: api_url + '/weixin/getwxTwoEconde',
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 列表
		keywords: '', // 名称
		selected: '',
		startDate: '', // 开始时间
		endDate: '', // 结束时间
		type: 0, // 标签类型   0:其他 1: 类型标签 2:颜色标签 3:风格标签 4: 其他标签
		name: '', // 标签名称
		createTimeStart: '', // 开始时间
		postData: {},
		isOpen: '',
		scenePicList: [],
		sceneGoodsSkuList: [],
		bg_show: false,
		pic_show: false,
		now: -1, //加入当前选中状态
		label: '',
		arr: [],
		sceneId: '', //加入sku商品时候id
		div: '',
		goodsSkuId: '',
		bg_show1: false,
		image_ewm: '',
		img_name: '',
		sceneType:'',
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
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endDate = value;
					if(value !== '') {
						startDate.config.max.year = date.year;
						startDate.config.max.month = date.month - 1;
						startDate.config.max.date = date.date;
					} else {
						startDate.config.max.year = '2099';
						startDate.config.max.month = '12';
						startDate.config.max.date = '31';
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
					if(value !== '') {
						endDate.config.min.year = date.year;
						endDate.config.min.month = date.month - 1;
						endDate.config.min.date = date.date;
					} else {
						endDate.config.min.year = '1970';
						endDate.config.min.month = '1';
						endDate.config.min.date = '1';
					}
				}
			});
		});
		that.getData();
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

		getData: function(page, keywords, type, startDate, endDate) {
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
					isOpen: that.isOpen,
					sceneType:that.sceneType,
					createTimeStart: that.startDate,
					createTimeEnd: that.endDate,
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
									console.log(that.list.pageNum)
								}
							})
						}
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
		search() {
			const that = this;
			var page = 1;
			var keywords = that.keywords;
			var type = that.selected;
			var startDate = that.startDate;
			var endDate = that.endDate;
			that.getData(page, keywords, type, startDate, endDate);
		},
		jumpToProvider() {
			var index = layer.open({
				type: 2,
				title: '新增场景',
				content: 'add.html',
				area: ['100%', '100%']
			});
		},
		// 编辑场景
		edit(id, sceneLabels) {
			var index = layer.open({
				type: 2,
				title: '编辑组合',
				content: 'edit.html?id=' + id + '&sceneLabels=' + sceneLabels,
				area: ['100%', '100%']
			});
		},
		// 删除场景
		del(id) {
			const that = this;
			const dialog = layer.confirm("确认删除该场景?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					sceneId: id
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
		playLabel(id) {
			$(".label").remove()
			let that = this;
			that.sceneId = id
			that.$nextTick(function() {
				var swiper = new Swiper('.swiper-container', {
					spaceBetween: 30,
					centeredSlides: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
					observeParents: true, //修改swiper的父元素时，自动初始化swiper
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
				});
			})
			that.loading();
			$.ajax({
				type: "post",
				url: config.api_getScenePicList,
				async: true,
				data: {
					sceneId: that.sceneId
				},
				success: function(res) {
					that.loading('close')
					if(res.error == '00') {
						that.bg_show = true
						that.pic_show = true
						that.scenePicList = res.result.scenePicList
						var nowWidth, nowHeight, oldWidth, oldHeight, bili, nowX, nowY;
						that.$nextTick(function() {
							var slide = $(".swiper-slide")
							for(i = 0; i < that.scenePicList.length; i++) {
								nowWidth = slide[i].getElementsByTagName("img")[0].clientWidth
								nowHeight = slide[i].getElementsByTagName("img")[0].clientHeight
								oldWidth = slide[i].getElementsByTagName("img")[0].naturalWidth
								oldHeight = slide[i].getElementsByTagName("img")[0].naturalHeight
								bili = (oldHeight / nowHeight).toFixed(2)
								for(n = 0; n < that.scenePicList[i].scenePicLabelList.length; n++) {
									that.div = document.createElement('div');
									that.div.className = 'label';
									var offsetLeft = slide[i].getElementsByTagName("img")[0].offsetLeft //图片距离父元素距离
									that.div.innerText = that.scenePicList[i].scenePicLabelList[n].label
									that.div.setAttribute("id", that.scenePicList[i].scenePicLabelList[n].scenePicLabelId)
									that.div.onclick = function() {
										that.changeLabel(this.innerHTML, this.getAttribute('id'), this)
									}
									that.div.style.top = Math.ceil(Number(that.scenePicList[i].scenePicLabelList[n].y) / Number(bili)) + 'px'; //距离顶部距离
									that.div.style.left = Number(offsetLeft) + Math.ceil(Number(that.scenePicList[i].scenePicLabelList[n].x) / Number(bili)) + 'px'; //距离左侧距离
									slide[i].appendChild(that.div)
								}
							}

						})
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		hide() {
			let that = this
			that.bg_show = false
			that.pic_show = false
		},
		showXY(item, event) {
			let that = this
			that.label = ''
			that.now = -1
			that.goodsSkuId = ''
			event = event || window.event;
			var x = event.offsetX || event.originalEvent.layerX; //获取点击相对于图片的x位置
			var y = event.offsetY || event.originalEvent.layerY; //获取点击相对于图片的y位置
			console.log("x:" + x + "; y:" + y);
			//获取图片原始宽高和现在宽高
			var nowWidth = event.target.width
			var nowHeight = event.target.height
			var oldWidth = event.target.naturalWidth
			var oldHeight = event.target.naturalHeight
			var bili = (oldHeight / nowHeight).toFixed(2)
			var nowX = (Number(x) * Number(bili)).toFixed(2)
			var nowY = (Number(y) * Number(bili)).toFixed(2)
			console.log(nowHeight, nowWidth, oldWidth, oldHeight, bili, nowX, nowY)
			//获取商品
			that.loading();
			$.ajax({
				type: "post",
				url: config.api_getGoodsSkuList,
				async: true,
				data: {
					sceneId: that.sceneId
				},
				success: function(res) {
					that.loading('close')
					if(res.error == '00') {
						that.bg_show = true
						that.pic_show = true
						that.sceneGoodsSkuList = res.result.sceneGoodsSkuList
					} else {
						layer.msg(res.msg)
					}
				}
			});
			//创建标签
			that.div = document.createElement('div');
			that.div.className = 'label';
			var offsetLeft = event.target.offsetLeft //图片距离父元素距离
			const dialog = layer.open({
				type: 1,
				title: '选择商品',
				closeBtn: 1,
				content: $('#attribute'),
				area: ['80%', '90%'],
				btn: "确定",
				btnAlign: 'c',
				yes() {
					if(that.goodsSkuId == '') {
						layer.msg('请选择商品')
						return false
					}
					if(that.label == '') {
						layer.msg('请填写标签名称')
						return false
					}
					$.ajax({
						type: "post",
						url: config.api_addScenePicLabel,
						async: true,
						data: {
							sceneId: that.sceneId,
							attachId: item.attachId,
							label: that.label,
							x: nowX,
							y: nowY,
							goodsSkuId: that.goodsSkuId,
						},
						success: function(res) {
							layer.close(dialog)
							that.div.innerText = that.label
							that.div.onclick = function() {
								that.changeLabel(that.label, res.result.scenePicLabelId, that.div)
							}
							that.div.style.top = y + 'px'; //距离顶部距离
							that.div.style.left = Number(offsetLeft) + Number(x) + 'px'; //距离左侧距离
							event.target.parentNode.appendChild(that.div)
						}
					});

				}
			});

		},
		join(id, index, item) {
			let that = this
			var ind;
			that.now = index;
			that.goodsSkuId = id
		},
		changeLabel(label, scenePicLabelId, div) {
			let that = this
			$(".labelName").val(label)
			var dialog = layer.open({
				type: 1,
				title: '修改标签名称',
				closeBtn: 1,
				content: $('#editlabel'),
				area: ['400px', '180px'],
				btn: ['修改', '删除'],
				btnAlign: 'c',
				yes() {
					if($(".labelName").val() == '') {
						layer.msg('标签名称不能为空')
						return false;
					}
					$.ajax({
						type: "post",
						url: config.api_editScenePicLabel,
						async: true,
						data: {
							scenePicLabelId: scenePicLabelId,
							label: $(".labelName").val()
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('修改成功')
								layer.close(dialog)
								div.innerText = $(".labelName").val()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				},
				btn2: function(index, layero) {
					$.ajax({
						type: "post",
						url: config.api_delScenePicLabel,
						async: true,
						data: {
							scenePicLabelId: scenePicLabelId,
						},
						success(res) {
							if(res.error == '00') {
								layer.msg('删除成功')
								layer.close(dialog)
								div.remove()
							} else {
								layer.msg(res.msg)
							}
						}
					});
				}
			});
		},
		ewm(item) {
			let that = this
			let id = ''
			that.img_name = item.sceneName
			id = 'sceneId=' + item.sceneId + ',salerId=' + item.salerId
			$.ajax({
				type: "post",
				url: config.api_ewm,
				async: true,
				data: {
					page: 'pages/sight_detail/sight_detail',
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
			//			that.image_ewm = config.api_img + '?type=3&inline=1&sceneId=' + item.sceneId + '&salerId=' + item.salerId

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