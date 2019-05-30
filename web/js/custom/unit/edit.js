var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/unit/editInfo', //获取单位详情
    api_edit: api_url+'/unit/saveOrupdate', //编辑单位
}

window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        id:id, // 单位id
        value: '', // 单位
    },
    created: function() {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this
        that.getDetail();

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
        // 获取单位详情
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
                        that.value = that.list.value;
                        // that.logo = that.list.logoPath;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存供应商操作 交验供应商是否为空
        save(){
            const that = this;
            var value = that.value;
            if(value == ""){
                layer.msg("请填写单位名称");
                return;
            }else{
                that.edit();
            }
        },
        // 编辑单位
        edit(){
            const that = this;
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                    value: that.value
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
        }
    }
})


