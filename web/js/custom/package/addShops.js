var config = {
    api_info: api_url + '/memPackage/detail',      //会员包详情
    api_com: api_url + '/memPackage/detailModel',    //模板详情
    api_addGroup: api_url + '/memPackage/addGoodsGroup',   //新增分组
    api_groupList: api_url + '/memPackage/showGroupOrmemGoods',
    api_list: api_url + "/memPackage/showGroupOrmemGoods",

    api_quan: api_url + '/shops/dataList',           //优惠券列表
    api_goods: api_url + '/goods/dataList',         //实物商品列表
    api_Numgoods: api_url + '/memRights/getGoodsByFacilitatorName',
    api_save:api_url + '/memPackage/bindGoods',

}

var id = parameter().id;

window.app = new Vue({
    el: "#app",
    data() {
        return {
            modelId: "",     //模板ID
            isMain: "",      //是否主次
            isGroup: "",     //是否分组
            dialogVisible: false,   //模态框
            dialogVisible2: false,
            quanList: [],              //优惠券列表
            goodsList: [],             //商品列表
            numList: [],               //虚拟商品列表
            pageNo: 1,                  //优惠券分页
            pageNo2: 1,                  //商品分页
            pageNo3: 1,                  //虚拟商品分页
            flag: "1",                    //选项卡 1优惠券 2虚拟商品 3实物

            //配置项项目
            keywords: "",        //关键字
            keywords2: "",       //实物
            keywords3: "",       //虚拟商品
            groupName: "",       //分组名
            groupList: [],
            parentId: "-1",          //选择的分组
            list: [],
            linshi:{},
            linshiGroup:"",

        }
    },
    methods: {
        //获取会员包详情提取模板id
        getinfo() {
            const that = this
            $.ajax({
                url: config.api_info,
                type: "POST",
                data: {
                    memPackageId: id
                },
                success: res => {
                    if (res.error == "00") {
                        that.modelId = res.result.modelId
                        that.getcom()
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //获取模板信息 提取是否分组 是否走权益
        getcom() {
            const that = this
            $.ajax({
                url: config.api_com,
                type: "POST",
                data: {
                    id: that.modelId
                },
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        that.isMain = res.result.isMain;
                        that.isGroup = res.result.isGroup
                        console.log(window.app)
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //添加分组
        addGroup() {
            const that = this
            if (this.groupName == "") {
                layer.msg("请输入分组名称")
            }
            $.ajax({
                url: config.api_addGroup,
                type: "POST",
                data: {
                    memPackageId: id,
                    name: that.groupName,
                },
                success: res => {
                    if (res.error == "00") {
                        layer.msg("添加成功")
                        that.dialogVisible = false
                        that.groupName = ""
                        that.getGroup()
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },



        //获取分组列表
        getGroup() {
            const that = this
            $.ajax({
                url: config.api_groupList,
                type: "POST",
                data: {
                    memPackageId: id
                },
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        that.groupList = res.result
                        that.parentId = res.result[0].groupId || -1
                    } else {
                        layer.msg(res.msg)
                    }
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

        //获取已绑定权益
        getlist() {
            $.ajax({
                url: config.api_list,
                type: "POST",
                data: {
                    memPackageId: id,
                    parentId: this.parentId
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                    }
                }
            })
        },

        zu(item) {
            console.log(item)
            this.parentId = item.groupId
            this.getlist()
        },


        //添加优惠券
        add1(item) {
            const that = this
            that.linshi = item
            console.log(that.linshi)
            
        },
        add2() {
            const that = this
            let parmars = {
                name:that.linshi.shopsName,
                type:that.linshi.shopsType,
                memPackageId:id,
                parentId:that.linshiGroup || -1
            }

            $.ajax({
                url:config.api_save,
                type:"post",
                data:parmars,
                success:res=>{
                    if(res.error == "00"){
                        this.$message("绑定成功")
                        this.dialogVisible2 = false
                        this.linshi = ""
                        this.linshiGroup = ""
                        this.getlist()

                    }
                }
            })
            
        },
        add3(item) {
            const that = this
            console.log(item)
            sessionStorage.setItem("item", JSON.stringify(item))
            let parmas = {
                isGroup: that.isGroup,
                isMain: that.isMain,
                ids: id
            }
            sessionStorage.setItem("parmars", JSON.stringify(parmas))
            let index = layer.open({
                type: 2,
                title: "子商品",
                content: `addGood.html`,
                area: ["1053px", "600px"],
                end: () => {
                    that.getlist()
                }
            })
        }


    },
    mounted() {
        this.getinfo()
        this.getGroup()
        this.getQuan()
        this.getlist()

    },
    watch: {
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

