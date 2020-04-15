var config = {
    api_save: api_url + '/memRights/add',
    api_shop: api_url + '/memRights/getFacilitatorList',
    api_goods: api_url + "/memRights/getGoodsByFacilitatorName",
    api_token: api_url + '/qiniu/getUpToken',
    api_hotel: api_url + '/shops/dataList'
}

window.app = new Vue({
    el: "#app",
    data: {
        pageType: "1",
        info: "OK",
        type: "1",           //卡券类型 ex：普通券 折扣券 满减券 抵用券等
        data_type: "",       //到期时间的类型 
        date: "",            //日期盒子  卡券到期日期
        isOnsell: "1",       //上下架状态
        name: "",            //卡券名称
        remake: "",          //卡券说明
        price: "",           //价格-只有卡券类型为普通券时才有价格
        count: "",           //折扣1-99的数字，只有type=2（折扣券）才有
        sum: "",             //抵用金额，只有TYPE == 3 （抵用券）才有
        pay: "",             //满足金额，只有type == 4（满减）才有，
        dpay: "",            //减去金额，只有type == 4 才有
        num: "",             //卡券数量
        day: "",             //卡券多少天后过期
        isReceive: "0",      //领取方式 0为手动 1为自动
        rtIds: [],           //第三方商品Id     
        dialogVisible: false,    //控制弹出层           
        shop_list: {},        //供应商列表
        goodsList: {},         //商品列表
        page: "1",            //页码
        goods: [],              //加入的商品和大列表
        goodsno: "",             //加入的商品序列号
        tokenMessage: "",        //token
        //需求变更 添加字段模板
        com: "1",
        shopType: "1",
        hotel: {},
        shopsList: [],           //排除的店铺
        keywords: "",
        pageNo2: "1",
        keywordss:"",
        solt:"0",

        //过滤条件
        viptype:"",
        vipsolt:"",



    },
    methods: {
        //添加模态框
        add() {
            console.log("模态框")
            const that = this;
            that.dialogVisible = true
            that.getShops()
            console.log("cufa1")
            that.getGoods()
            console.log("cufa")
        },

        //日期盒子的选择
        sele(type) {
            if (this.data_type == type) {
                this.data_type = ""
            } else {
                this.data_type = type
            }
        },

        //上下架状态
        sell(type) {
            if (this.isOnsell == type) {
                this.isOnsell = ""
            } else {
                this.isOnsell = type
            }
        },

        //保存数据
        save() {
            //开始判断数据是否录入
            if (this.name == "") {
                layer.msg("请输入优惠券名称")
                return
            }

            if (this.price == "" && this.type == "1") {
                layer.msg("请输入价格")
                return
            }

            if (this.count == "" && this.type == "2") {
                layer.msg("请输入折扣比例")
                return
            }

            if (this.type == "3" && this.sum == "") {
                layer.msg("请输入抵用金额")
                return
            }

            if (this.type == "4" && this.pay == "") {
                layer.msg("请输入满足金额")
                return
            }

            if (this.type == "4" && this.pay == "") {
                layer.msg("请输入优惠金额")
                return
            }

            // if (this.num == "") {
            //     layer.msg("请输入优惠券数量")
            //     return
            // }

            // if (this.data_type == "") {
            //     layer.msg("请选择到期时间")
            //     return
            // }

            // if (this.data_type == "1" && this.day == "") {
            //     layer.msg("请输入到期天数")
            //     return

            // }

            // if (this.data_type == "2" && $("#test1").val() == "") {
            //     layer.msg("请选择到期日期")
            //     return
            // }

            if ($("#vivew").attr("src") == "../images/imgadd.png") {
                layer.msg("请上传权益图片")
                return
            }





            //整理数据
            const that = this;
            let parmas = {
                name: that.name,
                pic: $("#vivew").attr("src"),
                type: that.type,
                isOnsell: that.isOnsell,
                remark: window.editor.txt.html(),
                // countUsed: that.num,
                // isReceive: that.isReceive,
                solt:that.solt,
                model: that.com
            }

            // if (that.data_type == 1) {
            //     parmas.time = that.day
            // }
            // if (that.data_type == 2) {
            //     parmas.time = $("#test1").val()
            // }
            // if (that.data_type == 3) {
            //     parmas.time = "永不过期"
            // }

            //私有参数添加
            //type = 1   普通券
            if (that.type == "1") {
                parmas.price = that.price

            }

            //type=2 
            if (that.type == "2") {
                parmas.discount = that.count
            }

            //type=3
            if (that.type == "3") {
                parmas.price = that.sum
            }

            //type(type == "4")
            if (that.type == "4") {
                parmas.fullPrice = that.pay
                parmas.reducePrice = that.dpay
            }

            //整理商品列表
            let goodsbox = [0]
            let roomList = [1]

            that.goods.forEach(i => {
                if (i.goods_no) {
                    goodsbox.push(i.goods_no)
                }
                if (i.room_no) {
                    roomList.push(i.room_no)
                }
            })

            let drool = []
            if (goodsbox.length != 1) {
                drool.push(goodsbox.join(","))
            }
            if (roomList.length != 1) {

                drool.push(roomList.join(","))
            }
            // console.log(c)
            // console.log(goodsbox)
            // console.log(roomList)


            parmas.goods = JSON.stringify(drool);
            console.log(parmas)
            $.ajax({
                url: config.api_save,
                type: "POST",
                data: parmas,
                success: res => {
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
        //获取供应商数据
        getShops() {
            const that = this;
            $.ajax({
                url: config.api_shop,
                type: "GET",
                success: res => {
                    if (res.error == "00") {
                        that.shop_list = res.result
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //获取指定供应商商品
        getGoods() {
            const that = this
            $.ajax({
                url: config.api_goods,
                type: "POST",
                data: {
                    name: "橙券",
                    pageNo: that.pageNo,
                    goodsNos: that.goodsno,
                    keywords:that.keywordss,
                    type:that.viptype,
                    solt:that.vipsolt

                },
                success: res => {
                    if (res.error == "00") {
                        that.goodsList = res.result
                    }
                }
            })
        },

        //分页
        pages(e) {
            console.log(e)
            this.pageNo = e;
            this.getGoods()
        },

        //分页
        pages2(e) {
            console.log(e)
            this.hotel.pageNum = e;
            this.getHotel()
        },

        //本地添加
        addgoods(item) {
            if(this.com == "2" && this.goods.length == 1){
                layer.msg("只能加入一个商品")
                return
            }
            console.log(item)
            this.goods.push(item);
            let rtIds = []
            this.goods.forEach(i => {
                rtIds.push(i.goods_no)
            })
            this.goodsno = rtIds.join(",");
            this.getGoods()
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
                    uploadInit(res)
                }
            })
        },

        del(item) {
            const that = this
            that.$confirm(`是否确认删除${item.name}？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (let i = 0; i < that.goods.length; i++) {
                    if (that.goods[i].goods_no == item.goods_no) {
                        that.goods.splice(i, 1)
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        return
                    }
                }
            }).catch(() => {
            });
        },
        teb(index) {
            this.shopType = index;
            if (index == '1') {
                this.getGoods()
            }

            if (index == '2') {
                this.getHotel()
            }
        },

        getHotel() {
            const that = this
            $.ajax({
                url: config.api_hotel,
                type: "POST",
                data: {
                    pageNo: that.hotel.pageNum,
                    keywords: that.keywords,
                    goodsNos: that.shopsList.join(",") || ""

                },
                success: res => {
                    if (res.error == "00") {
                        that.hotel = res.result
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },
        addShops(item) {
            console.log(item)
            let room = {}
            room.name = item.shopsName
            room.room_no = Number(item.shopsId)
            room.type = 2
            this.goods.push(room)
            this.shopsList.push(item.shopsId)
            console.log(this.goods)
            this.getHotel()

        },
        test() {
            console.log(window.editor.txt.html())
        },
        drool(){
            if(this.com == '1'){
                this.shopType = 2
            }else{
                this.shopType = 1
            }
        }
    },
    mounted() {
        console.log("Vue初始化成功")
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true
        window.editor.create()
        // console.log(window)
        this.getToken()
        this.drool()
        this.getGoods()
        this.getHotel()

    },
})