var config = {
    role: localStorage.userRole,
    api_list: api_url+'/supplierLinkman/dataList', //获取联系人列表
    api_add: api_url+'/supplierLinkman/saveOrupdate', //新增联系人
    api_edit: api_url+'/supplierLinkman/saveOrupdate', //编辑联系人
    api_del: api_url+'/supplierLinkman/saveOrupdate', //删除联系人
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        supplierId: '', // 供应商id
        keywords: '', // 搜索关键词
        name: '', // 供应商名称
        phone: '', // 手机号，多个"/"分隔
        tel: '', // 电话，多个"/"分隔
        mail: '', // 邮箱，多个"/"分隔
        job: '', // 职务
        remark: '', // 备注
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
                    supplierId: that.supplierId,
                    createTimeStart: that.startDate,
                    createTimeEnd: that.endDate,
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
        // 跳转新增联系人页面
        jumpToLinkman(){
            var index = layer.open({
                type : 2,
                title : '新增联系人',
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
        viewLinkman(id) {
            var index = layer.open({
                type : 2,
                title : '点击查看详情',
                content: 'detail.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 编辑联系人
        editLinkman(id) {
            var index = layer.open({
                type : 2,
                title : '编辑联系人',
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
        // 删除联系人
        delLinkman(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该联系人吗?", {
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



