/*
var config = {
    role: localStorage.userRole,
    api_list: api_url+'/supplier/dataList', //获取供应商列表
    api_add: api_url+'/supplier/saveOrupdate', //新增供应商
    api_edit: api_url+'/supplier/editInfo ',// 编辑供应商
    api_view: api_url+'/supplier/saveOrupdate', //查看供应商
    api_del: api_url+'/supplier/saveOrupdate', //删除供应商
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: '', // 供应商Id
        list: [], // 列表
        keywords: '', // 搜索关键词
        name: '', // 供应商名称
        supplierCode: '', // 供应商编号
        province: '', // 省份
        city: '', // 城市
        address: '', // 地址
        bankName: '', // 开户行
        bankNumber: '', // 开户行账号
        taxIdentificationNumber: '', // 纳税人识别号
        fax: '', // 传真
        postcode: '', // 邮编
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
        /!**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         *!/
        loading: function(s) {
            if(s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },

        getData: function(page,keywords,type,startDate,endDate) {
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
                    type: that.selected,
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
        // 跳转新增供应商页面
        jumpToProvider(){
            var index = layer.open({
                type : 2,
                title : '新增供应商',
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
        view(id) {
            var index = layer.open({
                type : 2,
                title : '点击查看详情',
                content: 'detail.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 编辑标签
        edit(id,name,type) {
            var index = layer.open({
                type : 2,
                title : '编辑标签',
                content: 'edit.html?id='+id+'&name='+name+'&type='+type,
                area : [ '100%', '100%' ]
            });
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            var type = that.selected;
            var startDate = that.startDate;
            var endDate = that.endDate;
            that.getData(page,keywords,type,startDate,endDate);
        },
        // 删除供应商
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该供应商吗?", {
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
*/


// 新增供应商
function add() {
    var index = layer.open({
        type : 2,
        title : '新增供应商',
        content: 'add.html',
        // content : '${pageContext.request.contextPath}/customer/view.do?id='+id,
        area : [ '100%', '100%' ]
    });
}
// 查看供应商详情
function view() {
    var index = layer.open({
        type : 2,
        title : '点击查看详情',
        content: 'detail.html',
        // content : '${pageContext.request.contextPath}/customer/view.do?id='+id,
        area : [ '100%', '100%' ]
    });
}
// 删除用户
function del(id){
    layer.confirm(
            "确定要删除改用户?",
            function(result) {
                if (result) {
                    // var url = "${pageContext.request.contextPath}/linkman/delete.do?ids="
                    //     + id + "&tm=" + new Date().getTime();
                    // $.get(url, function(data) {
                    //     nextPage('${page.currentPage}');
                    // });
                };
     });
}
// 跳转新增用户
function jumpToAdd() {
    var index = layer.open({
        type : 2,
        title : '新增用户',
        content: 'add.html',
        area : [ '80%', '80%' ]
    });
}
//编辑用户
function editUser() {
    var index = layer
        .open({
            type : 2,
            title : '编辑联系人',
            // content : '${pageContext.request.contextPath}/linkman/goEdit.do?id='+ id,
            content: 'edit.html',
            area : [ '80%', '80%' ]
        });
}

