new Kalendae(document.getElementById("date"), {
    months:1,
    mode:'multiple',
    subscribe: {
        'date-clicked': function (date) {
            console.log(date._i, this.getSelected());
        }
    }
});
var config = {
    role: localStorage.userRole,
    api_save: api_url + '/service/addPhotoServiceTime',
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 品牌信息
        timeList: [''], // 起止时间
        num:'', // 拼团人数
        minNum:'', // 最低拼团人数
        cost: '',//费用
        profit: '', //实际收益
        muster: '', // 集合时间地点
        // type: 1,
        type: sessionStorage.getItem('type'),
    },
    created: function () {
        var that = this;
    },
    mounted: function () {
        const that = this;
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
        // 新增起止时间
        onAdd() {
            this.timeList.push('')
        },
        // 键入费用哪个
        fillCost(){
            this.profit = Math.ceil(this.cost*0.8) + ".00";
        },
        //保存数据
        save() {
            const that = this;
            var date = $('#date').val();
            // console.log(date.split(','));/*获取选中的日期*/
            // for(var i in that.timeList){
            //     console.log(that.timeList[i]);
            // }
            // console.log(that.num)
            // console.log(that.minNum)
            // console.log(that.type)
            // console.log(that.cost)
            // console.log(that.profit)
            // console.log(that.muster)
            if(that.type == 1){ // 定制
                if(date.length == 0){
                    layer.msg('请选择日期');
                }else if(that.timeList[0] == ''){
                    layer.msg('请输入起止时间');
                }else if(that.cost == ''){
                    layer.msg('请输入费用');
                }else{
                    that.addPhotoServiceTime(that.type, date, that.timeList, that.cost, that.muster, that.num, that.minNum);
                }
            }else{ // 拼团
                if(date.length == 0){
                    layer.msg('请选择日期');
                }else if(that.timeList[0] == ''){
                    layer.msg('请输入起止时间');
                }else if(that.num == ''){
                    layer.msg('请输入拼团人数');
                }else if(that.cost == ''){
                    layer.msg('请输入最低拼团人数');
                }else if(that.cost == ''){
                    layer.msg('请输入费用');
                }else{
                    that.addPhotoServiceTime(that.type, date, that.timeList, that.cost, that.muster, that.num, that.minNum);
                }
            }

        },
        // 调用添加接口
        addPhotoServiceTime(type, time, timeSlot, price, gatherAdrTime, peopleNum, minPeopleNum){
            var dateList = [];
            // console.log(timeSlot)
            for(var i in time.split(',')){
                for(var j in timeSlot){
                    var obj = {};
                    obj.time = time.split(',')[i];
                    obj.price = price;
                    obj.gatherAdrTime = gatherAdrTime;
                    obj.peopleNum = peopleNum;
                    obj.minPeopleNum = minPeopleNum;
                    obj.timeSlot = timeSlot[j];
                    dateList.push(obj)
                }
            }
            // console.log(dateList)
            $.ajax({
                url: config.api_save,
                traditional:true,
                async: true,
                type: 'post',
                data: {
                    photoServiceId: sessionStorage.getItem('id'),
                    type: type,
                    dateList: JSON.stringify(dateList)
                },
                success: res => {
                    console.log(res);
                    var index = parent.layer.getFrameIndex(window.name);
                    layer.msg('保存成功！');
                    setTimeout(function() {
                        // window.parent.location.reload();
                        parent.layer.close(index);
                    }, 1000);
                }
            })
        },
    }
})
