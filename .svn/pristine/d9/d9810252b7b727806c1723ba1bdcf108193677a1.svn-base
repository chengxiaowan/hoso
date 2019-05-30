

	//当前页面状态
	var type =1;
	var stype = 1;//编辑状态下的type
	//切换页面参数
	var log_title = $("#log_title").find("span")
	var log_btn = $("#log_title").find("button")
	if(pageStatus=="99"){
		log_title.text("案件报告记录");
		log_btn.eq(0).show()
	}else if(pageStatus=="98"){
		log_title.text("跟进记录")
		log_btn.eq(1).show()
		type = 3;
	}else if(pageStatus=="97"){
		log_title.text("回款明细")
		log_btn.eq(2).show()
		type = 2;
		stype= 7;
	}else if(pageStatus=="96"){
		log_title.text("催收明细")
		log_btn.eq(3).show()
		type = 4;
		stype=2;
	}
	else if(pageStatus=="95"){
		log_title.text("回款计划")
		log_btn.eq(4).show()
		type = 5;
		stype=4;
	}
	//全局变量
	var orderId = "";  //当前选择项Id
	var syMoney ="";
	var uploader_init = 0;//上传组件状态
	
	//执行任务
	function doTask(dom,type) {
		if(dom.getAttribute("disabled")!=null){
			return;
		}
		var id = $("#simple-table").find("input[name='ids']:checked").val();
		var index = layer
				.open({
					type : 2,
					title : '新增记录',
					content : '/workBench/goOrderTask.do?orderId='
							+ orderId + '&type=' + type +'&syMoney=' + syMoney,
					area : [ '600px', '600px' ]
				});
	}
	
	//查看
	function view(id) {
		var index = layer
				.open({
					type : 2,
					title : '查看详情',
					content : '/order/viewOrder.do?id='
							+ id,
					area : [ '90%', '90%' ]
				});
	}
	
	//编辑
	function edit(orderId,id){
		var index = layer
		.open({
			type : 2,
			title : '编辑',
			content : '/workBench/goOrderTask.do?id='
				+ id +'&orderId=' + orderId+ '&type=' + stype,
			area :  [ '600px', '600px' ]
		});
	}
	
	
	/**
	*跟进记录加载
	**/
	function log_load (id,orderNo,debName,dom,sy){
		$("#side_timeline").show();
		var loading = layer.load(3,{
			shade:[.6,"#fff"]
		});
		if(!window.cacheTitle){
			window.cacheTitle = log_title.text()
		}
		if(!window.debName){
			window.debName = debName
		}
		if(dom){
			$(dom).parents("tr").addClass("success").siblings().removeClass("success")
			
		}
		log_title.html('<span class="pull-left" style="line-height:48px">' + window.cacheTitle + ' &nbsp;</span> <div class="pull-left"><button class="btn btn-info btn-xs m-b-xs" type="button">案件编号 : '+orderNo+'</button>' + '<br><button style="position:relative;top:-2px;" class="btn btn-info btn-xs" type="button">债务人 : '+debName+'</button></div>')
		if(id) orderId = id;
		if(sy) syMoney = sy;
		$.post("/order/showAll",{
			orderId:id,  //21
			type:type
		}).done(function(res){
			if(res.error=="00"){
					if(!res.result.length)	{
					$("#vertical-timeline").html("<div style='text-indent:3em;'>暂无记录</div>");	
					}else{
						var html = "";
						$.each(res.result,function(){
							html+='<div class="vertical-timeline-block"><div class="vertical-timeline-icon blue-bg"><i class="fa fa-file-text"></i>'
                        	html+='</div><div class="vertical-timeline-content">'	
                        	var contentTitle ='';
							var _timeTEXT = "时间";
                        	if(type==1){  //案件报告
                            html+='<div>标题 : '+this.title+'</div>';
                            var _status = '草稿';
                            var _editBtn = '编辑';
                            if(runnerId) _editBtn = "编辑";
                            if (this.status==1){
                            	_status='已提交';
                            	if(!isKefu) {
                            		_editBtn='审核'
                            	}else{
                            		_editBtn= ''
                            	};
                            	if(runnerId) _editBtn ="";
                            }else if(this.status==2){
                            	_status='审核通过';
                            	_editBtn='';
                            }else if(this.status==3){
                            	_status='审核未通过';
                            }
                            console.log(runnerId,_editBtn)
                            html+='<p>状态: <span class="label label-warning label-outline">'+_status+'</span></p>';
                            var reportType = this.reportType;
                            var _reportType ='进展';
                            if(reportType=="1"){
                            	_reportType = '结案';
                            }else if(reportType=="2"){
                            	_reportType ="关闭"
                            }
                            html+='<p>类型: <span class="label label-outline">'+_reportType+'</span></p>';
                            contentTitle="报告内容";
                        	}
                        	if(type==3){//案件跟进
                        		var _timeTEXT = "跟进时间";
                        		html+='<div>跟进方式 : <span class="text-success">'+this.link+'</span></div>'
                        		contentTitle="跟进记录";
                        	}
                        	if(type==4){//案件催收
                        		var warntype = this.warnType=="0" ? "短信" : "电话"
                        		html+='<div>催收方式 : <span class="text-success">'+warntype+'</span></div>'
                        	}
                        	if(type==2){
                        		_timeTEXT = "回款时间";
                        		html+='<div class="row"><div class="col-md-12 text-muted">本次回款金额 (元)： <span class="text-danger">'+this.currentMoney+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">本次回款时间 ： <span class="text-success">'+this.currentTime+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">当前余额 ： <span class="text-success">'+this.currentBalance+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">计划金额 ： <span class="text-success">'+this.onceMoney+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">计划时间 ： <span class="text-success">'+this.planTime+'</span></div>'
                        		html+='</div>'
                        	}
                        	if(type==5){
                        		html+='<div class="row"><div class="col-md-12 text-muted">计划开始回款时间 ： <span class="text-success">'+this.planTime.split(" ")[0]+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">单次回款金额(元) ： <span class="text-danger">'+this.onceMoney+'</span></div>'
                        		html+='<div class="col-md-12 text-muted">回款期数 ： <span class="text-danger">'+this.periods+'</span></div>'
                        		html+='</div>'
                        	}
                        	if(!contentTitle) contentTitle='备注';
                            html+='<p>'+contentTitle+' : '+this.remark+'</p>'
                            if(this.attachs&&this.attachs.length){
                            	html+='<div><strong>相关附件 : </strong> </div>'
                            	$.each(this.attachs,function(){
	                       			html+='<div><a href="'+this.url+'" target="_blank">'+this.originalFilename+'</a></div>'
                            	})
                            }
                            if(type==2) this.createTime = this.currentTime
                            if(type!=5&&type!=2)
                            {
                            	html+='<div class="vertical-date">'+_timeTEXT+' :  <span class="text-info">'+this.createTime+'</span></div>'
                            	if(type!=3){
                            		if(_editBtn){
                            			html+='<a href="javascript:;" onclick="edit('+ id +','+this.id+')" class="btn btn-xs btn-primary"> '+_editBtn+'</a>';
                            		}
                            	}else{
                            		var uri = encodeURI(JSON.stringify(this))
                            		html+='<a href="javascript:;" data-json="'+uri+'"  onclick="log_add(this,'+this.id+')" class="btn btn-xs btn-primary"> 编辑</a>';
                            	}
                            }
                            html+='</div></div>' 
						})
						$("#vertical-timeline").html(html);	
					}
			}
			layer.close(loading);
		})
	}
	/**
	*写跟进
	**/
	//跟进时间初始化
    laydate({
    	elem: '#log_createTime', //需显示日期的元素选择器
    	event: 'click',
    	format: 'YYYY-MM-DD hh:mm:ss', //日期格式
    	istime: true, //是否开启时间选择
    	istoday: true, //是否显示今天
    	start: laydate.now((new Date()).getTime(), 'YYYY-MM-DD hh:mm:ss'),   //开始日期
    })
    $("#log_createTime").change(function(){
    	if(this.value=="")  $("#log_createTime").val(laydate.now((new Date()).getTime(), 'YYYY-MM-DD hh:mm:ss'));
    })
	  function log_add(dom,id){
    	var status = 0;   //0,新增 1,编辑
    	status = typeof(id)=="undefined" ? 0 : 1; 
    	var title = status ?  "修改跟进记录" :  "新增跟进记录"
        var newFloatBox = layer.open({
        type: 1,
        shade: .6,
        title:title, 
        area:["600px","600px"],
        content: $('#new-float-box'),
        btn: '保存',
        btnAlign: 'c',
        yes: function(index, layero){
      	  var self = this;
      	  var data = {
      			  orderId:orderId,
      			  link:$("#link").val(),
      			  remark:$("#remark").val(),
      			  createTime:$("#log_createTime").val()
      	  };  
      	  var ajaxURL = "/order/saveProcess";
      	  if(status){
      		  data.id = id;
      		  ajaxURL = "/order/updateProcess";
      	  }
            var realPath = [];
            var originalFilename = [];
            var url = [];
            var uploadTime = [];
            var uploader = [];
            var fileSize =[];
            var attachId = [];
            $.each(this.content.find(".file-list-item"), function (indexInArray, valueOfElement) { 
                 var info = JSON.parse(decodeURI($(this).data("info")));
                 realPath.push(info.realPath);
                 originalFilename.push(info.originalFilename);
                 url.push(info.url);
                 uploadTime.push(info.uploadTime);
                 uploader.push(info.uploader);
                 fileSize.push(info.fileSize);
                 attachId.push(info.attachId||0);
                  });
            data.realPath = realPath.join(",");
            data.originalFilename = originalFilename.join(",");
            data.url = url.join(",");
            data.uploadTime = uploadTime.join(",");
            data.uploader = uploader.join(",");
            data.fileSize = fileSize.join(",");
            data.attachId = attachId.join(",");
            $.post(ajaxURL, data,
                function (res) {
                    if(res.error=="00"){
                    	self.content.find("form")[0].reset();
                    	$(".file-list").html("");
                    	layer.close(newFloatBox);
                    	$("#log_list .success").find("button").click();
                    }
                }
            );
        } ,
        cancel:function(){
        	this.content.find("form")[0].reset();
        	$(".file-list").html("");
        }
        });
        //编辑状态下初始化对话框
    	if(status){
    		var json = JSON.parse(decodeURI( $(dom).data("json")));
    		$("#link").find('[value="'+ json.link+'"]').prop("selected",true);
    		$("#log_createTime").val(json.createTime);
    		$("#remark").val(json.remark);
    		var attachs = '';
    		$.each(json.attachs,function(){
    			if(this.id) this.attachId = this.id
    			attachs+='<div data-info="'+encodeURI(JSON.stringify(this)) + '" class="alert alert-info alert-dismissable file-list-item"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button><a href="'+this.url+'" target="_blank"> '+this.originalFilename+' </a></div>'
    		})
    		$(".file-list").html(attachs)
    	}else{
    		$("#log_createTime").val(laydate.now((new Date()).getTime(), 'YYYY-MM-DD hh:mm:ss'));
    	}
        //初始化上传组件
        init_uploader();
}
	
	
	
	
	//批量操作

	$(function() {
		$("#log_list tbody tr:first").find("button").click()
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
	
	/**
	*上传附件
	*/
	function init_uploader() {
		if(uploader_init) return;
			uploader_init = 1;
	      var uploader = WebUploader.create({
	          // 文件接收服务端。
	          server: "/contract/uploadAttachment.do",
	          runtimeOrder: 'html5',
	          // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	          pick: {
	              id: '#fileUp',
	              innerHTML: '上传附件'
	          },
	          resize: false,
	          fileNumLimit: 10
	      });

	      //上传成功
	      uploader.on('uploadSuccess', function (file, res) {
	          var container = $(".file-list");
	          var str = encodeURI(JSON.stringify(res));
	          var html= '<div data-info="'+str+'" class="alert alert-info alert-dismissable file-list-item"><button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>'
	          html+='<a href="'+res.url+'" target="_blank"> '+res.originalFilename+' </a></div>'
	          container.append(html);
	      });

	      uploader.on('uploadStart', function () {
	          window.loading = layer.load();   //上传过程中开启loading遮罩
	      })
	      //上传出错
	      uploader.on('uploadError', function (file) {
	          layer.msg('上传出错');
	      });
	      //出错
	      uploader.on('error', function (res) {
	          if (res == 'Q_TYPE_DENIED') {
	              layer.msg('上传文件格式错误，请检查')
	          }
	      });

	      //上传完成
	      uploader.on('uploadFinished', function (file) {
	          uploader.reset(); 
	          layer.close(window.loading)   //关闭遮罩层
	      });
	      //文件加入队列
	      uploader.on('fileQueued', function () {
	          uploader.upload()
	      })
	  }
