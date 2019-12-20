let config = {
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_list: api_url + "/memPackage/selectMemRights", //获取待添加服务   
    api_save: api_url + '/memPackage/add',
    api_info: api_url + '/memRights/detail',
    api_del: api_url + '/memPackage/deleteRightsBind' //删除

}

window.app = new Vue({
    el: "#app",
    data: {
        flage: 0, //标志
        name: "", //权益包名称
        type: "1", //是否包含组头  
        package: [], //权益包内容
        package2: [], //权益包内容
        isOnsell: "1", //上下架状态    
        onece: false, //是否一次性购买
        Y: false, //是否包年
        M: false, //是否包月
        d: false, //是否包季
        price: "", //一次性购买价格
        price1: "", //包年购买价格
        price2: "", //包月购买价格
        price3: "", //包季购买价格
        remake: "", //描述
        keywords: "", //关键字
        list: [], //未添加的权益列表
        zu: "", //新增组头名称
        date: "",
        isShow: 0,
        isShows: "-1",
        firstPrice: "",
        yfirstPrice: "",
        mfirstPrice: "",
        qfirstPrice: "",
        info: {
            name: "预设",
            type: "预设",
            price: "预设",
            dockType: "0",
            isOnsell: "1",
            remark: "预设",
            pic: "http://placehold.it/100x100/",
        },
        description: "",
        arr: []

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
                    uploaderReady2(res)
                    uploadInit(res)
                }
            })
        },
        //获取待添加权益
        getdata(page) {
            const that = this
            $('body,html').scrollTop(0)
            $.ajax({
                url: config.api_list,
                async: true,
                type: "POST",
                data: {
                    keywords: this.keywords,
                    // pageSize: this.list.pageSize || 10,
                    pageNo: page,
                    pageSize: 5,
                    memRightsIds: this.arr.join(','),

                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                    } else {
                        layer.msg(res.msg)
                    }
                }

            })
        },
        //打开添加分组（组头）模态框
        addZu() {
            const that = this
            that.zu = ""
            let index = layer.open({
                type: 1,
                title: "新增分组",
                content: $("#add-zu"),
                area: ["487px", "296px"],
                btn: "确定",
                btnAlign: 'c',
                yes() {
                    let drool = {
                        name: that.zu,
                        memRights: []
                    };
                    if (that.zu == "") {
                        layer.msg("请输入组头名称")
                        return
                    }
                    that.package.push(drool)
                    layer.msg("添加分组成功")
                    setTimeout(() => {
                        layer.close(index)
                    }, 1000)

                }

            })
        },
        //添加分组（组头）
        addzu() {


        },
        //打开权益列表
        open() {
            let index = layer.open({
                type: 1,
                content: $("#list-vip"),
                title: "添加权益",
                area: ["990px", "496px"]
            })
            let arr = []
            for (let i = 0; i < this.package2.length; i++) {
                arr.push(this.package2[i].memRightsId)
            }
            this.arr = arr
            this.getdata(1)

        },

        open2(item) {
            let index = layer.open({
                type: 1,
                content: $("#list-vip2"),
                title: "添加权益",
                area: ["990px", "496px"]
            })
            let arr = []
            for (let i = 0; i < this.package.length; i++) {
                for (let j = 0; j < this.package[i].memRights.length; j++) {
                    arr.push(this.package[i].memRights[j].memRightsId)
                }

            }
            this.arr = arr
            console.log(this.package)
            console.log(arr)
            this.getdata(1)

            sessionStorage.setItem("packagename", item.name)
        },
        //简单的分页
        page(e) {
            this.getdata(e)
        },
        //a没有分组的添加
        add(item) {
            const that = this;
            const dialog = layer.confirm("您确认添加该权益到权益包？", {
                title: "提示"
            }, () => {
                let drool = {}
                drool.name = item.name;
                drool.memRightsId = item.memRightsId
                drool.pic = item.pic
                that.package2.push(drool);
                layer.msg("添加权益成功")
                layer.close(dialog)
                layer.closeAll("page")
                // this.list.list.splice(item.index, 1)
                // this.getdata(1)
                // console.log(this.package2)
            })
        },
        //带分组的添加
        adds(item) {

            const that = this;
            const dialog = layer.confirm("您确认添加该权益到权益包？", {
                title: "提示"
            }, () => {
                for (let i = 0; i < this.package.length; i++) {
                    if (this.package[i].name == sessionStorage.getItem("packagename")) {
                        let drool = {
                            name: item.name,
                            memRightsId: item.memRightsId,
                            pic: item.pic
                        }
                        this.package[i].memRights.push(drool)
                        // this.list.list.splice(item.index, 1)
                    }
                }
                layer.msg("添加权益成功")
                layer.close(dialog)
                layer.closeAll("page")
                // this.list.list.splice(item.index, 1)
                // this.getdata(1)
                // console.log(this.package2)
            })

        },
        save() {
            const that = this
            //价格模式整理
            let priceUsed = [];
            if (that.onece) { //单次
                priceUsed.push(0)
            }
            if (that.Y) {
                priceUsed.push(1) //年
            }
            if (that.M) {
                priceUsed.push(2) //月
            }
            if (that.d) { //季度
                priceUsed.push(3)
            }

            //必须填写项判断
            if (that.name == "") {
                layer.msg("请输入会员包名称")
                return
            }

            // if (that.package.length == 0 || that.package2.length == 0) {
            //     layer.msg("请添加权益到会员包")
            //     return
            // }

            // if (that.package[0].memRights.length == 0) {
            //     layer.msg("请添加权益到会员包")
            //     return
            // }

            if ($("#vivew").attr("src") == '../images/imgadd.png') {
                layer.msg("请上传封面图片")
                return
            }

            if ($("#vivew2").attr("src") == '../images/imgadd.png') {
                layer.msg("请上传顶部图片")
                return
            }

            if (that.onece == false && that.Y == false && that.M == false && that.d == false) {
                layer.msg("请选择支付类型")
                return
            }


            if (that.onece == true && that.price == "") {
                layer.msg("请输入单次购买价格")
                return

            }

            if (that.Y == true && that.price1 == "") {
                layer.msg("请输入包年购买价格")
                return

            }

            if (that.M == true && that.price2 == "") {
                layer.msg("请输入包月购买价格")
                return

            }

            if (that.d == true && that.price3 == "") {
                layer.msg("请输入包季购买价格")
                return

            }

            //带组头的
            if (this.type == "1") {
                let parmars = {
                    name: that.name,
                    pic: $("#vivew").attr("src"),
                    isOnsell: that.isOnsell,
                    remark: window.editor.txt.html(),
                    type: that.type,
                    topPic: $("#vivew2").attr("src"),
                    priceUsed: priceUsed.join(","),
                    monthPrice: that.price2 || 0,
                    quarterPrice: that.price3 || 0,
                    yearPrice: that.price1 || 0,
                    price: that.price || 0,
                    dataList: JSON.stringify(that.package),
                    firstPrice: that.firstPrice || 0,
                    mfirstPrice: that.mfirstPrice || 0,
                    qfirstPrice: that.qfirstPrice || 0,
                    yfirstPrice: that.yfirstPrice || 0,
                }


                if (this.onece) {
                    parmars.time = this.date

                }
                console.log(parmars)

                $.ajax({
                    type: "post",
                    url: config.api_save,
                    async: true,
                    data: parmars,
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

            }

            if (this.type == "0") {
                let parmars = {
                    name: that.name,
                    pic: $("#vivew").attr("src"),
                    isOnsell: that.isOnsell,
                    remark: window.editor.txt.html(),
                    type: that.type,
                    topPic: $("#vivew2").attr("src"),
                    priceUsed: priceUsed.join(","),
                    monthPrice: that.price2 || 0,
                    quarterPrice: that.price3 || 0,
                    yearPrice: that.price1 || 0,
                    price: that.price || 0,
                    dataList: JSON.stringify(that.package2),
                    firstPrice: that.firstPrice || 0,
                    mfirstPrice: that.mfirstPrice || 0,
                    qfirstPrice: that.qfirstPrice || 0,
                    yfirstPrice: that.yfirstPrice || 0,

                }

                if (this.onece) {
                    parmars.time = this.date
                }
                console.log(parmars)
                $.ajax({
                    url: config.api_save,
                    type: "post",
                    async: true,
                    data: parmars,
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
            }
        },
        //组头编辑小菜单展示
        show(index) {
            this.isShow = index
            console.log(index)
        },

        //删除组头
        delZu(name) {

            this.$confirm('您确定删除这个分组？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (let i = 0; i < this.package.length; i++) {
                    if (this.package[i].name == name) {
                        this.package.splice(i, 1)
                    }
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {});
        },

        vipInfo(index) {
            const that = this
            let drool = layer.open({
                type: 1,
                content: $("#list-vip3"),
                title: "权益详情",
                area: ["533px", "599px"]
            })

            $.ajax({
                url: config.api_info,
                type: "POST",
                async: true,
                data: {
                    id: index.memRightsId
                },
                success: res => {
                    // console.log(res)
                    that.info = res.result
                    // console.log(that.info)
                }
            })
        },

        //删除某个权益（本地删除，只用于新增）
        delVip(item, type) {
            this.$confirm('您确定移除该权益？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if (type == "1") {
                    for (let i = 0; i < this.package.length; i++) {
                        for (let j = 0; j < this.package[i].memRights.length; j++) {
                            if (this.package[i].memRights[j].memRightsId == item.memRightsId) {
                                this.package[i].memRights.splice(j, 1)
                            }
                        }
                    }
                };


                if (type == "2") {
                    console.log(item)
                    console.log(this.package2)
                    for (let i = 0; i < this.package2.length; i++) {
                        if (this.package2[i].memRightsId == item.memRightsId) {
                            this.package2.splice(i, 1)
                        }
                    }
                }
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {

            });
        },
        
    },
    mounted() {
        console.log("Vue挂载成功")
        var E = window.wangEditor
        window.editor = new E('#demo')
        window.editor.customConfig.qiniu = true
        window.editor.create()
        this.getToken()
        // this.getdata(1)

        // this.editor = UE.getEditor('container', {
        //     initialFrameHeight: 350,
        //     // initialContent: "请填写详细描述",
        // });
        // this.editor.addListener("ready", function () {
        //     // editor准备好之后才可以使用
        //     this.editor.setContent(this.editorInfo);
        // });

        
    },
})