var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_addLinkman: api_url+'/supplierLinkman/saveOrupdate', //新增供应商联系人
}
window.app = new Vue({
    el: '#app',
    data: {
        id: id, // 供应商id
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
                    supplierId: that.id,
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

    }
})
