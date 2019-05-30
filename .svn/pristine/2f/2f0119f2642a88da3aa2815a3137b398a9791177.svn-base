var config = {
    role: localStorage.userRole,
    api_supplierList: api_url+'/supplier/supplierList', //获取供应商列表
    api_addLinkman: api_url+'/supplierLinkman/saveOrupdate', //新增供应商联系人
}
window.app = new Vue({
    el: '#app',
    data: {
        list: [], // 联系人列表
        supplierList: [], // 供应商列表
        supplierId: '', // 供应商id
        name: '', // 联系人姓名
        phone: '', // 联系人手机
        tel: '', // 联系人电话
        email: '', // 联系人邮箱
        fax: '', // 联系人传真
        job: '', // 职务
        remark: '', // 备注
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getSupplierList();
        $('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
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
        // 获取供应商
        getSupplierList(){
            const that = this;
            $.ajax({
                url: config.api_supplierList,
                async: true,
                type: 'post',
                data: {
                    keywords: ''
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var arr = [];
                        for(var i in res.result){
                            var obj = {};
                            obj.id = res.result[i].id;
                            obj.text = res.result[i].name;
                            arr.push(obj);
                        }
                        that.supplierList = arr;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存新增的联系人信息 校验联系人姓名
        save(){
            const that = this;
            var name = that.name, supplierId = that.supplierId;
            if(name == ""){
                layer.msg("请填写联系人姓名");
                return;
            }else if(supplierId == ""){
                layer.msg("请选择供应商");
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
                    supplierId: that.supplierId,
                    name: that.name,
                    phone: that.phone,
                    tel: that.tel,
                    mail: that.email,
                    fax: that.fax,
                    job: that.job,
                    remark: that.remark
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
