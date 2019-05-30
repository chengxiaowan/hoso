var config = {
    role: localStorage.userRole,
    api_list: api_url+'/goodsGroup/dataList', //获取组合列表
    api_status: api_url+'/goodsGroup/changeIsOnsell', // 更改商品sku上下架状态
    api_del: api_url+'/goodsGroup/del', // 删除组合
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 关键词(组合标题、商品名称)
        isOnsell: '', // 组合上下架状态 0:下架 1:上架
        goodsId: '', // 商品id
        goodsSkuId: '',  //商品skuId
        startDate: '', // 上下架开始时间
        endDate: '', // 上下架结束时间
},
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        $('.el-input').each(function() {
			var pla = $(this).attr('placeholder')
			$(this).find('.el-input__inner').attr('placeholder', pla)
		})
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            var endDate= laydate.render({
                elem: '#end',//选择器结束时间
                format: 'yyyy-MM-dd',//可任意组合
                min:"1970-1-1",//设置min默认最小值
                done: function(value,date){
                    that.endDate = value;
                    if(value !== '') {
						startDate.config.max.year = date.year;
						startDate.config.max.month = date.month - 1;
						startDate.config.max.date = date.date;
					} else {
						startDate.config.max.year = '2099';
						startDate.config.max.month = '12';
						startDate.config.max.date = '31';
					}
                }
            });
            //日期范围
            var startDate=laydate.render({
                elem: '#start',
                format: 'yyyy-MM-dd',//可任意组合
                max:"2099-12-31",//设置一个默认最大值
                done: function(value, date){
                    that.startDate = value;
                    if(value !== '') {
						endDate.config.min.year = date.year;
						endDate.config.min.month = date.month - 1;
						endDate.config.min.date = date.date;
					} else {
						endDate.config.min.year = '1970';
						endDate.config.min.month = '1';
						endDate.config.min.date = '1';
					}
                }
            });
        });
        that.getGoodsGroupList();  // 获取商品组合列表
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
        //  获取商品组合列表
        getGoodsGroupList: function(page,keywords,isOnsell,startDate,endDate) {
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
                    onsellTimeStart: that.startDate,
                    onsellTimeEnd: that.endDate,
                    isOnsell: that.isOnsell,
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
                                    that.getGoodsGroupList()
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 更改商品sku上下架状态 - 上架
        slotting(id,onSell){
            const that = this;
            layer.confirm('确认要上架吗？', function (index) {
                $.ajax({
                    url: config.api_status,
                    async: true,
                    type: 'post',
                    data: {
                        goodsGroupId: id,
                        isOnsell: onSell
                    },
                    success: function (res) {
                        if(res.error == "00") {
                            layer.msg('已上架!', {icon: 6, time: 1000});
                            that.getGoodsGroupList();
                        }
                    }
                });
            });
        },
        // 更改商品sku上下架状态 - 下架
        driver(id,onSell){
            const that = this;
            layer.confirm('确认要下架吗？', function (index) {
                $.ajax({
                    url: config.api_status,
                    async: true,
                    type: 'post',
                    data: {
                        goodsGroupId: id,
                        isOnsell: onSell
                    },
                    success: function (res) {
                        if(res.error == "00") {
                            layer.msg('已下架!', {icon: 6, time: 1000});
                            that.getGoodsGroupList();
                        }
                    }
                });
            })
        },
        // 搜索
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            var isOnsell = that.isOnsell;
            var startDate = that.startDate;
            var endDate = that.endDate;
            that.getGoodsGroupList(page,keywords,isOnsell,startDate,endDate);
        },
        // 跳转新增组合页面
        jumpToGroup(){
            var index = layer.open({
                type : 2,
                title : '新增组合',
                content: 'add.html',
                area : [ '100%', '100%' ]
            });
        },
        // 查看合同详情
        view(id) {
            var index = layer.open({
                type : 2,
                title : '查看合同详情',
                content: 'detail.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 编辑合同
        edit(id) {
            var index = layer.open({
                type : 2,
                title : '编辑组合',
                content: 'edit.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        // 删除合同
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该组合吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    id: id
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getGoodsGroupList()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
    }
})

