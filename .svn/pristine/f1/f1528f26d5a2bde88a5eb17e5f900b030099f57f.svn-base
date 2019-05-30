var config = {
    role: localStorage.userRole,
    api_list: api_url+'/brand/dataList', //获取品牌列表
    api_edit: api_url+'/brand/saveOrupdate', //修改品牌
    api_del: api_url+'/brand/saveOrupdate', //删除品牌
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 名称
        name: '', // 品牌名称
        postData: {},
    },
    created: function() {
        var that = this;
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
            $('body,html').scrollTop(0)
            if(page) this.list.pageNum = page
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
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
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
        // 新增品牌
        jumpToBrand(){
            var index = layer
                .open({
                    type : 2,
                    title : '新增品牌',
                    content: 'add.html',
                    area : ['80%', '80%']
            });
        },
        // 查看品牌详情
        view(id){
            var index = layer.open({
                type : 2,
                title : '查看品牌详情',
                content: 'detail.html?id='+id,
                area : [ '80%', '80%' ]
            });
        },
        // 编辑品牌
        edit(id) {
            var index = layer.open({
                type : 2,
                title : '编辑品牌',
                content: 'edit.html?id='+id,
                area : [ '80%', '80%' ]
            });
        },
        // 搜索
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page,keywords);
        },
        // 删除品牌
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该品牌?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    id: id,
                    delFlag:'1'
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getData()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
    }
})

