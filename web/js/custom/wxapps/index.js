//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/wechat/list",
    api_info: api_url + '/wechat/getAuthCodeParam',               //获取绑定参数
    api_code: api_url + "/wechat/getModelList"

}

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        keywords2: "",
        type: "",
        isOnsell: "",
        list: [],
        dialogVisible: false,
        component_appid: "",     //开放平台ID
        pre_auth_code: "",       //预授权码
        redirect_uri: "http%3A%2F%2Fy33630t181.goho.co%2Fstatic%2Fweb%2Fwxapps%2Fsuccess.html",        //回调Url
        codelist:[]
    },
    methods: {
        goRoom(item) {
            let index = layer.open({
                type: 2,
                title: "绑定房券",
                content: "add-rom.html?mrId=" + item.id,
                area: ["100%", "100%"]
            })
            console.log(item)
        },
        getdata(page) {
            // console.log("drool")
            const that = this
            $('body,html').scrollTop(0)
            if (page) this.list.pageNum = page
            $.ajax({
                url: config.api_list,
                async: true,
                type: "POST",
                data: {
                    name: this.keywords,
                    principalName:this.keywords2,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                        console.log(res)
                        //分页
                        if (this.pagi) {
                            $('.pagi').pagination('updatePages', this.list.pages)
                            if (page == 1) $('.pagi').pagination('goToPage', this.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function (num) {
                                    that.list.pageNum = num
                                    that.getdata()
                                    yo.scrollTo('body')
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }

            })
        },
        add(item) {
            const that = this
            let index = layer.open({
                type: 2,
                title: "详情",
                content: "../wxapps/add.html?appid="+item.appId,
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                }

            })
        },
        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },

        //删除指定项
        del(item) {
            this.$confirm('您确定删除该优惠券？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "get",
                    async: true,
                    data: {
                        id: item.id,
                        // tableName: "member_rights"
                        type: item.type,
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getdata(1)
                        }
                    }
                })
            }).catch(() => { });
        },

        openwindow(){
            this.dialogVisible = true;
            this.bindApp()
        },


        bindApp() {
            const that = this
            //获取到授权需要的component_appid  pre_auth_code
            //回调url (redirect_uri)为固定页面
            $.ajax({
                url: config.api_info,
                type: "POST",
                data: {},
                success: res => {
                    if (res.error == "") {
                        that.pre_auth_code = res.result.pre_auth_code
                        that.component_appid = res.result.component_appid
                        let url = `https://mp.weixin.qq.com/cgi-bin/componentloginpage?component_appid=${that.component_appid}&pre_auth_code=${that.pre_auth_code}&redirect_uri=${that.redirect_uri}&auth_type=2`
                        window.open(url,"_blank");    
                    }
                }
            })
        },

        bindsuccess(){
            //这一步关闭弹窗+刷新列表
            this.dialogVisible = false

            this.getdata()
        },

        getcode(){
            let that = this
            $.ajax({
                url:config.api_code,
                type:"GET",
                success:res=>{
                    if(res.errcode == "0"){
                        that.codelist = res.template_list
                    }
                }
            })
        },

        upcode(item){
            let that = this

            sessionStorage.setItem("wxapp",JSON.stringify(item))

            let index = layer.open({
                type: 2,
                title: "模板列表",
                content: "../wxapps/codelist.html",
                area: ["914px", "640px"],
                end: () => {
                    that.getdata()
                }

            })
        },

         //时间格式化
         formatDateTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
        },

        history(item){
            const that = this
            let index = layer.open({
                type: 2,
                title: "模板列表",
                content: "../wxapps/codelist.html",
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                }

            })
        }


    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
        this.getcode()
    },
})