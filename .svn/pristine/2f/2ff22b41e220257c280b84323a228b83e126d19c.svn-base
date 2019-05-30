var config = {
    role: localStorage.userRole,
    api_list: api_url+'/unit/dataList', //获取单位列表
    api_add: api_url+'/unit/saveOrupdate', //新增单位
    api_edit: api_url+'/unit/editInfo ',// 编辑单位
    api_view: api_url+'/unit/saveOrupdate', //查看单位
    api_del: api_url+'/unit/saveOrupdate', //删除单位
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键词
        name: '', // 供应商名称
        supplierCode: '', // 供应商编号

        postData: {},
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
        // 跳转新增单位页面
        jumpToUnit(){
            var index = layer.open({
                type : 2,
                title : '新增供应商',
                content: 'add.html',
                area : [ '50%', '50%' ]
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
        // 新增供应商
        addProvider(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    name: that.name,
                    province: that.province,
                    city: that.city,
                    province: that.province,
                    address: that.address,
                    bankAccountName: that.bankAccountName,
                    bankName: that.bankName,
                    bankNumber: that.bankNumber,
                    taxIdentificationNumber: that.taxIdentificationNumber,
                    fax: that.fax,
                    postcode: that.postcode,
                    remark: that.remark,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('供应商添加成功！');
                        setTimeout(function () {
                            window.parent.location.reload();
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 查看供应商详情
        view(id) {
            var index = layer.open({
                type : 2,
                title : '点击查看详情',
                content: 'detail.html?id='+id,
                area : [ '50%', '50%' ]
            });
        },
        // 编辑单位
        edit(id) {
            var index = layer.open({
                type : 2,
                title : '编辑单位',
                content: 'edit.html?id='+id,
                area : [ '50%', '50%' ]
            });
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page,keywords);
        },
        // 删除单位
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该单位吗?", {
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

