config = {
    api_save: api_url + '/supplier/saveOrupdate',
    api_info: api_url + '/supplier/editInfo'
}

//在这里获取一下ID
var id = parameter().id;


window.app = new Vue({
    el: "#app",
    data() {
        return {
            //整合表单参数
            name: "",        //供应商名称
            type: "0",       //类型
            area: "",        //区域信息  无法绑定 已废弃 于发生前获取
            address: "",     //详细地址
            bank: "",        //开户行，
            bank_no: "",     //开户行户号
            taxpayer: "",    //纳税人识别号
            fax: "",         //传真
            post: "",        //邮编
            remark: "",      //备注
        }
    },
    methods: {
        // 保存信息
        drool() {
            let that = this;
            //判断必填
            if (that.name == "") {
                layer.msg("请输入供应商名称")
                return
            }

            if ($("#city").val() == "" || that.address == "") {
                layer.msg("请输入地址")
                return
            }
            //获取信息并切割
            let info = $("#city").val().split("-")

            // 传递参数
            let parmars = {
                id:id,
                name: that.name,
                type: that.type,
                province: info[0],
                city: info[1],
                area: info[2],
                address: that.address,
                bankName: that.bank,
                bankNumber: that.bank_no,
                taxIdentificationNumber: that.taxpayer,
                fax: that.fax,
                postcode: that.post,
                remark: that.remark,
            }

            console.log(parmars)

            //下边开启ajax发送信息
            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("保存成功")
                        setTimeout(function () {
                            // window.parent.location.reload();
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //获取详情
        getdata(){
            const that = this
            $.ajax({
                url:config.api_info,
                type:"POST",
                data:{
                    id:id
                },
                success:res=>{
                    console.log(res)
                    if(res.error == "00"){
                        let drool = res.result
                        that.name = drool.name
                        that.type = drool.type
                        that.address = drool.address
                        that.bank = drool.bankName
                        that.bank_no = drool.bankNumber
                        that.taxpayer = drool.taxIdentificationNumber
                        that.fax = drool.fax
                        that.post = drool.postcode
                        that.remark = drool.remark
                        let arr = [drool.province,drool.city,drool.area].join("-")
                        $("#city").val(arr)

                    }
                }
            })
        }
    },
    mounted() {
        this.getdata()
    },
})