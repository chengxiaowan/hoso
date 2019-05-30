var config = {
	role: localStorage.userRole,
	api_add: api_url + '/type/add', //新增商品类目
	api_typeList: api_url + '/type/typeList', // 查询分类
	type: parameter().type,
	api_getToken:api_url+'/qiniu/getUpToken',//获取七牛云token

}
window.app = new Vue({
	el: '#app',
	data: {
		list: [], // 商品类目列表
		typeList: [], // 查询分类
		name: '', // 商品类目名称
		typeCode: '', // 商品类目编号
		selected: '', // 父类目id
		sortNo: '', // 顺序号
		picPath: '', // 图片
		type: config.type, //区分父类，子类
		url: '',
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
		that.getTokenMessage()
		that.getTypeList();
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
		// 查询分类
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
		// 保存新增的商品类目名称 编号
		save() {
			const that = this;
			var name = that.name;
			var typeCode = that.typeCode;
			var sortNo = that.sortNo;
			that.picPath = $("#demo1").attr('src')
			var reg = /^(0[1-9]|[1-9][0-9])$/;
			var regNo = /^[1-9]\d*$/;
			if(name == "") {
				layer.msg("请填写类目名称");
				return;
			} else if(sortNo == "") {
				layer.msg("请填写顺序号");
				return;
			} else if(!regNo.test(sortNo)) {
				layer.msg("请填写正确的顺序号");
				return;
			}else if(that.picPath == ""){
				layer.msg("请上传分类图片");
				return;
			} else {
				that.addCategory();
			}
		},
		// 新增商品类目
		addCategory() {
			const that = this;
			if(that.type == 2 && that.selected == 0) {
				layer.msg("请选择父类");
				return;
			}
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					type: 3,
					name: that.name,
					parentId: that.selected,
					sortNo: that.sortNo,
					level: config.type,
					picPath: that.picPath
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('商品分类添加成功！');
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
					
				}
			});
		}

	}
})