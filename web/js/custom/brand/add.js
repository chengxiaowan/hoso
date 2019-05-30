var config = {
	role: localStorage.userRole,
	api_add: api_url + '/brand/saveOrupdate', //新增品牌
	api_getToken:api_url+'/qiniu/getUpToken',//获取七牛云token
}
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 品牌列表
		name: '', // 品牌名称
		logoPath: '', // 品牌logo
		remark: '', // 备注
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
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
		// 保存合同操作 交验合同编号，供应商是否为空
		save() {
			const that = this;
			that.logoPath = $("#demo1").attr('src')
			if(that.name == "") {
				layer.msg("请填写品牌名称");
				return;
			}
//			else if(that.logoPath == ""){
//				layer.msg("请填写品牌logo");
//				return;
//			} 
			else {
				that.addBrand();
			}
		},
		// 新增品牌
		addBrand() {
			const that = this;
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					name: that.name,
					logoPath: that.logoPath
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('品牌添加成功！');
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