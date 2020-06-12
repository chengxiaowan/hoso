// var api_url="http://192.168.0.110:8080"
// var api_url="http://192.168.0.122:8080"
// var api_url="http://localhost:8080"
var api_url="http://www.hanshe.pro:8080"
// var api_url="http://www.homeplus.fun:8080"     
// var api_url=''

/*将url?name=value&name=value转换为{name:value,name:value}*/
function gainParameter(url) {
    var urlParameter = url.split("?");
    urlParameter = urlParameter[1].split("&");
    var arr = {};
    for (var i in urlParameter) {
        var parameter = urlParameter[i].split("=");
        arr[parameter[0]] = parameter[1]
    }
    return arr
}

/*url参数返回封装*/
function parameter() {
    return gainParameter(decodeURI(window.location.href));
}
// 取消
function cancle() {
    var index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}
//输入框限制只能输入数字和小数
function clearNoNum(obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
    if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value= parseFloat(obj.value);
    }
}
// 时间戳转日期
function formatDate (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}

function getCurrentTime(){
    var date = new Date();
    var month = date.getMonth() + 1;

    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hours = date.getHours();
    if (hours >=0 && hours <= 9) {
        if (hours == 0) {
            hours = "00";
        } else{
            hours = "0" + hours;
        }
    }
    var minutes = date.getMinutes();
    if (minutes >=0 && minutes <= 9) {
        if (minutes == 0) {
            minutes = "00";
        } else{
            minutes = "0" + minutes;
        }
    }
    var seconds = date.getSeconds();
    if (seconds >=0 && seconds <= 9) {
        if (seconds == 0) {
            seconds = "00";
        } else{
            seconds = "0" + seconds;
        }
    }


    var currentdate = date.getFullYear()+"-"+ month+"-"+strDate+" "+hours+":"+minutes+ ":"+seconds;

    console.log(currentdate);
//2017.07.11 15:14:44
    return currentdate ;
}