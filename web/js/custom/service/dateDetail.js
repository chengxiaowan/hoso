var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url + '/service/getPhotoServiceTimeById', //获取工作室列表
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        type:  '', // 类型
        date: '', // 日期
        time: '', // 起止时间
        num: '', // 拼团人数
        minNum: '', // 最低拼团人数
        cost: '', // 费用
        profit: '', // 实际收益
        muster: '',// 集合时间地点
    },
    mounted: function () {
        const that = this;
        that.getDetail(); // 获取详情
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function (s) {
            if (s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },
        // 获取日期详情
        getDetail: function(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    id: id
                },
                success: function(res) {
                    if(res.error == "00") {
                        that.date = formatDate(res.result.time).substring(0,10);
                        that.time = res.result.timeSlot;
                        that.type = res.result.type;
                        that.muster = res.result.gatherAdrTime;
                        that.cost = res.result.price;
                        that.profit = res.result.price * 0.8;
                        that.num = res.result.peopleNum;
                        that.minNum = res.result.minPeopleNum;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
    }
})
