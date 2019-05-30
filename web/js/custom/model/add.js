var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_add: api_url+'/goodsSkuAttribute/modelAdd', //新增商品规格属性列表
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 自定义属性列表
        id: id, // 商品id
        standard: '', // 规格(mm)
        model: '', // 型号
        materialQuality: '', // 材质
        grossWeight: '', // 毛重(kg)
        suttleWeight: '', // 净重(kg)
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
            var model = that.model;
            if(model == ""){
                layer.msg("请填写型号");
                return;
            }else{
                that.addModel();
            }
        },
        // 新增规格型号
        addModel(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    goodsId: that.id,
                    standard: that.standard,
                    model: that.model,
                    materialQuality: that.materialQuality,
                    grossWeight: that.grossWeight,
                    suttleWeight: that.suttleWeight
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