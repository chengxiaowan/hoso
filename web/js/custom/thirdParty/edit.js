let config = {
    api_token: api_url + '/qiniu/getUpToken',
    api_save: api_url + '/memRights/updateCq'

}


window.app = new Vue({
    el: "#app",
    data() {
        return {
            name: "",    //产品名称
            No: "",      //编号
            type: "1",    //充值方式
            price: "",   //面值
            gprice: "",  //采购价
            sprice: "",  //销售价
            token: "" ,   //七牛云上传的TOKEN
            originalGoods_no:"",    //修改前的编号
            id:"",
            solt:"0",
        }
    },
    methods: {
        //获取七牛云上传Token
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
                    // uploadInit(res)      这个是富文本的
                }
            })
        },

        //保存
        save() {
            const that = this;
            //判断输入
            if (that.name == "") {
                layer.msg("请输入产品名称")
                return
            }

            if (that.No == "") {
                layer.msg("请输入产品编号")
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
                pic = ''
                layer.msg("请上传图标")
                return
            } else {
                pic = $('#vivew').attr("src")
            }


            //整理输入参数
            let parmas = {
                name: that.name,
                type: that.type,
                goods_no: that.No,
                official_price: that.price,
                salePrice: that.sprice,
                price: that.gprice,
                pic: pic,
                originalGoods_no:that.originalGoods_no,
                id:that.id,
                solt:that.solt,
                describes:editor.txt.html()        //获取富文本


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
        }
    },
    mounted() {
        console.log("Vue挂载成功")
        this.getToken()
        let parmars = JSON.parse(sessionStorage.getItem("item"))
        console.log(parmars)

        this.name = parmars.name
        this.No = parmars.goods_no
        this.price = parmars.official_price
        this.sprice = parmars.salePrice
        this.gprice = parmars.price
        this.originalGoods_no = parmars.goods_no
        this.id = parmars.id
        this.solt = parmars.solt
        if(parmars.type == 0){
            this.type = '0'
        }else{
            this.type = '1'
        }
        if(parmars.pic){
            $('#vivew').attr("src",parmars.pic)
        }
        console.log(this)

        // 初始化富文本
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true
        window.editor.create()
        //填充富文本
         window.editor.txt.html(parmars.describes)

    },
})