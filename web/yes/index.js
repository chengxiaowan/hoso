//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/yes/selectList",
    api_up:api_url + "/yes/importExcel"

}


Vue.directive('select2', {
    inserted: function (el, binding, vnode) {
        let options = binding.value || {};
        $(el).select2(options).on("select2:select", (e) => {
            // v-model looks for
            //  - an event named "change"
            //  - a value with property path "$event.target.value"
            el.dispatchEvent(new Event('change', { target: e.target })); //说好的双向绑定，竟然不安套路
        });
    },
    update: function (el, binding, vnode) {
        for (var i = 0; i < vnode.data.directives.length; i++) {
            if (vnode.data.directives[i].name == "model") {
                $(el).val(vnode.data.directives[i].value);
            }
        }
        $(el).trigger("change");
    }
});


window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        type: "",
        // isOnsell: "",
        list: [],
        shops:[],
        shop:"",
        solt:"",
        upurl:config.api_up,
        price:"0",
        role:""
    },
    methods: {
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
                    keywords: this.keywords,
                    level:this.type,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
                        this.price = res.price
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
        add() {
            const that = this
            
            let index = layer.open({
                type: 2,
                title: "新增第三方商品",
                content: "../thirdParty/adds.html",
                area: ["100%", "100%"],
                end: () => {
                    that.getdata()
                    console.log("关了")
                }

            })
        },
        soso() {
            this.list.pageSize = 10
            this.list.pageNum = 1
            this.getdata()
        },

        uploadOk(response, file, fileList){
             const that = this
            if(response.error == "00"){
                this.$message({
                    message: '导入成功',
                    type: 'success'
                  });
                that.getdata()
            }
        },

        uperror(err, file, fileList){
            console.log(err)
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

        dowload(){
            window.open("/yes/exportExcel")
            JSON.parse
        }
       
       

      
    },
    mounted() {
        this.getdata()
        console.log(sessionStorage.getItem("roleType"))
        this.role = sessionStorage.getItem('roleType')
    },
})