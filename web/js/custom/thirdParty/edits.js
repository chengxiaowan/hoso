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
            id:"",
            originalGoods_no:"",

            falge:false,
            shopsinfo:{},


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
                    pageSize:"100"
                },
                success: res => {
                    if (res.error == "00") {
                        that.shop = res.result.list
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },
          //多参数聚合
          bobo(){
            console.log("执行了")
            const that = this
            for(let i = 0; i<that.shop.length;i++){
                if(that.shop[i].id == that.shops && that.shop[i].dataSource){
                    that.shopsinfo = that.shop[i]
                }
            }
            console.log(this.shopsinfo)

        },
        save() {
            const that = this
            //判断输入
            if(that.shops == ""){
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

            if(that.falge == false){
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

            if(that.ku == "1" && that.kuType == ""){
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
                id:that.id,

                // 新添加参数
                supplierId: that.shops,        //供应商ID
                isStock: that.ku,          //本地是否有库存
                dataType: that.kuType,      //库存类型
                originalGoods_no:that.originalGoods_no
            }
            
            if(this.shopsinfo.dataSource){
                parmas.dataSource = this.shopsinfo.dataSource
            }

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

        yan(){
            var reg = /^[0-9]+.?[0-9]*$/
            if(reg.test(this.no) && this.no.length <=6){
                console.log("1")
                this.falge = true
            }else{
                layer.msg("请输入6位纯数字商品编码")
                this.falge = false
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
        this.shops = JSON.stringify(parmars.supplierId)
        this.originalGoods_no = parmars.goods_no
        window.editor.txt.html(parmars.describes)
        this.type = parmars.type
        if(parmars.pic){
            $('#vivew').attr("src",parmars.pic)
        }
    },
})