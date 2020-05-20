//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/memPackage/getPastCqCard",
    api_del: api_url + '/memPackage/deleteCqNum',
    api_update: api_url + "/memPackage/updateCqNum",
    api_donwload: api_url + '/memPackage/exportExcel',
}

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",  //产品名称
        supplierName: "",   //供应商名称
        type: "0",       //是否过期
        goodslist: [],
        list: [],
        dialogVisible: false,    //弹出层1
        goods: {},       //临时编辑储存区

        all: false,
    },
    methods: {
        getdata(page) {
            // console.log("drool")
            const that = this
            // $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            $.ajax({
                url: config.api_list,
                async: true,
                type: "POST",
                data: {
                    name: this.keywords,
                    supplierName: this.supplierName,
                    type: this.type,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                    createTimeStart: this.type == 1?"":$("#start").val(),
                    createTimeEnd: $("#end").val()

                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                        console.log(res)
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
                                    that.goodslist = []
                                    that.all=false

                                    that.getdata()
                                    // yo.scrollTo('body')
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
            const that = this
            this.goods = item;
            sessionStorage.setItem("goodsId", item.id)
            var dialog = layer.open({
                title: '编辑',
                type: "1",
                area: ["415px", "260px"],
                content: $("#drool"),
                end: () => {
                    that.getdata()
                    that.all=false
                    that.goodslist = []
                }
            });
            console.log(dialog)
        },

        edits() {
            const that = this;
            let arr = [];
            if (that.goodslist.length == 0) {
                layer.msg("请先选择需要操作的条目")
                return
            }
            this.goodslist.forEach(i => {
                arr.push(i.id)
            });

            sessionStorage.setItem("ids", arr.join(","))

            var dialog = layer.open({
                title: '批量编辑',
                type: "1",
                area: ["415px", "260px"],
                content: $("#drool2"),
                end: () => {
                    that.getdata()
                    that.all=false
                    that.goodslist = []
                }
            });
            console.log(dialog)


        },
        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },

        bobo() {
            const that = this
            if (that.all) {
                that.list.list.forEach(i => {
                    that.goodslist.push(i)
                });
            } else {
                for (let i = 0; i <= that.goodslist.length; i++) {
                    for (let j = 0; j <= that.list.list.length; j++) {
                        if (that.goodslist[i] == that.list.list[j]) {
                            that.goodslist.splice(i, 1);
                        }
                    }
                }
            }
        },


        //删除指定项
        del(item) {
            this.$confirm('您确定删除该优惠券？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "post",
                    async: true,
                    data: {
                        ids: item.id,
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.all=false
                            thia.goodslist = []
                            
                            this.getdata(1)
                        }
                    }
                })
            }).catch(() => { });
        },

        dels() {
            const that = this;
            let arr = [];
            if (that.goodslist.length == 0) {
                layer.msg("请先选择需要操作的条目")
                return
            }
            this.goodslist.forEach(i => {
                arr.push(i.id)
            });

            this.$confirm('您确定删除选中项目？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "post",
                    async: true,
                    data: {
                        ids: arr.join(","),
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.goodslist = []
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            that.all=false
                            this.goodslist=[]
                            this.getdata(1)
                        } else {
                            layer.msg(res.msg)
                        }
                    }
                })
            }).catch(() => { });
        },

        dowload() {
            const that = this;
            window.open(`${config.api_donwload}?name=${that.keywords}&supplierName=${that.supplierName}&type=${this.type}&createTimeStart=${$("#start").val()}&createTimeEnd=${$("#end").val()}`)
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


    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
    },

    watch:{
        goodslist(val){
            console.log(val)
        }
    }
})