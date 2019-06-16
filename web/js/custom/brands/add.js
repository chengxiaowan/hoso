var config = {
    role: localStorage.userRole,
    api_list: api_url + '/brand/dataList', //获取品牌列表 此页面用不到记得删除
    api_save: api_url + '/shopsBrand/add',
    api_edit: api_url + '/brand/saveOrupdate', //修改品牌
    api_del: api_url + '/shopsBrand/del', //删除品牌


    api_user: api_url + '/user/userList3', //获取负责人列表
    api_token: api_url + '/qiniu/getUpToken' //获取七牛的token



}
window.app = new Vue({
    el: '#app',
    data: {
        index: 1,
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键
        colorPicType: '', //去捏颜色模所属状态
        userlist: [], //负责人列表
        newuserlist: [], //新建负责人列表

        //新增品牌表单信息
        bandname: '', //品牌名称
        userId: '', //负责人id
        labels: '11,22,33', //标签
        summary: '',
        description: '', //图文描述
        logoPath: '', //logo地址
        imagePath: '', //封面地址
        shopsBrandPicList: {}, //店铺图片列表

        tokenMessage: "",
        shopsBrandId: '',




    },
    created: function () {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        that.getData(); //获取列表
        that.getUserlist(); //获取所有负责人
        that.getToken() //获取七牛云的token

        this.editor = UE.getEditor('container', {
            initialFrameHeight: 350,
            // initialContent: "请填写详细描述",
        });

        that.editor.addListener("ready", function () {
            // editor准备好之后才可以使用
            that.editor.setContent(that.editorInfo);
        });
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

        //品牌基本信息的下拉框负责人列表
        getUserlist() {
            var that = this
            $.ajax({
                url: config.api_user,
                async: true,
                type: 'post',
                success: res => {
                    that.newuserlist = res.result;
                    // console.log(that.newuserlist)
                }
            })
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
        edit(id) {
            var index = layer.open({
                type: 2,
                title: '编辑品牌',
                content: 'edit.html?id=' + id,
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
                    id: id,
                    delFlag: '1'
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
        // 切换tab
        tab: function (index_chosen) {
            const that = this;
            that.index = index_chosen;
            if (that.shopsBrandId == "") {
                layer.msg('请先添加商品基本信息', {
                    time: 1000
                });
            }

        },

        //保存数据
        save() {
            //整理数据
            var shopsBrandPicList = [];
            const that = this;
            that.clearDate($("#info1"), shopsBrandPicList)
            that.clearDate($("#info2"), shopsBrandPicList)
            that.clearDate($("#info3"), shopsBrandPicList)
            that.clearDate($("#info4"), shopsBrandPicList)
            that.clearDate($("#info5"), shopsBrandPicList)
            that.clearDate($("#info6"), shopsBrandPicList)
            console.log(shopsBrandPicList)
            // console.log(container)

            //提交到服务器
            // const that = this;
            // $.ajax({
            //     url:api.api_save,
            //     async:true,
            //     type:'post',
            //     data:{
            //         brandName:that.brandname,
            //         userId:that.userId,
            //         labels:$('#tagsinputval').val(),        //因为tag内容Vue无法读取，所以使用JQ抓取
            //         summary:that.summary,
            //         description:'',
            //         logoPath:tyat.logoPath,
            //         imagePath:that.logoPath,
            //         shopsBrandPicList:[]


            //     }
            // })


        },

        //dy为测试Vue是否绑定的方法，提交代码时请删除或者注释
        dy() {
            var that = this
            console.log(that.labels)
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
                console.log(drool)
            }

        }
    }
})


//简介文字计数
var info = document.getElementById("info")
info.onkeyup = function () {
    document.getElementById('count4').innerHTML = info.value.length
}