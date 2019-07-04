var shopsId = parameter().id;
var shopsBrandId = parameter().ids;
console.log(shopsId)
console.log(shopsBrandId)
var config = {
    role: localStorage.userRole,
    api_list: api_url+'/shopsBrand/showAShopsBrandService', // 获取旅拍服务列表
    api_join: api_url+'/shops/addShopsService', // 加入服务
    api_detail: api_url+'/service/getPhotoServiceById', //获取旅拍详情
    api_del: api_url+'/shops/deleteAShopsBrandServiceById', //删除服务
    api_province: api_url + '/region/provinceList', // 获取省份
    api_city: api_url + '/region/cityList', //获取城市
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键词
        provinceList: [], //省份列表
        provinceId: '', // 省份Id
        province: '', // 省份
        cityList: [], // 城市别表
        cityId: '', // 城市Id
        city: '', // 城市
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
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getData();
        that.getProvince();
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
        getData: function(page,keywords,province, city) {
            $('body,html').scrollTop(0);
            if(page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                    province: province,
                    city: city,
                    shopsBrandId: shopsBrandId,
                    // shopsBrandId: 26,
                    auditStatus: 1,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        for (var i in that.list.list) {
                            console.log(that.list.list[i].price)
                            if(that.list.list[i].price!=undefined){
                                that.list.list[i].price = that.list.list[i].price.toFixed(2)
                            }
                            // that.list.list[i].createTime = formatDate(that.list.list[i].createTime).substring(0,10)
                        }
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
        // 查看
        view(id, type) {
            var index = layer.open({
                type : 2,
                title : '查看详情',
                content: 'edit.html?id='+id+'&type='+type,
                area : [ '100%', '100%' ]
            });
        },
        // 加入
        join(id,commission,serviceId) {
            var index = layer.open({
                type : 2,
                title : '佣金设置',
                content: 'commission.html?id='+id+'&commission='+commission+'&ids='+serviceId,
                area : [ '40%', '90%' ],
            });
        },
        // 获取省份
        getProvince() {
            const that = this;
            $.ajax({
                url: config.api_province,
                async: true,
                type: 'post',
                data: {
                    keywords: ''
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var arr = [];
                        var res_result = res.result;
                        console.log(res_result)
                        for(var i in res_result) {
                            var obj = {};
                            obj.id = res_result[i].provinceId;
                            obj.text = res_result[i].provinceName;
                            arr.push(obj);
                        }
                        that.provinceList = arr;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 选择省份
        selectProvince(Pid){
            let obj={},that = this;
            console.log(Pid)
            obj = that.provinceList.find((item)=>{
                return item.id ===Pid
            })
            if(obj==undefined){
                that.province = ''
                that.city = ''
            }else{
                that.province = obj.text
            }
        },
        // 获取城市
        selectCity(Cid){
            let obj={},
                that = this;
            obj = this.cityList.find((item)=>{
                return item.id ===Cid
            })
            if(obj==undefined){
                that.city = ''
            }else{
                that.city = obj.text
            }

        },
        search(){
            const that = this;
            var keywords = that.keywords;
            that.getData(keywords,that.province,that.city);
        },

    }
})



