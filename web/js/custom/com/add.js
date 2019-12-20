let config = {
    api_save: api_url + '/memPackage/addModel',
    api_token: api_url + '/qiniu/getUpToken',

}

window.app = new Vue({
    el: "#app",
    data() {
        return {
            name: "",
            type: "0",
            tokenMessage: "",
            isMain:"1",
            isGoods:"1",
            
        }
    },
    methods: {
        save() {
            if (this.name == "") {
                layer.msg("请输入模板名称")
                return
            }
            let parmars = {
                name: this.name,
                pic: window.editor.txt.html(),
                isGroup: this.type,
                isGoods:this.isGoods,
                isMain:this.isMain,
            }
            console.log(parmars)
            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("修改成功")
                        setTimeout(() => {
                            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index); //再执行关闭
                        }, 2000);
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },
        //获取Token
        getToken() {
            const that = this
            $.ajax({
                url: config.api_token,
                async: true,
                data: {},
                taye: "post",
                success: res => {
                    that.tokenMessage = res;
                    // uploaderReady(res)
                    uploadInit(res)

                }
            })
        },
    },
    mounted() {
        this.getToken()
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true
        window.editor.create()
    },
})