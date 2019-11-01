let config = {
    //在这里写接口和api_url拼接
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_save: api_url + '/memRights/update', //保存
    api_data: api_url + '/memRights/detail' //获取信息
}

let id = parameter().id

window.app = new Vue({
    el: "#app",
    data: {
        tokenMessage: "",
        name: "", //名称
        type: 0, //用途
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

            if (this.remark == "") {
                layer.msg("请输入权益描述", {
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
                id: id,
                name: this.name,
                pic: $("#vivew").attr("src"),
                isOnsell: this.isOnsell,
                remark: this.remark,
                type: this.type,
                price:this.price,
                dockType:this.dockType
            }
            $.ajax({
                url: config.api_save,
                async: true,
                type: "POST",
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("修改成功");
                        let index = parent.layer.getFrameIndex(window.name);
                       setTimeout(()=>{
                        parent.layer.close(index);
                       },2000)

                    }
                }
            })
        },
        getdata() {
            $.ajax({
                url: config.api_data,
                async: true,
                type: "POST",
                data: {
                    id: id
                },
                success: res => {
                    if (res.error == "00") {
                        this.name = res.result.name;
                        this.isOnsell = res.result.isOnsell;
                        this.type = res.result.type;
                        this.remark = res.result.remark;
                        this.dockType = res.result.dockType
                        this.price = res.result.price
                        $("#vivew").attr("src", res.result.pic)

                    } else {
                        layer.msg(res.msg, {
                            time: 3000
                        })
                    }
                }
            })
        }
    },
    mounted() {
        this.getToken()
        this.getdata()
    },

})