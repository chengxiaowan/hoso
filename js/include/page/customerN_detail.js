"use strict";var config={customerId:yo.getQueryString("id"),role:localStorage.userRole,api_getOrderDetail:"/customer/goEdit1",api_xgOrderDetail:"/customer/doEdit1",api_costomerList1:"/user/getUserInfo",api_saveLinkManInfo:"/linkman/saveOrupdate",api_deleteLinkManInfo:"/linkman/delete1",api_showAll:"/customer/showAll",api_saveProductAttach:"/order/saveProductAttach",api_updateSaleCustomer:"/saleCustomer/updateSaleCustomer",api_hasName:"/saleCustomer/hasName",api_saveLinkMan:"/linkman/saveLinkMan",api_updateLinkMans:"/saleCustomer/updateLinkMans",api_updateGjStatus:"/order/updateGjStatus",api_saveCallInfo:"/order/saveCallInfo",api_call:"/saleCustomer/call.do",api_updateCallInfo:"/order/updateCallInfo",api_moveGh:"/saleCustomer/moveGh.do",api_moveKh:"/saleCustomer/moveKh.do",api_isYxx:"/saleCustomer/isYxx"};require(["module_dialog_saleoffollow1"],function(e){window.app=new Vue({el:"#app",data:{c:{},type:3,uploader:0,role:config.role,citys:{},editParam:"",hoverParam:"",oldData:"",posting:!1,saleFollowMode:1,sa:[],contracts:[],orders:[],contractSaleList:[],orderSaleListList:[],contractSaleName:"",orderSaleName:""},computed:{citys_sub:function(){var t=this.c.provinceName,i=[],o=void 0;return $.each(this.citys["省份"],function(e,a){t==a.regionName&&(o=a.id)}),$.each(this.citys["市区"],function(e,a){o==a.parentId&&i.push(a)}),console.log(i),i},citys_sub1:function(){var t=this.c.province,i=this.c.cityName,o=[],n=void 0,r=void 0;return console.log(i),$.each(this.citys["省份"],function(e,a){t==a.regionName&&(n=a.id)}),$.each(this.citys["市区"],function(e,a){n==a.parentId&&i==a.regionName&&(r=a.id,console.log(r))}),$.each(this.citys["区"],function(e,a){r==a.parentId&&o.push(a)}),o},attachs:function(){var e=this.c.attachs,a={type:[]};for(var t in $.each(e,function(){for(var e in this)null==a[e]&&(a[e]=[]),a[e].push(this[e])}),a)a[t]=a[t].join(",");return a.customerId=config.customerId,a}},directives:{focus:{inserted:function(e){e.focus(),"SELECT"==e.tagName&&$(e).select2({language:"zh-CN",placeholder:"请选择"}).on("select2:close",function(e){var a=e.target.value||app.c[app.editParam],t=$(this);if(app.c[app.editParam]==a)t.select2("destroy"),app.editParam="";else{var i=app.editParam;switch(app.editParam){case"province":app.c.cityName="",app.c.area="";break;case"province1":i="provinceName",app.c.area="",app.c.cityName="";break;case"cityName1":i="cityName",app.c.cityName="",app.c.area="";break;case"area1":i="area",app.c.area=""}Vue.set(app.c,i,a),Vue.nextTick(function(){app.saveData(),t.select2("destroy"),app.editParam=""})}}).select2("open")}}},created:function(){document.getElementById("app").classList.remove("hide"),localStorage.citys&&(this.citys=JSON.parse(localStorage.citys)),this.getCaseDetail(),this.getCaseRecord()},mounted:function(){$("#salerId").select2({placeholder:"请选择",language:"zh-CN",ajax:{url:"/user/getUserInfo",dataType:"json",type:"post",delay:250,data:function(e){return{page:e.page||1,ROLE_ID:"b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",data:{q:e.term||""}}},processResults:function(e,a){return a.page=a.page||1,$.each(e,function(){this.id=this.USER_ID,this.text=this.NAME}),{results:e,pagination:{more:10==e.length}}},cache:!0},minimumInputLength:0}),this.customerName1(),this.customerName2()},methods:{enter:function(e,a){var t=this;if("number"==typeof e)if(a.target.id){if(this.editParam==a.target.id)return;this.hoverParam=a.target.id,this.editParam=a.target.id}else t.c.linkmans&&t.c.linkmans[e].remark&&(t.toolTips_tips=layer.yoTips('<span style="color:#337ab7">'+t.c.linkmans[e].remark+"</span>",a.target,{tips:[3,"#fff"]}));else{if(this.editParam==e)return;this.hoverParam=e,a&&t.c[e]&&(t.toolTips_tips=layer.yoTips('<span style="color:#337ab7">'+t.c[e]+"</span>",a.target,{tips:[3,"#fff"]}))}},leave:function(){this.hoverParam==this.editParam&&(this.hoverParam=""),0<this.editParam.indexOf("_")&&(this.editParam=""),this.toolTips_tips&&layer.close(this.toolTips_tips)},saveData:function(e){var a=this;function t(){var e={id:config.customerId};a.posting=!0,"province1"==a.editParam?e.province=a.c.provinceName:"cityName1"==a.editParam?e.cityName=a.c.cityName:"area1"==a.editParam?e.area=a.c.area:"contractSaleName"==a.editParam?(a.contractSaleName=a.c.contractSaleName.split(",")[1],e.contractSaleName=a.c.contractSaleName.split(",")[1],e.contractSaleId=a.c.contractSaleName.split(",")[0]):"orderSaleName"==a.editParam?(a.orderSaleName=a.c.orderSaleName.split(",")[1],e.orderSaleName=a.c.orderSaleName.split(",")[1],e.orderSaleId=a.c.orderSaleName.split(",")[0]):(e[a.editParam]=$.trim(a.c[a.editParam]),Vue.set(a.c,a.editParam,$.trim(a.c[a.editParam]))),a.editParam?$.post(config.api_xgOrderDetail,e,function(e){a.editParam="",a.posting=!1}):a.posting=!1}a.posting||(""==this.c.name&&(this.c.name=this.oldData),this.oldData!=this.c[this.editParam]?"name"==this.editParam?(a.posting=!0,$.post(config.api_hasName,{name:a.c[a.editParam]}).done(function(e){if("error"==e.result)return layer.msg("客户名称已存在,请检查重试"),Vue.set(a.c,a.editParam,a.oldData),void(a.posting=!1);a.posting=!1,t()})):t():this.editParam="")},change:function(e){this.hoverParam="","province1"==(this.editParam=e)?e="provinceName":"cityName1"==e?e="cityName":"area1"==e&&(e="area"),this.oldData=this.c[e]},loading:function(e){"close"==e?layer.close(this.loadingSwitch):this.loadingSwitch=layer.load(3)},getCaseDetail:function(){var a=this;a.loading(),$.ajax({url:config.api_getOrderDetail,async:!1,data:{id:config.customerId},success:function(e){a.c=e.result,a.contracts=e.result.contracts,a.orders=e.result.orders,a.contractSaleName=e.result.contractSaleName,a.orderSaleName=e.result.orderSaleName,a.loading("close")}})},getCaseRecord:function(){var a=this;a.loading(),$.post(config.api_showAll,{id:config.customerId}).done(function(e){a.loading("close"),a.sa=e.result,console.log(a.sa)})},linkman_add:function(){var t=this;require(["text!customer_linkman_add"],function(e){var a=layer.open({type:1,title:"新增联系人",closeBtn:1,content:e,area:["600px","550px"],btn:"保存",btnAlign:"c",yes:function(){require(["yoValidate"],function(){if(yoValidate("#linkman_add",1)){var e={};$.each($("#linkman_add").find("input,textarea"),function(){e[this.name]=$.trim(this.value)}),e.customerId=config.customerId,e.type=0,t.loading(),$.post(config.api_saveLinkManInfo,e).done(function(e){t.loading("close"),t.getCaseDetail(),layer.close(a)})}})}})})},linkman_edit:function(t){var i=this;require(["text!customer_linkman_add"],function(e){var a=layer.open({type:1,title:"编辑联系人",closeBtn:1,content:e,area:["600px","550px"],btn:"保存",btnAlign:"c",success:function(){$.each($("#linkman_add").find("input,textarea"),function(){this.value=t[this.name]})},yes:function(){require(["yoValidate"],function(){if(yoValidate("#linkman_add",1)){var e={};$.each($("#linkman_add").find("input,textarea"),function(){e[this.name]=$.trim(this.value)}),e.id=t.id,e.customerId=config.customerId,i.loading(),$.post(config.api_saveLinkManInfo,e).done(function(e){i.loading("close"),i.getCaseDetail(),layer.close(a)})}})}})})},initUploader:function(){if(!this.uploader){var t=this;this.loading(),require(["webuploader"],function(e){t.loading("close"),t.uploader=1;var a=e.create({server:"/contract/uploadAttachment.do",runtimeOrder:"html5",pick:{id:"#fileUp",innerHTML:"上传附件"},resize:!1,fileNumLimit:10});a.on("uploadSuccess",function(e,a){t.c.attachs.push(a)}),a.on("uploadStart",function(){t.loading()}),a.on("uploadError",function(e){layer.msg("上传出错")}),a.on("error",function(e){"Q_TYPE_DENIED"==e&&layer.msg("上传文件格式错误，请检查")}),a.on("uploadFinished",function(e){a.reset(),$.post(config.api_saveProductAttach,t.attachs).done(function(){t.loading("close")})}),a.on("fileQueued",function(){a.upload()})})}},attachs_delete:function(e){var a=this,t=layer.confirm("确定删除此附件?",function(){a.c.attachs.splice(e,1),$.ajax({type:"POST",url:config.api_saveProductAttach,data:a.attachs,timeout:99999}).done(function(){a.loading("close"),layer.close(t)})})},remind_add:function(){var t=this;require(["text!remind"],function(e){var a=layer.open({type:1,title:"新增提醒",closeBtn:1,content:e,area:["600px","300px"],btn:"保存",btnAlign:"c",success:function(){laydate({elem:"#remind_time",event:"click",format:"YYYY-MM-DD hh:mm:ss",istime:1,min:laydate.now(),istoday:!0}),$("#remind_time").val(laydate.now((new Date).getTime(),"YYYY-MM-DD"))},yes:function(){var e=$("#remind_box");""!=e.find("[name=remark]").val()?$.post(config.api_saveCallInfo,{customerId:config.customerId,customerName:t.c.name,remark:e.find("[name=remark]").val(),time:e.find("[name=time]").val()}).done(function(e){t.getCaseDetail(),layer.close(a)}):layer.msg("请填写提醒内容")}})})},remind_complete:function(e,a){var t=layer.confirm("确认完成?",function(){$.post(config.api_updateCallInfo,{id:a.id}).done(function(e){"00"==e.error?(a.flag=1,layer.close(t)):(layer.close(t),layer.msg(e.msg))})})},record_add:function(){this.saleFollowMode=1,this.$refs.follow.init({id:config.customerId,name:this.c.name})},call:function(a,e,t){var i=this,o=this;o.loading(),top.callId="",$.post(config.api_call,{mobilePhone:e}).done(function(e){o.loading("close"),o.saleFollowMode=0,Vue.nextTick(function(){i.$refs.follow.init(a,t)})})},customerName1:function(){var a=this;$.ajax({type:"get",url:config.api_costomerList1,async:!0,data:{ROLE_ID:"30b1487221464d369ca4c2462ccca920,b729e9334ad64c15a4e47d88b8c2638f"},success:function(e){a.contractSaleList=e}})},customerName2:function(){var a=this;$.ajax({type:"get",url:config.api_costomerList1,async:!0,data:{ROLE_ID:"30b1487221464d369ca4c2462ccca920,b729e9334ad64c15a4e47d88b8c2638f"},success:function(e){a.orderSaleList=e}})},vieworders:function(e){layer.open({type:2,title:"查看详情",content:"/order/viewOrder.do?id="+e,area:["100%","100%"]})},viewContract:function(e){layer.open({type:2,title:"查看详情",content:"/customer/view.do?id="+e,area:["90%","90%"]})},delLink:function(e){var a=this,t=layer.confirm("确认删除该联系人?",{title:"提示"},function(){$.get(config.api_deleteLinkManInfo,{ids:e},function(e){"00"==e.error?(layer.close(t),layer.msg("删除成功"),a.getCaseDetail()):layer.msg(e.msg)})})}}})}),window.parentFnc=function(e){layer.closeAll(),window.app.getCaseRecord(window.app.type)};