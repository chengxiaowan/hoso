var config = {
	role: localStorage.userRole,
	api_add: api_url + '/specialTopic/add', //新增优惠券
	api_getToken: api_url + '/qiniu/getUpToken', //获取七牛云token
}
window.app = new Vue({
	el: '#app',
	data: {
		title: '', //专题标题
		summary: '', //专题简述
		createTimeStart: '',
		createTimeEnd: '',
		editor: null,
		description: '', //描述
		imageUrl: '',
	},
	created: function() {
		var that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		let  that = this

			//挂载一个富文本
			var E = window.wangEditor
			window.editor = new E('#demo')
			window.editor.customConfig.qiniu = true     //允许富文本调用七牛云对象储存
			window.editor.create()

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

		save() {
			let that = this
			if(that.title==''){
				layer.msg('请填写全部必填项')
				return
			}

			if($("#demo1").attr('src') == ""){
				layer.msg('请上传封面')
				return
			}
			$.ajax({
				type: "post",
				url: config.api_add,
				async: true,
				data: {
					title: that.title,
					summary: that.summary,
					imageUrl: $("#demo1").attr('src'),
					description: editor.txt.html()
				},
				success(res) {
					if(res.error == '00') {
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
                    uploadInit(obj)      //这个是富文本的


				}
			});
		}
	}
})