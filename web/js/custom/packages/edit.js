/*
 * @Author: chengxiaowan(1045114585@qq.com) 
 * @Date: 2020-07-20 09:22:52 
 * @Last Modified by: chengxiaowan(1045114585@qq.com)
 * @Last Modified time: 2020-07-27 14:13:24
 */

//  在这里获取权益卡ID，不管这个页面是怎么进来的 都要在url拼接一个id
var id = parameter().id;

var config = {
    api_addGroup: api_url + '/memPackage/addGroup',   //新增分组
    api_groupList: api_url + '/memPackage/showGroupOrmemRights',//获取分组列表


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
            groupName:"",
            dialogVisible:false,

            //


            //这里处理页面上的数据
            groupList:[],       //已有的分组列表

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
            if(sessionStorage.getItem("isGroup") == "0"){
                return
            }
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
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

    },

    mounted() {
        layui.use('element', function () {
            var element = layui.element;
        });

        console.log("Vue is mounted")

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
    }


})