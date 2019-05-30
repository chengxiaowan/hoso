var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/goods/info',//查看商品详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 商品id
        list: [], // 商品列表
        name: '', // 商品名称
        goodsCode: '', // 商品编码
        typeName: '', // 商品分类
        supplierName: '', // 供应商名称
        brandName: '', // 品牌名称
        unitValue: '', // 计量单位
        shipmentsDays: '', // 出货天数
        fromArea: '', // 产地
        distribution: '', // 配送方式
        standard: '', // 执行标准
        description: '', // 简述
        attributeList: [] // 自定义属性
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
                        that.goodsCode = that.list.goodsCode;
                        that.typeName = that.list.typeName;
                        that.supplierName = that.list.supplierName;
                        that.brandName = that.list.brandName;
                        that.unitValue = that.list.unitValue;
                        that.shipmentsDays = that.list.shipmentsDays;
                        that.fromArea = that.list.fromArea;
                        that.distribution = that.list.distribution;
                        that.standard = that.list.standard;
                        that.description = that.list.description;
                        that.attributeList = that.list.attributeList;
                        console.log(that.attributeList);
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        }
    }
})

