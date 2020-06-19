//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + '/specialTopic/specialTopicList',
    api_add: api_url + '/memPackage/bindAdvs'
}

var id = parameter().id;

console.log(id)


window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是会员包管理",
        keywords: "",
        type: "",
        list: [],
        item:"",
        dialogVisible:false,
        num:"",
    },
    methods: {
        //获取数据
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
                    type: this.type,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                    advIds:sessionStorage.getItem("advids")
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result
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

        add(item){
            this.item = item
            this.dialogVisible = true,
            this.num = ""

        },

        save(){
            const that = this
            console.log("走了")
            if(that.num == ""){
                layer.msg("请输入顺序号")
                return
            }
            $.ajax({
                url:config.api_add,
                type:"POST",
                data:{
                    memPackageId:id,
                    sortNum:that.num,
                    advId:that.item.specialTopicId
                },
                success:res=>{
                    if(res.error == "00"){
                        layer.msg("保存成功")
                        that.dialogVisible = false
                        that.getdata()
                    }
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
        

    },
    mounted() {
        console.log("Vue is Ok")
        this.getdata(1)
    },
})