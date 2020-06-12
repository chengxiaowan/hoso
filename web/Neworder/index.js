let confing = {
    api_list: `${api_url}/saleOrder/dataList`,
}

window.app = new Vue({
    el: "#app",
    data() {
        return {
            keywords: "",
            keywords2: "",
            keywords3: "",

            type: "",
            type2: "",
            type3: "",

            pageSize: "10",
            pageSize2: "10",
            pageSize3: "10",

            pageNo: "1",
            pageNo2: "1",
            pageNo3: "1",

            list: [],
            list2: [],
            list3: [],
            solt:""

        }
    },
    methods: {
        //获取权益卡订单
        getcard() {
            let parmars = {
                keywords: this.keywords,
                pageSize: this.pageSize,
                orderType: 5,
                orderStatus: this.type,
                createTimeStart: $("#start").val(),
                createTimeEnd: $("#end").val(),
                pageNo:this.pageNo,
                //???
                type:this.solt
            }
            $.ajax({
                url: confing.api_list,
                type: "POST",
                data: parmars,
                success: res => {
                    this.list = res.result
                    // console.log(res)
                }
            })
        },

        page(e) {
            this.pageNo = e
            this.getcard()
        },

        size(e) {
            this.pageSize = e
            this.getcard()
        },


        //获取实物订单列表
        getorder() {
            let parmars = {
                keywords: this.keywords2,
                pageSize: this.pageSize2,
                orderType: "",
                orderStatus: this.type2,
                createTimeStart: $("#start1").val(),
                createTimeEnd: $("#end1").val(),
                pageNo:this.pageNo2
            }

            $.ajax({
                url: confing.api_list,
                type: "POST",
                data: parmars,
                success: res => {
                    this.list2 = res.result
                    // console.log(res)
                }
            })
        },

        page2(e) {
            this.pageNo2 = e
            this.getorder()
        },

        size2(e) {
            this.pageSize2 = e
            this.getorder()
        },

        // 编辑订单
		edit(id, orderType) {
			var index = layer.open({
				type: 2,
				title: '编辑订单',
				content: '../sales/edit.html?id=' + id + "&orderType=" + orderType,
				area: ['100%', '100%']
			});
        },

        edits(id, orderType) {
			var index = layer.open({
				type: 2,
				title: '编辑订单',
				content: '../sales/edits.html?id=' + id + "&orderType=" + orderType,
				area: ['100%', '100%']
			});
        },

        edit3(item) {
			var index = layer.open({
				type: 2,
				title: '编辑订单',
				content: 'edit.html?id=' + item.saleOrderId + "&memberName=" + item.memberName + "&orderType=" + item.orderType,
				area: ['100%', '100%']
			});
        },


        

        //获取虚拟商品
        getGoods(){
            let parmars = {
                keywords: this.keywords3,
                pageSize: this.pageSize3,
                orderType: "7",
                orderStatus: this.type3,
                createTimeStart: $("#start2").val(),
                createTimeEnd: $("#end2").val(),
                pageNo:this.pageNo3
            }

            $.ajax({
                url: confing.api_list,
                type: "POST",
                data: parmars,
                success: res => {
                    this.list3 = res.result
                    console.log(res)
                }
            })
        },

        page3(e) {
            this.pageNo3 = e
            this.getGoods()
        },

        size3(e) {
            this.pageSize3 = e
            this.getGoods()
        },

    },
    mounted() {
        //teb
        window.layui.use('element', function () {
            var element = layui.element;
        })

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

            laydate.render({
                elem: '#start1' //指定元素
            });
            laydate.render({
                elem: '#end1' //指定元素
            });

            laydate.render({
                elem: '#start2' //指定元素
            });
            laydate.render({
                elem: '#end2' //指定元素
            });

        });

        this.getcard()
        this.getorder()
        this.getGoods()
    },
})