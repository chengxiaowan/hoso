var shopsBrandId = parameter().id;

var config = {
    role: localStorage.userRole,
    api_getgoods: api_url + "/goods/dataList3",
    api_addgoods: api_url + '/shopsBrand/batchAddShopsBrandGoodsList', //新增品牌商品 也可用于批量
    api_type: api_url + '/type/dataList',
}

//初始化Vue实例

window.app = new Vue({
    el: "#app",
    data: {
        list: {},
        keywords: "",
        typelist: [],
        typeId: '',
        minp: "",
        maxp: "",
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


        //获取全部商品列表
        getgoods(page, keywords) {
            var that = this
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();

            $.ajax({
                url: config.api_getgoods,
                type: "post",
                async: true,
                data: {
                    shopsBrandId: shopsBrandId,
                    keywords: that.keywords,
                    skipType: 1,
                    typeId: that.typeId,
                    maxPrice: that.maxp,
                    minPrice: that.minp,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    // console.log(res)
                    that.list = res.result
                    console.log(that.list)
                    // console.log(that.list.total)
                    if (res.error == "00") {
                        that.list = res.result;
                        //分页
                        if (that.pagi) {
                            $('.pagi').pagination('updatePages', that.list.pages)
                            if (page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function (num) {
                                    that.list.pageNum = num
                                    that.getgoods()
                                    yo.scrollTo('body')
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },


        //添加品牌商品
        addgoods(id) {
            var that = this;
            const dialog = layer.confirm("确认添加商品到该品牌？", {
                title: "提示"
            }, () => {
                $.ajax({
                    url: config.api_addgoods,
                    type: "post",
                    async: true,
                    data: {
                        shopsBrandId: shopsBrandId, //品牌ID
                        goodsList: id //商品ID
                    },
                    success: res => {
                        // console.log(res)
                        if (res.error == "00") {
                            layer.msg("添加成功", {
                                time: 3000
                            })
                            that.getgoods()
                        } else {
                            layer.msg(res.mag, {
                                time: 3000
                            })
                        }
                    }
                })
            })
        },

        // 获取分类
        getLeve() {
            var that = this
            $.ajax({
                url: config.api_type,
                type: "post",
                data: {
                    level: "1",
                    pageSize: "100",
                },
                success: res => {
                    if (res.error == "00") {
                        that.typelist = res.result.list;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //搜索
        search() {
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getgoods(page, keywords);
        },
    },

    //钩子函数
    mounted: function () {
        var that = this
        that.getgoods();
        that.getLeve()
    },
})