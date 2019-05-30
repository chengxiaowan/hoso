const config = {
    mode: yo.getQueryString("mode"),
    role: localStorage.userRole,
    reportId: yo.getQueryString("id"),
    api_getMonthData: '/order/getMonthData.do',//获取当月数据
    api_saveMonthData:'/order/saveMonthData' //保存月报

}
window.app = new Vue({
    el: '#app',
    data: {
        c: {
            jdjdmb: '', //季度目标
            sjwc: '',//实际完成
            sjrate: '', //完成本月计划百分比
            gbs: "",
            yjja: "",
        },
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        userName: (JSON.parse(localStorage.userInfo)).list[0].NAME,
        thisMonth_hkje: 0,  //本月回款金额
        thisMonth_yjsr: 0, //本月佣金收入

        nextMonth_hkje: 0,  //下月
        nextMonth_yjsr: 0,
        thisMonth:[],
        nextMonth:[]

    },
    computed:{
        computed_jhrate(){
            return (((this.c.sjwc/this.c.jdjdmb)||0)*100).toFixed(2) + '%'
        },
        computed_sjrate(){
        	var res = (((this.thisMonth_hkje/this.c.syhkygje)||0)*100).toFixed(2)
        	if(res == Infinity) return ""
            return  res + '%'
        }
    },
    created() {
        const that = this;
              document.getElementById("app").classList.remove("hide")
        that.loading();
               $.ajax({
            url: config.api_getMonthData,
            async: false,
            data:{
                id:config.reportId
            },
            success: function (res) {
                that.c = $.extend({}, that.c, res.result)
                if(res.result.userName) that.userName = res.result.userName
                document.getElementById("app").classList.remove("hide")
                that.loading("close")
                    const data = [];
                    const rq = that.c.rq.split('@bzf@')
                    const zqr = that.c.zqr.split('@bzf@')
                    const zwr = that.c.zwr.split('@bzf@')
                    const hkje = that.c.hkje.split('@bzf@')
                    const yjsr = that.c.yjsr.split('@bzf@')
                    const jhnwzd = that.c.jhnwzd.split('@bzf@')
                    let i = 0
                    rq.length = (rq.length==1&&rq[0]!="")==1 ? rq.length : (rq.length-1)
                    if(rq.length){
                    for (i = 0; i < rq.length; i++) {
                        data[i] = {}
                        data[i].rq = rq[i]
                        data[i].zqr = zqr[i]
                        data[i].zwr = zwr[i]
                        data[i].hkje = hkje[i]
                        data[i].yjsr = yjsr[i]
                        data[i].jhnwzd = jhnwzd[i]
                        that.thisMonth_hkje += Number(hkje[i])
                        that.thisMonth_yjsr += Number(yjsr[i])
                    }
                    if(data[0].rq) that.thisMonth = data
                    }

                        const yjdata = [];
                        const yjrq = that.c.yjrq.split('@bzf@')
                        const yjzqr = that.c.yjzqr.split('@bzf@')
                        const yjzwr = that.c.yjzwr.split('@bzf@')
                        const yjhkje = that.c.yjhkje.split('@bzf@')
                        const yjyjsr = that.c.yjyjsr.split('@bzf@')
                        let ndfx = [];
                        if(that.c.yjndfx&&that.c.yjndfx[0]){
                            ndfx = that.c.yjndfx.split('@bzf@')
                        }
                        yjrq.length = (yjrq.length==1&&yjrq[0]!="") ? yjrq.length : (yjrq.length-1)
                        if(yjrq.length){
                        i = 0
                        for (i = 0; i < yjrq.length; i++) {
                            yjdata[i] = {}
                            yjdata[i].rq = yjrq[i]
                            yjdata[i].zqr = yjzqr[i]
                            yjdata[i].zwr = yjzwr[i]
                            yjdata[i].hkje = yjhkje[i]
                            yjdata[i].yjsr = yjyjsr[i]
                            yjdata[i].ndfx = ndfx[i]
                            that.nextMonth_hkje += Number(yjhkje[i])
                            that.nextMonth_yjsr += Number(yjyjsr[i])
                        }
                        if(yjdata[0].rq) that.nextMonth = yjdata
                        }
            }
        });
        if (config.mode) {
            $('#app').find('input,textarea').prop("readonly",true)
        }

    },
    methods: {
        /**
         * 载入中方法
         * 
         * @param {string} s 是否关闭
         */
        loading(s) {
            if (s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
            // else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
        },
        save(status) {
            this.c.yjndfx = []
            for (var i = 0; i < this.nextMonth.length; i++) {
               this.c.yjndfx.push(this.nextMonth[i].ndfx)
            }
            this.c.yjndfx = this.c.yjndfx.join('@bzf@')
            this.c.status = status
            this.c.title = document.getElementById('title').innerHTML
            this.c.jhrate = this.jhrate
            $.post(config.api_saveMonthData,this.c,(res)=>{
               if(res.error="00"){
                   parent&&parent.layer.closeAll()
                   parent&&parent.location.reload()
               }else{
                   layer.msg(res.msg)
               }
            })
        },
        edit(status){
            this.c.id = config.reportId
            this.save(status)       
        }

    }
})


//子页面处理方法
window.parentFnc = function (params) {
    layer.closeAll();
    //更新记录
    window.app.getCaseRecord(window.app.type)
}


