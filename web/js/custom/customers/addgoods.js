//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/memRights/getGoodsByFacilitatorName",
    api_del: api_url + '/memRights/delete',
    // api_save: api_url + '/memRights/update',        //上下架
    api_del:api_url + '/memPackage/deleteCq'        //SHENCHU1

}

var id = parameter().id;
console.log(id)

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        type: "",
        // isOnsell: "",
        list: [],
        solt:""
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
                    name:"",
                    solt:this.solt,
                    customerId:id,
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
                title: "添加权益",
                content: "../thirdParty/adds.html",
                area: ["80%", "80%"],
                end: () => {
                    that.getdata()
                    console.log("关了")
                }

            })
        },

        bind(item){
            const that = this
            sessionStorage.setItem("drool",JSON.stringify(item))
            window.location.href = "goodsinfo.html?id="+id
        },

        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },
       


    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
    },
})
