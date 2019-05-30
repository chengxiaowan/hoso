$(function () {
    //按照创建时间进行循环变色
    $.each($("input[name=ids]"), function () {
        var $this = $(this);
        var _tr = $this.parents('tr')
        var _value = this.value;
        var _ctime = new Date((this.getAttribute("data-ctime")||0)).getTime();
        var _rtime = new Date((this.getAttribute("data-lastreport")||0)).getTime() || 0;
        var _now = new Date().getTime();
        //1天时间
        var oneTime = 60 * 1000 * 60 * 24
        //3天时间
        var threeTime = 60 * 1000 * 60 * 24 * 3
        //7天时间 
        var sevenTime = 60 * 1000 * 60 * 24 * 7
        //一月时间
        var monthTime = 60 * 1000 * 60 * 24 * 30

        //距离时间
        var gapTime = (_now - _ctime) / oneTime;

        var d23 = _ctime + monthTime - sevenTime  //23天后
        var d27 = _ctime + monthTime - threeTime // 27天
        var d29 = _ctime + monthTime - oneTime //29天
        var d30 = _ctime + monthTime  //30天
            
        console.log(this.getAttribute("data-lastreport"));
        //一个月之内 没写报告
        if (_rtime == 0) {
            //下次报告时间
             _tr.find(".nextReport-hook").text(date('Y-m-d',d30))
            if (_now < d23) return
            if (d23 <= _now && _now <= d27) {
                classChange('bg-limit-time3')
                return
            } else if (d27 < _now && _now <= d29) {
                classChange('bg-limit-time4')
                return
            } else if (d29 < _now && _now <= d30) {
                classChange('bg-limit-time5')
                return
            }
        }
        //超过一个月没写报告
        if ((_now - _ctime) > monthTime && _rtime == 0) {
            classChange('bg-limit-time5');
            //下次报告时间
            var rate = ((_now - _ctime) / monthTime).toString().split('.')[0]
              d30 = _ctime + monthTime * (rate - 0 + 1)  //30天
             _tr.find(".nextReport-hook").text(date('Y-m-d',d30))
            return
        }

        //超过一个月但写了报告
        if ((_now - _ctime) > monthTime && _rtime) {
            var rate = ((_now - _ctime) / monthTime).toString().split('.')[0]
            d23 = _ctime + monthTime * (rate - 0 + 1) - sevenTime  //23天后
            d27 = _ctime + monthTime * (rate - 0 + 1) - threeTime // 27天
            d29 = _ctime + monthTime * (rate - 0 + 1) - oneTime //29天
            d30 = _ctime + monthTime * (rate - 0 + 1)  //30天
            //下次报告时间
             _tr.find(".nextReport-hook").text(date('Y-m-d',d30))
             
            var lastMonthTimeD30 = _ctime + monthTime * (rate - 1)
            if (lastMonthTimeD30 > _rtime) {
                classChange('bg-limit-time5')
                return
            }
            if (lastMonthTimeD30 < _rtime && _rtime < d30) return
            if (_now < d23) return
            if (d23 <= _now && _now <= d27) {
                classChange('bg-limit-time3')
                return
            } else if (d27 < _now && _now <= d29) {
                classChange('bg-limit-time4')
                return
            } else if (d29 < _now && _now <= d30) {
                classChange('bg-limit-time5')
                return
            }
        }

        function classChange(className) {
            var _tr = $this.parents('tr')
            _tr[0].removeAttribute("class")
            _tr.addClass(className)
        }
    })
})

