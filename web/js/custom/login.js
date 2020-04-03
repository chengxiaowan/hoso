
//服务器校验
function severCheck() {
    if (check()) {
        var loginname = $("#loginname").val();
        var password = $("#password").val();
        var code = loginname + ",fh," + password + ",fh,"+ $("#code").val();
        $.ajax({
            type : "POST",
            url : api_url+'/login_login',
            data : {
                KEYDATA : code,
                tm : new Date().getTime()
            },
            dataType : 'json',
            cache : false,
            success : function(data) {
                if ("success" == data.result) {
                    saveCookie();
                    window.sessionStorage.setItem("userId",data.userId)
                    window.sessionStorage.setItem("roleType",data.roleType)
                    window.sessionStorage.setItem("roleName",data.roleName)
                    window.location.href = "/index.html";
                } else if ("usererror" == data.result) {
                    layer.tips('用户名或密码有误', "#loginBtn")
                    $("#loginname").focus();
                } else if ("codeerror" == data.result) {
                    layer.tips('验证码输入有误', "#code", {
                        tips : [ 4 ]
                    })
                    $("#code").focus();
                } else {
                    layer.tips(data.result, "#loginname")
                    $("#loginname").focus();
                }
            }
        });
    }
}
$(document).on('keyup', function(event) {
    if (event.keyCode == "13") {
        //回车执行查询
        severCheck()
    }
});
$(document).ready(function() {
    changeCode();
    $("#codeImg").bind("click", changeCode);
});

$(document).keyup(function(event) {
    if (event.keyCode == 13) {
        $("#to-recover").trigger("click");
    }
});

function genTimestamp() {
    var time = new Date();
    return time.getTime();
}

function changeCode() {
    $("#codeImg").attr("src", "code.do?t=" + genTimestamp());
}

//客户端校验
function check() {

    if ($("#loginname").val() == "") {
        layer.tips('用户名不得为空', "#loginname")
        $("#loginname").focus();
        return false;
    } else {
        $("#loginname").val(jQuery.trim($('#loginname').val()));
    }

    if ($("#password").val() == "") {
        layer.tips('密码不得为空', "#password")
        $("#password").focus();
        return false;
    }
    if ($("#code").val() == "") {
        layer.tips('验证码不得为空', "#code", {
            tips : [ 4 ]
        })
        $("#code").focus();
        return false;
    }
    layer.tips('正在登录,请稍后', "#loginBtn")
    return true;
}
function saveCookie() {
    if ($("#saveid").prop("checked")) {
        $.cookie('loginname', $("#loginname").val(), {
            expires : 7
        });
        $.cookie('password', $("#password").val(), {
            expires : 7
        });
    }else{
        $.cookie('loginname', '', {
            expires : -1
        });
    }
}
function quxiao() {
    $("#loginname").val('');
    $("#password").val('');
}

jQuery(function() {
    var loginname = $.cookie('loginname');
    var password = $.cookie('password');
    if (typeof (loginname) != "undefined") {
        $("#loginname").val(loginname);
        $("#password").val(password);
        $("#saveid").prop("checked", true);
        $("#code").focus();
    }
});