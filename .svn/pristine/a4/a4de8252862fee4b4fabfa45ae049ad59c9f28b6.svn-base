var config = {
    role: localStorage.userRole,
    api_list: api_url+'/supplierContract/dataList', //获取合同列表
    api_add: api_url+'/supplierContract/saveOrupdate', //新增合同
    api_edit: api_url+'/supplierContract/saveOrupdate', //编辑合同
    api_del: api_url+'/supplierContract/saveOrupdate', //删除合同
    api_detail: api_url+'/supplierContract/info' //获取合同详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键词
        startDate: '', // 开始日期
        endDate: '', // 结束日期
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
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
        that.getData();
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
        getData: function(page,keywords,startDate,endDate) {
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
                    createTimeStart: that.startDate,
                    createTimeEnd: that.endDate,
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
        // 跳转新增供应商页面
        jumpToContract(){
            var index = layer.open({
                type : 2,
                title : '新增合同',
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
                title : '编辑合同',
                content: 'edit.html?id='+id,
                area : [ '100%', '100%' ]
            });
        },
        search(){
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            var startDate = that.startDate;
            var endDate = that.endDate;
            that.getData(page,keywords,startDate,endDate);
        },
        // 删除合同
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该合同吗?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    id: id,
                    delFlag:'1'
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
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

