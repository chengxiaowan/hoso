// define([
// 	'require','jquery',
// 	'bootstrapTimePicker'
// ], function(require,$, factory) {
// 	console.log($)
// 	'use strict';
// 	return function(){
   //日期框
   require(['bootstrapTimePicker'],function(){
$('.date-picker').datepicker({
			autoclose : true,
			todayHighlight : true
		});
$('.date-picker1').datepicker({
			autoclose : true,
			todayHighlight : true,
			startView:2,
			minViewMode :'years'
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
   })
		
// }
// 				});