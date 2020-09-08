//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/wechat/getVersionList",
    api_del: api_url + '/wechat/undoCodeAudit',     //撤回
    api_save: api_url + '/memRights/update',        //上下架

    api_info: api_url + '/wechat/getAuthCodeParam'               //获取绑定参数

}

//这里获取指定APPid


window.app = new Vue({
    el: "#app",
    data: {
        keywords: "",
        list: [],
    },
    methods: {

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

        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },

       

        //查看原因
        Reason(item) {
            sessionStorage.setItem("info",JSON.stringify(item))
            const that = this
            let index = layer.open({
                type: 2,
                title: "审核不通过",
                content: "../wxapps/wxtodoinfo.html",
                area: ["640px", "433px"],
                end: () => {
                    // that.getdata()
                }

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

        undoCodeAudit(item) {
            const that = this

            this.$confirm(`是否撤回${item.name}的审核？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "GET",
                    data: {
                        id: item.id,
                        appId: item.appId
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.$message("撤回成功")
                        } else {
                            this.$message.error(res.msg)
                        }
                    }
                })
            }).catch(() => { });
        }


    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
    },
})