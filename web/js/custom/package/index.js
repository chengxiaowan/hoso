//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + '/memPackage/list',
    api_del: api_url + '/shops/deleteTable'
}

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是会员包管理",
        keywords: "",
        type: "",
        list: [],
    },
    methods: {
        goAdd() {
            const that = this
            let index = layer.open({
                type: 2,
                title: "新增会员包",
                content: "newadd.html",
                // content: "add.html",
                area: ["100%", "100%"],
                end: () => {
                    that.getdata(1)
                }
            })
        },
        //获取数据
        getdata(page) {
            // console.log("drool")
            const that = this
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            $.ajax({
                url: config.api_list,
                async: true,
                type: "POST",
                data: {
                    keywords: this.keywords,
                    type: this.type,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                        //分页
                        if (this.pagi) {
                            $('.pagi').pagination('updatePages', this.list.pages)
                            if (page == 1) $('.pagi').pagination('goToPage', this.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function (num) {
                                    that.list.pageNum = num
                                    that.getdata()
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
        edit(item) {
            console.log(item)
            const that = this
            let index = layer.open({
                type: 2,
                title: "编辑会员包",
                content: `newedit.html?id=${item.id}`,
                area: ["100%", "100%"],
                end: () => {
                    that.getdata(1)
                }
            })
        },

        adds(item) {
            // console.log(item)
            let index = layer.open({
                type: 2,
                title: "绑定权益",
                content: `addc.html?id=${item.id}`,
                area: ["100%", "100%"]
            })
        },

        //添加商家商品
        add1(item) {
            // console.log(item)
            let index = layer.open({
                type: 2,
                title: "绑定商家商品",
                content: `addShop.html?id=${item.id}`,
                area: ["100%", "100%"]
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
        del(item) {
            this.$confirm('您确定删除该会员包？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "get",
                    async: true,
                    data: {
                        id: item.id,
                        tableName: "member_package"
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getdata(1)
                        }
                    }
                })
            }).catch(() => { });
        },

        give(item) {
            const that = this
            let index = layer.open({
                type: 2,
                title: "赠送",
                content: `give.html?id=${item.id}`,
                area: ["100%", "100%"]
            })
        },
        link(item) {
            const that = this
            this.$alert(`https://homeplus.fun/static/membershipPack/testPagesOne/F-index.html?type=1&relateId=0&memPackageId=${item.id}`, '分享链接', {
                confirmButtonText: '确定',
                callback: action => {
                    var text = `https://homeplus.fun/static/membershipPack/testPagesOne/F-index.html?type=1&relateId=0&memPackageId=${item.id}`;
                    var textarea = `<textarea class='text'>${text}</textarea>`
                    $("body").append(textarea)
                    $(".text").select()
                    try {
                        var successful = document.execCommand('copy');
                        var msg = successful ? '复制成功' : '该浏览器不支持点击复制到剪贴板';
                        that.$message({
                            message: msg,
                            type: 'success'
                          });
                    } catch (err) {
                        that.$alert('该浏览器不支持点击复制到剪贴板');
                    }
                    $(".text").remove();
                }
            });
        }
    },
    mounted() {
        console.log("Vue is Ok")
        this.getdata(1)
    },
})