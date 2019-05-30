var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/brand/editInfo',// 获取品牌详情
    api_edit: api_url+'/brand/saveOrupdate',// 修改品牌
    api_getToken:api_url+'/qiniu/getUpToken',//获取七牛云token
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 品牌id
        list: [], // 品牌列表
        name: '', // 品牌名称
        remark: '', // 备注
        logoPath:''
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getDetail();
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
        // 获取品牌详情
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    id: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.logoPath = that.list.logoPath;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存品牌操作 交验品牌名称、logo是否为空
        save(){
            const that = this;
            var name = that.name;
            that.logoPath='';
            that.logoPath = $("#demo1").attr('src')
            if(name == ""){
                layer.msg("请填写品牌名称");
                return;
            }
            
//          else if(that.logoPath == ""){
//				layer.msg("请填写品牌logo");
//				return;
//			} 
//			
			else{
                that.edit();
            }
        },
        edit(){
            const that = this;
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                    name: that.name,
                    logoPath: that.logoPath,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('修改成功！');
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
