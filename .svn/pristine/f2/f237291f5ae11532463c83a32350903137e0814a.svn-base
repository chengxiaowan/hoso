var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/goodsSkuAttribute/modelEditInfo', // 获取自定义属性信息
    api_edit: api_url+'/goodsSkuAttribute/modelEdit',// 修改自定义属性

}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 自定义属性列表
        id: id, // 商品与自定义属性关系id
        standard: '', // 规格(mm)
        model: '', // 型号
        materialQuality: '', // 材质
        grossWeight: '', // 毛重(kg)
        suttleWeight: '', // 净重(kg)
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
                    skuSelectId: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.standard = that.list.standard;
                        that.model = that.list.model;
                        that.materialQuality = that.list.materialQuality;
                        that.grossWeight = that.list.grossWeight;
                        that.suttleWeight = that.list.suttleWeight;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存判断自定义属性名称，自定义属性可选项值是否为空
        confirm(){
            const that = this;
            var model = that.model;
            if(model == ""){
                layer.msg("请填写型号");
                return;
            }else{
                that.editModel();
            }
        },
        editModel(){
            const that = this;
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    skuSelectId: that.id,
                    standard: that.standard,
                    model: that.model,
                    materialQuality:that.materialQuality,
                    grossWeight:that.grossWeight,
                    suttleWeight:that.suttleWeight
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('修改成功！');
                        /*setTimeout(function () {
                            window.parent.location.reload();
                            parent.layer.close(index);
                        }, 1000);*/
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },


    }
})
