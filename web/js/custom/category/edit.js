var id = parameter().id;
var config = {
    role: localStorage.userRole,
    type:parameter().type,
    api_edit: api_url+'/type/edit', //编辑商品类目
    api_detail: api_url+'/type/editInfo', // 获取商品类目详情
    api_getToken:api_url+'/qiniu/getUpToken',//获取七牛云token
}

window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        type: config.type,
        id:id,
        list: [], // 商品类目列表
        typeList: [], // 查询分类
        selected: '153145249753430', // 查询分类id
        name: '', // 商品类目名称
        typeCode: '', // 商品类目编号
        sortNo: '', // 顺序号
        picPath: '', // 图片
        
    },
    created: function() {
        var that = this;
        document.getElementById("app").classList.remove("hide");
        // that.getDetail();
    },
    mounted: function() {
        const that = this;
        $('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
        that.getDetail();
        that.getTokenMessage()

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
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    typeId: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.typeCode = that.list.typeCode;
                        that.selected = that.list.parentId;
                        that.sortNo = that.list.sortNo;
                        that.typeList = that.list.parentList;
                        that.picPath = that.list.picPath;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        save(){
            const that = this;
            var name = that.name;
            var typeCode = that.typeCode;
            var sortNo = that.sortNo;
            var reg = /^(0[1-9]|[1-9][0-9])$/;
            /*/[0-9]{1}[1-9]{1}|[1-9]{1}[0]{1}/g*/
            var regNo = /^[1-9]\d*$/;
            if(name == ""){
                layer.msg("请填写商品类目名称");
                return;
            }else if(typeCode == ""){
                layer.msg("请填写商品类目编号");
                return;
            }else if(!reg.test(typeCode)){
                layer.msg("请填写正确的类目编号");
                return;
            }else if(sortNo == ""){
                layer.msg("请填写顺序号");
                return;
            }else if(!regNo.test(sortNo)){
                layer.msg("请填写正确的顺序号");
                return;
            }else{
                that.edit();
            }
        },
        edit(){
            const that = this;
            if(that.type==2&&that.selected==0){
            	 layer.msg("请选择父类");
                return;
            }
            that.picPath='';
            that.picPath = $("#demo1").attr('src')
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    typeId: that.id,
                    name: that.name,
                    parentId: that.selected,
                    sortNo: that.sortNo,
                    level:config.type,
                    picPath: that.picPath
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
        },
        getTokenMessage() {
			$.ajax({
				url: config.api_getToken,
				type: 'POST',
				data: {},
				cache: false,
				contentType: false, //不可缺
				processData: false, //不可缺
				success: function(data) {
					var obj = data;
					uploaderReady(obj);
					
				}
			});
		}

    }
})


