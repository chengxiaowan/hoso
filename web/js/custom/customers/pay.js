let config = {
    api_list: `${api_url}/memberPayLogs/list`,         //列表
    api_del: `${api_url}/memberPayLogs/delete`         //删除
}

var id = parameter().id;
console.log(id)
window.app = new Vue({
    el: "#app",
    data() {
        return {
            keywords: "",    //关键字
            start: "",       //开始时间
            end: "",         //结束时间
            type: "",        //状态
            list: [],
            pageNo: "1",
            pageSize: "10",
            flag: false,
        }
    },
    methods: {
        getData() {
            const that = this
            $.ajax({
                url: config.api_list,
                type: "POST",
                data: {
                    keywords: that.keywords,
                    pageNo: that.pageNo,
                    pageSize: this.pageSize,
                    createTimeStart: $("#start").val(),
                    createTimeEnd: $("#end").val(),
                    thridCustomerId:id,

                },
                success: res => {
                    let bobo = []
                    res.result.list.forEach(i => {
                        if (i.content) {
                            bobo.push(i)
                            // console.log(list)
                        } else {
                            i.content = "";
                            bobo.push(i)
                            // console.log(i)
                        }
                    });
                    console.log(bobo)
                    res.result.list = bobo
                    that.list = res.result
                }
            })
        },

        soso() {
            const that = this;
            that.pageNo = "1";
            that.pageSize = "10";
            that.getData()
        },



        page(e) {
            this.pageNo = e
            this.getData()
        },
        size(e) {
            this.pageSize = e
            this.getData()
        },
        add() {
            const that = this
            var index = layer.open({
                type: 2,
                title: '新增',
                content: 'payadd.html?id='+id,
                area: ['100%', '100%'],
                end: () => {
                    that.getData()
                }
            });
        },
        edit(item) {
            const that = this
            sessionStorage.setItem("supplier", JSON.stringify(item))
            var index = layer.open({
                type: 2,
                title: '编辑',
                content: 'payedit.html?id='+id+"&cid="+item.id,
                area: ['100%', '100%'],
                end: () => {
                    that.getData()
                }
            });
        },

        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该记录?", {
                title: "提示"
            }, () => {
                $.ajax({
                    url: config.api_del,
                    type: "POST",
                    data: {
                        id: id
                    },
                    success: res => {
                        if (res.error == "00") {
                            layer.msg("删除成功")
                        } else {
                            layer.close(dialog)
                            layer.msg("删除成功")
                            that.getData()
                        }
                    }
                })
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
            return y + '-' + m + '-' + d
        },
    },
    mounted() {
        //日期
        window.layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#start' //指定元素
            });
            laydate.render({
                elem: '#end' //指定元素
            });
        })
        this.getData()
    }
})