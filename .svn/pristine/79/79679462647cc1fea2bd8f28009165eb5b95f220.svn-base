var config = {
    api_save: api_url + '/memRights/add',
    api_shop: api_url + '/memRights/getFacilitatorList',
    api_goods: api_url + "/memRights/getGoodsByFacilitatorName",
    api_token: api_url + '/qiniu/getUpToken'
}

window.app = new Vue({
    el: "#app",
    data: {
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
        goods: [],              //加入的商品
        goodsno: "",             //加入的商品序列号
        tokenMessage: "",        //token


    },
    methods: {
        //添加模态框
        add() {
            console.log("模态框")
            const that = this;
            that.dialogVisible = true
            that.getShops()
            that.getGoods()
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
            //整理数据
            const that = this;
            let parmas = {
                name: that.name,
                pic: $("#vivew").attr("src"),
                type: that.type,
                isOnsell: that.isOnsell,
                remark: that.remake,
                countUsed: that.num,
                isReceive: that.isReceive,
            }

            if (that.data_type == 1) {
                parmas.time = that.day
            }
            if (that.data_type == 2) {
                parmas.time = $("#test1").val()
            }
            if (that.data_type == 3) {
                parmas.time = "永不过期"
            }

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
            let rtIds = []
            that.goods.forEach(i => {
                rtIds.push(i.goods_no)
            })
            parmas.rtIds = rtIds.join(",")
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
                    goodsNos: that.goodsno

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

        //本地添加
        addgoods(item) {
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
                }
            })
        },

        del(item) {
            const that = this
            that.$confirm(`确认从权益移除${item.name}么？`, '提示', {
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
        }
    },
    mounted() {
        console.log("Vue初始化成功")
        this.getToken()
    },
})