//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/memRights/list",
    api_del: api_url + '/shops/deleteTable'
}

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        type: "",
        isOnsell: "",
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
                    type: this.type,
                    isOnsell: this.isOnsell,
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
        add() {
            const that = this
            let index = layer.open({
                type: 2,
                title: "新增权益",
                content: "add.html",
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
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
            let index = layer.open({
                type: 2,
                title: "编辑权益",
                content: `edit.html?id=${item.id}`,
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                }
            })
        },

        //删除指定项
        del(item) {
            this.$confirm('您确定删除该权益？', '提示', {
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
                        tableName: "member_rights"
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
            }).catch(() => {});
        }
    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
    },
})