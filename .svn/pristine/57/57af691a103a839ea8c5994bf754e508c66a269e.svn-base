var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/goodsSkuAttribute/editInfo', // 获取自定义属性信息
    api_edit: api_url+'/goodsSkuAttribute/saveOrupdate',// 修改自定义属性

}

window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 自定义属性列表
        id: id, // 商品与自定义属性关系id
        skuAttributeId: '', // 自定义属性id
        skuSelectId: '', // 自定义属性可选项id
        skuAttributeName: '', // 自定义属性名称
        skuSelectValue: '', // 自定义属性可选项值

    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
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
        // 获取自定义属性信息
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    goodsSkuAttributeId: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.skuAttributeName = that.list.skuAttributeName;
                        that.skuSelectValue = that.list.skuSelectValue;
                        that.skuAttributeId = that.list.skuAttributeId;
                        that.skuSelectId = that.list.skuSelectId;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存判断自定义属性名称，自定义属性可选项值是否为空
        confirm(){
            const that = this;
            var skuAttributeName = that.skuAttributeName,skuSelectValue = that.skuSelectValue;
            if(skuAttributeName == ""){
                layer.msg("请填写自定义属性名称");
                return;
            }else if(skuSelectValue == ""){
                layer.msg("请填写自定义属性可选项值");
                return;
            }else{
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
                    skuAttributeId: that.skuAttributeId,
                    skuAttributeName: that.skuAttributeName,
                    skuSelectId: that.skuSelectId,
                    skuSelectValue:that.skuSelectValue
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


    }
})
