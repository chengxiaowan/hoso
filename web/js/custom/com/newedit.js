let config = {
    api_save: api_url + '/memPackage/updateModel',
    api_token: api_url + '/qiniu/getUpToken',
    api_info: api_url + '/memPackage/detailModel',
}

// var id = parameter().id;


let id = parameter().id
window.app = new Vue({
    el: "#app",
    data() {
        return {
            name: "",
            type: "0",
            tokenMessage: "",
            isMain:"1",
            isGoods:"1",
            isAD:"1",
            h5:"",
            remark:"",
            title:"",
            images:"",
            dialogVisible:false,
            dialogVisible2:false,
            
        }
    },
    methods: {
        save() {
            if (this.name == "") {
                layer.msg("请输入模板名称")
                return
            }

            if($("#vivew").attr("src") == "../images/imgadd.png"){
                layer.msg("请上传模板图片")
                return
            }
            let parmars = {
                id:id,
                name: this.name,
                pic: $("#vivew").attr("src"),
                isGroup: this.type,
                isGoods:this.isGoods,
                isMain:this.isMain,
                isAdv:this.isAD,
                remark:this.remark,
                link:this.h5

            }
            console.log(parmars)
            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("保存成功")
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
                    uploaderReady(res)
                    // uploadInit(res)

                }
            })
        },

        getInfo(){
            const that = this
            $.ajax({
                url:config.api_info,
                type:"POST",
                async:true,
                data:{
                    id:id
                },
                success:res=>{
                    console.log(res)
                    if(res.error == '00'){
                        let drool = res.result
                        that.name = drool.name
                        that.type = JSON.stringify(drool.isGroup)
                        that.isGoods =JSON.stringify( drool.isGoods)
                        that.isMain = JSON.stringify(drool.isMain)
                        that.isAD = JSON.stringify(drool.isAdv)
                        that.h5 = drool.link
                        that.remark = drool.remark
                        $("#vivew").attr("src",drool.pic)
                        // that.images = drool.pic

                    }
                }
            })
        },

           //示例
           tips(type){
            if(type == 1){
                this.title = "示例1"
                this.images = "https://images.homeplus.fun/o_1eajiflh0d7o16lcbvm1jacpo4c.png"
                this.dialogVisible = true
            }

            if(type == 2){
                this.title = "示例2"
                this.images = "https://images.homeplus.fun/o_1eajicin91pek11rd13s51bmpl047.png"
                this.dialogVisible = true

            }

            if(type == 3){
                this.title = "示例1";
                this.images = "https://images.homeplus.fun/o_1eajihimo1v121hu71dmq1ko973hh.png"
                this.dialogVisible = true

            }

            if(type == 4){
                this.title = "示例2"
                this.images = "https://images.homeplus.fun/o_1eajilmhc139boin8v11isj571m.png"
                this.dialogVisible = true

            }
        },
        //预览
        see(){
            this.images = $("#vivew").attr("src")
            this.dialogVisible2 = true
        }
    },
    mounted() {
        this.getToken()
        this.getInfo()
    },
})