var config = {
    role: localStorage.userRole,
    type:parameter().type,
    api_list: api_url+'/type/dataList', //获取分类列表
    api_add: api_url+'/type/add', //新增标签
    api_edit: api_url+'/type/edit', //修改标签
    api_del: api_url+'/type/del', //删除标签
    api_typeList: api_url+'/type/typeList', //获取类别
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        typeList: [], // 查询分类
        keywords: '', // 关键词
        selected: '', // 父类别Id
        status: '', //上下架状态 0:已下架 1.部分上架 2:已上架
    },
    created: function() {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        $('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
        that.getData();
        that.getTypeList();
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

        getData: function(page,keywords,type) {
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
                    type: 3,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                    level:config.type,
                    parentId:that.selected
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        console.log(that.list.list.length)
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
        // 获取类别
        getTypeList(){
            const that = this;
            $.ajax({
                url: config.api_typeList,
                async: true,
                type: 'post',
                data: {
                    level: 1
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.typeList = res.result;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 跳转商品分类新增页面
        jumpToCategory(){
            var index = layer.open({
                type : 2,
                title : '新增商品分类',
                content: 'add.html?type='+ config.type,
                area : [ '80%', '80%' ]
            });
        },
        // 编辑商品分类
        edit(id) {
            var index = layer.open({
                type : 2,
                title : '编辑商品分类',
                content: 'edit.html?id='+id+'&type='+config.type,
                area : [ '80%', '80%' ]
            });
        },
        //查看商品详情
         view(id) {
            var index = layer.open({
                type : 2,
                title : '查看商品详情',
                content: 'detail.html?id='+id,
                area : [ '80%', '80%' ]
            });
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            var type = that.selected;
            that.getData(page,keywords);
        },
        // 删除标签
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该分类?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    typeId: id,
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
