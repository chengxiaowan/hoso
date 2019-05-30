var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/supplier/editInfo',// 获取供应商详情
    api_province: api_url+'/region/provinceList', // 获取省份
    api_city: api_url+'/region/cityList', //获取城市
    api_edit: api_url+'/supplier/saveOrupdate',// 修改供应商
}
Vue.directive('province', {
    inserted: function (el, binding, vnode) {
        let options = binding.value || {};
        $(el).select2(options).on("select2:select", (e) => {
            // v-model looks for
            //  - an event named "change"
            //  - a value with property path "$event.target.value"
            el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
        });
    },
    update: function (el, binding, vnode) {
        for (var i = 0; i < vnode.data.directives.length; i++) {
            if (vnode.data.directives[i].name == "model") {
                $(el).val(vnode.data.directives[i].value);
            }
        }
        $(el).trigger("change");
    }
});
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        id: id, // 供应商Id
        name: '', // 供应商名称
        provinceList: [], // 省份列表
        provinceId:"", //城市Id
        provinceName: '', //省份名称
        cityList: [], // 城市列表
        cityId:"", //城市Id
        cityName: '', //城市名称
        supplierCode: '', // 供应商编号
        supplierCode: '', // 供应商编号
        address: '', // 地址
        bankName: '', // 开户行
        bankNumber: '', // 开户账号
        taxIdentificationNumber: '', // 纳税人识别号
        fax: '', // 传真
        postcode: '', // 邮编
        remark: '', // 备注
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    watch: {
		provinceId(val, oldVal) {
			let that = this
			that.cityList = ''
			that.cityId = ''
			if(val != '') {
				$.ajax({
					url: config.api_city,
					async: true,
					type: 'post',
					data: {
						parentId: val,
					},
					success: function(res) {
						that.loading('close')
						if(res.error == "00") {
							var arr = [];
							var res_result = res.result;
							for(var i in res_result) {
								var obj = {};
								obj.id = res_result[i].cityId;
								obj.text = res_result[i].cityName;
								arr.push(obj);
							}
							that.cityList = arr;
						} else {
							layer.msg(res.msg)
						}
					}
				});
			}
		}
	},
    mounted: function() {
        const that = this;
        that.getDetail();
        that.getProvince();//获取省份
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
        // 获取修改供应商详情
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: false,
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
                        that.provinceName = that.list.province;
                        that.cityName = that.list.city;
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
        // 获取省份
        getProvince(){
            const that = this;
            $.ajax({
                url: config.api_province,
                async: true,
                type: 'post',
                data: {
                    keywords: '',
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var arr = [];
                        var res_result = res.result;
                        for(var i in res_result){
                            var obj = {};
                            obj.id = res_result[i].provinceId;
                            obj.text = res_result[i].provinceName;
                            arr.push(obj);
                        }
                        var provinceId = '';
                        for(var j in arr){
                            if(arr[j].text == that.provinceName){
                                provinceId = arr[j].id;
                            }else{
                                that.provinceId = '';
                            }
                        }
                        that.provinceId = provinceId;
                        if( that.provinceId != ''){
                            that.getCity();
                        }
                        that.provinceList = arr;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取城市
        getCity(){
            const that = this;
            $.ajax({
                url: config.api_city,
                async: true,
                type: 'post',
                data: {
                    parentId: that.provinceId,
                    keywords: ''
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.cityList = res.result;
                        var cityId = '';
                        for(var i in that.cityList){
                            if(that.cityList[i].cityName == that.cityName){
                                cityId = that.cityList[i].cityId;
                            }
                        }
                        that.cityId = cityId;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 选择省份 获取城市
        selectProvince: function (ele){
            const that = this;
            if(that.provinceId != '') {
                $.ajax({
                    url: config.api_city,
                    async: true,
                    type: 'post',
                    data: {
                        parentId: that.provinceId,
                        keywords: ''
                    },
                    success: function(res) {
                        that.loading('close')
                        if(res.error == "00") {
                            that.cityList = res.result;
                            /* var arr = [], obj = {};
                             for(var i in res.result){
                                 obj.id = res.result[i].id;
                                 obj.text = res.result[i].name;
                                 arr.push(obj);
                             }
                             */
                        } else {
                            layer.msg(res.msg)
                        }
                    }
                });
                that.provinceName = $(ele.target).find("option:selected").text(); // 获取省份名称
                that.cityName ='';
            } else {
                that.cityList = [];
                that.provinceId = '';
                that.provinceName = '';
            }
        },
        selectCity: function(ele){
            const that = this;
            if(that.cityId != ''){
                that.cityName = $(ele.target).find("option:selected").text();// 获取城市名称
            }else{
                that.cityName = '';
            }

        },
        selectProvince(Pid) {
			let obj = {},
				that = this;
			obj = this.provinceList.find((item) => {
				return item.id === Pid
			})
			if(obj == undefined) {
				that.provinceName = ''
				that.cityName = ''
			} else {
				that.provinceName = obj.text
			}
		},
		selectCity(Cid) {
			let obj = {},
				that = this;
			obj = this.cityList.find((item) => {
				return item.id === Cid
			})
			if(obj == undefined) {
				that.cityName = ''
			} else {
				that.cityName = obj.text
			}

		},
        // 保存供应商操作 交验供应商是否为空
        save(){
            const that = this;
            var name = that.name;
            if(name == ""){
                layer.msg("请填写供应商名称");
                return;
            }else{
                that.edit();
            }
        },
        edit(){
            const that = this;
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                    name: that.name,
                    province: that.provinceName,
                    city: that.cityName,
                    address:that.address,
                    bankName:that.bankName,
                    bankNumber:that.bankNumber,
                    taxIdentificationNumber:that.taxIdentificationNumber,
                    fax:that.fax,
                    postcode:that.postcode,
                    remark:that.remark,
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
