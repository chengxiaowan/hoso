var config = {
    role: localStorage.userRole,
    api_list: api_url + '/shopsBrand/shopsBrandList', //获取品牌列表
    api_edit: api_url + '/shopsBrand/edit', //修改品牌
    api_del: api_url + '/shopsBrand/del', //删除品牌
    api_ewm: api_url + '/weixin/getwxTwoEconde' //小程序码
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 名称
        name: '', // 品牌名称
        postData: {},
        bg_show1: false,
        image_ewm: '',
        img_name: '',
    },
    created: function () {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        that.getData();
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
        getData: function (page, keywords) {
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    // console.log(res)
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
                                    that.getData()
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
        // 新增品牌
        jumpToBrand() {
            var that = this
            var index = layer
                .open({
                    type: 2,
                    title: '新增品牌',
                    content: 'add.html',
                    area: ['100%', '100%'],
                    end: function () {
                        that.getData()
                    }
                });
        },
        // 查看品牌详情
        view(id) {
            var index = layer.open({
                type: 2,
                title: '查看品牌详情',
                content: 'detail.html?id=' + id,
                area: ['80%', '80%']
            });
        },
        // 编辑品牌
        edit(id, labels) {
            var index = layer.open({
                type: 2,
                title: '编辑品牌',
                content: 'add1.html?id=' + id + '&labels=' + labels,
                area: ['100%', '100%']
            });
        },
        // 搜索
        search() {
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page, keywords);
        },
        // 删除品牌
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该品牌?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    shopsBrandId: id,
                }, function (data) { // 回调函数
                    if (data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getData()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
        ewm(item) {
            let that = this
            let id = ''
            that.img_name = item.brandName
            id = 'relateId=' + item.shopsBrandId + ",type=0"
            $.ajax({
                type: "post",
                url: config.api_ewm,
                async: true,
                data: {
                    page: 'pages/brandDetail/brandDetail',
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


//end 2019年6月12日17:45:30