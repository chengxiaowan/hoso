var config = {
    api_token: api_url + "/qiniu/getUpToken",     //获取七牛云的token
    api_com: api_url + '/memPackage/listModel',   //获取模板列表
    api_quan: api_url + '/memRights/list',           //优惠券列表
    api_goods: api_url + '/goods/dataList',         //实物商品列表
    api_Numgoods: api_url + '/memRights/getGoodsByFacilitatorName',
    api_save: api_url + '/memPackage/add'
}

window.app = new Vue({
    el: "#app",
    data() {
        return {
            //配置
            token: "",
            keywords: "",        //优惠券
            keywords2: "",       //实物
            keywords3: "",       //虚拟商品
            comList: [],
            cominfo: "",         //选择的模板
            group: [],
            dialogVisible: false,    //添加分组模态框
            groupName: "",           //分组名
            dialogVisible2: false,     //添加权益的模态框
            quanList: [],              //优惠券列表
            goodsList: [],             //商品列表
            numList: [],               //虚拟商品列表
            pageNo: 1,                  //优惠券分页
            pageNo2: 1,                  //商品分页
            pageNo3: 1,                  //虚拟商品分页
            flag: "1",                    //选项卡 1优惠券 2虚拟商品 3实物

            dataList: [],                 //从上个页面返回来的数据整理



            //公共参数
            name: "",        //名称
            com: "",         //选择的模板ID
            isOnsell: "1",   //上下架状态
            payused: [],     //购买方式
            textarea: "",

            //单次购买信息
            price: "",       //原价
            sprice: "",      //售价
            fprice: "",      //首冲价格
            date: "",        //到期时间

            //包月
            mprice: "",      //包月原价
            msprice: "",     //包月售价
            mfprice: "",     //包月首冲

            //包季度
            dprice: "",      //包季度原价
            dsprice: "",     //包季度售价
            dfprice: "",     //包季度首冲

            //包年
            yprice: "",      //包年原价
            ysprice: "",     //包年售价
            yfprice: "",     //包年首冲

            //分享佣金
            shareprice: "0.00",

            //过期时间
            timeType: "0",
            time: ""
        }
    },

    //实例上的方法
    methods: {
        //获取token
        getToken() {
            const that = this
            axios.get(config.api_token)
                .then(res => {
                    that.token = res.data
                    uploaderReady(res.data)
                    uploaderReady2(res.data)
                    uploaderReady3(res.data)
                    uploaderReady4(res.data)
                    uploadInit(res.data)

                })

        },

        // 获取模板
        get_com() {
            const that = this;
            let parmas = {
                pageSize: "100",
                pageNo: "1"
            }
            // axios.post(config.api_com, parmas)
            //     .then(res => {
            //         console.log(res)
            //         that.comList = res.data.result.list
            //     })

            $.ajax({
                url: config.api_com,
                type: 'POST',
                data: parmas,
                success: res => {
                    that.comList = res.result.list
                }
            })
        },

        //获取优惠券
        getQuan() {
            parmas = {
                keywords: this.keywords,
                pageSize: 10,
                pageNo: this.pageNo
            }

            // axios.post(config.api_quan, parmas)
            //     .then(res => {
            //         if (res.data.error == "00") {
            //             this.quanList = res.data.result
            //         }
            //     })

            $.ajax({
                url: config.api_quan,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.quanList = res.result
                    }
                }
            })
        },

        //实物
        getgoods() {
            let parmas = {
                pageNo: this.pageNo2,
                pageSize: 10,
                keywords: this.keywords2
            }

            // axios.post(config.api_goods, parmas)
            //     .then(res => {
            //         if (res.data.error == "00") {
            //             this.goodsList = res.data.result
            //         }
            //     })

            $.ajax({
                url: config.api_goods,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.goodsList = res.result
                    }
                }
            })
        },

        //获取虚拟商品
        getNumgoods() {
            let parmas = {
                pageNo: this.pageNo3,
                pageSize: 10,
                keywords: this.keywords3,
                name: "",
            }

            // axios.post(config.api_Numgoods, parmas)
            //     .then(res => {
            //         console.log(res)
            //     })

            $.ajax({
                url: config.api_Numgoods,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.numList = res.result
                    }
                }
            })
        },

        //优惠券的分页
        page(e) {
            this.pageNo = e;
            this.getQuan();
        },

        page2(e) {
            this.pageNo2 = e;
            this.getgoods();
        },

        page3(e) {
            this.pageNo3 = e;
            this.getNumgoods();
        },

        //添加分组
        addGroup() {
            if (this.groupName == "") {
                layer.msg("请输入分组名称")
                return
            } else {
                this.group.push(this.groupName)
                layer.msg("添加分组成功")
                this.dialogVisible = false
                //设置到session
                sessionStorage.setItem("group", JSON.stringify(this.group))
            }

        },

        //添加优惠券
        add1(item) {
            const that = this
            let index = layer.open({
                type: 2,
                title: "完善其他信息",
                content: `addquan.html?id=${item.id}&type=${item.type}`,
                area: ["1053px", "600px"],
                end() {
                    if (that.cominfo.isGrop == '1') {
                        //有分组的操作
                    } else {
                        //没有分组的操作
                        that.dataLlst.push(JSON.parse(sessionStorage.getItem("value")))
                        console.log(that.dataLlst)
                    }
                }
            })
        },

        //防止为空
        share() {
            if (this.shareprice == "") {
                this.shareprice = "0.00"
            }
        },

        save() {
            //首先进行必填项校验
            //配置
            if (this.name == "") {
                layer.msg("请输入名称")
                return
            }

            if (this.com == "") {
                layer.msg("请选择权益模板")
                return
            }

            if ($("#vivew").attr('src') == "../images/imgadd.png") {
                layer.msg("请上传封面图片")
                return
            }

            if ($("#vivew2").attr('src') == "../images/imgadd.png") {
                layer.msg("请上传顶部图片")
                return
            }


            if ($("#vivew3").attr('src') == "../images/imgadd.png") {
                layer.msg("请上传权益卡图片")
                return
            }

            if ($("#vivew4").attr('src') == "../images/imgadd.png") {
                layer.msg("请上传分享图片")
                return
            }

            //单次购买判断
            if (this.payused.length == 0) {
                layer.msg("请选择购买方式")
                return
            }

            if (this.payused.includes('0') && this.price == "") {
                layer.msg("请输入原价")
                return
            }

            if (this.payused.includes("0") && this.sprice == "") {
                layer.msg("请输入售价")
                return
            }

            if (this.payused.includes("0") && this.fprice == "") {
                layer.msg("请输入首次购买价格")
                return
            }

            if(this.timeType=="1" && this.time==""){
                layer.msg("请输入过期时间")
                return
            }

            
            if(this.timeType=="2" && this.time==""){
                layer.msg("请输入过期时间")
                return
            }

            // if (this.payused.includes("0") && this.date == "") {
            //     layer.msg("请选择到期时间")
            //     return
            // }

            //包时长
            if (this.payused.includes("1") && this.mprice == "") {
                layer.msg("请输入包月原价")
                return
            }

            if (this.payused.includes("2") && this.dprice == "") {
                layer.msg("请输入包季原价")
                return
            }

            if (this.payused.includes("3") && this.yprice == "") {
                layer.msg("请输入包年原价")
                return
            }

            if (this.payused.includes("1") && this.msprice == "") {
                layer.msg("请输入包月售价")
                return
            }

            if (this.payused.includes("2") && this.dsprice == "") {
                layer.msg("请输入包季售价")
                return
            }

            if (this.payused.includes("3") && this.dsprice == "") {
                layer.msg("请输入包季售价")
                return
            }

            if (this.payused.includes("1") && this.mfprice == "") {
                layer.msg("请输入包月首次购买价格")
                return
            }

            if (this.payused.includes("2") && this.dfprice == "") {
                layer.msg("请输入包季首次购买价格")
                return
            }

            if (this.payused.includes("3") && this.mfprice == "") {
                layer.msg("请输入包年首次购买价格")
                return
            }





            let parmas = {
                name: this.name,        //名称
                modelId: this.com,        //模板ID
                isOnsell: this.isOnsell, //上下架状态
                // type:this.cominfo.isGroup,   //根据模板判断是否分组
                pic: $("#vivew").attr('src'),                 //封面图片
                topPic: $("#vivew2").attr('src'),              //顶部图片
                memPic: $("#vivew3").attr('src'),                //权益卡图片
                sharePic: $("#vivew3").attr('src'),                //分享图片
                remark: window.editor.txt.html(),       //描述ic
                priceUsed: this.payused.join(","),

                //价格
                monthPrice: this.mprice || 0,
                quarterPrice: this.dprice || 0,
                yearPrice: this.yprice || 0,
                price: this.price || 0,

                firstPrice: this.fprice || 0,
                mfirstPrice: this.mfprice || 0,
                qfirstPrice: this.dfprice || 0,
                yfirstPrice: this.yfprice || 0,

                //分享佣金  2020/3/6
                sharePrice: this.shareprice,

                //原价字段 单次 包月 包季度 包年
                oldprice: this.price || 0,        //单次
                oldmonthprice: this.mprice || 0,
                oldquarterprice: this.dprice || 0,
                oldyearprice: this.yprice || 0,
            }

            // 2019年12月23日17:32:47
            // 去掉了到期时间

            //2020年4月27日09:54:11   又把到期时间加上了

            if(this.payused.includes("0")){
                parmas.timeType = this.timeType
                parmas.time = this.time
            }


            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("保存成功")
                        setTimeout(() => {
                            var index1 = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                            parent.layer.close(index1); //再执行关闭
                        }, 2000)
                    }
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
            return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
        },

        //打开模板弹窗
        openinfo(){
            const that = this
            let index = layer.open({
                type:2,
                title:"选择模板",
                content:"type.html",
                area:["100%","100%"],
                end:()=>{

                }
            })
        }





    },

    //挂在时
    mounted() {
        //获取token并初始化七牛云上传
        this.getToken()
        this.get_com()
        this.getQuan()

        //初始化富文本
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true
        window.editor.customConfig.zIndex = 100
        window.editor.create()
        // console.log(window)
    },

    //监听啊
    watch: {
        com(val) {
            console.log(val)
            this.comList.forEach(i => {
                if (i.id == val) {
                    this.cominfo = i
                }
            })
            console.log(this.cominfo)

            //设置到session
            sessionStorage.setItem('com', JSON.stringify(this.cominfo))
        },
        flag(val) {
            if (val == "1") {
                //获取优惠券列表
                this.getQuan()
            }

            if (val == '2') {
                //获取实物列表
                this.getgoods()
            }

            if (val == '3') {
                //获取虚拟商品
                this.getNumgoods()
            }
        }
    },


})