var config = {
	role: localStorage.userRole,
	api_add: api_url + '/shops/add', //新增店铺,
	api_user: api_url + '/user/userList2', //新增店铺,
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token

	api_getpro: api_url + "/region/provinceList",	//获取省份
	api_getcity: api_url + "/region/cityList",	//根据省份获取城市
	api_getbrands:api_url + '/shopsBrand/shopsBrandList2'	//获取品牌列表
}

window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [],
		shopsName: '', //店铺名称
		shopsType: '',
		now: -1, //加入当前选中状态
		scenePicList: [], //场景图片列表
		businessHours: '', //营业时间
		phone: '', //联系电话
		address: '', //详细地址
		summary: '', //店铺简介
		userList: [],
		roleType: window.sessionStorage.getItem("roleType"),
		roleName: window.sessionStorage.getItem("roleName"),
		userId: '',
		qiniuData: {
			key: "",
			token: ""
		},
		// 七牛云上传储存区域的上传域名（华东、华北、华南、北美、东南亚）
		upload_qiniu_url: "https://upload.qiniup.com",
		// 七牛云返回储存图片的子域名
		upload_qiniu_addr: "https://images.homeplus.fun/",
		imageUrl: '',
		prolist:[],		//省份列表
		province:'',	//选择的省份
		citylist:[],	//城市列表
		city:"",		//选择的城市
		brandslist:[],
		shopsBrandId:"",
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this
		that.getTokenMessage()
		that.getUser()
		that.getpro()
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
	},
	methods: {
		/**
		 * 载入中方法
		 *
		 * @param {string} s 是否关闭
		 */
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isPNG = file.type === "image/png";
			if(!isJPG && !isPNG) {
				this.$message.error("图片只能是 JPG/PNG 格式!");
				return false;
			}
		},
		handleAvatarSuccess: function(res, file) {
			this.imageUrl = this.upload_qiniu_addr + res.key;
			console.log(this.imageUrl);
		},
		handleError: function(res) {
			this.$message({
				message: "上传失败",
				duration: 2000,
				type: "warning"
			});
		},
		loading: function(s) {
			if(s == "close") layer.close(this.loadingSwitch)
			else this.loadingSwitch = layer.load(3);
		},
		getUser() {
			let that = this
			$.ajax({
				type: "post",
				url: config.api_user,
				async: true,
				success(res) {
					if(res.error == "00") {
						that.userList = res.result
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		save() {
			let that = this
			console.log(that.businessHours)
			if(that.roleName == "系统人员" && that.userId == "") {
				layer.msg("请选择店铺店主");
				return;
			}
			if(that.shopsName == "") {
				layer.msg("请填写店铺名称");
				return;
			}
			if(that.shopsType == "") {
				layer.msg("请选择店铺类型");
				return;
			}
			if(that.phone == "") {
				layer.msg("请输入联系电话");
				return;
			}
			that.addGroup();
		},
		addGroup() {
			const that = this;
			var userId;
			if(that.userId != "") {
				userId = that.userId
			} else {
				userId = window.sessionStorage.getItem('userId')
			}
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					shopsName: that.shopsName,
					phone: that.phone,
					businessHours: that.businessHours,
					summary: that.summary,
					logoPath: that.logoPath,
					shopsPicList: JSON.stringify(that.scenePicList),
					labels: $('#tagsinputval').val(),
					shopsType: that.shopsType,
					userId: userId,
					province: that.province,
					city:that.city,
					address:that.address,
					shopsBrandId:that.shopsBrandId

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
					that.qiniuData.token = data
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
		},
		//获取省份
		getpro(){
			var that = this;
			$.ajax({
				url:config.api_getpro,
				type:"post",
				async:true,
				success:res=>{
					if(res.error == "00"){
						that.prolist = res.result
						// console.log(that.prolist)
					}else{
						layer.msg(res.error)
					}
				}
				
			})
		},
		//获取城市
		getCity(){
			var that = this;
			$.ajax({
				url:config.api_getcity,
				type:"post",
				async:true,
				data:{
					provinceName:that.province
				},
				success:res=>{
					console.log(res)
					that.citylist = res.result
					// console.log(that.citylist)
				}
			})
		},

		//获取品牌列表
		getbrands(){
			var that = this
			$.ajax({
				url:config.api_getbrands,
				type:"post",
				// async:true,
				success:res=>{
					that.brandslist = res.result
					console.log(that.brandslist)
					console.log(res)
				}
			})
		},
		//ces
		dy(){
			var that = this
			console.log(that.shopsBrandId)
		}

	}
})