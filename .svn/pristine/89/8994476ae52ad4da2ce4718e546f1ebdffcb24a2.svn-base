		var yoValidate = function  (id,switchLayer,disabledType) {
				var validateReg={  //验证规则
									mobile:/^(13|15|17|18)\d{9}$/,   //手机
									name:/^[\u4e00-\u9fa5a-zA-Z]+$/,   //中英文
									pw:/[^\w\.\/]/ig,  //密码
									price:/^([1-9]\d*|0)(\.\d{1,2})?$/,  //两位小数的价格
									integer:/^[0-9]\d*$/,  //正整数
									bmId:/^\w+$/,  //正整数和英文
									pricets:/^(-)?([1-9]\d*|0)(\.\d{1,2})?$/,  //可以负数的两位小数
									email:/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,  //邮箱
									url:/^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/, //网址
									idCard:/\d{15}(\d\d[0-9xX])?/,  //身份证号 15/18位
									telephone:/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,//固定电话
									fax:/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/,//传真
								}
				
			var form = $(id)
			var msg = '';
			var state = true;
			if(!switchLayer){
				layer.closeAll()
			}
			$.each(form.find('input,textarea,select'), function() {
				if(!$(this).is(":visible")){
					
				}
				else if(disabledType&&$(this).attr("disabled")){
					
				}else{
				msg=''
				var _t = $(this);
				var _val = $.trim(_t.val())
				var tips = {};
				if(_t.data('validate')){
					//获取验证规则
				var rule = $.trim($.trim(_t.data('validate')).split('|'));
				rule = rule.split(',');
				$.each(rule, function(i) {
					var _r = $.trim(rule[i])
					if (_r=="require") {
						if(!_val){
							msg = '必填项';
							state = false;
						}
					};
					if(_r=="price"){
						if(_val!=''&&!validateReg.price.test(_val)){
							msg='请输入最多为小数点后两位的值';
							state = false;
						}
					};
					if(_r=="mobile"){
						if(_val!=''&&!validateReg.mobile.test(_val)){
							msg='手机号格式错误';
							state = false;
						}
					};
					if(_r=="integer"){
							if(_val!=''&&!validateReg.integer.test(_val)){
							msg='请输入正整数';
							state = false;
						}
					};
					if(_r=='number'){
						if(_val!=''&&isNaN(_val)){
							msg='请输入数字';
							state=false;
						}
					};
					if(_r.indexOf('rang=')>-1){
						var rang = Number(_r.split('-')[0])
						var rang2 = Number(_r.split('-')[1])
						if(_val!=''&&isNaN(_val)){
							msg='请输入数字';
							state=false;
						}else if(_val!=''){
							var _n  = Number(_val)
							if(_n <rang || _n >rang){
								msg='请填写指定范围内的数字 [' + rang +' - ' + rang2 + ']';
								state=false;
							}
						}
					};
					if(_r.indexOf('maxNum=')>-1){
						var _n = Number(_val)
						var _max = Number(_r.split('=')[1])
						if(_val!=''&&isNaN(_val)){
							msg='请输入数字';
							state=false;
						}else if(_val!=''&&_n > _max){
							msg='请填写指定范围内的数字 [小于' + _max + ']';
							state=false;
						}
					};
					if(_r.indexOf('minNum=')>-1){
						var _n = Number(_val)
						var _min = Number(_r.split('=')[1])
						if(_val!=''&&isNaN(_val)){
							msg='请输入数字';
							state=false;
						}else if(_val!=''&&_n < _min){
							msg='请填写指定范围内的数字 [大于' + _min + ']';
							state=false;
						}
					};
					if(_r.indexOf('maxLength=')>-1){
						var _max = Number(_r.split('=')[1])
						if(_val!=''&&_val.length > _max){
							msg='内容长度填写错误 [小于' + _max + ']';
							state=false;
						}
					};
					if(_r.indexOf('minlength=')>-1){
						var _min = Number(_r.split('=')[1])
						if(_val!=''&&_val.length < _min){
							msg='内容长度填写错误 [大于' + _min + ']';
							state=false;
						}
					};	
					if(_r=="idCard"){
						if(_val!=''&&!validateReg.idCard.test(_val)){
							msg='身份证号码格式错误';
							state = false;
						}						
					};	
					if(_r=="email"){
						if(_val!=''&&!validateReg.email.test(_val)){
							msg='邮箱格式错误';
							state = false;
						}						
					};	
					if(_r=="url"){
						if(_val!=''&&!validateReg.url.test(_val)){
							msg='链接地址格式错误';
							state = false;
						}						
					};
					if(_r=="telephone"){
						if(_val!=''&&!validateReg.telephone.test(_val)){
							msg='固定电话格式错误';
							state = false;
						}						
					};
					if(_r=="fax"){
						if(_val!=''&&!validateReg.fax.test(_val)){
							msg='传真格式错误';
							state = false;
						}						
					};
				});
				if (msg) {
					if(this.localName=='textarea'||$(this).hasClass('chosen-select')||$(this).hasClass("chosen-select-sale")){
//						var tempId = 'new'+(new Date()).getTime()
//						$('#'+this.id).parent()[0].id=tempId
					layer.yoTips(msg, this, {tipsMore: true,tips: [1, '#d15b47'],time: 5000});
					}else{
					layer.yoTips(msg, this, {tipsMore: true,tips: [1, '#d15b47'],time: 5000});
					}
				}
				}
				}
			});
			if(state){
				if(!switchLayer){
					layer.closeAll()
				}
				return true;
			}else{
				layer.msg('表单验证失败,请检查错误项重试')
				return false;
			}
		}