const config = {
    orderId: yo.getQueryString("id"), //案件ID
    role: localStorage.userRole,
    api_getOrderDetail: '/order/getOrderDetail',//获取案件数据
    //  api_getCountryData: '/order/getCountryData',//获取地址数据
    api_showAll: '/order/showAll', //获取记录列表 
    api_saveLinkManInfo: '/order/saveLinkManInfo', //债务人联系人增加
    api_saveProductAttach: '/order/saveProductAttach', //保存上传附件
    api_updateDebtor: '/order/updateDebtor', //保存债务人信息
    api_saveLinkMan: '/linkman/saveLinkMan', //债务知情人/其他联系人
    api_updateLinkMans:'/saleCustomer/updateLinkMans',//编辑联系人
    api_updateGjStatus: '/order/updateGjStatus', //编辑跟进状态
    api_saveCallInfo: '/order/saveCallInfo',   //保存提醒
    api_call: "/order/call.do",
    api_updateCallInfo: '/order/updateCallInfo'  //提醒操作
}
require(['module_dialog_payplan','module_dialog_payplan_edit'], (payplan,payplan_edit) => {
    window.app = new Vue({
        el: '#app',
        data: {
            c: {},
            orderId: config.orderId,
            type: 3, //记录type
            uploader: 0, //上传组件状态
            role: config.role,
            citys: {}, //城市数据
            editParam: '',  //正在编辑的项目
            hoverParam: '', //鼠标覆盖项目
            oldData: '',  //编辑项目的旧值
            posting: false, //是否正在上传数据
            //记录序列
            sa: [],
            sb: [],
            sc: [],
            sd: [],
            se: [],

            //组件状态
            openDialog: '',

            //电话


        },
        computed: {
            //下月回款预估
            precalc() {
                let flag = 0
                switch (this.c.status) {
                    case 0:
                        flag++
                        break;
                }
                if (flag) return false;
                else return true;
            },
            //申请诉讼
            supplylaw() {
                let flag = 0
                switch (this.c.status) {
                    case 0:
                        flag++
                        break;
                }
                if (flag) return false;
                else return true;
            },
            //城市列表
            citys_sub() {
                const province = this.c.provinceName1;
                let city = [];
                let provinceId;
                $.each(this.citys['省份'], (i, el) => {
                    if (province == el.regionName) provinceId = el.id
                })
                $.each(this.citys['市区'], (i, el) => {
                    if (provinceId == el.parentId) city.push(el)
                })

                return city;
            },
            //合成上传附件列表
            attachs() {
                const attachs = this.c.attachs
                let data = {
                    "type": [],
                }
                $.each(attachs, function () {
                    for (var i in this) {
                        if (data[i] == undefined) {
                            data[i] = []
                        }
                        data[i].push(this[i])
                    }
                })
                for (var i in data) {
                    data[i] = data[i].join(",")
                }
                data.orderId = config.orderId
                return data
            }
        },
        created() {
            const that = this;
            document.getElementById("app").classList.remove("hide")
            //初始化城市数据
            if (localStorage.citys) {
                this.citys = JSON.parse(localStorage.citys)
            }
            //获取全局数据
            this.getCaseDetail()
            //获取案件跟进数据
            this.getCaseRecord()
            //一点dev
            // $('.nav-tabs').find("li").eq(4).find("a").click()
        },
        mounted(){
            $('.showTips').hover(function(){
                let text = $(this).text()
                if(!text||text=="  ") return;
                window.toolTips_TEMP = layer.yoTips(`<span style="color:#337ab7">${text}</span>`,this,{
                            tips: [3, '#fff']
                        })
            },function(){
                        layer.close( window.toolTips_TEMP) 
            })
        },
        directives: {
            focus: {
                //自动聚焦和销毁select2
                inserted(el) {
                    el.focus();
                    //如果是选择框
                    if (el.tagName == 'SELECT') {
                        $(el).select2({
                            language: "zh-CN",
                            placeholder: '请选择'
                        }).on("select2:close", function (e) {
                            const newData = e.target.value || app.c[app.editParam];
                            const $this = $(this)
                            if (app.c[app.editParam] == newData) {
                                $this.select2("destroy");
                                app.editParam = ''
                            } else {
                                Vue.set(app.c, app.editParam, newData);
                                switch (app.editParam) {
                                    case 'provinceName1':
                                        app.c.cityName1 = ''
                                        break;
                                    default:
                                        break;
                                }
                                Vue.nextTick(() => {
                                    app.saveData()
                                    $this.select2("destroy")
                                    app.editParam = ''
                                })
                            }
                        }).select2("open")
                    }
                }
            }
        },
        methods: {
            enter(p) {
                if (this.editParam == p) return;
                this.hoverParam = p;
            },
            leave() {
                if (this.hoverParam == this.editParam) this.hoverParam = ''
            },

            /**
             * 保存数据
             * 
             * @param {any} data 当前值 
             * @returns 
             */
            saveData(el) {
                if (this.posting) return;
                //做一些数据验证
                if (this.c.debtorName == "") this.c.debtorName = this.oldData

                //验证end
                if (this.oldData == this.c[this.editParam]) {
                    this.editParam = '';
                    return;
                }
                let postData = {
                    orderId: config.orderId,
                    debtorId: this.c.debtorId
                };
                this.posting = true;
                postData[this.editParam] = this.c[this.editParam];
                if (!this.editParam) {
                    this.posting = false;
                    return;
                }
                $.post(config.api_updateDebtor, postData, (res) => {
                    this.editParam = '';
                    this.posting = false;
                })
            },
            /**
             * 修改项目
             * 
             * @param {any} param 项目名称
             */
            change(param) {
                this.hoverParam = '';
                this.editParam = param;
                this.oldData = this.c[param];
                //如果是省份
                if (param == 'provinceName1') {

                }
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
            //案件全局数据
            getCaseDetail() {
                const that = this;
                that.loading()
                $.ajax({
                    url: config.api_getOrderDetail,
                    async: false,
                    data: { id: config.orderId },
                    success: function (res) {
                        that.c = res.result
                        that.loading("close")
                    }
                });
            },
            //案件记录数据获取
            getCaseRecord(type) {
                const that = this;
                this.type = type || this.type
                that.loading()
                $.post(config.api_showAll, {
                    orderId: config.orderId,
                    type: that.type
                }).done((res) => {
                    that.loading("close")
                    switch (that.type) {
                        case 3:
                            that.sa = res.result
                            break;
                        case 1:
                            that.sb = res.result
                            break;
                        case 6:
                            that.sc = res.result
                            break;
                        case 5:
                            that.sd = res.result
                            break;
                        case 2:
                            that.se = res.result
                            break;
                        default:
                            break;
                    }
                })
            },
            //新增联系人
            linkman_add() {
                const that = this;
                require(['text!debtor_linkman_add'], (html) => {
                    const dialog = layer.open({
                        type: 1,
                        title: '新增联系人',
                        closeBtn: 1,
                        content: html,
                        area: ['600px', '400px'],
                        btn: "保存",
                        btnAlign: 'c',
                        yes() {
                            require(['yoValidate'], () => {
                                if (yoValidate("#debtor_linkman_add", 1)) {
                                    let data = {}
                                    $.each($("#debtor_linkman_add").find("input,textarea"), function () {
                                        data[this.name] = $.trim(this.value)
                                    })
                                    data.debtorId = that.c.debtorId
                                    that.loading()
                                    $.post(config.api_saveLinkManInfo, data)
                                        .done((res) => {
                                            that.loading("close")
                                            that.c.linkMan6.push(data)
                                            layer.close(dialog)
                                        })
                                }

                            })
                        }
                    });
                });
            },
            //编辑联系人
             linkman_edit(el){
                const that = this;
                let el_n = {
                	name:el.name || el.zqrName || el.fzrName,
					mobilePhone:el.mobilePhone || el.zqrMobilePhone || el.fzrMobilePhone,
					landline:el.landline || el.zqrLandline || el.fzrLandline,
					email:el.email || el.zqrEmail || el.fzrEmail,
					postion:el.postion || el.zqrPostion || el.fzrPostion,
					fax:el.fax || el.zqrFax || el.fzrFax,
					remark:el.remark || el.zqrRemark || el.fzrRemark,
					id:el.id||el.linkId1||el.linkId2,
					customerId:that.c.debtorId,
                }
                require(['text!debtor_linkman_add'], (html) => {
                    const dialog = layer.open({
                        type: 1,
                        title: '编辑联系人',
                        closeBtn: 1,
                        content: html,
                        area: ['600px', '550px'],
                        btn: "保存",
                        btnAlign: 'c',
                        success(){
                            $.each($("#debtor_linkman_add").find("input,textarea"), function () {
                                        this.value = el_n[this.name] || ""
                                    })
                        },
                        yes() {
                            require(['yoValidate'], () => {
                                if (yoValidate("#debtor_linkman_add", 1)) {
                                    let data = {}
                                    $.each($("#debtor_linkman_add").find("input,textarea"), function () {
                                        data[this.name] = $.trim(this.value)
                                    })
                                    data.id = el.id||el.linkId1||el.linkId2,
                                    data.customerId = that.c.debtorId
                                    that.loading()
                                    $.post(config.api_updateLinkMans, data)
                                        .done((res) => {
                                            that.loading("close")
                                            that.getCaseDetail()
                                            layer.close(dialog)
                                        })
                                }

                            })
                        }
                    });
                });
            },
            //新增债务知情人/其他联系人
            debtor_linkman_add(flag) {
                const that = this;
                require(['text!debtor_linkman_add'], (html) => {
                    const title = flag == 0 ? "新增债务知情人" : "新增其他负责人";
                    const dialog = layer.open({
                        type: 1,
                        title: title,
                        closeBtn: 1,
                        content: html,
                        area: ['600px', '500px'],
                        btn: "保存",
                        btnAlign: 'c',
                        yes() {
                            require(['yoValidate'], () => {
                                if (yoValidate("#debtor_linkman_add", 1)) {
                                    let data = {
                                        orderId: config.orderId,
                                        customerId: that.c.debtorId,
                                        type: 1,
                                        flag: flag
                                    }
                                    $.each($("#debtor_linkman_add").find("input,textarea"), function () {
                                        data[this.name] = $.trim(this.value)
                                    })
                                    that.loading()
                                    $.post(config.api_saveLinkMan, data)
                                        .done((res) => {
                                            that.loading("close")
                                            that.getCaseDetail()
                                            layer.close(dialog)
                                        })
                                }

                            })
                        }
                    });
                });
            },
            //        //查看债务知情人/其他联系人
            // debtor_linkman_view(name) {
            //     console.log(name);
            //     const that = this;
            //     require(['text!debtor_linkman_add'], (html) => {
            //         const dialog = layer.open({
            //             type: 1,
            //             title: "查看",
            //             closeBtn: 1,
            //             content: html,
            //             area: ['600px', '500px'],
            //             btnAlign: 'c',
            //             success(){
            //                 $.each($("#debtor_linkman_add").find("input,textarea"), function () {
            //                             this.disabled = true
            //                         })
            //             },
            //             yes() {
            //                 layer.close(dialog)
            //             }
            //         });
            //     });
            // },
            //初始化上传附件
            initUploader() {
                if ((this.role != '运作总监' && this.role != "公司内部运作") || this.uploader) return;
                const that = this;
                this.loading();
                require(['webuploader'], (WebUploader) => {
                    that.loading("close")
                    that.uploader = 1
                    var uploader = WebUploader.create({
                        // 文件接收服务端。
                        server: "/contract/uploadAttachment.do",
                        runtimeOrder: 'html5',
                        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                        pick: {
                            id: '#fileUp',
                            innerHTML: '上传附件'
                        },
                        resize: false,
                        fileNumLimit: 10
                    });

                    //上传成功
                    uploader.on('uploadSuccess', function (file, res) {
                        res.type = "案件"
                        that.c.attachs.push(res)
                    });

                    uploader.on('uploadStart', function () {
                        that.loading()
                    })
                    //上传出错
                    uploader.on('uploadError', function (file) {
                        layer.msg('上传出错');
                    });
                    //出错
                    uploader.on('error', function (res) {
                        if (res == 'Q_TYPE_DENIED') {
                            layer.msg('上传文件格式错误，请检查')
                        }
                    });
                    //上传完成
                    uploader.on('uploadFinished', function (file) {
                        uploader.reset();
                        $.post(config.api_saveProductAttach, that.attachs)
                            .done(() => {
                                that.loading("close")
                            })
                    });
                    //文件加入队列
                    uploader.on('fileQueued', function () {
                        uploader.upload()
                    })
                })
            },
            /**
             * 删除
             * 
             * @param {any} i 序号
             */
            attachs_delete(i) {
                const that = this;
                const dialog = layer.confirm("确定删除此附件?", () => {
                    that.c.attachs.splice(i, 1)
                    $.post(config.api_saveProductAttach, that.attachs)
                        .done(() => {
                            that.loading("close")
                            layer.close(dialog)
                        })
                })
            },
            /**
             * 新增/编辑记录
             * 
             * @param {0/1/'call'} edit 是否是编辑状态,电话状态 
             * @param {number} i 编辑状态下的项目序号
             * @param {obj} el 编辑状态下的项目本身
             * 
             */
            record_add(edit, i,el) {
                const that = this;
                let url = ''
                switch (this.type) {
                    case 3: //跟进
                        require(['text!follow_add'], (html) => {
                            const dialog = layer.open({
                                type: 1,
                                title: '跟进记录',
                                closeBtn: 1,
                                content: html,
                                area: ['600px', '600px'],
                                btn: "保存",
                                btnAlign: 'c',
                                success() {
                                    //跟进时间初始化   
                                    laydate({
                                        elem: '#log_createTime', //需显示日期的元素选择器
                                        event: 'click',
                                        format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                                        istime: true, //是否开启时间选择
                                        istoday: true, //是否显示今天
                                    })
                                    //跟进时间初始化   
                                    laydate({
                                        elem: '#log_xcgjTime', //需显示日期的元素选择器
                                        min:laydate.now(),
                                        event: 'click',
                                        format: 'YYYY-MM-DD hh:mm:ss', //日期格式
                                        istime: true, //是否开启时间选择
                                        istoday: true, //是否显示今天
                                    })
                                    $('#log_createTime').val(laydate.now((new Date()).getTime(), 'YYYY-MM-DD hh:mm:ss'))
                                    $('#log_xcgjTime').val("")
                                    //附件初始化
                                    app.loading();
                                    require(['webuploader'], (WebUploader) => {
                                        app.loading("close")
                                        var uploader = WebUploader.create({
                                            // 文件接收服务端。
                                            server: "/contract/uploadAttachment.do",
                                            runtimeOrder: 'html5',
                                            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                                            pick: {
                                                id: '#follow_fileUp',
                                                innerHTML: '上传附件'
                                            },
                                            resize: false,
                                            fileNumLimit: 10
                                        });

                                        //上传成功
                                        uploader.on('uploadSuccess', function (file, res) {
                                            var container = $(".file-list");
                                            var str = encodeURI(JSON.stringify(res));
                                            var html = '<div data-info="' + str + '" class="alert alert-info alert-dismissable file-list-item"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'
                                            html += '<a href="' + res.url + '" target="_blank"> ' + res.originalFilename + ' </a></div>'
                                            container.append(html);
                                        });

                                        uploader.on('uploadStart', function () {
                                            app.loading()
                                        })
                                        //上传出错
                                        uploader.on('uploadError', function (file) {
                                            layer.msg('上传出错');
                                        });
                                        //出错
                                        uploader.on('error', function (res) {
                                            if (res == 'Q_TYPE_DENIED') {
                                                layer.msg('上传文件格式错误，请检查')
                                            }
                                        });
                                        //上传完成
                                        uploader.on('uploadFinished', function (file) {
                                            uploader.reset();
                                            $.post(config.api_saveProductAttach, that.attachs)
                                                .done(() => {
                                                    app.loading("close")
                                                })
                                        });
                                        //文件加入队列
                                        uploader.on('fileQueued', function () {
                                            uploader.upload()
                                        })
                                    })
                                    //编辑状态初始化
                                    if (edit == 1) {
                                        var form = $('#follow_add');
                                        var json = that.sa[i]
                                        form.find("[name=link]").children('[value="' + json.link + '"]').prop("selected", true);
                                        form.find("[name=gjStatus]").children('[value="' + json.gjStatus + '"]').prop("selected", true);
                                        $("#log_createTime").val(json.createTime);
                                        form.find("[name=remark]").val(json.remark);
                                        $('#log_xcgjTime').val(json.xcgjTime)
                                        var attachs = '';
                                        $.each(json.attachs, function () {
                                            if (this.id) this.attachId = this.id
                                            attachs += '<div data-info="' + encodeURI(JSON.stringify(this)) + '" class="alert alert-info alert-dismissable file-list-item"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button><a href="' + this.url + '" target="_blank"> ' + this.originalFilename + ' </a></div>'
                                        })
                                        $(".file-list").html(attachs)
                                    }
                                },
                                yes() {
                                    //如果是电话状态需要取得回信之后才能保存
                                    if(edit=='call'&&!top.callId){
                                        layer.msg('请挂断电话之后再保存跟进记录')
                                        return;
                                    }
                                    var self = this;
                                    var form = $('#follow_add');
                                    var data = {
                                        orderId: config.orderId,
                                        link: form.find("[name=link]").val(),
                                        gjStatus: form.find("[name=gjStatus]").val(),
                                        remark: form.find("[name=remark]").val(),
                                        createTime: $("#log_createTime").val(),
                                        xcgjTime:$('#log_xcgjTime').val(),
                                        debtorName:that.c.debtorName
                                    };
                                    var ajaxURL = "/order/saveProcess";
                                    if (edit == 1) {
                                        data.id = that.sa[i].id
                                        ajaxURL = "/order/updateProcess";
                                    }
                                    var realPath = [];
                                    var originalFilename = [];
                                    var url = [];
                                    var uploadTime = [];
                                    var uploader = [];
                                    var fileSize = [];
                                    var attachId = [];
                                    $.each(form.find(".file-list-item"), function (indexInArray, valueOfElement) {
                                        var info = JSON.parse(decodeURI($(this).data("info")));
                                        realPath.push(info.realPath);
                                        originalFilename.push(info.originalFilename);
                                        url.push(info.url);
                                        uploadTime.push(info.uploadTime);
                                        uploader.push(info.uploader);
                                        fileSize.push(info.fileSize);
                                        attachId.push(info.attachId || 0);
                                    });
                                    data.realPath = realPath.join(",");
                                    data.originalFilename = originalFilename.join(",");
                                    data.url = url.join(",");
                                    data.uploadTime = uploadTime.join(",");
                                    data.uploader = uploader.join(",");
                                    data.fileSize = fileSize.join(",");
                                    data.attachId = attachId.join(",");
                                    data.callId = top.callId;
                                    app.loading();
                                    $.post(ajaxURL, data,
                                        function (res) {
                                            if (res.error == "00") {
                                                layer.close(dialog)
                                                that.getCaseRecord(3)
                                                app.loading("close");
                                            }
                                        }
                                    );
                                }
                            });
                        })
                        break;
                    case 1://案件报告
                        url = '/workBench/goOrderTask.do?orderId=' + config.orderId + '&type=' + that.type
                        if (edit == 1) {
                            url = '/workBench/goOrderTask.do?id=' + app.sb[i].id + '&orderId=' + config.orderId + '&type=' + app.type
                        }
                        var dialog = layer.open({
                            type: 2,
                            title: '案件报告',
                            content: url,
                            area: ['600px', '600px'],
                        });
                        break;
                    case 5://案件回款计划
                        if (edit==1) {  //编辑
                             const dialog_edit = app.$refs.payplan_edit
                            dialog_edit.init(el)
                        } else { //新增
                             const dialog_add = app.$refs.payplan;
                            dialog_add.init()
                        }
                        break;
                    case 2://案件回款明细
                        url = '/workBench/goOrderTask.do?orderId=' + config.orderId + '&type=7&syMoney=' + app.c.syMoney
                        if (edit == 1) {
                            url = '/workBench/goOrderTask.do?id=' + app.se[i].id + '&orderId=' + config.orderId + '&type=7&syMoney=' + app.c.syMoney
                        }
                        var dialog = layer.open({
                            type: 2,
                            title: '案件回款',
                            content: url,
                            area: ['600px', '600px'],
                        });
                        break;
                    default:
                        break;
                }
            },
            //执行回款预估或诉讼仲裁
            doTask(type) {
                if (type == 8 && this.precalc == true) {
                    return;
                } else if (type == 5 && this.supplylaw == true) {
                    return
                }
                const dialog = layer
                    .open({
                        type: 2,
                        title: '执行',
                        content: '/workBench/goOrderTask.do?orderId='
                        + config.orderId + '&type=' + type,
                        area: ['600px', '600px']
                    });
            },
            //新增提醒
            remind_add() {
                const that = this;
                require(['text!remind'], (html) => {
                    const dialog = layer.open({
                        type: 1,
                        title: '新增提醒',
                        closeBtn: 1,
                        content: html,
                        area: ['600px', '300px'],
                        btn: "保存",
                        btnAlign: 'c',
                        success() {
                            laydate({
                                elem: '#remind_time', //需显示日期的元素选择器
                                event: 'click',
                                format: 'YYYY-MM-DD', //日期格式
                                min: laydate.now(),
                                istoday: true, //是否显示今天
                            })
                            $('#remind_time').val(laydate.now((new Date()).getTime(), 'YYYY-MM-DD'))
                        },
                        yes() {
                            const form = $('#remind_box')
                            if(form.find("[name=remark]").val()==""){
                                layer.msg("请填写提醒内容");
                                return;
                            }
                            $.post(config.api_saveCallInfo, {
                                orderId: config.orderId,
                                remark: form.find("[name=remark]").val(),
                                time: form.find("[name=time]").val()
                            }).done((res) => {
                                that.getCaseDetail();
                                layer.close(dialog)
                            })
                        }
                    })
                }
                )


            },
            //提醒完成
            remind_complete(index, el) {
                const that = this;
                const dialog = layer.confirm("确认完成?", () => {
                    $.post(config.api_updateCallInfo, {
                        id: el.id
                    }).done((res) => {
                        if (res.error == '00') {
                            el.flag = 1
                            layer.close(dialog)
                        } else {
                            layer.close(dialog)
                            layer.msg(res.msg)
                        }
                    })
                })

            },
            letter_add(){
                const that = this;
                const runnerName = encodeURI(JSON.parse(localStorage.userInfo).list[0].NAME);
                const debtorName = encodeURI(that.c.debtorName) 
		var index = layer.open({
			type : 2,
			title : '新增函件',
			content : `/express/goAdd.do?orderId=${config.orderId}&runnerName=${runnerName}&debtorName=${debtorName}`,
			area : [ '90%', '90%' ]
		});

            },
            /**
             * 
             * 电话按钮
             * @param {any} e 事件
             * @param {any} type 0/鼠标移入/1/鼠标移出 
             */
            call_btn(e,type){
                const $t = $(e.target);
                if($t.find('span').length&&type==0){
                $t.find('span').show()
                }else if(type==1){
                    $t.find('span').hide()
                }
            },
                call(el, phone) {
				const that = this;
                this.record_add('call')
				that.loading();
                top.callId="";
				$.post(config.api_call, {
                    orderId:config.orderId,
					mobilePhone: phone
				}).done((res) => {
					that.loading("close");
				})
			},
                //查看函件
				viewhj(id){
					layer.open({
						type:2,
						area:["90%","90%"],
						content:'/express/view.do?id=' + id
					})
				}
        }
    })
})

//子页面处理方法
window.parentFnc = function (params) {
    layer.closeAll();
    //更新记录
    window.app.getCaseRecord(window.app.type)
    window.app.getCaseDetail()
}


