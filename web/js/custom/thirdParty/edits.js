config = {
    api_token: api_url + '/qiniu/getUpToken',
    api_shop: api_url + "/supplier/dataList1",
    api_save: api_url + "/memRights/updateCq",

}

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
            ],
            info: {},


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
                        console.log(window.app)
                        that.shopType = JSON.stringify(that.info.dataSource)
                        setTimeout(() => {
                            that.shops = JSON.stringify(that.info.supplierId)
                        }, 100)



                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        save() {
            const that = this
            //判断输入
            if (that.shops == "") {
                layer.msg("请选择产品供应商")
                return
            }

            if (that.name == "") {
                layer.msg("请输入产品名称")
                return
            }

            if (that.no == "") {
                layer.msg("请输入产品编号")
                return
            }

            this.yan()

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
                id: that.id,

                // 新添加参数
                supplierId: that.shops,        //供应商ID
                isStock: that.ku,          //本地是否有库存
                dataType: that.kuType,      //库存类型
                originalGoods_no: that.originalGoods_no
            }
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
                    }
                }
            })
        },

        yan() {
            var reg = /^[0-9]+.?[0-9]*$/
            if (reg.test(this.no) && this.no.length <= 6) {
                console.log("1")
                this.falge = true
                return
            } else {
                layer.msg("请输入6位纯数字商品编码")
                this.falge = false
                return

            }
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

        //参数获取
        let parmars = JSON.parse(sessionStorage.getItem("item"))
        console.log(parmars)
        this.info = parmars

        this.name = parmars.name
        this.type = parmars.type
        this.No = parmars.goods_no
        this.price = parmars.official_price
        this.sprice = parmars.salePrice
        this.gprice = parmars.price
        this.no = parmars.goods_no
        this.id = parmars.id
        this.solt = parmars.solt
        this.ku = JSON.stringify(parmars.isStock)
        this.kuType = parmars.dataType
        // this.shops = parmars.supplierId
        this.originalGoods_no = parmars.goods_no
        window.editor.txt.html(parmars.describes)
        this.type = parmars.type
        if (parmars.pic) {
            $('#vivew').attr("src", parmars.pic)
        }
        // this.shopType = JSON.stringify(parmars.dataSource)
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