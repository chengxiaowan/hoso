var config = {
    role: localStorage.userRole,
    id:parameter().id,
    api_add: api_url+'/supplierLinkman/saveOrupdate', //新增标签
    api_detail:api_url+'/supplierLinkman/editInfo',
    api_supplierList: api_url+'/supplier/supplierList', //获取供应商列表
}

window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id:config.id,
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
        // var that = this;
        // document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this
        // that.getData();
        that.getDetail()
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
        confirm(){
            // console.log(1);
            const that = this;
            var name = that.name;
            var selected = that.selected;
            if(name == ""){
                layer.msg("请填写标签名称");
                return;
            }else if(selected == 0){
                layer.msg("请选择标签类型");
                return;
            }else{
                that.add();
            }
        },// 获取供应商
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
        getDetail(){
        	let that = this
        	$.ajax({
        		type:"post",
        		url:config.api_detail,
        		async:true,
        		data:{
        			id:config.id
        		},
        		success:function(res){
        			if(res.error==0){
        				that.supplierId = res.result.supplierId
        				that.name = res.result.name
        				that.phone = res.result.phone
        				that.tel = res.result.tel
        				that.email = res.result.mail
        				that.fax = res.result.fax
        				that.job = res.result.job
        				that.remark = res.result.remark
        			}else{
        				layer.msg(res.msg)
        			}
        		}
        	});
        },
        save(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
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
        cancle(){
            var index=parent.layer.getFrameIndex(window.name);
            parent.layer.close(index);
        }

    }
})


