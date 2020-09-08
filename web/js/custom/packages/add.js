/*
 * @Author: chengxiaowan(1045114585@qq.com) 
 * @Date: 2020-07-14 15:40:33 
 * @Last Modified by: chengxiaowan(1045114585@qq.com)
 * @Last Modified time: 2020-09-07 15:07:25
 */

var config = {
    api_token: api_url + "/qiniu/getUpToken",     //获取七牛云的token
    api_save: api_url + '/memPackage/add',
    api_list: api_url + '/wechat/list',           //获取小程序列表


}

window.app = new Vue({
    el: "#app",
    data() {
        return {
            //基本信息
            name: "",    //名称
            pastTimeType: "0",    //有效期的三种模式
            pastTime: "",          //有效期
            link: "https://homeplus.fun/static/membershipPack/testPagesOne/F-index.html",              //首页网址
            isAdv: "0",             //是否包含广告
            AdvType: "-1",             //广告样式
            isGoods: "0",             //包含商家商品

            //售价及佣金设置
            payType: [],

            //单次购买的
            price: "",           //原价
            sprice: "",          //售价
            fprice: "",          //首冲价格

            //包月
            Mprice: "",          //包月原价
            Msprice: "",         //包月售价
            Mfprice: "",         //包月首冲

            //包季
            Jprice: "",          //包月原价
            Jsprice: "",         //包月售价
            Jfprice: "",         //包月首冲

            //包年
            Yprice: "",          //包月原价
            Ysprice: "",         //包月售价
            Yfprice: "",         //包月首冲

            //分享价格
            sharePrice: "",
            pickerOptions: {
                disabledDate(time) {
                    //此条为设置禁止用户选择今天之前的日期，包含今天。
                    // return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));
                    //此条为设置禁止用户选择今天之前的日期，不包含今天。
                    return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));
                }
            },

            //muck的数据
            appList:[
                {name:"小程序1",appId:"123456"},
                {name:"小程序2",appId:"123457"},
                {name:"小程序3",appId:"123458"},
                {name:"小程序4",appId:"123459"},
            ],

            appId:"",
        }
    },
    methods: {
        //为了防止混乱，每次改变pastTimeType时都要清空事件 绑定到change
        seeType() {
            this.pastTime = ""
        },

        see() {
            console.log(this.payType)
        },

        //初始化富文本图片上传到七牛云的依赖
        getToken() {
            const that = this
            $.ajax({
                url:config.api_token,
                type:"GET",
                data:{},
                success:res=>{
                    uploadInit(res)

                }            
            })
        },

        save(){

            //数据校验

            if(this.name == ""){
                this.$message("请输入名称")
                return
            }

            if(this.pastTimeType == "1" && this.pastTime == ""){
                this.$message("请设置有效期")
                return
            }

            if(this.pastTimeType == "2" && this.pastTime == ""){
                this.$message("请设置有效期")
                return
            }

            if(this.link == ""){
                this.$message("请输入首页网址")
                return
            }

            if(this.isAdv == ""){
                this.$message("请选择是否包含广告")
                return
            }

            if(this.AdvType == "-1" && this.isAdv == "1"){
                this.$message("请选择广告样式")
                return
            }

            if(this.isGoods.length == 0){
                this.$message("请设置是否包含商家商品")
                return
            }

            if(this.payType.length == 0){
                this.$message("请设置购买方式")
                return
            }

            if(this.payType.includes("0") && this.price == ""){
                this.$message("请输入原价")
                return
            }

            if(this.payType.includes("1") && this.Mprice == ""){
                this.$message("请输入包月原价")
                return
            }

            if(this.payType.includes("2") && this.Jprice == ""){
                this.$message("请输入包季原价")
                return
            }

            if(this.payType.includes("3") && this.Yprice == ""){
                this.$message("请输入包年原价")
                return
            }

            if(this.payType.includes("0") && this.sprice == ""){
                this.$message("请输入售价")
                return
            }

            if(this.payType.includes("1") && this.Msprice == ""){
                this.$message("请输入包月销售价")
                return
            }

            if(this.payType.includes("2") && this.Jsprice == ""){
                this.$message("请输入包季销售价")
                return
            }

            if(this.payType.includes("3") && this.Ysprice == ""){
                this.$message("请输入包年销售价")
                return
            }

            if(this.payType.includes("0") && this.fprice == ""){
                this.$message("请输入首充价格")
                return
            }

            if(this.payType.includes("1") && this.Mfprice == ""){
                this.$message("请输入包月首充价格")
                return
            }

            if(this.payType.includes("2") && this.Jfprice == ""){
                this.$message("请输入包季首充价格")
                return
            }

            if(this.payType.includes("3") && this.Yfprice == ""){
                this.$message("请输入包年首充价格")
                return
            }

            if(this.sharePrice == ""){
                this.$message("请输入分享佣金")
                return
            }

            let data = {
                //基本信息
                name:this.name,
                timeType:this.pastTimeType,
                time:this.pastTime,
                link:this.link,
                isAdv:this.isAdv,
                advType:this.AdvType,
                isGoods:this.isGoods,

                //价格信息
                priceUsed:this.payType.join(","),

                //处理单次价格
                oldprice:this.price || "0",
                price:this.sprice || "0",
                firstPrice:this.fprice || "0",

                //处理包月价格
                oldmonthPrice:this.Mprice || "0",
                monthPrice:this.Msprice || "0",
                mfirstPrice:this.Mfprice || "0",

                //处理季度价格
                oldquarterPrice:this.Jprice || "0",
                quarterPrice:this.Jsprice || "0",
                qfirstPrice:this.Jfprice || "0",

                //处理年度价格
                oldyearPrice:this.Yprice || "0",
                yearPrice:this.Ysprice || "0",
                yfirstPrice:this.Yfprice || "0",

                //分享价格
                sharePrice:this.sharePrice,

                //其他信息
                remark:window.editor.txt.html(),

                //appid
                appId:this.appId
            } 
            
            $.ajax({
                url:config.api_save,
                type:"POST",
                data:data,
                success:res=>{
                    if(res.error == "00"){
                        this.$message("保存成功")
                        setTimeout(()=>{
                            window.location.href = "add2.html?id=" + res.id +"&flage=1"
                        },2000)
                    }
                }
            })
        },

        nextPage(){
            window.location.href = "add2.html"
        },

        //获取小程序列表
        getWxapp(){
            const that = this;
            $.ajax({
                url:config.api_list,
                type:"POST",
                data:{
                    pageSize:"100"
                },
                success:res=>{
                    this.appList = res.result.list
                    console.log(this.appList)
                }
            })
        }

    },
    mounted() {
        console.log("Vue is mounted")

        //初始化一个日期组件
        layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#date' //指定元素
            });
        });

        //初始化七牛云
        this.getToken()

        this.getWxapp()


        //初始化富文本
        var E = window.wangEditor
        window.editor = new E('#editor')
        //允许七牛云上传
        window.editor.customConfig.qiniu = true
        //自定义层级
        window.editor.customConfig.zIndex = 100
        //创建
        window.editor.create()
    },
    watch: {
        isAdv(val){
            // console.log(val)
            if(val == '1'){
                this.AdvType = "0"
            }else{
                this.AdvType = "-1"
            }
            // console.log(this.AdvType)
        }
    }
})