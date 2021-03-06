config = {
    api_token: api_url + '/qiniu/getUpToken',
    api_shop: api_url + "/supplier/dataList1",
    api_save: api_url + "/memRights/addCq",

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

window.app = new Vue({
    el: "#app",
    data() {
        return {
            token: "",
            shop: [],        //供应商列表
            shopList: [],        //过滤后的供应商
            shopType: "100",        //供应商类型
            keywords: "",
            //整合表单参数
            shops: "",  //选择的供应商
            name: "",    //产品名称
            no: "",      //编号
            type: "1",    //充值方式
            price: "",   //面值
            gprice: "",  //采购价
            sprice: "",  //销售价
            solt: "0",
            ku: "0",
            kuType: "",

            falge: false,
            shopsinfo: {},

            dataList: [
                { label: "权益供应商", value: "0" },
                { label: "线下门店", value: "1" },
            ]


        }
    },
    methods: {
        //获取七牛云token
        getToken() {
            const that = this
            $.ajax({
                url: config.api_token,
                async: true,
                data: {},
                taye: "post",
                success: res => {
                    that.token = res;
                    uploaderReady(res)
                    uploadInit(res)      //这个是富文本的
                }
            })
        },

        yan() {
            var reg = /^[0-9]+.?[0-9]*$/
            if (reg.test(this.no) && this.no.length <= 6) {
                console.log("1")
                this.falge = true
            } else {
                layer.msg("请输入6位纯数字商品编码")
                this.falge = false
            }
        },

        //获取供应商
        getshop() {
            const that = this
            $.ajax({
                url: config.api_shop,
                type: "post",
                data: {
                    keywords: that.keywords,
                    type: "1",
                    pageSize: "100"
                },
                success: res => {
                    if (res.error == "00") {
                        that.shop = res.result.list

                        //确保数据回来后触发一次watch
                        that.shopType = "0"
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },
        save() {
            const that = this


            if (that.shops == "") {
                layer.msg("请选择产品供应商")
                return
            }
            //判断输入
            if (that.name == "") {
                layer.msg("请输入产品名称")
                return
            }

            if (that.no == "") {
                layer.msg("请输入产品编号")
                return
            }

            if (that.falge == false) {
                layer.msg("请输入六位纯数字商品编码")
                return
            }

            if (that.price == "") {
                layer.msg("请输入面值（元）")
                return
            }


            if (that.gprice == "") {
                layer.msg("请输入采购价（元）")
                return
            }

            if (that.sprice == "") {
                layer.msg("请输入销售价（元）")
                return
            }

            let pic = ""

            if ($('#vivew').attr("src") == '../images/imgadd.png') {
                layer.msg("请上传图标")
                return
            } else {
                pic = $('#vivew').attr("src")
            }

            if (that.ku == "1" && that.kuType == "") {
                layer.msg("请选择数据类型")
            }

            let parmas = {
                name: that.name,
                type: that.type,
                goods_no: that.no,
                official_price: that.price,
                salePrice: that.sprice,
                price: that.gprice,
                pic: pic,
                solt: that.solt,
                describes: editor.txt.html(),         //富文本
                // 新添加参数
                supplierId: that.shops,        //供应商ID
                isStock: that.ku,          //本地是否有库存
                dataType: that.kuType,      //库存类型
            }


            //类型 ""是权益 1是门店
            parmas.dataSource = this.shopType

            console.log(parmas)

            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmas,
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        layer.msg("保存成功")
                        setTimeout(() => {
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index); //再执行关闭
                        }, 2000);
                    } else if (res.error == "01") {
                        layer.msg("产品编号重复，请重新输入")
                    }
                }
            })
        }
    },
    mounted() {
        const that = this
        //执行token获取
        that.getToken()
        //挂载一个富文本
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true     //允许富文本调用七牛云对象储存
        window.editor.create()
        //获取供应商
        that.getshop()


    },

    watch: {

        //根据选择的类型来过滤供应商
        shopType(val) {
            if (val == "1") {
                console.log("线下门店")
                //为了避免不必要的麻烦 每次watch触发都把值设置为空
                this.shops = ""
                let arr = []
                this.shop.forEach(i => {
                    if (i.dataSource) {
                        arr.push(i)
                    }
                })
                this.shopList = arr
            }



            if (val == "0") {
                console.log("权益供应商")
                //为了避免不必要的麻烦 每次watch触发都把值设置为空
                this.shops = ""
                let arr = []
                this.shop.forEach(i => {
                    if (!i.dataSource) {
                        arr.push(i)
                    }
                })
                this.shopList = arr
            }
        }
    }
})