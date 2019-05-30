var config = {
    role: localStorage.userRole,
    api_add: api_url+'/unit/saveOrupdate', //新增单位
}
window.app = new Vue({
    el: '#app',
    data: {
        value : '', // 单位名称
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
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
        // 保存新增的单位
        save(){
            const that = this;
            var value = that.value;
            if(value == ""){
                layer.msg("请填写单位名称");
                return;
            }else{
                that.addLinkman();
            }
        },
        // 新增单位
        addLinkman(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    value: that.value,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('单位添加成功！');
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

    }
})
