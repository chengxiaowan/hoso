

//编辑状态初始化
if(type!=""&&auditStatus==2){
	$("#applytype").trigger("change")
	$("#applyForm").find("input,select,textarea").removeAttr("onclick").attr("readonly","readonly")
	$("#applytype").attr("readonly","readonly")
}
if(auditStatus==0){
	$("#applytype").trigger("change")
}

//如果是运作不需要协作人
if(flag=="1"){
	$(".relative").hide().find("input,select,textarea").prop("diasbled",true);
}else if(flag=="3" ||flag=="4"||flag=="5"){
	//如果是审核
	$("#shenhe").show();
	var stype = $("#applytype").val();
	var collaborator =$("#collaborator").val();
	$("#applyForm").find("input,select,textarea").attr("readonly","readonly")
	$("#applytype").prop("disabled",true)
	$("#applyForm").append("<input type='hidden'  name='type' value="+ stype +">")
}

//auditStatus=2 任务完成 auditStatus=1审核拒绝
if(auditStatus=="2"){
	$("#shenhe").show().find("input,select,textarea").attr("readonly","readonly");
		$("#applyForm").find("input,select,textarea").attr("readonly","readonly")
		var stype = $("#applytype").val();
	$("#applytype").prop("disabled",true)
	$("#applyForm").append("<input type='hidden' name='type' value="+ stype +">")
	$("#complete").show()
	if($("#applytype").val()=="0"){//外出
		$("#sjTime").show()
		$("#sjDate").hide()
	}else{//出差
			$("#sjDate").show()
		$("#sjTime").hide()
	}
}else{
	$("#complete").hide().find('input,select,textarea').attr("readonly","readonly")
}

//初始化完成后显示
$("body").show()

//初始化chosen
if(flag=="1"||flag=="2"){
	if(auditStatus!="2"){
	$("#shenhe").find("input,select,textarea").attr("readonly","readonly")
	$(".chosen-select").select2({
	width: '100%',
	language:"zh-CN",
	allowClear: true,
	placeholder: "请选择",
    placeholderOption: "first",
		  ajax: {
			    url: '/user/getUserInfo',
			    dataType: 'json',
			    type:'post',
			    delay: 250,
			    data: function (params) {
			      return {
			        data:{
			        	q: params.term, 
			        },
			      ROLE_ID:"cf54c0b5567542e084778c3f5b230054,b729e9334ad64c15a4e47d88b8c2638f,01dc6d29f1704efeab0376d327f47d98,30b1487221464d369ca4c2462ccca920,de9de2f006e145a29d52dfadda295353,02178e62f17b4926bb7014f3ad5a1ebe,4cb60182bb294cfba622f951e390bc6f,04fe5e23842f4b998216080bc3b61821,b693f826af0545b5a1c60447a27c3089"
			      }
			    },
			    processResults: function (data, params) {
			    	$.each(data,function(){
			    		this.id = this.USER_ID;
			    		this.text = this.NAME
			    	})	
			      return {
			        results: data
			      };
			    },
			    cache: true
			  },
			  minimumInputLength: 1
});
}
	}else{
		$("#applyForm").find("input,select,textarea").removeAttr("onclick")
	}

	//外出类别改变
	function changeType(dom){
		if(dom.value=="0"&&flag=="2"){
			$(".relative").show()
		}
		if(dom.value=="1"&&flag=="2"){
			$(".relative").hide().find("input").val("");
		}
		if(dom.value=="0"){
			$(".range1").show().find("input")
			$(".range2").hide().find("input").val("");
		}
		if(dom.value=="1"){
			$(".relative").hide().find("input").val("");
			$(".chosen-select").val(null).trigger("change.select2")
			$(".range1").hide().find("input").val("");		
			$(".range2").show().find("input")
		}
	}


	function save(status) {
		 if(flag=="3" ||flag=="4"||flag=="5"){
				$("#auditStatus").val(status)
				$("#visitForm").submit();
			}else if (yoValidate('#visitForm',1,1)) {
			 		var index = layer.load(1, {
						shade : [ 0.2, '#fff' ]
					//0.1透明度的白色背景
					});
			 		$("#visitForm").submit();
				}
	}