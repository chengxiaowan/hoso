//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + '/memPackage/showAdvs',
    api_del: api_url + '/memPackage/deleteAdvs',
    api_edit: api_url + '/memPackage/updateAdvs'
}

var id = parameter().id;


window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是会员包管理",
        keywords: "",
        type: "",
        list: [],
        num:"",
        item:{},
        dialogVisible:false,
        ids:"",
    },
    methods: {
        goAdd() {
            const that = this
            sessionStorage.setItem("advids",this.ids)
            let index = layer.open({
                type: 2,
                title: "广告列表",
                content: "./bindnewAD.html?" + "id=" + id,
                // content: "add.html",
                area: ["1553px", "726px"],
                end: () => {
                    that.getdata(1)
                }
            })
        },
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
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                    memPackageId:id
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result

                        let arr = []
                        res.result.list.forEach(i=>{
                            arr.push(i.advId)
                        })

                        this.ids = arr.join(",")





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

        del(item){
            const that = this
            this.$confirm('是否确定删除该广告?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                $.ajax({
                    url:config.api_del,
                    type:"POST",
                    data:{
                        id:item.id
                    },
                    success:res=>{
                        if(res.error == "00"){
                            layer.msg("删除成功")
                            that.getdata()
                        }
                    }
                })
              }).catch(() => {});
        },

        edit(item){
            const that = this
            that.item = item
            that.dialogVisible = true
        },

        edits(){
            const that = this
            $.ajax({
                url:config.api_edit,
                type:"POST",
                data:{
                    id:that.item.id,
                    sortNum:that.item.sortNum
                },
                success:res=>{
                    if(res.error == "00"){
                        layer.msg("修改成功")
                        that.dialogVisible = false
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