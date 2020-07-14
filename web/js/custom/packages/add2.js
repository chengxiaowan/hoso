/*
 * @Author: chengxiaowan(1045114585@qq.com) 
 * @Date: 2020-07-20 09:22:52 
 * @Last Modified by: chengxiaowan(1045114585@qq.com)
 * @Last Modified time: 2020-07-30 14:19:33
 */

//  在这里获取权益卡ID，不管这个页面是怎么进来的 都要在url拼接一个id
var id = parameter().id;

// var id = 94

console.log(id)

var config = {
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_addGroup: api_url + '/memPackage/addGroup',   //新增分组
    api_groupList: api_url + '/memPackage/showGroupOrmemRights',//获取分组列表
    api_quan: api_url + '/memRights/list',           //优惠券列表
    api_goods: api_url + '/goods/dataList',         //实物商品列表
    api_Numgoods: api_url + '/memRights/getGoodsByFacilitatorName',//虚拟商品
    api_list: api_url + "/memPackage/showGroupOrmemRights",     //已绑定权益
    api_del: api_url + '/memPackage/deleteRightsBind',          //解除绑定关系



    api_advlist: api_url + '/memPackage/showAdvs',       //广告列表
    api_advdel: api_url + '/memPackage/deleteAdvs',      //删除广告
    api_advedit: api_url + '/memPackage/updateAdvs',     //广告编辑
    api_advadd: api_url + '/memPackage/bindAdvs',        //广告添加

    api_addGroups: api_url + '/memPackage/addGoodsGroup',   //新增分组  商家
    api_groupLists:api_url + '/memPackage/showGroupOrmemGoods',  //查询商家分组
    api_quan2: api_url + '/shops/dataList',           //商家获取
    api_bindshop:api_url + '/memPackage/bindGoods',







}

