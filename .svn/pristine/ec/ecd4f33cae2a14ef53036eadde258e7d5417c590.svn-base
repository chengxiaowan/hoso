let config = {
    //在这里写接口和api_url拼接
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_save: api_url + '/memRights/add' //保存
}

window.app = new Vue({
    el: "#app",
    data: {
        tokenMessage: "",
        name: "", //名称
        type: "住宿", //用途
        isOnsell: 1, //上下架状态
        remark: "",
        price: "", //价格
        dockType: "0"


    },
    methods: {
        //获取token
        getToken() {
            $.ajax({
                url: config.api_token,
                async: true,
                data: {},
                taye: "post",
                success: res => {
                    this.tokenMessage = res;
                    uploaderReady(res)
                }
            })
        },
        save() {
            if (this.name == "") {
                layer.msg("请输入权益名称", {
                    time: 3000
                })
                return
            }

            if (this.price == "" && this.type != '住宿') {
                layer.msg("请输入权益价格", {
                    time: 3000
                })
                return
            }


            if ($("#vivew").attr("src") == "../images/imgadd.png") {
                layer.msg("请上传权益LOGO", {
                    time: 3000
                })
                return
            }
            let parmars = {
                name: this.name,
                pic: $("#vivew").attr("src"),
                isOnsell: this.isOnsell,
                remark: this.remark,
                type: this.type,
                price: this.price || 00,
                dockType: this.dockType
            }
            $.ajax({
                url: config.api_save,
                async: true,
                type: "POST",
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("保存成功")
                        let index = parent.layer.getFrameIndex(window.name);
                        setTimeout(() => {
                            parent.layer.close(index);
                        }, 2000)
                    }
                }
            })
        }
    },
    mounted() {
        this.getToken()
    },

})