var config = {
    role: localStorage.userRole,
    api_list: api_url + '/brand/dataList', //获取品牌列表
    api_edit: api_url + '/brand/saveOrupdate', //修改品牌
    api_del: api_url + '/brand/saveOrupdate', //删除品牌

    // api_user:api_url+'/user/userList'        接口暂无

}
window.app = new Vue({
    el: '#app',
    data: {
        index: 1,
        role: config.role,
        list: [], // 列表
        keywords: '', // 搜索关键
        name: '', // 品牌名称
        postData: {},
        editor: null,
        editorInfo: '', //品牌描述
        tag: "", //标签
        tagInfo: "", //默认标签
        imgPath: '',
        colorPicType: '', //去捏颜色模所属状态
        image: '',
        userlist: [], //负责人列表
    },
    created: function () {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        that.getData();
        // that.getUser();      没有接口，暂时不请求
        // console.log(that.userlist);

        this.editor = UE.getEditor('container', {
            initialFrameHeight: 350,
            // initialContent: "请填写详细描述",
        });

        that.editor.addListener("ready", function () {
            // editor准备好之后才可以使用
            that.editor.setContent(that.editorInfo);
        });
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
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                },
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        that.list = res.result;
                        //分页
                        if (that.pagi) {
                            $('.pagi').pagination('updatePages', that.list.pages)
                            if (page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function (num) {
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


        // 新建负责人
        jumpToHeader() {
            var index = layer
                .open({
                    type: 2,
                    title: '新建负责人',
                    content: 'headers.html',
                    area: ['80%', '80%']
                });
        },
        // 查看品牌详情
        view(id) {
            var index = layer.open({
                type: 2,
                title: '查看品牌详情',
                content: 'detail.html?id=' + id,
                area: ['80%', '80%']
            });
        },
        // 编辑品牌
        edit(id) {
            var index = layer.open({
                type: 2,
                title: '编辑品牌',
                content: 'edit.html?id=' + id,
                area: ['100%', '100%']
            });
        },
        // 搜索
        search() {
            const that = this;
            var page = 1;
            var keywords = that.keywords;
            that.getData(page, keywords);
        },
        // 删除品牌
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该品牌?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    id: id,
                    delFlag: '1'
                }, function (data) { // 回调函数
                    if (data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getData()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
        // 切换tab
        tab: function (index_chosen) {
            const that = this;
            that.index = index_chosen;
        },

        //保存数据
        save() {
            const that = this;

        },

        //dy为测试Vue是否绑定的方法，提交代码时请删除或者注释
        dy() {
            console.log("粗发了")
        }
    }
})

var drool = document.getElementById("getVal");

drool.onclick = function getinput() {
 
    console.log($('#tagsinputval').val())

};

var info = document.getElementById("info")
// console.log(name)
// console.log(info)
info.onkeyup = function(){
    document.getElementById('count4').innerHTML = info.value.length
}

// console.log($('#boboname').val())

$("#inputfiles").h5upload();

