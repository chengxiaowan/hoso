var config = {
    role: localStorage.userRole,
    api_add:api_url+ '/label/add', //新增标签,
}

window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [],
        name: '',
        selected: 0,
        postData: {},
    },
    created: function() {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this
        // that.getData();

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
        save(){
            // console.log(1);
            const that = this;
            var name = that.name;
            var selected = that.selected;
            if(name == ""){
                layer.msg("请填写标签名称");
                return;
            }else if(selected == 0){
                layer.msg("请选择标签类型");
                return;
            }else{
                that.addLabel();
            }
        },
        addLabel(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    name: that.name,
                    type: that.selected,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('标签添加成功！');
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


