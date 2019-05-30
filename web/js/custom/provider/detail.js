var id = parameter().id;
alert(id)
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/supplier/info',// 获取供应商详情
    api_linkman_list: api_url+'/supplierLinkman/dataList', //获取供应商联系人列表
    api_addLinkman: api_url+'/supplierLinkman/saveOrupdate', //新增供应商联系人
    api_delLinkman: api_url+'/supplierLinkman/saveOrupdate', //删除供应商联系人
    api_getLinkman: api_url+'/supplierLinkman/info', //获取供应商联系人详情
    api_getContract: api_url+'/supplierContract/dataList', //获取合同
    api_getContractDetail: api_url+'/supplierContract/info', //获取合同人详情
    api_province: api_url+'/region/provinceList', // 获取省份
    api_city: api_url+'/region/cityList', //获取城市
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 供应商列表
        linkmanList: [], // 联系人列表
        contractList: [], // 合同列表
        id: id, // 供应商id
        name: '', // 供应商名称
        province: '', // 省份
        city: '', //城市
        supplierCode: '', // 供应商编号
        address: '', // 地址
        bankName: '', // 开户行
        bankNumber: '', // 开户账号
        taxIdentificationNumber: '', // 纳税人识别号
        fax: '', // 传真
        postcode: '', // 邮编
        remark: '', // 备注
        linkmanName: '', // 联系人姓名
        linkmanPhone: '', // 联系人手机
        linkmanTel: '', // 联系人电话
        linkmanEmail: '', // 联系人邮箱
        linkmanFax: '', // 联系人传真
        linkmanJob: '', // 职务
        linkmanRemark: '', // 备注
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getDetail(); // 获取供应商详情
        that.getLinkmanList(); // 获取联系人列表数据
        that.getContractList(); //获取合同列表数据
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
        // 获取供应商详情
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    id: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.supplierCode = that.list.supplierCode;
                        that.province = that.list.province;
                        that.city = that.list.city;
                        that.address = that.list.address;
                        that.bankName = that.list.bankName;
                        that.bankNumber = that.list.bankNumber;
                        that.taxIdentificationNumber = that.list.taxIdentificationNumber;
                        that.fax = that.list.fax;
                        that.postcode = that.list.postcode;
                        that.remark = that.list.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取联系人列表数据
        getLinkmanList: function(page) {
            $('body,html').scrollTop(0)
            if(page) this.linkmanList.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_linkman_list,
                async: true,
                type: 'post',
                data: {
                    supplierId: that.id,
                    pageSize: that.linkmanList.pageSize || 10,
                    pageNo: that.linkmanList.pageNum || 1,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.linkmanList = res.result;
                        //分页
                        if(that.pagi) {
                            $('.pagi').pagination('updatePages', that.linkmanList.pages)
                            if(page == 1) $('.pagi').pagination('goToPage', that.linkmanList.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.linkmanList.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.linkmanList.pageNum,
                                onSelect: function(num) {
                                    that.linkmanList.pageNum = num
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
        // 获取合同列表数据
        getContractList: function(page) {
            $('body,html').scrollTop(0)
            if(page) this.contractList.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_getContract,
                async: true,
                type: 'post',
                data: {
                    supplierId: that.id,
                    pageSize: that.contractList.pageSize || 10,
                    pageNo: that.contractList.pageNum || 1,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.contractList = res.result;
                        //分页
                        if(that.pagi) {
                            $('.pagi').pagination('updatePages', that.contractList.pages)
                            if(page == 1) $('.pagi').pagination('goToPage', that.contractList.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.contractList.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.contractList.pageNum,
                                onSelect: function(num) {
                                    that.contractList.pageNum = num
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
        jumpToLinkman(id){
            var index = layer.open({
                type : 2,
                title : '新增联系人',
                content: 'addLinkman.html?id'+id,
                area : [ '100%', '100%' ]
            });
        },
        // 跳转合同页面
        viewContract(id){
            var index = layer.open({
                type : 2,
                title : '合同详情',
                content: 'contractDetail.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 保存新增的联系人信息 校验联系人姓名
        save(){
            const that = this;
            var name = that.linkmanName;
            if(name == ""){
                layer.msg("请填写联系人姓名");
                return;
            }else{
                that.addLinkman();
            }
        },
        // 新增联系人
        addLinkman(){
            const that = this;
            $.ajax({
                url: config.api_addLinkman,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                    name: that.linkmanName,
                    phone: that.linkmanPhone,
                    tel: that.linkmanTel,
                    mail: that.linkmanEmail,
                    job: that.linkmanJob,
                    remark: that.linkmanRemark
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('联系人添加成功！');
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
        // 查看联系人详情
        viewLinkman(id){
            var index = layer.open({
                type : 2,
                title : '点击查看详情',
                content: 'linkmanDetail.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 编辑联系人
        editLinkman(id){
            var index = layer.open({
                type : 2,
                title : '编辑标签',
                content: 'editLinkman.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 删除联系人
        delLinkman(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该联系人吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_delLinkman, {
                    id: id,
                    delFlag:'1'
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
                        setTimeout(function () {
                            window.location.reload();
                        }, 1000);
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
