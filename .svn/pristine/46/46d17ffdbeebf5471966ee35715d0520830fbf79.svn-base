let config = {
    //Url封装
    api_list: api_url + '/memRights/roomTicketList',
    api_add: api_url + '/memRights/bindRoomTickets'
}

let mrId = parameter().mrId
console.log(mrId)

window.app = new Vue({
    el: "#app",
    data: {
        list: [],
        keywords: "",
        type: ""
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
                    mrId: mrId,
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
        add(item) {
            const that = this;
            const dialog = layer.confirm("确认绑定该房券?", {
                title: "提示"
            }, () => {
                let parmars = {
                    mrId: mrId,
                    rtId: item.id
                }
                $.ajax({
                    url: config.api_add,
                    type: "POST",
                    async: true,
                    data: parmars,
                    success: res => {
                        if (res.error == "00") {
                            layer.msg("绑定房券成功！")
                            layer.close(dialog)
                        } else {
                            layer.msg(res.msg)
                            layer.close(dialog)

                        }
                    }
                })
            })
        }
    },
    mounted() {
        this.getdata(1)
    },
})