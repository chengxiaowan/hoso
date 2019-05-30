var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_getLinkmanDetail: api_url+'/supplierLinkman/editInfo', //编辑供应商联系人
    api_editLinkman: api_url+'/supplierLinkman/saveOrupdate', //编辑供应商联系人
}
window.app = new Vue({
    el: '#app',
    data: {
        id: id, // 供应商id
        linkmanList: [], // 联系人列表
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
        that.getLinkmanDetail(); // 获取联系人详情
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
        // 获取联系人详情
        getLinkmanDetail(){
            const that = this;
            $.ajax({
                url: config.api_getLinkmanDetail,
                async: true,
                type: 'post',
                data: {
                    id: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.linkmanList = res.result;
                        that.linkmanName = that.linkmanList.name;
                        that.linkmanPhone = that.linkmanList.phone;
                        that.linkmanTel = that.linkmanList.tel;
                        that.linkmanEmail = that.linkmanList.mail;
                        that.linkmanFax = that.linkmanList.fax;
                        that.linkmanJob = that.linkmanList.job;
                        that.linkmanRemark = that.linkmanList.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存编辑的联系人信息 校验联系人姓名
        save(){
            const that = this;
            var name = that.linkmanName;
            if(name == ""){
                layer.msg("请填写联系人姓名");
                return;
            }else{
                that.editLinkman();
            }
        },
        // 编辑联系人信息
        editLinkman(){
            const that = this;
            $.ajax({
                url: config.api_editLinkman,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                    name: that.linkmanName,
                    phone: that.linkmanPhone,
                    tel: that.linkmanTel,
                    mail: that.linkmanEmail,
                    fax: that.linkmanFax,
                    job: that.linkmanJob,
                    remark: that.linkmanRemark
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('修改成功！');
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
    }
})
