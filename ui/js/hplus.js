//自定义js

$(document).ready(function() {

	if(layer) {
		layer.config({
			scrollbar: false
		})
		layer.yoTips = function(content, el, params) {
			layer.config({
				scrollbar: true
			})
			return layer.tips(content, el, params)
			layer.config({
				scrollbar: false
			})
		}
	}

	//重置表单
	$(document).on("click", "[type='reset']", function(e) {
		e.preventDefault();
		var form = $(this).parents("form");
		form.find("input,select").val("");
	})

	//初始页面信息
	$.ajax({
		type: "POST",
		url: '/head/getList.do?tm=' + new Date().getTime(),
		data: encodeURI(""),
		async: false,
		dataType: 'json',
		cache: false,
		success: function(data) {
			$('#USERNAME').text(data.list[0].NAME)
			var role = ''
			switch(data.list[0].ROLE_ID) {
				case "7d2f882f13ea48e0a4c8acaeea53b3a5":
					role = '电销员工'
					break;
				case "30b1487221464d369ca4c2462ccca920":
					role = '电销员工'
					break;
				case "01dc6d29f1704efeab0376d327f47d98":
					role = '电销主管'
					break;
				case "90564dd8b75a4f6d815ce418462d401c":
					role = '电销商务顾问'
					break;
				case "e350acd05a6244c79136616302b7dfd6":
					role = '商务助理'
					break;
				case "fbe6f2f9535c4fce9f024f6cb999b2bd":
					role = '商务外协'
					break;
				case "b729e9334ad64c15a4e47d88b8c2638f":
					role = '商务顾问J'
					break;
				case "008615f04f39499fb73e5f323add988a":
					role = '商务顾问J'
					break;
				case "6f247fed28e94194ac66020e55957496":
					role = '商务顾问J'
					break;
				case "28f1842e2463492a9eb6ddf0def91658":
					role = '高级商务顾问S1'
					break;
				case "73340766cf3d43af91daff3128adad84":
					role = '高级商务顾问S2'
					break;
				case "b62d6d19bed64ee199f2c1a5b252b57b":
					role = '高级商务顾问S3'
					break;
				case "02178e62f17b4926bb7014f3ad5a1ebe":
					role = '公司内部运作'
					break;
				case "de9de2f006e145a29d52dfadda295353":
					role = '运作总监'
					break;
				case "b693f826af0545b5a1c60447a27c3089":
					role = '外协律师'
					break;
				case "04fe5e23842f4b998216080bc3b61821":
					role = '客服'
					break;
				case "4cb60182bb294cfba622f951e390bc6f":
					role = '经理'
					break;	
				case "3264c8e83d0248bb9e3ea6195b4c0216":
					role = '经理'
					break;	
				case "1":
					role = '经理'
					break;
				default:
					role = null
					break;
			}
			if(role) {
				localStorage.setItem("userRole", role)
				localStorage.setItem("userInfo", JSON.stringify(data))
			} else {
				localStorage.setItem("userRole", "")
				localStorage.setItem("userInfo", "")
			}
		}
	});

	/*    $.get('/order/getCountryData').done(function(res){
	        console.log(JSON.stringify(res));
	    })*/

	//获取地址信息
	if(!localStorage.citys) {
		$.get('/order/getCountryData').done(function(res) {
			localStorage.setItem('citys', JSON.stringify(res));

		})
	}

	// MetsiMenu
	$('#side-menu').metisMenu();

	// 打开右侧边栏
	$('.right-sidebar-toggle').click(function() {
		$('#right-sidebar').toggleClass('sidebar-open');
	});

	// 右侧边栏使用slimscroll
	$('.sidebar-container').slimScroll({
		height: '100%',
		railOpacity: 0.4,
		wheelStep: 10
	});

	// 打开聊天窗口
	$('.open-small-chat').click(function() {
		$(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
		$('.small-chat-box').toggleClass('active');
	});

	// 聊天窗口使用slimscroll
	$('.small-chat-box .content').slimScroll({
		height: '234px',
		railOpacity: 0.4
	});

	// Small todo handler
	$('.check-link').click(function() {
		var button = $(this).find('i');
		var label = $(this).next('span');
		button.toggleClass('fa-check-square').toggleClass('fa-square-o');
		label.toggleClass('todo-completed');
		return false;
	});

	//固定菜单栏
	$(function() {
		$('.sidebar-collapse').slimScroll({
			height: '100%',
			railOpacity: 0.9,
			alwaysVisible: false
		});
	});

	// 菜单切换
	$('.navbar-minimalize').click(function() {
		console.log(1)
		$("body").toggleClass("mini-navbar");
		SmoothlyMenu();
	});

	// 侧边栏高度
	function fix_height() {
		var heightWithoutNavbar = $("body > #wrapper").height() - 61;
		$(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
	}
	fix_height();

	$(window).bind("load resize click scroll", function() {
		if(!$("body").hasClass('body-small')) {
			fix_height();
		}
	});

	//侧边栏滚动
	$(window).scroll(function() {
		if($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
			$('#right-sidebar').addClass('sidebar-top');
		} else {
			$('#right-sidebar').removeClass('sidebar-top');
		}
	});

	$('.full-height-scroll').slimScroll({
		height: '100%'
	});

	$('#side-menu>li').click(function() {
		if($('body').hasClass('mini-navbar') && this.className != 'nav-header') {
			NavToggle();
		}
	});
	$('#side-menu>li li a').click(function() {
		if($(window).width() < 769) {
			NavToggle();
		}
	});

	$('.nav-close').click(NavToggle);

	//ios浏览器兼容性处理
	if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		$('#content-main').css('overflow-y', 'auto');
	}

});

/*$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('mini-navbar');
        $('.navbar-static-side').fadeIn();
    }
});*/

function NavToggle() {
	$('.navbar-minimalize').trigger('click');
	console.log('navToggle')
}

function SmoothlyMenu() {
	if(!$('body').hasClass('mini-navbar')) {
		$('#side-menu').hide();
		setTimeout(
			function() {
				$('#side-menu').fadeIn(500);
			}, 100);
	} else if($('body').hasClass('fixed-sidebar')) {
		$('#side-menu').hide();
		setTimeout(
			function() {
				$('#side-menu').fadeIn(500);
			}, 300);
	} else {
		$('#side-menu').removeAttr('style');
	}
}

//主题设置
$(function() {

	// 顶部菜单固定
	$('#fixednavbar').click(function() {
		if($('#fixednavbar').is(':checked')) {
			$(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
			$("body").removeClass('boxed-layout');
			$("body").addClass('fixed-nav');
			$('#boxedlayout').prop('checked', false);

			if(localStorageSupport) {
				localStorage.setItem("boxedlayout", 'off');
			}

			if(localStorageSupport) {
				localStorage.setItem("fixednavbar", 'on');
			}
		} else {
			$(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
			$("body").removeClass('fixed-nav');

			if(localStorageSupport) {
				localStorage.setItem("fixednavbar", 'off');
			}
		}
	});

	// 收起左侧菜单
	$('#collapsemenu').click(function() {
		if($('#collapsemenu').is(':checked')) {
			$("body").addClass('mini-navbar');
			SmoothlyMenu();

			if(localStorageSupport) {
				localStorage.setItem("collapse_menu", 'on');
			}

		} else {
			$("body").removeClass('mini-navbar');
			SmoothlyMenu();

			if(localStorageSupport) {
				localStorage.setItem("collapse_menu", 'off');
			}
		}
	});

	// 固定宽度
	$('#boxedlayout').click(function() {
		if($('#boxedlayout').is(':checked')) {
			$("body").addClass('boxed-layout');
			$('#fixednavbar').prop('checked', false);
			$(".navbar-fixed-top").removeClass('navbar-fixed-top').addClass('navbar-static-top');
			$("body").removeClass('fixed-nav');
			if(localStorageSupport) {
				localStorage.setItem("fixednavbar", 'off');
			}

			if(localStorageSupport) {
				localStorage.setItem("boxedlayout", 'on');
			}
		} else {
			$("body").removeClass('boxed-layout');

			if(localStorageSupport) {
				localStorage.setItem("boxedlayout", 'off');
			}
		}
	});

	if(localStorageSupport) {
		var collapse = localStorage.getItem("collapse_menu");
		var fixednavbar = localStorage.getItem("fixednavbar");
		var boxedlayout = localStorage.getItem("boxedlayout");

		if(collapse == 'on') {
			$('#collapsemenu').prop('checked', 'checked')
		}
		if(fixednavbar == 'on') {
			$('#fixednavbar').prop('checked', 'checked')
		}
		if(boxedlayout == 'on') {
			$('#boxedlayout').prop('checked', 'checked')
		}
	}

	if(localStorageSupport) {

		var collapse = localStorage.getItem("collapse_menu");
		var fixednavbar = localStorage.getItem("fixednavbar");
		var boxedlayout = localStorage.getItem("boxedlayout");

		var body = $('body');

		if(collapse == 'on') {
			if(!body.hasClass('body-small')) {
				body.addClass('mini-navbar');
			}
		}

		if(fixednavbar == 'on') {
			$(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
			body.addClass('fixed-nav');
		}

		if(boxedlayout == 'on') {
			body.addClass('boxed-layout');
		}
	}
});

//判断浏览器是否支持html5本地存储
function localStorageSupport() {
	return(('localStorage' in window) && window['localStorage'] !== null)
}

var yo = {}
/**
 * @description 提取query字符串
 * @param {String} name
 */
yo.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return(r[2]);
	return null;
}

/**
 * @description 设置cookie
 * @param {String} name
 * @param {String} value 
 * @param {Number} expiresHours 小时
 */
yo.addCookie = function(name, value, expiresHours) {
	var cookieString = name + "=" + escape(value) + "; path=/";
	//判断是否设置过期时间
	if(expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expiresHours * 3600 * 1000);
		cookieString = cookieString + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

/**
 * @description 修改cookie
 * @param {String} name
 * @param {String} value 
 * @param {Number} expiresHours 小时
 */
yo.editCookie = function(name, value, expiresHours) {
	var cookieString = name + "=" + escape(value);
	if(expiresHours > 0) {
		var date = new Date();
		date.setTime(date.getTime() + expiresHours * 3600 * 1000);
		cookieString = cookieString + ";expires=" + date.toGMTString();
	}
	document.cookie = cookieString;
}

/**
 * @description 删除cookie
 * @param {String} name
 */
yo.delCookie = function(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = yo.getCookie(name);
	if(cval != null) {
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}
/**
 * @description 获取某cookie的值
 * @param {String} name
 */
yo.getCookie = function(name) {
	var strcookie = document.cookie;
	var arrcookie = strcookie.split("; ");
	for(var i = 0; i < arrcookie.length; i++) {
		var arr = arrcookie[i].split("=");
		if(arr[0] == name) return unescape(arr[1]);
	}
	return null;
}

/**
 * @description 获取search某个项目值
 * @param {String} name
 */
yo.getQueryString = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return r[2];
	return '';
}

/**
 * @description 获取search对象
 * @param {String} name
 */
yo.getQueryObject = function() {
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for(var i = 0; i < vars.length; i++) {
		if(!vars[i]) continue;
		var pair = vars[i].split("=");
		// If first entry with this name
		if(typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = decodeURIComponent(pair[1]);
			// If second entry with this name
		} else if(typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(decodeURIComponent(pair[1]));
		}
	}
	return query_string;
}

/**
 * @description 检测浏览器
 */
yo.browserVersions = function() {
	var u = navigator.userAgent.toLowerCase(),
		app = navigator.appVersion.toLowerCase();
	return {
		trident: u.indexOf('trident') > -1,
		presto: u.indexOf('presto') > -1,
		webKit: u.indexOf('applewebkit') > -1,
		gecko: u.indexOf('gecko') > -1 && u.indexOf('khtml') == -1,
		mobile: !!u.match(/applewebkit.*mobile.*/) || !!u.match(/applewebkit/),
		ios: !!u.match(/\(i[^;]+;( U;)? cpu.+mac os x/),
		android: u.indexOf('android') > -1 || u.indexOf('linux') > -1,
		iPhone: u.indexOf('iphone') > -1 || u.indexOf('mac') > -1,
		iPad: u.indexOf('ipad') > -1,
		webApp: u.indexOf('safari') == -1,
		QQbrw: u.indexOf('mqqbrowser') > -1,
		weixin: u.indexOf('micromessenger') > -1,
		ucLowEnd: u.indexOf('ucweb7.') > -1,
		ucSpecial: u.indexOf('rv:1.2.3.4') > -1,
		ucweb: function() {
				try {
					return parseFloat(u.match(/ucweb\d+\.\d+/gi).toString().match(/\d+\.\d+/).toString()) >= 8.2
				} catch(e) {
					if(u.indexOf('UC') > -1) {
						return true;
					} else {
						return false;
					}
				}
			}
			(),
		ucSB: u.indexOf('Firefox/1.') > -1
	};
}

/**
 * @description 获取当前日期
 * @param {Number} AddDayCount 获取AddDayCount天后的日期
 */
yo.getDateStr = function(AddDayCount) {
	var dd = new Date();
	if(AddDayCount) {
		dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	}
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	if(m < 10) m = "0" + m.toString()
	var d = dd.getDate();
	if(d < 10) d = "0" + d.toString()
	return y + "-" + m + "-" + d;
}

/**
 * @description 倒数秒
 * @param {String} o 获取AddDayCount天后的日期
 * @example countDown(2012-01-01 12:12:12)
 */
yo.countDown = function(o) {
	var a = /^[\d]{4}-[\d]{1,2}-[\d]{1,2}( [\d]{1,2}:[\d]{1,2}(:[\d]{1,2})?)?$/ig,
		str = '',
		conn, s;
	if(!o.match(a)) {
		console.log('参数格式为2012-01-01[ 01:01[:01]].\r其中[]内的内容可省略');
		return false;
	}
	var sec = (new Date(o.replace(/-/ig, '/')).getTime() - new Date().getTime()) / 1000;
	if(sec > 0) {
		conn = '还有';
	} else {
		conn = '已过去';
		sec *= -1;
	}
	s = {
		'天': sec / 24 / 3600,
		'小时': sec / 3600 % 24,
		'分': sec / 60 % 60,
		'秒': sec % 60
	};
	for(i in s) {
		if(Math.floor(s[i]) > 0) str += Math.floor(s[i]) + i;
	}
	if(Math.floor(sec) == 0) {
		str = '0秒';
	}
	document.getElementById('show').innerHTML = '距离<u>' + o + '</u>' + conn + '<u>' + str + '</u>';
	setTimeout(function() {
		count_down(o)
	}, 1000);
}

/**
 * @description 回到顶部
 */
yo.scrollToTop = function() {
	if($) {
		$("body").append("<span class='backToTop iconfont'>↑</span>");
		var scroller = $('.backToTop')
		$(window).scroll(function() {
			document.documentElement.scrollTop + document.body.scrollTop > 200 ? scroller.show() : scroller.hide();
		});
		$('.backToTop').click(function() {
			yo.scrollTo('body');
		});
	}
};
/**
 * @description 倒数秒
 * @param {String} name 回到DOM的名称
 * @example yo.scrollTo('body')
 */
yo.scrollTo = function(name) {
	if($) {
		$('html,body').animate({
			scrollTop: $(name).offset().top
		}, 300)
	}
}

/**
 * @description 多行文本转义和反转义
 **/
yo.textarea_str = function(text) {
	var t = text.replace(/\r{0,}\n/g, "<br>").replace(/\s/g, "&nbsp;");
	return t || '';
}

yo.str_textarea = function(str) {
	if(typeof(str) != 'string') return str
	var t = str.replace(/<br>/g, "\n").replace(/\&nbsp\;/g, "\s");
	return t || '';
}
/**
 * @description 验证规则
 */
yo.validateReg = function() { //验证规则
	return {
		mobile: /^(13|15|17|18)\d{9}$/, //手机
		name: /^[\u4e00-\u9fa5a-zA-Z]+$/, //中英文
		idCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, //身份证
		pw: /[^\w\.\/]/ig, //密码
		price: /^([1-9]\d*|0)(\.\d{1,2})?$/, //两位小数的价格
		num: /^[1-9]\d*$/, //正整数
		bmId: /^\w+$/, //正整数和英文
		pricets: /^(-)?([1-9]\d*|0)(\.\d{1,2})?$/, //可以负数的两位小数
		mail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, //邮箱
		pw: /^(\w*@*\.*\-*\+*)+$/ //英文数字小数点@,-,+组成的密码
	}
}
/**
 * @description 验证方法
 */
yo.validate = function() {
	return {
		name: function(name) {
			var a = $.trim($(name).val())
			if(a == "") {
				return "请填写姓名"
			} else if(a.length > 10) {
				return "姓名不能大于10个字符"
			} else if(!yo.validateReg.name.test(a)) {
				return "姓名只能输入中/英文字符"
			} else {
				return true;
			}
		},
		mail: function(mail) {
			var a = $.trim($(mail).val())
			if(a == "") {
				return "邮箱地址不合法"
			} else {
				return true;
			}
		},
		idCard: function(idcard) {
			var a = $.trim($(idcard).val())
			if(a == "") {
				return "请填写身份证号"
			} else if(!yo.validateReg.idCard.test(a)) {
				return "身份证格式不正确"
			} else {
				return true;
			}
		},
		tel: function(tel) {
			var a = $.trim($(tel).val())
			if(a == "") {
				return "手机号不能为空"
			} else if(!yo.validateReg.mobile.test(a)) {
				return "手机号码格式不正确"
			} else {
				return true;
			}
		},
		account: function(tel) {
			var a = $.trim($(tel).val())
			if(a == "") {
				return "用户名不能为空"
			} else if(!yo.validateReg.mobile.test(a)) {
				return "手机号码格式不正确"
			} else {
				return true;
			}
		},
		vcode: function(vcode) {
			if($(vcode).val().length != 4) {
				return "验证码必须为4个数字"
			} else {
				return true
			}
		},
		pw: function(pw) {
			var pw = $(pw)
			if(pw.val() == "") {
				return "密码不能为空"
			} else if(pw.val().length > 20 || pw.val().length < 5) {
				return "密码长度应在4~20之间"
			} else if((!pw.val().replace(/^\w+$/i, ''))) {
				return "密码只能为英文、数字和下划线"
			} else {
				return true;
			}
		},
		equal: function(value, value2) {
			var value = $.trim($(value).val()),
				value2 = $.trim($(value2).val())
			if(value != value2) {
				return "两次输入不一致"
			} else {
				return true;
			}
		},
		remote: function(url, json) {
			$.post(url, json, function(res) {
				if(res) {
					return true;
				} else {
					return false;
				}
			})
		}
	}
}

/*
 **yocto引入方法
 */
function date(format, timestamp) {
	var that = this;
	var jsdate, f;
	var txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var formatChr = /\\?(.?)/gi;
	var formatChrCb = function(t, s) {
		return f[t] ? f[t]() : s
	};
	var _pad = function(n, c) {
		n = String(n);
		while(n.length < c) {
			n = "0" + n
		}
		return n
	};
	f = {
		d: function() {
			return _pad(f.j(), 2)
		},
		D: function() {
			return f.l().slice(0, 3)
		},
		j: function() {
			return jsdate.getDate()
		},
		l: function() {
			return txt_words[f.w()] + "day"
		},
		N: function() {
			return f.w() || 7
		},
		S: function() {
			var j = f.j();
			var i = j % 10;
			if(i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
				i = 0
			}
			return ["st", "nd", "rd"][i - 1] || "th"
		},
		w: function() {
			return jsdate.getDay()
		},
		z: function() {
			var a = new Date(f.Y(), f.n() - 1, f.j());
			var b = new Date(f.Y(), 0, 1);
			return Math.round((a - b) / 86400000)
		},
		W: function() {
			var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
			var b = new Date(a.getFullYear(), 0, 4);
			return _pad(1 + Math.round((a - b) / 86400000 / 7), 2)
		},
		F: function() {
			return txt_words[6 + f.n()]
		},
		m: function() {
			return _pad(f.n(), 2)
		},
		M: function() {
			return f.F().slice(0, 3)
		},
		n: function() {
			return jsdate.getMonth() + 1
		},
		t: function() {
			return(new Date(f.Y(), f.n(), 0)).getDate()
		},
		L: function() {
			var j = f.Y();
			return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
		},
		o: function() {
			var n = f.n();
			var W = f.W();
			var Y = f.Y();
			return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
		},
		Y: function() {
			return jsdate.getFullYear()
		},
		y: function() {
			return f.Y().toString().slice(-2)
		},
		a: function() {
			return jsdate.getHours() > 11 ? "pm" : "am"
		},
		A: function() {
			return f.a().toUpperCase()
		},
		B: function() {
			var H = jsdate.getUTCHours() * 3600;
			var i = jsdate.getUTCMinutes() * 60;
			var s = jsdate.getUTCSeconds();
			return _pad(Math.floor((H + i + s + 3600) / 86.4) % 1000, 3)
		},
		g: function() {
			return f.G() % 12 || 12
		},
		G: function() {
			return jsdate.getHours()
		},
		h: function() {
			return _pad(f.g(), 2)
		},
		H: function() {
			return _pad(f.G(), 2)
		},
		i: function() {
			return _pad(jsdate.getMinutes(), 2)
		},
		s: function() {
			return _pad(jsdate.getSeconds(), 2)
		},
		u: function() {
			return _pad(jsdate.getMilliseconds() * 1000, 6)
		},
		e: function() {
			throw "Not supported (see source code of date() for timezone on how to add support)"
		},
		I: function() {
			var a = new Date(f.Y(), 0);
			var c = Date.UTC(f.Y(), 0);
			var b = new Date(f.Y(), 6);
			var d = Date.UTC(f.Y(), 6);
			return((a - c) !== (b - d)) ? 1 : 0
		},
		O: function() {
			var tzo = jsdate.getTimezoneOffset();
			var a = Math.abs(tzo);
			return(tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
		},
		P: function() {
			var O = f.O();
			return(O.substr(0, 3) + ":" + O.substr(3, 2))
		},
		T: function() {
			return "UTC"
		},
		Z: function() {
			return -jsdate.getTimezoneOffset() * 60
		},
		c: function() {
			return "Y-m-d\\TH:i:sP".replace(formatChr, formatChrCb)
		},
		r: function() {
			return "D, d M Y H:i:s O".replace(formatChr, formatChrCb)
		},
		U: function() {
			return jsdate / 1000 | 0
		}
	};
	this.date = function(format, timestamp) {
		that = this;
		jsdate = (timestamp === undefined ? new Date() : (timestamp instanceof Date) ? new Date(timestamp) : new Date(timestamp));
		return format.replace(formatChr, formatChrCb)
	};
	return this.date(format, timestamp)
};
//date('Y-m-d h:m:s',new Date())

//获取当前星期
function getWeek(d) {
	d = d ? d : ''
	var now = new Date(d);
	var day = now.getDay();
	var week = "1234560";
	var first = 0 - week.indexOf(day);
	var f = new Date(d);
	f.setTime(f.getTime() + first * 24 * 60 * 60 * 1000);
	var last = 6 - week.indexOf(day);
	var l = new Date(d);
	l.setTime(l.getTime() + last * 24 * 60 * 60 * 1000);
	return date('Y-m-d', f) + ',' + date('Y-m-d', l)
}

//获取当前月的第一天

function getCurrentMonthFirst() {
	var date = new Date();
	date.setDate(1);
	return date;
}
//获取当前月的最后一天
function getCurrentMonthLast() {
	var date = new Date();
	var currentMonth = date.getMonth();
	var nextMonth = ++currentMonth;
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	var oneDay = 1000 * 60 * 60 * 24;
	return new Date(nextMonthFirstDay - oneDay);
}

//获知当前是星期几
function getWeek(day) {
	var d = new Date(day)
	var weekday = new Array(7);
	weekday[0] = "星期日";
	weekday[1] = "星期一";
	weekday[2] = "星期二";
	weekday[3] = "星期三";
	weekday[4] = "星期四";
	weekday[5] = "星期五";
	weekday[6] = "星期六";
	return weekday[d.getDay()] || ''
}
var yocto = {}
//子窗口关闭方法
yocto.closeChildLayer = function() {
	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.close(index)
}
//ajax-post方法
yocto.json = function(api, data, success, fail) {
	$.ajax({
		url: api,
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(data)
	}).done(function(res) {
		if(res.error == '00') {
			success && success(res)
		} else if(res.error == '01') {
			layer.msg(res.msg)
		} else {
			fail && fail(res)
			console.log(res.msg)
		}
	})
}
//窗口刷新方法
yocto.reload = function() {
	location.reload()
}

var href = location.host;

var lockReconnect = false; //避免ws重复连接
var ws = null; // 判断当前浏览器是否支持WebSocket
var wsServer = 'ws://' + href + '/webSocketServer';
createWebSocket(wsServer);

function createWebSocket(url) {
	try {
		if('WebSocket' in window) {
			ws = new WebSocket(url);
		} else if('MozWebSocket' in window) {
			ws = new MozWebSocket(url);
		} else {
			console.log("您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器，请勿使用IE10以下浏览器，360浏览器请使用极速模式，不要使用兼容模式！")
		}
		initEventHandle();
	} catch(e) {
		reconnect(url);
		console.log(e);
	}
}
//websocket方法
function initEventHandle() {
	ws.onclose = function(evt) {
		reconnect(wsServer);
		console.log("Disconnected : " + new Date());
		console.log(evt);
	};
	ws.onerror = function(evt) {
		reconnect(wsServer);
		console.log('Error occured: ' + evt.code);
		console.log('Error occured: ' + evt);
	};
	ws.onopen = function() {
		heartCheck.reset().start(); //心跳检测重置
		console.log("Connected to WebSocket server.");
		console.log(href)
	};
	ws.onmessage = function(evt) { //如果获取到消息，心跳检测重置
		heartCheck.reset().start(); //拿到任何消息都说明当前连接是正常的
		console.log('Retrieved data from server: ' + evt.data);
		if(evt.data.indexOf('notic:') == 0) { //通知信息
			var id = evt.data.split('notic:')[1]
			if(!id) return;
			$.post('/saleCustomer/getNoticInfo', {
				id: id
			}).done(function(res) {
				var content = res.result.list[0].content
				var time = res.result.list[0].createTime
				var type = res.result.list[0].type
				var html = 'onclick="openMessage(' + type + ',' + res.result.list[0].relateId + ',' + res.result.list[0].id + ')"'
				layer.open({
					type: 1,
					title: 0,
					offset: '100px' //具体配置参考：offset参数项
						,
					content: '<div ' + html + ' style="cursor:pointer;padding: 20px 80px;background:#5FB878;color:#fff">' + res.result.list[0].content + ' </div>',
					shade: 0 //不显示遮罩
						,
					time: 5000
				});
			})
			top.newMessageBell_get(1)
		} else if(evt.data.indexOf('saler:') == 0) {
			top.callId = evt.data.split("saler:")[1]
		} else if(evt.data.indexOf('runner:') == 0) {
			top.callId = evt.data.split("runner:")[1]
		}
	};
}

//监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
//window.onbeforeunload = function(event) { 
//	if(!parent){
//		 WS.onclose = function(){};
//  	WS.close();
//	}
//	return '确定要关闭?'
//}  

function reconnect(url) {
	if(lockReconnect) return;
	lockReconnect = true;
	setTimeout(function() { //没连接上会一直重连，设置延迟避免请求过多
		createWebSocket(url);
		lockReconnect = false;
		console.log("重连中")
	}, 5000);
}

//心跳检测
var heartCheck = {
	timeout: 540000, //9分钟发一次心跳
	timeoutObj: null,
	serverTimeoutObj: null,
	reset: function() {
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		return this;
	},
	start: function() {
		var self = this;
		this.timeoutObj = setTimeout(function() {
			//这里发送一个心跳，后端收到后，返回一个心跳消息，
			//onmessage拿到返回的心跳就说明连接正常
			ws.send("ping");
			console.log("ping!")
			self.serverTimeoutObj = setTimeout(function() { //如果超过一定时间还没重置，说明后端主动断开了
				ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
			}, self.timeout)
		}, this.timeout)
	}
}

//if(!top.websocket) {
//	var wsServer = 'ws://'+href+'/webSocketServer';
//top.websocket = new WebSocket(wsServer);
//top.websocket.onopen = function (evt) { onOpen(evt) };
//top.websocket.onclose = function (evt) { onClose(evt) };
//top.websocket.onmessage = function (evt) { onMessage(evt) };
//top.websocket.onerror = function (evt) { onError(evt) };
//
//var ping = setInterval(function(){
//	top.websocket.send("ping")
//},50000)
//
//function onOpen(evt) {
//    console.log("Connected to WebSocket server.");
//    console.log(href)
//}
//function onClose(evt) {
//    console.log("Disconnected : " + new Date());
//    console.log(evt);
//}
//function onMessage (evt) {
//	console.log('Retrieved data from server: ' + evt.data);
//	if(evt.data.indexOf('notic:')==0){   //通知信息
//			var id = evt.data.split('notic:')[1]
//	if(!id) return;
//		$.post('/saleCustomer/getNoticInfo',{
//		id:id
//	}).done(function(res){
//		var content = res.result.list[0].content
//		var time =res.result.list[0].createTime
//		var type =res.result.list[0].type
//			var html = 'onclick="openMessage('+type+','+res.result.list[0].relateId+','+res.result.list[0].id+')"'
//		layer.open({
//		  type: 1,
//		  title:0
//		  ,offset: '100px' //具体配置参考：offset参数项
//		  ,content: '<div '+html+' style="cursor:pointer;padding: 20px 80px;background:#5FB878;color:#fff">'+ res.result.list[0].content+' </div>'
//		  ,shade: 0 //不显示遮罩
//		  ,time:5000
//		});
//	})
//		top.newMessageBell_get(1)
//	}else if(evt.data.indexOf('saler:')==0){
//		  top.callId = evt.data.split("saler:")[1]
//	}else if(evt.data.indexOf('runner:')==0){
//		  top.callId = evt.data.split("runner:")[1]
//	}
//}
//function onError(evt) {
//    console.log('Error occured: ' + evt.data);
//    console.log('Error occured: ' + evt);
//    
//}
//window.onbeforeunload = function(event) { 
//	if(!parent){
//		 WS.onclose = function(){};
//    	WS.close();
//	}
//	return '确定要关闭?'
//}
//}

//打开通知信息
function openMessage(type, targetId, id) {
	$.post("/saleCustomer/updateFlag", {
		id: id
	}).done(function(res) {
		top.newMessageBell_get(1)
		if(type == 0 || type == 2) {
			var index = layer.open({
				type: 2,
				title: '查看详情',
				content: '/static/page/index/message_follow.html?id=' +
					id,
				area: ['100%', '100%']
			});
		} else {
			layer.open({
				type: 2,
				title: "查看报告",
				area: ["100%", "100%"],
				content: '/static/page/workreport/workreport_view.html?id=' + targetId
			})
		}
	})
}
//查看所有通知信息
function viewAllMessage() {
	var index = layer.open({
		type: 2,
		title: '查看详情',
		content: '/static/page/index/message_list.html',
		area: ['100%', '100%']
	});
}

//所有信息设置为已读
function readAll() {
	$.post("/saleCustomer/updateFlag").done(function(res) {
		top.newMessageBell_get(1)
	})
}

if(wsServer) newMessageBell_get(1);

function newMessageBell_get(type) {
	var messageBox = $("#newMessageBell")
	$.post("/saleCustomer/getNoticInfo", {
		type: type // 1/未阅读的信息/""/已阅读的信息
	}).done(function(res) {
		var total = res.result.total
		$(".unread-info-list").remove();
		if(total) {
			messageBox.find(".count-info").html('<i class="fa fa-bell"></i> <span class="label label-danger">' + total + '</span>');
			var html = ""
			for(var i = 0; i < res.result.list.length; i++) {
				var obj = res.result.list[i]
				html += '<li class="unread-info-list"><a onclick="openMessage(' + obj.type + ',' + obj.relateId + ',' + obj.id + ')" href="javascript:;"><div>' + res.result.list[i].content + '  <span class="pull-right text-muted small">' + obj.createTime + '</span></div></a></li>'
			}
			$(".unread-info-list-prehook").after(html)
		} else {
			messageBox.find(".count-info").html('<i class="fa fa-bell"></i>')
		}
		messageBox.find(".unread-info").html("您有" + total + "条未读消息")
	})
}

function goSearchResult(el) {
	var keywords = $.trim($(el).find("input[name='top-search']").val())
	if(!keywords) return false;

	var index = layer.open({
		type: 2,
		title: keywords + ' 搜索结果',
		content: '/static/page/index/search_result.html?keywords=' + encodeURI(keywords),
		area: ['100%', '100%']
	});
	return false
}