var shopsBrandId = parameter().id;
var labels = parameter().labels;
console.log(parameter())
console.log(shopsBrandId)
console.log(labels)

var config = {
    role: localStorage.userRole,
    api_save: api_url + '/shopsBrand/add', //添加品牌
    api_edit: api_url + '/shopsBrand/edit', //修改品牌
    api_getinfo: api_url + '/shopsBrand/editInfo', //获取当前品牌信息
    api_user: api_url + '/user/userList3', //获取负责人列表
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_userlist: api_url + '/shopsBrand/shopsBrandShopsOwnerList', //获取门店品牌负责人
    api_delUser: api_url + '/user/changeIsQuit', //离职门店品牌负责人
    api_getgoods: api_url + "/shopsBrand/shopsBrandGoodsList", //获取品牌商品列表
    api_delgoods: api_url + "/shopsBrand/delShopsBrandGoods", //获取品牌商品列表
    api_gettype: api_url + "/type/dataList", //获取品牌商品列表
    api_province: api_url + '/region/provinceList', // 获取省份
    api_city: api_url + '/region/cityList', //获取城市
    api_brandList: api_url + '/shopsBrand/showAShopsBrandService', //获取品牌服务列表
    api_del: api_url + '/shopsBrand/deleteAShopsBrandServiceById', // 删除品牌服务
    api_ewm: api_url + '/weixin/getwxTwoEconde', //小程序码

    // 2020年1月16日15:51:47  迭代
    api_users:api_url + '/service/showMerchantsUsers'

   
}
window.app = new Vue({
    el: '#app',
    data: {
        index: 1,
        role: config.role,
        list: [],
        keywords: '', // 搜索关键
        colorPicType: '', //去捏颜色模所属状态
        userlist: [], //负责人列表
        newuserlist: [], //新建负责人列表
        //新增品牌表单信息
        bandname: '', //品牌名称
        userId: '', //负责人id
        labels: '', //标签
        summary: '',
        description: '', //图文描述
        logoPath: '', //logo地址
        imagePath: '', //封面地址
        shopsBrandPicList: [], //店铺图片列表

        tokenMessage: "", //七牛云的token
        shopsBrandId: '', //品牌ID
        keywords: "", //搜索关键字

        //商品筛选
        type: "", //分类列表
        typeId: "", //用户选择的分类
        minPrice: "", //用户输入的最低价
        maxPrice: "", //用户输入的最高价
        check: "",
        goods: [],

        //服务
        serviceKeywords: '', // 服务名称
        provinceList: [], //省份列表
        provinceId: '', // 省份Id
        province: '', // 省份
        cityList: [], // 城市别表
        cityId: '', // 城市Id
        city: '', // 城市
        brandServiceList: [], // 品牌服务列表
        bg_show1: false,
        image_ewm: '',
        img_name: '',
        brandId:"",


        // 房券
        houseKeywords:'',//房券搜索
        houseList:[],    //房券列表数据
    },
    watch: {
        provinceId(val, oldVal) {
            let that = this
            that.cityList = ''
            that.cityId = ''
            if (val != '') {
                $.ajax({
                    url: config.api_city,
                    async: true,
                    type: 'post',
                    data: {
                        parentId: val,
                    },
                    success: function (res) {
                        that.loading('close')
                        if (res.error == "00") {
                            var arr = [];
                            var res_result = res.result;
                            for (var i in res_result) {
                                var obj = {};
                                obj.id = res_result[i].cityId;
                                obj.text = res_result[i].cityName;
                                arr.push(obj);
                            }
                            that.cityList = arr;
                        } else {
                            layer.msg(res.msg)
                        }
                    }
                });
            }
        }
    },
    created: function () {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        that.getUserlist(); //获取所有负责人
        that.getToken() //获取七牛云的token
        that.getinfo(); //获取详情

        this.editor = UE.getEditor('container', {
            initialFrameHeight: 350,
            // initialContent: "请填写详细描述",
        });

        that.editor.addListener("ready", function () {
            // editor准备好之后才可以使用
            that.editor.setContent(that.description);
        });

        that.labels = labels
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function (s) {
            if (s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },

        // 切换tab时执行的方法
        activateTab: function (index_chosen) {
            const that = this;
            that.index = index_chosen;
            if (this.index == 1) {
                console.log("ok")

            } else if (this.index == 2) {
                // that.getColorList();
                that.getbranduser(); //获取门店品牌负责人信息
                console.log("获取门店负责人")
            } else if (this.index == 3) {
                that.getgoods();
                that.getType()
                console.log("获取品牌商品")

            } else if (this.index == 4) {
                // that.getSkuList();
                that.getProvince(); // 获取省份列表
                that.showAShopsBrandService(); // 获取品牌服务列表
            }
        },

        //品牌基本信息的下拉框负责人列表
        getUserlist() {
            var that = this
            $.ajax({
                url: config.api_users,
                async: true,
                type: 'post',
                data:{
                    roleId:7
                },
                success: res => {
                    if (res.error == "00") {
                        that.newuserlist = res.result;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },
        //获取信息
        getinfo() {
            var that = this;
            $.ajax({
                url: config.api_getinfo,
                type: "post",
                async: true,
                data: {
                    shopsBrandId: shopsBrandId
                },
                success: res => {
                    if (res.error == "00") {
                        // console.log(res)
                        that.bandname = res.result.brandName //品牌名称
                        that.userId = Number(res.result.userId) //负责人id
                        that.summary = res.result.summary
                        that.description = res.result.description; //图文描述
                        that.imagePath = res.result.imagePath
                        if (res.result.logoPath == "") {
                            that.logoPath = "../images/imgadd.png"
                        } else {
                            that.logoPath = res.result.logoPath
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                    // console.log(that.labels)
                }
            })
        },

        //获取品牌门店负责人列表
        getbranduser(page, keywords) {
            var that = this
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_userlist,
                async: true,
                type: 'post',
                data: {
                    shopsBrandId: shopsBrandId,
                    keywords: that.keywords,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    console.log(res)
                    if (res.error == "00") {
                        that.list = res.result;
                        //分页
                        if (that.pagi1) {
                            $('.pagi1').pagination('updatePages', that.list.pages)
                            if (page == 1) $('.pagi1').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi1').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function (num) {
                                    that.list.pageNum = num
                                    that.getbranduser()
                                    yo.scrollTo('body')
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },


        //获取品牌商品列表
        getgoods(page, keywords) {
            var that = this
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_getgoods,
                async: true,
                type: 'post',
                data: {
                    shopsBrandId: shopsBrandId,
                    keywords: that.keywords,
                    typeId: that.typeId,
                    maxPrice: that.maxPrice,
                    minPrice: that.minPrice,
                    auditStatus: that.check,
                    pageSize: that.goods.pageSize || 10,
                    pageNo: that.goods.pageNum || 1,
                },
                success: function (res) {
                    // console.log(res)
                    that.loading('close')
                    // console.log(res)
                    if (res.error == "00") {
                        that.goods = res.result;
                        console.log(that.list)
                        //分页
                        if (that.pagi2) {
                            $('.pagi2').pagination('updatePages', that.list.pages)
                            if (page == 1) $('.pagi2').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi2').pagination({
                                pages: that.goods.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.goods.pageNum,
                                onSelect: function (num) {
                                    that.goods.pageNum = num
                                    that.getgoods()
                                    yo.scrollTo('body')
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 新建负责人
        jumpToHeader() {
            var index = layer
                .open({
                    type: 2,
                    title: '新建负责人',
                    content: 'headers.html',
                    area: ['80%', '80%']
                });
        },

        //新建品牌负责人
        addheader() {
            var that = this
            var index = layer
                .open({
                    type: 2,
                    title: '新建负责人',
                    content: 'headers1.html?id=' + shopsBrandId,
                    area: ['80%', '80%'],
                    end: function () {
                        that.getbranduser();
                    }
                });
        },


        // 搜索
        search() {
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getbranduser(page, keywords);
        },

        search2() {
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getgoods(page, keywords);
        },

        //保存数据  需要修改
        save() {
            //整理数据
            var arr = [];
            const that = this;
            var drool = "";
            // that.clearDate($("#info1"), arr)
            // that.clearDate($("#info2"), arr)
            // that.clearDate($("#info3"), arr)
            // that.clearDate($("#info4"), arr)
            // that.clearDate($("#info5"), arr)
            // that.clearDate($("#info6"), arr)
            // // console.log(shopsBrandPicList)

            // console.log(document.getElementById("boboname").value)
            // console.log(that.userId)
            // console.log(document.getElementById("tagsinputval").value)
            // console.log(that.summary)
            // console.log(that.editor.getContent())
            // console.log($('#vivew').attr('src'))
            // console.log($('#vivew1').attr('src'))
            // console.log(arr)

            //提交前先验证

            //提交到服务器

            if ($("#boboname").val() == "") {
                layer.msg("请输入品牌名称", {
                    time: 3000
                })
            } else if (that.userId == "") {
                layer.msg("请选择品牌负责人", {
                    time: 3000
                })
            } else if (that.summary == "") {
                layer.msg("请输入品牌简介", {
                    time: 3000
                })
            } else if ($('#vivew').attr('src') == "../images/imgadd.png") {
                layer.msg("请选择品牌lLOGO", {
                    time: 3000
                })
            } else if ($('#vivew1').attr('src') == "../images/imgadd.png") {
                layer.msg("请选择店铺封面图", {
                    time: 3000
                })
            } else {

                if ($('#vivew').attr('src') != "../images/imgadd.png") {
                    drool = $('#vivew').attr('src')
                }

                $.ajax({
                    url: config.api_edit,
                    traditional: true,
                    async: true,
                    type: 'post',
                    data: {
                        brandName: document.getElementById("boboname").value, //品牌名称
                        userId: that.userId, //负责人
                        labels: document.getElementById("tagsinputval").value, //标签信息
                        summary: that.summary, //描述
                        description: that.editor.getContent(), //富文本
                        logoPath: $('#vivew').attr('src'), //logo地址
                        imagePath: $('#vivew1').attr('src'), //封面
                        shopsBrandPicList: "",
                        shopsBrandId:shopsBrandId
                    },
                    success: res => {
                        console.log(res);
                        layer.msg("保存成功", {
                            time: 3000
                        })
                    }
                })
            }



        },

        //获取token并传给七牛云SDK
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
                    uploaderReady3(res)
                    uploaderReady4(res)
                    uploaderReady5(res)
                    uploaderReady6(res)
                    uploaderReady7(res)
                    uploaderReady8(res)
                }
            })
        },

        //本地时间获取
        gettime() {
            var d = new Date();
            var year = d.getFullYear();
            var month = change(d.getMonth() + 1);
            var day = change(d.getDate());
            var hour = change(d.getHours());
            var minute = change(d.getMinutes());
            var second = change(d.getSeconds());

            function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            }
            var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            return time;

        },

        //数据整理
        clearDate(img, data) {
            //img为JQ的元素，data为存放数据的大数组
            if (img.attr("isUp")) {
                var drool = {
                    fileSize: '',
                    realPath: '',
                    originalFilename: img.attr("isUp"),
                    url: img.attr("src"),
                    uploadTime: this.gettime(),
                }
                data.push(drool)
                // console.log(drool)
            }

        },
        //dy测试Vue双向绑定是否正常
        dy() {
            var that = this
            console.log(that.maxPrice)
            console.log(that.minPrice)
            console.log(that.check)
            console.log(that.typeId)
        },

        //删除图片
        delImg() {

        },

        //门店品牌负责人离职
        delUser(id) {
            const that = this;
            const dialog = layer.confirm("确认该负责人已经离职？", {
                title: "提示"
            }, () => {
                $.ajax({
                    url: config.api_delUser,
                    data: {
                        userId: id
                    },
                    success: res => {
                        layer.msg(res.msg);
                        that.getbranduser()
                    }
                })
            })

        },

        //查看门店品牌负责人详情
        userInfo(id) {
            var that = this
            var index = layer
                .open({
                    type: 2,
                    title: '新建负责人',
                    content: 'headers2.html?id=' + id,
                    area: ['80%', '80%'],
                    end: function () {
                        that.getbranduser();
                    }
                });
        },

        //商品添加弹窗
        addgoods() {
            var that = this
            var index = layer
                .open({
                    type: 2,
                    title: '添加商品',
                    content: 'addgoods.html?id=' + shopsBrandId,
                    area: ['100%', '100%'],
                    end: function () {
                        that.getgoods()
                    }
                });
        },

        //删除品牌商品---layer弹窗确认
        delgoods(id) {
            var that = this
            var queding = layer.confirm("您确认删除该商品么？", {
                title: "删除商品"
            }, () => {
                $.ajax({
                    url: config.api_delgoods,
                    type: "post",
                    async: true,
                    data: {
                        shopsBrandGoodsId: id
                    },
                    success: res => {
                        console.log(res)
                        if (res.error == "00") {
                            layer.msg("删除成功", {
                                time: 3000
                            })
                            that.getgoods()
                        }
                    }
                })
            })
        },

        //获取一级分类信息
        getType() {
            var that = this;
            $.ajax({
                url: config.api_gettype,
                type: "post",
                async: true,
                data: {
                    level: "1"
                },
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        that.type = res.result

                    } else {
                        layer.msg("分类获取错误" + res.error)
                    }
                }
            })
        },
        // 添加服务
        serviceAdd() {
            const that = this;
            var index = layer.open({
                type: 2,
                title: '加入服务',
                content: 'serviceAdd.html?id=' + shopsBrandId,
                area: ['100%', '100%'],
                end: function () {
                    that.showAShopsBrandService(shopsBrandId)
                }
            });
        },
        // 获取省份
        getProvince() {
            const that = this;
            $.ajax({
                url: config.api_province,
                async: true,
                type: 'post',
                data: {
                    keywords: ''
                },
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        var arr = [];
                        var res_result = res.result;
                        console.log(res_result)
                        for (var i in res_result) {
                            var obj = {};
                            obj.id = res_result[i].provinceId;
                            obj.text = res_result[i].provinceName;
                            arr.push(obj);
                        }
                        that.provinceList = arr;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 选择省份
        selectProvince(Pid) {
            let obj = {},
                that = this;
            console.log(Pid)
            obj = that.provinceList.find((item) => {
                return item.id === Pid
            })
            if (obj == undefined) {
                that.province = ''
                that.city = ''
            } else {
                that.province = obj.text
            }
        },
        // 获取城市
        selectCity(Cid) {
            let obj = {},
                that = this;
            obj = this.cityList.find((item) => {
                return item.id === Cid
            })
            if (obj == undefined) {
                that.city = ''
            } else {
                that.city = obj.text
            }

        },
        // 获取品牌服务列表
        showAShopsBrandService(page, keywords, province, city) {
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            const that = this;
            that.loading();
            $.ajax({
                url: config.api_brandList,
                async: true,
                type: 'post',
                data: {
                    keywords: keywords,
                    province: province,
                    city: city,
                    shopsBrandId: shopsBrandId,
                    pageSize: that.brandServiceList.pageSize || 10,
                    pageNo: that.brandServiceList.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    // console.log(res)
                    if (res.error == "00") {
                        that.brandServiceList = res.result;
                        for (var i in that.brandServiceList.list) {
                            if (that.brandServiceList.list[i].price != undefined)
                                that.brandServiceList.list[i].price = that.brandServiceList.list[i].price.toFixed(2);
                        }
                        //分页
                        if (that.pagi1) {
                            $('.pagis').pagination('updatePages', that.brandServiceList.pages)
                            if (page == 1) $('.pagis').pagination('goToPage', that.brandServiceList.pageNum)
                        } else {
                            that.pagi = $('.pagis').pagination({
                                pages: that.brandServiceList.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.brandServiceList.pageNum,
                                onSelect: function (num) {
                                    that.brandServiceList.pageNum = num
                                    that.showAShopsBrandService()
                                    yo.scrollTo('body')
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 服务搜索
        serviceSearch() {
            const that = this;
            var page = 1;
            that.showAShopsBrandService(page, that.serviceKeywords, that.province, that.city)
        },
        // 查看周边服务详情
        view(id) {
            var index = layer.open({
                type: 2,
                title: '查看服务详情',
                content: 'detail.html?id=' + id,
                area: ['80%', '80%']
            });
        },
        // 删除品牌服务列表
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该服务吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    id: id,
                    delFlag: '1'
                }, function (data) { // 回调函数
                    if (data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.showAShopsBrandService()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },

        ewm(item, type) {
            console.log(item)
            console.log(type)
            if (type == 1) {
                let that = this
                let id = ''
                that.img_name = item.name
                id = 'goodsId=' + item.goodsId + ',relateId=' + shopsBrandId + ',type=0'
                $.ajax({
                    type: "post",
                    url: config.api_ewm,
                    async: true,
                    data: {
                        page: 'pages/goodsDetail/goodsDetail',
                        id: id
                    },
                    success(res) {
                        that.bg_show1 = true
                        that.image_ewm = res.result
                        that.$nextTick(function () {
                            var top = $(document).scrollTop() + 200
                            $(".ewm").css('top', top + 'px')
                        })
                    }
                });
            } else if (type == 2) {
                let that = this
                let id = ''
                that.img_name = item.serviceName
                id = 'serviceId=' + item.serviceId + ",relateId=" + shopsBrandId + ",type=0"
                $.ajax({
                    type: "post",
                    url: config.api_ewm,
                    async: true,
                    data: {
                        page: 'pages/clap/clap',
                        id: id
                    },
                    success(res) {
                        that.bg_show1 = true
                        that.image_ewm = res.result
                        that.$nextTick(function () {
                            var top = $(document).scrollTop() + 200
                            $(".ewm").css('top', top + 'px')
                        })
                    }
                });
            }
        },
        hide1() {
            let that = this
            that.bg_show1 = false
        },
        downloadIamge(imgsrc, name) {

            //下载图片地址和图片名 
            var image = new Image();
            // 解决跨域 Canvas 污染问题
            image.setAttribute("crossOrigin", "anonymous");
            image.onload = function () {
                var canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据     
                var a = document.createElement("a"); // 生成一个a元素   
                var event = new MouseEvent("click"); // 创建一个单击事件   
                a.download = name || "photo"; // 设置图片名称    
                a.href = url; // 将生成的URL设置为a.href属性    
                a.dispatchEvent(event); // 触发a的单击事件  
            };
            image.src = imgsrc;
        },
        downs() {
            let that = this
            this.downloadIamge(this.image_ewm, that.img_name)
        },

    }
})


//简介文字计数
var info = document.getElementById("info")
info.onkeyup = function () {
    document.getElementById('count4').innerHTML = info.value.length
}