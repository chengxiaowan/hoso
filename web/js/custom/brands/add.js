var config = {
    role: localStorage.userRole,
    api_list: api_url + '/brand/dataList', //获取品牌列表 此页面用不到记得删除
    api_save: api_url + '/shopsBrand/add',
    api_edit: api_url + '/brand/saveOrupdate', //修改品牌
    api_del: api_url + '/shopsBrand/del', //删除品牌
    api_user: api_url + '/user/userList3', //获取负责人列表
    api_token: api_url + '/qiniu/getUpToken' //获取七牛的token
}
window.app = new Vue({
    el: '#app',
    data: {
        index: 1,
        role: config.role,
        list: [], // 品牌信息
        keywords: '', // 搜索关键
        colorPicType: '', //去捏颜色模所属状态
        userlist: [], //负责人列表
        newuserlist: [], //新建负责人列表

        //修改品牌表单信息
        bandname: '', //品牌名称
        userId: '', //负责人id
        labels: '', //标签
        summary: '',
        description: '', //图文描述
        imagePath: '', //封面地址
        logoPath: '', //logo地址
        shopsBrandPicList: [], //店铺图片列表
        tokenMessage: "",
        shopsBrandId: '',
    },
    created: function () {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function () {
        const that = this;
        // that.getData(); //获取列表
        that.getUserlist(); //获取所有负责人
        that.getToken() //获取七牛云的token

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

        //getdata删除，此界面不需要获取任何服务器信息
        //品牌基本信息的下拉框负责人列表
        getUserlist() {
            var that = this
            $.ajax({
                url: config.api_user,
                async: true,
                type: 'post',
                success: res => {
                    that.newuserlist = res.result;
                    console.log(that.newuserlist)
                }
            })
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

        // 切换tab
        tab: function (index_chosen) {
            const that = this;
            that.index = index_chosen;
            if (that.shopsBrandId == "") {
                layer.msg('请先添加商品基本信息', {
                    time: 1000
                });
            }

        },

        //保存数据
        save() {
            //整理数据
            // var arr = [];
            const that = this;
            // that.clearDate($("#info1"), arr)
            // that.clearDate($("#info2"), arr)
            // that.clearDate($("#info3"), arr)
            // that.clearDate($("#info4"), arr)
            // that.clearDate($("#info5"), arr)
            // that.clearDate($("#info6"), arr)
            // // console.log(shopsBrandPicList)


            //提交到服务器前先验证必填项
            if ($("#boboname").val() == "") {
                layer.msg("请输入品牌名称", {
                    time: 3000
                })
            } else if (that.userId == "") {
                layer.msg("请选择品牌负责人", {
                    time: 3000
                })
            } else if (document.getElementById("tagsinputval").value == "") {
                layer.msg("请输入品牌标签", {
                    time: 3000
                })
            } else if (that.summary == "") {
                layer.msg("请输入品牌简介", {
                    time: 3000
                })
            } else if (that.editor.getContent() == "") {
                layer.msg("请添加品牌图文详情", {
                    time: 3000
                })
            } else if ($('#vivew').attr('src') == "../images/imgadd.png") {
                layer.msg("请选择品牌lLOGO", {
                    time: 3000
                })
            } else if ($('#vivew1').attr('src') == "../images/imgadd.png") {
                layer.msg("请选择店铺封面图", {
                    time: 3000
                })
            } else {

                $.ajax({
                    url: config.api_save,
                    traditional: true,
                    async: true,
                    type: 'post',
                    data: {
                        brandName: document.getElementById("boboname").value,
                        userId: that.userId,
                        labels: document.getElementById("tagsinputval").value,
                        summary: that.summary,
                        description: that.editor.getContent(),
                        logoPath: $('#vivew').attr('src'),
                        imagePath: $('#vivew1').attr('src'),
                        shopsBrandPicList:''
                    },
                    success: res => {
                        console.log(res);
                        if (res.error == "00") {
                            layer.msg("保存成功，三秒后关闭窗口", {
                                time: 3000
                            })

                            setTimeout(function () {
                                //关闭当前弹窗
                                var index = parent.layer.getFrameIndex(window.name);
                                parent.layer.close(index)
                            }, 3000)
                        }else{
                            layer.msg(res.error,{time:3000})
                        }
                    }
                })

            }



        },

        //获取token并传给七牛云SDK
        getToken() {
            $.ajax({
                url: config.api_token,
                async: true,
                data: {},
                taye: "post",
                success: res => {
                    this.tokenMessage = res;
                    uploaderReady(res)
                    uploaderReady2(res)
                    uploaderReady3(res)
                    uploaderReady4(res)
                    uploaderReady5(res)
                    uploaderReady6(res)
                    uploaderReady7(res)
                    uploaderReady8(res)
                }
            })
        },

        //本地时间获取
        gettime() {
            var d = new Date();
            var year = d.getFullYear();
            var month = change(d.getMonth() + 1);
            var day = change(d.getDate());
            var hour = change(d.getHours());
            var minute = change(d.getMinutes());
            var second = change(d.getSeconds());

            function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            }
            var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            return time;

        },

        // //数据整理
        // clearDate(img, data) {
        //     //img为JQ的元素，data为存放数据的大数组
        //     if (img.attr("isUp")) {
        //         var drool = {
        //             fileSize: '',
        //             realPath: '',
        //             originalFilename: img.attr("isUp"),
        //             url: img.attr("src"),
        //             uploadTime: this.gettime(),
        //         }
        //         data.push(drool)
        //         // console.log(drool)
        //     }
        // },
        dy() {
            console.log("labels")
            console.log($('#tagsinputval').val())
        }
    }
})


//简介文字计数
var info = document.getElementById("info")
info.onkeyup = function () {
    document.getElementById('count4').innerHTML = info.value.length
}