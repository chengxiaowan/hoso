var id = parameter().id,goodsId = parameter().goodsId;
var config = {
    role: localStorage.userRole,
    api_editInfo: api_url+'/goodsSku/editInfo', //编辑商品sku
    api_edit: api_url+'/goodsSku/edit', //编辑商品sku
    api_colorList: api_url+'/goodsSkuAttribute/colorDataList', //获取颜色列表
    api_modelList: api_url+'/goodsSkuAttribute/modelDataList', //获取型号列表
    api_labelList: api_url+'/label/labelList', //获取标签列表
}
Vue.directive('select2', {
    inserted: function (el, binding, vnode) {
        let options = binding.value || {};
        $(el).select2(options).on("select2:select", (e) => {
            // v-model looks for
            //  - an event named "change"
            //  - a value with property path "$event.target.value"
            el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
        });
    },
    update: function (el, binding, vnode) {
        for (var i = 0; i < vnode.data.directives.length; i++) {
            if (vnode.data.directives[i].name == "model") {
                $(el).val(vnode.data.directives[i].value);
            }
        }
        $(el).trigger("change");
    }
});
Vue.directive('select22', {
    inserted: function (el, binding, vnode) {
        let options = binding.value || {};
        $(el).select2(options).on("select2:select", (e) => {
            // v-model looks for
            //  - an event named "change"
            //  - a value with property path "$event.target.value"
            el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
        });
    },
    update: function (el, binding, vnode) {
        for (var i = 0; i < vnode.data.directives.length; i++) {
            if (vnode.data.directives[i].name == "model") {
                $(el).val(vnode.data.directives[i].value);
            }
        }
        $(el).trigger("change");
    }
});
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        index: 0, //
        list: [], // 商品列表
        goodsSkuId: id, // 子商品(sku) id
        goodsId: goodsId, // 商品id
        colorList: [], // 颜色列表
        colorId: '', // 颜色可选项id
        modelList: [], // 分类列表
        modelId: '', // 规格型号可选项id
        barCode: '', // 条形码
        mainImgPath: '1', // 主图路径
        quakerImgath: '', // 规格图路径
        purchasePrice: '', // 采购价
        price: '', // 单价
        isOnsell: '', // 上下架状态 0:下架 1:上架
        commision: {}, // sku佣金, JsonArray形式，多个","分隔, 例: [{"minNum":"数量指标(个)最小值","maxNum":"数量指标(个)最大值","percent":"佣金比例(%)"}]
        colorLabel: '', //颜色标签名称(只有一个)
        labelList: [], // 类型标签列表
        typeLabelId: '', //类型标签id
        styleLabels: '', //风格标签名称(多个","分隔)
        otherLabels: '', //其他标签名称(多个","分隔)
        ind: 1,
        postDktc1: {},
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function(){
        const that = this;
        that.getDetail(); // 获取商品信息
        that.getColorList(); // 获取颜色列表
        that.getModelList(); // 获取型号列表
        that.getLabelList(); // 获取标签列表
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
        // 获取详情
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_editInfo,
                async: true,
                type: 'post',
                data: {
                    goodsSkuId: that.goodsSkuId,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.colorId = res.result.colorId;
                        that.modelId = res.result.modelId;
                        that.barCode = res.result.barCode;
                        that.mainImgPath = res.result.mainImgPath;
                        that.quakerImgath = res.result.quakerImgath;
                        that.purchasePrice = res.result.purchasePrice;
                        that.price = res.result.price;
                        that.isOnsell = res.result.isOnsell;
                        that.commision = res.result.commision;
                        that.colorLabel = res.result.colorLabel;
                        that.typeLabelId = res.result.typeLabelId;
                        that.styleLabels = res.result.styleLabels;
                        that.otherLabels = res.result.otherLabels;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取颜色
        getColorList(){
            const that = this;
            $.ajax({
                url: config.api_colorList,
                async: true,
                type: 'post',
                data: {
                    goodsId: that.goodsId,
                    pageNo: '',
                    pageSize: ''
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var arr = [];
                        for(var i in res.result.list){
                            var obj = {};
                            obj.value = res.result.list[i].skuSelectId;
                            obj.text = res.result.list[i].name;
                            arr.push(obj);
                        }
                        that.colorList = arr;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取型号
        getModelList(){
            const that = this;
            $.ajax({
                url: config.api_modelList,
                async: true,
                type: 'post',
                data: {
                    goodsId: that.goodsId,
                    pageNo: '',
                    pageSize: ''
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.modelList = res.result.list;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取颜色名称
        look: function (ele) {
            let that = this ;
            that.colorId = ele.target.value;
            that.colorLabel = $(ele.target).find("option:selected").text();
        },
        // 获取标签列表
        getLabelList(){
            const that = this;
            $.ajax({
                url: config.api_labelList,
                async: true,
                type: 'post',
                data: {
                    keyword: '',
                    type: 1,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.labelList = res.result;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取佣金信息
        getCommission(){
            const that = this;
            var yjtcList = [] ;
            $("#commision .htz-td:not(:last-child)").each(function() {
                $(this).find('tr').each(function() {
                    var htz = {};
                    var minNum;
                    var maxNum;
                    $(this).find('.num').first().each(function() {
                        minNum = $(this).val()
                        htz.minNum = minNum;
                    })
                    $(this).find('.num').last().each(function() {
                        maxNum = $(this).val()
                        htz.maxNum = maxNum;
                        yjtcList.push(htz);
                    })
                })
                var input = $(this).find('.percent');
                for(var i = 0; i < input.length; i++) {
                    var percent = $("#commision td .percent").eq(i).val();
                    yjtcList[i].percent = percent;
                }
            })
            that.commision.yjtcList = yjtcList;
            console.log(that.commision.yjtcList);

        },
        // 保存 判断颜色id 型号id，单价,上/下架状态，颜色标签，类型标签是否为空
        confirm(){
            const that = this;
            var colorId = that.colorId,modelId = that.modelId,isOnsell = that.isOnsell,price = that.price,typeLabelId = that.typeLabelId;
            if(colorId == ""){
                layer.msg("请选择颜色");
                return;
            }else if(modelId == ""){
                layer.msg("请选择型号");
                return;
            }else if(price == ""){
                layer.msg("请填写单价");
                return;
            }else if(isOnsell == ""){
                layer.msg("请选择上/下架状态");
                return;
            }else if(typeLabelId == ""){
                layer.msg("请选择类型标签");
                return;
            }else{
                this.getCommission();
                that.addGoods();
            }
        },
        // 新增商品
        addGoods(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    goodsId: that.id, // 商品id
                    colorId: that.colorId, //颜色可选项id
                    modelId: that.modelId, //规格型号可选项id
                    barCode: that.barCode,
                    mainImgPath: that.mainImgPath, //主图路径
                    quakerImgath: that.quakerImgath,
                    purchasePrice: that.purchasePrice,
                    price: that.price, //单价
                    isOnsell: that.isOnsell, //上下架状态 0:下架 1:上架
                    commision: that.commision, //sku佣金, JsonArray形式
                    colorLabel: that.colorLabel, //颜色标签名称(只有一个)
                    typeLabelId: that.typeLabelId, //类型标签id
                    styleLabels: that.styleLabels,
                    otherLabels: that.otherLabels,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('商品添加成功！');
                        /*setTimeout(function () {
                            window.parent.location.reload();
                            // parent.layer.close(index);
                        }, 1000);*/
                        that.goodsId = res.goodsId;
                        alert(that.goodsId)
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 新增佣金
        add() {
            this.ind += 1;
            var html = '';
            html += '<tr>'
            html += '<td align="middle">'
            html += '<input type="number" class="form-control num"/>'
            html += '<span class="htz-label">&lt;</span>'
            html += '<span class="indicator">X</span>'
            html += '<span class="htz-label">&le;</span>'
            html += '<input type="number" class=" form-control num"/></td></tr>';
            var html1 = '<div class="percentage"><input type="number" class="cancel_dom form-control htz-select percent" /></div>'
            $(".increase").append(html);
            $(".commission").append(html1);
        },
    }
})


