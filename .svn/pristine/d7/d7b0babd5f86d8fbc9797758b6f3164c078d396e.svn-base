
	function view(id) {
		var index = layer
				.open({
					type : 2,
					title:" ",
					content : '/static/page/case_detail.html?id='
							+ id,
					area : [ '100%', '100%' ]
				});
	}

	//修改债务人
	function edit(id) {
		var index = layer.open({
			type : 2,
			title : '编辑债务人',
			content : '/order/goEdit.do?id='
					+ id,
			area : [ '90%', '90%' ]
		});
	}

	//执行任务
	function doTask(dom,type) {
		if(dom.getAttribute("disabled")!=null){
			return;
		}
		var id = $("#simple-table").find("input[name='ids']:checked").val();
		var index = layer
				.open({
					type : 2,
					title : '执行任务',
					content : '/workBench/goOrderTask.do?orderId='
							+ id + '&type=' + type,
					area : [ '90%', '90%' ]
				});
	}

	$(function() {
		//选择方法/指可选1
		$("#simple-table input[type='checkbox']").on("change",function(){
			var precalc = $("#btn-precalc");
			var supplylaw = $("#btn-supplylaw");
			var send = $("#btn-send");
			
			if(this.checked){
				$("#simple-table").find("input[type='checkbox']").prop("checked",false);
				this.checked = true;
			}else{
				precalc.prop("disabled",true);
				supplylaw.prop("disabled",true);
				send.prop("disabled",true);
				return;
			}
			precalc.prop("disabled",true);
			supplylaw.prop("disabled",true);
			send.prop("disabled",true);
			
			var status = $(this).data("status");
			var isLs = $(this).data("isls")
			console.log(isLs)
			switch (status) {
			case 0:
				precalc.prop("disabled",false);
				supplylaw.prop("disabled",false);
				if(isLs) precalc.prop("disabled",false);
				break;
			case "已结案":
				break;
			case "已关闭":
				break;
			case 4:
				send.prop("disabled",false);
				if(isLs) precalc.prop("disabled",false);
				break;
			case 3:
				send.prop("disabled",false);
				if(isLs) precalc.prop("disabled",false);
				break;
			default:
				break;
			}
			
			
		})
		
		
		//日期框
		$('.date-picker').datepicker({
			autoclose : true,
			todayHighlight : true
		});

		if ($("#createTimeStart").val()) {
			$("#createTimeEnd").datepicker('setStartDate',
					new Date($("#createTimeStart").val()))
		}

		if ($("#createTimeEnd").val()) {
			$("#createTimeStart").datepicker('setEndDate',
					new Date($("#createTimeEnd").val()))
		}

		//开始日期
		$("#createTimeStart").datepicker({}).on(
				'changeDate',
				function(ev) {
					if (ev.date) {
						$("#createTimeEnd").datepicker('setStartDate',
								new Date(ev.date.valueOf()))
					} else {
						$("#createTimeEnd").datepicker('setStartDate', null);
					}
				});
		//结束日期
		$("#createTimeEnd").datepicker({}).on(
				'changeDate',
				function(ev) {
					if (ev.date) {
						$("#createTimeStart").datepicker('setEndDate',
								new Date(ev.date.valueOf()))
					} else {
						$("#createTimeStart").datepicker('setEndDate',
								new Date());
					}
				});
	});