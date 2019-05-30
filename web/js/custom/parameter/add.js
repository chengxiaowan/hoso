var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_add: api_url+'/goodsSkuAttribute/saveOrupdate', //新增自定义属性
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 自定义属性列表
        id: id, // 商品id
        skuAttributeName: '', // 自定义属性名称
        skuSelectValue: '', // 自定义属性可选项值
    },
    mounted: function(){
        const that = this;
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


        // 保存 判断自定义属性名称，自定义属性可选项值是否为空
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
                that.addParameter();
            }
        },
        // 新增商品
        addParameter(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    goodsId: that.id,
                    skuAttributeName: that.skuAttributeName,
                    skuSelectValue: that.skuSelectValue
                },
                success: function(res) {
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('自定义添加成功！');
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