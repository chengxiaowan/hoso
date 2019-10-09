var config = {
    role: localStorage.userRole,
    api_list: api_url+'/shops/dataList', //获取列表
    api_del:api_url+'/shops/del',//删除店铺
    api_img: api_url + '/create_image', //二维码
	api_ewm: api_url + '/weixin/getwxTwoEconde',
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 列表
        keywords: '', // 名称
        endDate: '', // 结束时间
        typeId: '', // 标签类型   0:其他 1: 类型标签 2:颜色标签 3:风格标签 4: 其他标签
        bg_show1: false,
		image_ewm: '',
		img_name: '',
		status:'',
    },
    created: function() {
        var that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            var endDate= laydate.render({
                elem: '#end',//选择器结束时间
                format: 'yyyy-MM-dd',//可任意组合
                min:"1970-1-1",//设置min默认最小值
                done: function(value,date){
                    that.endDate = value;
                    startDate.config.max={
                        year:date.year,
                        month:date.month-1,//关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds : 0
                    }
                }
            });
            //日期范围
            var startDate=laydate.render({
                elem: '#start',
                format: 'yyyy-MM-dd',//可任意组合
                max:"2099-12-31",//设置一个默认最大值
                done: function(value, date){
                    that.startDate = value;
                    console.log(that.startDate);
                    endDate.config.min ={
                        year:date.year,
                        month:date.month-1, //关键
                        date: date.date,
                        hours: 0,
                        minutes: 0,
                        seconds : 0
                    };
                }
            });
        });
        that.getData();
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function(s) {
            if(s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },

        getData: function(page,keywords,type,startDate,endDate) {
            $('body,html').scrollTop(0)
            if(page) this.list.pageNum = page
            var that = this;
            that.loading();
            $.ajax({
                url: config.api_list,
                async: true,
                type: 'post',
                data: {
                    keywords: that.keywords,
                    shopsType:that.typeId,
                    pageSize: that.list.pageSize || 10,
                    pageNo: that.list.pageNum || 1,
                    userId:window.sessionStorage.getItem('userId'),
                    status:that.status
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        //分页
                        if(that.pagi) {
                            $('.pagi').pagination('updatePages', that.list.pages)
                            if(page == 1) $('.pagi').pagination('goToPage', that.list.pageNum)
                        } else {
                            that.pagi = $('.pagi').pagination({
                                pages: that.list.pages, //总页数
                                showCtrl: true,
                                displayPage: 6,
                                currentPage: that.list.pageNum,
                                onSelect: function(num) {
                                    that.list.pageNum = num
                                    that.getData()
                                }
                            })
                        }
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 查看店铺
        view(item) {
            var index = layer.open({
                type : 2,
                title : '店铺详情',
                content: 'detail.html?id='+item.shopsId+'&labels='+item.labels+'&ids='+item.shopsBrandId,
                area : [ '100%', '100%' ]
            });
        },
        search(){
            const that = this;
            that.getData(1);
        },
        jumpToProvider(){
        	var index = layer.open({
                type : 2,
                title : '新增店铺',
                content: 'add.html',
                area : [ '100%', '100%' ]
            });
        },
        // 删除店铺
        del(id) {
            const that = this;
            const dialog = layer.confirm("确认删除该店铺?", {
                title: "提示"
            }, () => {
                $.get(config.api_del, {
                    shopsId: id
                }, function(data) { // 回调函数
                    if(data.error == '00') {
                        layer.close(dialog)
                        layer.msg("删除成功")
                        that.getData()
                    } else {
                        layer.msg(data.msg)
                    }
                })
            })
        },
        ewm(item) {
			let that = this
			let id = ''
			that.img_name = item.shopsName
			id = 'relateId=' + item.shopsId + ',type=1'
			$.ajax({
				type: "post",
				url: config.api_ewm,
				async: true,
				data: {
					page: 'pages/store_detail/store_detail',
					id: id
				},
				success(res) {
					that.bg_show1 = true
					that.image_ewm = res.result
					that.$nextTick(function() {
						var top = $(document).scrollTop() + 200
						$(".ewm").css('top', top + 'px')
					})
				}
			});
		},
		hide1() {
			let that = this
			that.bg_show1 = false
		},
		downloadIamge(imgsrc, name) {

			//下载图片地址和图片名 
			var image = new Image();
			// 解决跨域 Canvas 污染问题
			image.setAttribute("crossOrigin", "anonymous");
			image.onload = function() {
				var canvas = document.createElement("canvas");
				canvas.width = image.width;
				canvas.height = image.height;
				var context = canvas.getContext("2d");
				context.drawImage(image, 0, 0, image.width, image.height);
				var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据     
				var a = document.createElement("a"); // 生成一个a元素   
				var event = new MouseEvent("click"); // 创建一个单击事件   
				a.download = name || "photo"; // 设置图片名称    
				a.href = url; // 将生成的URL设置为a.href属性    
				a.dispatchEvent(event); // 触发a的单击事件  
			};
			image.src = imgsrc;
		},
		downs() {
			let that = this
			this.downloadIamge(this.image_ewm, that.img_name)
		},
    }
})


