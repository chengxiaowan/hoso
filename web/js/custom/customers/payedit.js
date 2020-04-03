config = {
    api_save : api_url + '/memberPayLogs/update',
    api_info: api_url +"/memberPayLogs/detail"
}

var id = parameter().id;
var cid = parameter().cid

console.log(id)
console.log(cid)

window.app = new Vue({
    el:"#app",
    data() {
        return {
            //整合表单参数
            thridCustomerId:"",     //客户ID 上一层获取
            serialNum:"",           //流水号
            type:"0",                //支付方式
            payPrice:"",            //充值金额
            payAccount:"",          //付款账号
            receiveAccount:"",      //收款账号
            remark:"",              //备注
            payBankName:"",         //付款开户行
            receiveBankName:"",     //收款开户行


        }
    },
    methods: {
        // 保存信息
        drool(){
            let that = this;
            //判断必填
           if(that.payPrice == ""){
               layer.msg("请输入充值金额")
               return
           }

           if($("#time").val() == ""){
               layer.msg("请选择充值时间")
               return
           }

            // 传递参数
            let parmars={
                thridCustomerId:id,
                serialNum:that.serialNum,
                type:that.type,
                payPrice:that.payPrice,
                payAccount:that.payAccount,
                receiveAccount:that.receiveAccount,
                remark:that.remark,
                payBankName:that.payBankName,
                receiveBankName:that.receiveBankName,
                id:cid,
                payTime:$("#time").val()
            }

            console.log(parmars)

            //下边开启ajax发送信息

            $.ajax({
                url:config.api_save,
                type:"post",
                async:true,
                data:parmars,
                success:res=>{
                    if(res.error == "00"){
                        layer.msg("修改成功")
                        setTimeout(function () {
                            var closePage = parent.layer.getFrameIndex(window.name)
                            parent.layer.close(closePage)
                        }, 1000)
                    }else{
                        layer.msg(res.msg)
                    }
                }
            })
        },
        getdata(){
            const that = this
            $.ajax({
                url:config.api_info,
                type:"POST",
                async:true,
                data:{
                    id:cid
                },
                success:res=>{
                    console.log(res)
                    that.serialNum = res.result.serialNum,
                    $("#time").val(that.formatDateTime(res.result.payTime))
                    that.remark = res.result.remark
                    that.type = res.result.type
                    that.payAccount = res.result.payAccount
                    that.receiveBankName = res.result.receiveBankName
                    that.payBankName = res.result.payBankName
                    that.payPrice = res.result.payPrice
                    that.receiveAccount = res.result.receiveAccount

                }
            })
        },
        //时间格式化
        formatDateTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d
        },
    },
    mounted() {
        this.getdata()

        window.layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#time' //指定元素
            })
        })
    },
})