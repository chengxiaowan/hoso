const config = {
    role: localStorage.userRole,
    api_showSaleCustomer: '/qzTask/showSaleCustomer',//获取公海规则列表
    api_saveTasks: '/qzTask/saveTasks.do',//新增
    api_updateTasks: '/qzTask/updateTasks.do',//编辑
    api_delteTask: '/qzTask/delteTask.do',//删除
}
        //时间选择初始化
require(['module_dialog_sea_config'],(dialog_sea_config)=>{
window.app = new Vue({
    el: '#app',
    data: {
        c: {
        },
        role: config.role,
        postData:{},
        posting: false, //是否正在上传数据
    },
    created() {
        const that = this;
        document.getElementById("app").classList.remove("hide")
    },
    mounted() {
        //获取列表
        this.list_Get();
        //选择负责人
            $('#salerId').select2({
				placeholder: "请选择",
				language: 'zh-CN',
				ajax: {
					url: "/user/getUserInfo",
					dataType: 'json',
					type: "post",
					delay: 250,
					data: function(params) {
						return {
							page: params.page || 1,
							ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
							data: {
								q: params.term || "", // search term
							}
						};
					},
					processResults: function(data, params) {
						params.page = params.page || 1;
						$.each(data, function() {
							this.id = this.USER_ID;
							this.text = this.NAME;
						})
						return {
							results: data,
							pagination: {
								more: data.length == 10
							}
						};
					},
					cache: true
				},
				minimumInputLength: 0

			})
    },
    methods: {
                //搜索
        search() {
            this.list_Get(1)
        },
        /**
 * 载入中方法
 * 
 * @param {string} s 是否关闭
 */
        loading(s) {
            if (s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
            // else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
        },
        //add新增
        add() {
            this.$refs.sea_config.init()
        },
        edit(el){
        this.$refs.sea_config.init(el)
        },
        del(index,id){
            const that = this;
                layer.confirm('确认删除此项?',()=>{
                   $.post(config.api_delteTask,{
                       id:id
                   },()=>{
                        layer.msg('删除成功');
                        that.list_Get()
                   })
                })
        },
        //获取列表数据
        list_Get(page) {
            const that = this;
            if(page) this.c.pageNum = page
            that.loading();
            that.postData.pageSize = this.c.pageSize;
            that.postData.pageNo = this.c.pageNum;
            require(['pagination'], (pagination) => {
            $.ajax({
                url: config.api_showSaleCustomer,
                async: false,
                data: that.postData
            }).done((res) => {
                that.c = res.result;
                //分页
                if (that.pagi) {
                    $('.pagi').pagination('updatePages',that.c.pages)
                    if (page==1) $('.pagi').pagination('goToPage',that.c.pageNum)
                } else {
                    that.pagi=1
                          $('.pagi').pagination({
                            pages: that.c.pages,   //总页数
                            showCtrl: true,
                            displayPage: 6,
                            currentPage: that.c.pageNum,
                            onSelect: function (num) {
                                that.c.pageNum = num
                                that.list_Get()
                            }
                       
                    });
                }
that.loading('close');
            })
             })
        }
    }
})

})

//子页面处理方法
window.parentFnc = function (params) {
    layer.closeAll();
    //更新记录
    window.app.list_Get()
}
