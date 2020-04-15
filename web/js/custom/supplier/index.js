
let config = {
    api_list: `${api_url}/supplier/dataList`,         //列表
    api_del:"/supplier/saveOrupdate"
}

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
            provinces:[],
            citys:[],
            province:"",
            city:""
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
                    province:this.province,
                    city:this.city,
                    type:this.type
                   
                },
                success: res => {
                    // console.log(res)
                    that.list = res.result
                }
            })
        },

        soso(){
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
        add(){
            const that = this
            var index = layer.open({
                type: 2,
                title: '新增',
                content: 'add.html',
                area: ['100%', '100%'],
                end:()=>{
                    that.getData()
                }
            });
        },
        edit(item){
            const that = this
            var index = layer.open({
                type: 2,
                title: '编辑',
                content: 'edit.html?id='+item.id,
                area: ['100%', '100%'],
                end:()=>{
                    that.getData()
                }
            });
        },

        cityc(){
            window.province.forEach(i=>{
                if(i.name == this.province){
                    this.citys = i.city
                }
            })
        },

        del(id){
            const that = this;
			const dialog = layer.confirm("确认删除该供应商吗?", {
				title: "提示"
			}, () => {
				$.get(config.api_del, {
					id: id,
					delFlag: '1'
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
        this.getData()
        this.provinces = function(){
            var arr = []
            window.province.forEach((i)=>{
                arr.push(i.name)
            })
            return arr
        }()
        // console.log(this.provinces)
    },
    
})