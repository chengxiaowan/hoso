//接口交互
let config = {
    role: localStorage.userRole,
    //接口地址写在下面 使用api_url变量拼接
    api_list: api_url + "/memberCustomer/listBindGoods",
    api_del: api_url + '/memRights/delete',
    // api_save: api_url + '/memRights/update',        //上下架
    api_del:api_url + '/memberCustomer/deleteBindGoods ',        //SHENCHU1
    api_shops:api_url+"/supplier/dataList",
    api_add: api_url + "/memberCustomer/updaeBindGoods"


}

var id = parameter().id;
console.log(id)

window.app = new Vue({
    el: "#app",
    data: {
        info: "这里是权益管理",
        keywords: "",
        type: "",
        isOnsell: "",
        list: [],
        solt:"",
        shops:[],
        shop:"",

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
                    type: this.type,
                    isOnsell: this.isOnsell,
                    pageSize: this.list.pageSize || 10,
                    pageNo: this.list.pageNum || 1,
                    name:"",
                    customerId:id,
                    solt:this.solt,
                    supplierId:this.shop,
                    state:this.isOnsell


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
        add() {
            const that = this
            let index = layer.open({
                type: 2,
                title: "添加权益",
                content: "addgoods.html?id="+id,
                area: ["937px", "606px"],
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
        edit(item) {
            const that = this
            // console.log(item)
            sessionStorage.setItem('drool',JSON.stringify(item))
            // console.log(sessionStorage.getItem('item'))
            let index = layer.open({
                type: 2,
                title: "编辑",
                content: `editgoods.html?id=`+id,       //这个id是客户id
                area:  ["937px", "606px"],
                end: () => {
                    that.getdata()
                }
            })
        },

        //删除指定项
        del(item) {
            this.$confirm('您确定删除该权益？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_del,
                    type: "post",
                    async: true,
                    data: {
                        id: item.id,
                        // tableName: "member_rights"
                        // type: item.type,
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

        getshops(){
            const that = this
            $.ajax({
                url:config.api_shops,
                type:"POST",
                data:{
                    type:"1",
                    pageSize:100
                },
                success:res=>{
                    if(res.error == "00"){
                        console.log(res.result)
                        that.shops = res.result.list
                    }
                }
            })
        },

        //上下架

        onsell(item) {
            const that = this
            let parmas = {
                price: item.price, //售价
                customerId: id,      //客户ID
                state: item.state == "0"?"1":"0",    //上下架状态
                goodsNo: item.goods_no,     //产品编号
                id:item.id
            };
            console.log(item)
            console.log(parmas)

            this.$confirm(`您确定${item.state == "0"?"上架":"下架"}该权益？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                $.ajax({
                    url: config.api_add,
                    type: "post",
                    data: parmas,
                    success: res => {
                        if (res.error == "00") {
                            layer.msg("操作成功")
                            this.getdata()
                        } else {
                            layer.msg(res.msg);
                        }
                    }
                })
            }).catch(() => { });

        },

       
    },
    mounted() {
        console.log(config.api_list)
        this.getdata()
        this.getshops()
    },
})