window.app = new Vue({
    el: "#app",
    data() {
        return {
            //七牛云 + element upload
            actionPath: "https://upload.qiniup.com",
            pic: "",
            postdata: { token: "" },
            baseurl: "https://images.homeplus.fun/", //七牛云储存域名，用于拼接key得到图片url

            //先处理模态框的
            //新增分组模态框
            groupName: "",
            dialogVisible: false,

            //新增商品模态框
            dialogVisible2: false,

            //新增商家商品的模态框
            dialogVisible3: false,
            dialogVisible4: false,

            groupName2:"",
            groupList2:"",
            groups: {},
            
            shopList:[],
            shopId:"",
            linshi:"",
            lists:[],
            groupId:"",
            



            //处理页面动态行为
            group: {},
            adv: "",


            //这里处理页面上的数据
            groupList: [],       //已有的分组列表
            quanList: [],              //优惠券列表
            goodsList: [],             //商品列表
            numList: [],               //虚拟商品列表
            pageNo: 1,                  //优惠券分页
            pageNo2: 1,                  //商品分页
            pageNo3: 1,                  //虚拟商品分页
            pageNo4: 1,                  //分页
            flag: "1",                    //选项卡 1优惠券 2虚拟商品 3实物

            //配置项项目
            keywords: "",        //关键字
            keywords2: "",       //实物
            keywords3: "",       //虚拟商品
            keywords4: "",       //商家商品
            type: "",
            solt: "",

            //已绑定权益
            list: [],

            advList: [],


            //广告字段
            advTitle: "",

        }
    },

    methods: {
        //上传后拼接Url
        handleAvatarSuccess(res, file) {
            console.log(res.url);
            this.pic = this.baseurl + res.url;
        },

        //上船前的检测--公用
        beforeAvatarUpload(file) {
            // const isJPG = file.type === "image/*";
            const isLt5M = file.size / 1024 / 1024 < 5;

            // if (!isJPG) {
            //   this.$message.error("上传图片只能是 JPG 格式!");
            // }
            if (!isLt5M) {
                this.$message.error("上传图片大小不能超过 5MB!");
            }
            return isLt5M;
        },

        //初始化富文本图片上传到七牛云的依赖
        getToken() {
            const that = this
            $.ajax({
                url: config.api_token,
                type: "GET",
                data: {},
                success: res => {
                    that.postdata.token = res
                    uploadInit(res)
                }

            })
        },


        //新增分组
        addGroup() {
            const that = this
            if (this.groupName == "") {
                layer.msg("请输入分组名称")
            }
            $.ajax({
                url: config.api_addGroup,
                type: "POST",
                data: {
                    memPackageId: id,
                    name: that.groupName,
                },
                success: res => {
                    if (res.error == "00") {
                        layer.msg("添加成功")
                        that.dialogVisible = false
                        that.groupName = ""
                        that.getGroup()
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //获取分组列表
        getGroup() {
            const that = this
            $.ajax({
                url: config.api_groupList,
                type: "POST",
                data: {
                    memPackageId: id
                },
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        that.groupList = res.result
                        if (that.groupList.length != 0) {
                            that.group = res.result[0]
                            this.getlist()
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        zuclick(item) {
            this.group = item
            this.getlist()

        },

        // 读取已经绑定的权益
        getlist() {
            $.ajax({
                url: config.api_list,
                type: "POST",
                data: {
                    memPackageId: id,
                    parentId: this.group.groupId,
                    pageSize: "100",
                },
                success: res => {
                    if (res.error == "00") {
                        this.list = res.result.list
                    }
                }
            })
        },

        //获取优惠券
        getQuan() {
            parmas = {
                keywords: this.keywords,
                pageSize: 10,
                pageNo: this.pageNo
            }
            $.ajax({
                url: config.api_quan,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.quanList = res.result
                    }
                }
            })
        },

        //实物
        getgoods() {
            let parmas = {
                pageNo: this.pageNo2,
                pageSize: 10,
                keywords: this.keywords2
            }

            $.ajax({
                url: config.api_goods,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.goodsList = res.result
                    }
                }
            })
        },

        //获取虚拟商品
        getNumgoods() {
            let parmas = {
                pageNo: this.pageNo3,
                pageSize: 10,
                keywords: this.keywords3,
                name: "",
                type: this.type,
                solt: this.solt

            }

            $.ajax({
                url: config.api_Numgoods,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.numList = res.result
                    }
                }
            })
        },

        //优惠券的分页
        page(e) {
            this.pageNo = e;
            this.getQuan();
        },

        page2(e) {
            this.pageNo2 = e;
            this.getgoods();
        },

        page3(e) {
            this.pageNo3 = e;
            this.getNumgoods();
        },

        page4(e) {
            this.pageNo3 = e;
            this.getshop();
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

        //添加优惠券
        add1(item) {
            const that = this
            let index = layer.open({
                type: 2,
                title: "完善其他信息",
                content: `../package/addquan.html?id=${item.id}&type=${item.type}&isGroup=1&isMain=1&ids=${id}`,
                area: ["1053px", "600px"],
                end: () => {
                    that.getlist()
                }

            })
        },
        add2(item) {
            const that = this
            console.log(item)
            sessionStorage.setItem("drool", JSON.stringify(item))
            let index = layer.open({
                type: 2,
                title: "完善其他信息",
                content: `../package/addNum.html?&isGroup=1&isMain=1&ids=${id}`,
                area: ["1053px", "600px"],
                end: () => {
                    that.getlist()
                }
            })
        },
        add3(item) {
            const that = this
            console.log(item)
            sessionStorage.setItem("item", JSON.stringify(item))
            let parmas = {
                isGroup: 1,
                isMain: 1,
                ids: id
            }
            sessionStorage.setItem("parmars", JSON.stringify(parmas))
            let index = layer.open({
                type: 2,
                title: "子商品",
                content: `../package/addGood.html`,
                area: ["1053px", "600px"],
                end: () => {
                    that.getlist()
                }
            })
        },

        //删除已绑权益
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
                        groupId: item.groupId,
                    },
                    success: res => {
                        if (res.error == "00") {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getlist()

                        }
                    }
                })
            }).catch(() => { });

        },

        //adv保存
        advSave() {
            if (this.advTitle == "") {
                this.$message.error("请输入广告名称")
                return
            }

            if (this.pic == "") {
                this.$message.error("请上传广告图片")
                return
            }

            let data = {
                memPackageId: id,
                title: this.advTitle,
                imageUrl: this.pic,
                description: editor.txt.html()
            }

            $.ajax({
                url: config.api_advadd,
                type: "POST",
                data: data,
                success: res => {
                    if (res.error == "00") {
                        this.$message("保存成功")
                        this.getAdvList()
                    }
                }
            })
        },

        //广告的修改
        editAdv() {
            if (this.advTitle == "") {
                this.$message.error("请输入广告名称")
                return
            }

            if (this.pic == "") {
                this.$message.error("请上传广告图片")
                return
            }

            let data = {
                memPackageId: id,
                id: this.adv.id,
                title: this.advTitle,
                imageUrl: this.pic,
                description: editor.txt.html()
            }

            $.ajax({
                url: config.api_advedit,
                type: "POST",
                data: data,
                success: res => {
                    this.$message("修改成功")
                    this.getAdvList()
                }
            })
        },

        //广告列表
        getAdvList() {
            $.ajax({
                url: config.api_advlist,
                type: "GET",
                data: {
                    memPackageId: id
                },
                success: res => {
                    if (res.error == "00") {
                        this.advList = res.result
                    }
                }
            })
        },

        //点击广告切换到编辑
        Advclick(item) {
            console.log(item)
            this.adv = item

            console.log(this.adv)
            this.advTitle = item.title;
            this.pic = item.imageUrl;
            editor.txt.html(item.description)
        },

        //点击广告小加号的处理
        addadv() {
            this.advTitle = "";
            this.adv = {};
            this.pic = "";

        },


        //删除广告
        deladv(){
            const that = this
            this.$confirm('是否确定删除该广告?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                $.ajax({
                    url:config.api_advdel,
                    type:"POST",
                    data:{
                        id:this.adv.id
                    },
                    success:res=>{
                        if(res.error == "00"){
                            this.$message("删除成功")
                            that.getAdvList()
                            that.addadv()
                        }
                    }
                })
              }).catch(() => {});
        },


        //新增商家商品分组
        addGroups() {
            const that = this
            if (this.groupName == "") {
                layer.msg("请输入分组名称")
            }
            $.ajax({
                url: config.api_addGroups,
                type: "POST",
                data: {
                    memPackageId: id,
                    name: that.groupName2,
                },
                success: res => {
                    if (res.error == "00") {
                        layer.msg("添加成功")
                        that.dialogVisible3 = false
                        that.groupName2 = ""
                        that.getGroups()
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        // 获取商家分组列表
        getGroups() {
            const that = this
            $.ajax({
                url: config.api_groupLists,
                type: "POST",
                data: {
                    memPackageId: id
                },
                success: res => {
                    console.log(res)
                    if (res.error == "00") {
                        that.groupList2 = res.result
                        if (that.groupList2.length != 0) {
                            that.groups = res.result[0]
                            this.getlists()
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //读取已经绑定的商家商品
          getlists() {
            $.ajax({
                url: config.api_groupLists,
                type: "POST",
                data: {
                    memPackageId: id,
                    parentId: this.groups.groupId,
                    pageSize: "100",
                },
                success: res => {
                    if (res.error == "00") {
                        this.lists = res.result
                    }
                }
            })
        },

        //点击分组
        groupsclick(item){
            this.groups = item
            this.getlists()
        },



        getshop() {
            parmas = {
                keywords: this.keywords4,
                pageSize: 10,
                pageNo: this.pageNo4
            }
            $.ajax({
                url: config.api_quan2,
                type: 'POST',
                data: parmas,
                success: res => {
                    if (res.error == "00") {
                        this.shopList = res.result
                    }
                }
            })
        },

        addshops(item){
            this.linshi = item
            console.log(this.linshi)
        },

        addshop(){
            if(this.linshi.shopsId == undefined){
                this.$message.error("请选择要加入的店铺")
                return
            }

            if(this.groupId == ""){
                this.$message.error("请选择分组")
                return
            }

            let data = {
                name:this.linshi.shopsName,
                type:0,
                memPackageId:id,
                relateId:this.linshi.shopsId,
                parentId:this.groupId
            }

            $.ajax({
                url:config.api_bindshop,
                type:"post",
                data:data,
                success:res=>{
                    if(res.error == "00"){
                        this.$message("绑定成功")
                        this.dialogVisible4 = false
                        this.linshi = ""
                        this.groupId = ""
                        this.getlists()

                    }
                }
            })
        }

       




    },

    mounted() {
        layui.use('element', function () {
            var element = layui.element;
        });

        console.log("Vue is mounted")

        //获取数据
        this.getGroup()
        this.getlist()
        this.getQuan()
        this.getAdvList()
        this.getGroups()
        this.getlists()
        this.getshop()
        //初始化一个日期组件
        layui.use('laydate', function () {
            var laydate = layui.laydate;

            //执行一个laydate实例
            laydate.render({
                elem: '#date' //指定元素
            });
        });

        //初始化七牛云
        this.getToken()


        //初始化富文本
        var E = window.wangEditor
        window.editor = new E('#editor')
        //允许七牛云上传
        window.editor.customConfig.qiniu = true
        //自定义层级
        window.editor.customConfig.zIndex = 100
        //创建
        window.editor.create()
    },

    watch: {
        flag(val) {
            if (val == "1") {
                //获取优惠券列表
                this.getQuan()
            }

            if (val == '2') {
                //获取实物列表
                this.getgoods()
            }

            if (val == '3') {
                //获取虚拟商品
                this.getNumgoods()
            }
        }
    }


})