//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/memPackage/listModel",
    api_del: api_url + '/shops/deleteTable',
    // api_save: api_url + '/memRights/update',        //上下架

}

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        type: "",
        // isOnsell: "",
        list: []
    },
    methods: {
        goRoom(item) {
            let index = layer.open({
                type: 2,
                title: "绑定房券",
                content: "add-rom.html?mrId=" + item.id,
                area: ["100%", "100%"]
            })
            console.log(item)
        },
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
                    isOnsell: this.isOnsell,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,

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
        add() {
            const that = this
            let index = layer.open({
                type: 2,
                title: "新增模板",
                content: "newadd.html",
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                    console.log("关了")
                }

            })
        },
        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },
        edit(item) {
            const that = this
            // console.log(item)
            // sessionStorage.setItem('item',JSON.stringify(item))
            // console.log(sessionStorage.getItem('item'))
            let index = layer.open({
                type: 2,
                title: "编辑模板",
                content: `../com/newedit.html?id=${item.id}`,
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                }
            })
        },

        //删除指定项
        del(item) {
            console.log(item)
            this.$confirm('您确定删除该优惠券？', '提示', {
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
                        tableName: "model"
                        // type: item.type,
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
})