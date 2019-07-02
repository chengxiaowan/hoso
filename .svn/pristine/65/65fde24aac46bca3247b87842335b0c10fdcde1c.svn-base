var config = {
    role: localStorage.userRole,
    api_list: api_url+'/service/getPhotoStudioListPage', //获取旅拍工作室列表
    api_detail: api_url+'/service/getPhotoStudioById', //获取旅拍工作室详情
    api_edit: api_url+'/service/updatePhotoStudio', //编辑旅拍工作室
    api_del: api_url+'/service/deletePhotoStudioById', //删除旅拍工作室
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
        // 跳转新增工作室页面
        jumpToStudio(){
            var index = layer.open({
                type : 2,
                title : '新增',
                content: 'add.html',
                area : [ '100%', '100%' ]
            });
        },
        // 保存新增供应商列表
        save(){
            const that = this;
            if(that.name == ""){
                layer.msg("请填写供应商名称");
                return;
            }else{
                that.addProvider();
            }
        },
        // 编辑旅拍工作室
        viewStudio(id) {
            var index = layer.open({
                type : 2,
                title : '查看详情',
                content: 'edit.html?id='+id,
                area : [ '80%', '80%' ]
            });
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page,keywords);
        },
        // 删除旅拍工作室
        delStudio(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该旅拍工作室吗?", {
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



