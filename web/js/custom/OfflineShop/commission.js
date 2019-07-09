var serviceId = parameter().id, shopsId = parameter().ids, commission = parameter().commission, roleList = [];
console.log(shopsId)
console.log(commission)
var config = {
    role: localStorage.userRole,
    api_list: api_url + '/shops/showShopsService', // 获取旅拍服务列表
    api_role: api_url + '/shops/shopsRoleList',  // 获取角色列表
    api_join: api_url + '/shops/addShopsService', // 加入服务
    api_detail: api_url + '/service/getPhotoServiceById', //获取旅拍详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        shopsCommission: '', // 店铺提成比例
        roleList: [''], // 角色列表
        list: [],

    },
    created: function () {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        // that.getData();
        that.getRole();
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function (s) {
            if (s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },
        getData: function (page, keywords) {
            $('body,html').scrollTop(0);
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                },
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        that.list = res.result;
                        for (var i in that.list.list) {
                            console.log(that.list.list[i].price)
                            if (that.list.list[i].price != undefined) {
                                that.list.list[i].price = that.list.list[i].price.toFixed(2)
                            }
                            // that.list.list[i].createTime = formatDate(that.list.list[i].createTime).substring(0,10)
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 获取角色列表
        getRole: function () {
            $('body,html').scrollTop(0);
            var that = this;
            $.ajax({
                url: config.api_role,
                async: true,
                type: 'post',
                data: {
                    shopsId: shopsId,
                },
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        that.list = res.result;
                        sessionStorage.setItem('roleList', res.result.list);
                        that.roleList = res.result;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存
        save() {
            const that = this;
            var dataList = [];
            for (var i in that.list.list) {
                var obj = {};
                obj.shopsRoleId = that.list.list[i].shopsRoleId;
                if (that.roleList[i] == undefined) {
                    that.roleList[i] = 0;
                }
                obj.commissionPercent = that.roleList[i];
                dataList.push(obj)
            }
            if (dataList.length == 0) {
                if (that.shopsCommission == '') {
                    layer.msg("请输入店铺提成比例")
                    return false;
                } else if (Number(that.shopsCommission) > Number(commission)) {
                    layer.msg("店铺提成比例不能大于品牌提成比例")
                    return false;
                } else {
                    $.ajax({
                        url: config.api_join,
                        async: true,
                        type: 'post',
                        data: {
                            shopsId: shopsId,
                            serviceId: serviceId,
                            commissionPercent: that.shopsCommission,
                        },
                        success: function (res) {
                            that.loading('close')
                            if (res.error == "00") {
                                var index = parent.layer.getFrameIndex(window.name);
                                layer.msg('加入服务成功！');
                                setTimeout(function () {
                                    window.parent.location.reload();
                                    parent.layer.close(index);
                                }, 1000);
                            } else {
                                layer.msg(res.msg)
                            }
                        }
                    })
                }
            } else {
                var max = dataList[0].commissionPercent;
                for (var i = 1; i < dataList.length; i++) {
                    var cur = dataList[i].commissionPercent;
                    cur > max ? max = cur : null
                }
                if (that.shopsCommission == '') {
                    layer.msg("请输入店铺提成比例")
                    return false;
                } else if (Number(that.shopsCommission) > Number(commission)) {
                    layer.msg("店铺提成比例不能大于品牌提成比例")
                    return false;
                } else if (Number(max) > Number(that.shopsCommission)) {
                    layer.msg('店铺角色提成不能大于店铺提成比例')
                } else {
                    that.addShopsService(shopsId, serviceId, commission, dataList)
                }
            }
        },
        // 加入设置佣金
        addShopsService(shopsId, serviceId, commission, dataList) {
            const that = this;
            $.ajax({
                url: config.api_join,
                async: true,
                type: 'post',
                data: {
                    shopsId: shopsId,
                    serviceId: serviceId,
                    commissionPercent: commission,
                    roleList: JSON.stringify(dataList),
                },
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        var index = parent.layer.getFrameIndex(window.name);
                        layer.msg('加入服务成功！');
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



