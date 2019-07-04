var shopsBrandId = parameter().id;
console.log(shopsBrandId)
var config = {
    role: localStorage.userRole,
    api_list: api_url+'/shopsBrand/showShopsBrandService', //获取旅拍列表
    api_join: api_url+'/shopsBrand/addShopsBrandService', // 加入服务
    api_detail: api_url+'/service/getPhotoServiceById', //获取旅拍详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键词
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getData();
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function(s) {
            if(s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },
        getData: function(page,keywords) {
            $('body,html').scrollTop(0);
            if(page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        for (var i in that.list.list) {
                            that.list.list[i].createTime = formatDate(that.list.list[i].createTime).substring(0,10)
                        }
                        //分页
                        if(that.pagi) {
                            $('.pagi').pagination('updatePages', that.list.pages)
                            if(page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function(num) {
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
        // 查看
        view(id, type) {
            var index = layer.open({
                type : 2,
                title : '查看详情',
                content: 'edit.html?id='+id+'&type='+type,
                area : [ '100%', '100%' ]
            });
        },
        // 加入
        join(id) {
           var that = this;
            const dialog = layer.confirm("确认加入服务吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_join, {
                    shopsBrandId: shopsBrandId,
                    serviceId: id,
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
                        layer.msg("加入成功")
                        that.getData()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page,keywords);
        },
    }
})



