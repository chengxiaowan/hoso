var config = {
    roleName: window.sessionStorage.getItem('roleName'),
    userId: window.sessionStorage.getItem('userId'),
    api_save: api_url + '/service/addPhotoStudio',
    api_user: api_url + '/user/userList4', //获取负责人列表
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_province: api_url + '/region/provinceList', // 获取省份
    api_city: api_url + '/region/cityList', //获取城市
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.roleName,
        userId: config.userId, //负责人id
        headId: '',
        isSystem: true,
        list: [], // 品牌信息
        newuserlist: [], //新建负责人列表
        nameLength: 0, // 名称长度
        name: '', //名称
        provinceList: [], //省份列表
        provinceId: '', // 省份Id
        province: '', // 省份
        cityList: [], // 城市别表
        cityId: '', // 城市Id
        city: '', // 城市
        address: '',// 详细地址
        phone: '',// 联系电话
        description: '', // 图文描述
        imagePath: '', // 封面地址
        tokenMessage: "",
    },
    watch: {
        provinceId(val, oldVal) {
            let that = this
            that.cityList = ''
            that.cityId = ''
            if (val != '') {
                $.ajax({
                    url: config.api_city,
                    async: true,
                    type: 'post',
                    data: {
                        parentId: val,
                    },
                    success: function (res) {
                        that.loading('close')
                        if (res.error == "00") {
                            var arr = [];
                            var res_result = res.result;
                            for (var i in res_result) {
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
    created: function () {
        var that = this;
    },
    mounted: function () {
        const that = this;
        that.getUserlist(); //获取所有负责人
        that.getProvince(); // 获取省份
        that.getToken() //获取七牛云的token
        that.isSystems();
        that.editor = UE.getEditor('container', {
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
        // 判断是否是系统员工
        isSystems: function () {
            var that = this;
            console.log(that.role)
            if (that.role == '系统人员') {
                that.isSystem = true;
            } else {
                that.isSystem = false;
            }
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
                    content: 'header.html',
                    area: ['80%', '80%']
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
                success: function (res) {
                    that.loading('close')
                    if (res.error == "00") {
                        var arr = [];
                        var res_result = res.result;
                        console.log(res_result)
                        for (var i in res_result) {
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
        selectProvince(Pid) {
            let obj = {}, that = this;
            console.log(Pid)
            obj = that.provinceList.find((item) => {
                return item.id === Pid
            })
            if (obj == undefined) {
                that.province = ''
                that.city = ''
            } else {
                that.province = obj.text
            }
        },
        // 获取城市
        selectCity(Cid) {
            let obj = {},
                that = this;
            obj = this.cityList.find((item) => {
                return item.id === Cid
            })
            if (obj == undefined) {
                that.city = ''
            } else {
                that.city = obj.text
            }

        },
        //保存数据
        save() {
            //整理数据
            var arr = [];
            const that = this;
            that.clearDate($("#vivew"), arr)
            that.clearDate($("#info1"), arr)
            that.clearDate($("#info2"), arr)
            that.clearDate($("#info3"), arr)
            that.clearDate($("#info4"), arr)
            that.clearDate($("#info5"), arr)
            that.clearDate($("#info6"), arr)
            that.clearDate($("#info7"), arr)
            // console.log(shopsBrandPicList)
            console.log(arr)
            that.imagePath = $('#vivew1').attr('src');
            console.log(that.imagePath)
            if (that.role == '系统人员' && that.headId == '') {
                layer.msg('请选择负责人')
            } else if (that.name == '') {
                layer.msg('请输入名称')
            } else if (that.provinceId == '') {
                layer.msg('请选择省份')
            } else if (that.cityId == '') {
                layer.msg('请选择城市')
            } else if (that.address == '') {
                layer.msg('请输入详细地址')
            } else if (that.imagePath == '') {
                layer.msg('请上传封面图片')
            } else {
                //提交到服务器
                const that = this;
                $.ajax({
                    url: config.api_save,
                    traditional: true,
                    async: true,
                    type: 'post',
                    data: {
                        userId: that.userId,
                        name: that.name,
                        province: that.province,
                        city: that.city,
                        address: that.address,
                        link: that.phone,
                        pic: $('#vivew1').attr('src'),
                        picList: JSON.stringify(arr),
                        describes: that.editor.getContent(),
                    },
                    success: res => {
                        console.log(res);
                        if (res.error == '00') {
                            layer.msg("保存成功", { time: 3000 })
                            setTimeout(function () {
                                //关闭当前弹窗
                                var index = parent.layer.getFrameIndex(window.name);
                                window.parent.location.reload();
                                parent.layer.close(index)
                            }, 3000)
                        } else {
                            layer.msg(res.msg)
                        }
                    }
                })
            }
        },
        // 选择负责人
        selectHead: function () {
            this.userId = this.headId;
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
                    uploaderReady9(res)
                }
            })
        },
        // 键入名称
        inputName: function () {
            var txtVal = this.name.length;
            this.nameLength = 30 - txtVal;
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

        //数据整理
        clearDate(img, data) {
            //img为JQ的元素，data为存放数据的大数组
            if (img.attr("isUp")) {
                var drool = {
                    fileSize: '',
                    realPath: '',
                    originalFilename: img.attr("isUp"),
                    url: img.attr("src"),
                    uploadTime: this.gettime(),
                }
                data.push(drool)
                console.log(drool)
            }
        },
    }
})
