"use strict";var config={isKhGh:yo.getQueryString("isKhGh")||0,role:localStorage.userRole,userId:JSON.parse(localStorage.userInfo).list[0].USER_ID,api_detail:"/mainIndex/showSwgwYjmbDetatil",time:yo.getQueryString("time"),id:yo.getQueryString("id"),saleName:yo.getQueryString("saleName"),api_user:"/user/getUserInfo",ch:yo.getQueryString("ch"),jidu:yo.getQueryString("jidu"),type:yo.getQueryString("type")};"销售精英"!=config.role&&"经理"!=config.role||(config.isKhGh=4);var app={},app2={},app3={},app4={},option=null,option2=null,option3=null,option4=null;option={title:{text:"",textStyle:{color:"#3a3a3a",fontStyle:"normal",fontSize:16}},tooltip:{trigger:"axis"},legend:{data:["商务顾问业绩目标完成情况"]},xAxis:{type:"category",data:[]},yAxis:{type:"value",max:""},series:[{data:[],type:"line",symbol:"circle",symbolSize:6,areaStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#d9ebfd"},{offset:.5,color:"#f6fafe"},{offset:.8,color:"#ffffff"}])}},itemStyle:{normal:{color:"#459df5"}}}]},option2={title:{text:"",textStyle:{color:"#3a3a3a",fontStyle:"normal",fontSize:16}},tooltip:{trigger:"axis"},legend:{data:["商务顾问业绩目标完成情况"]},xAxis:{type:"category",data:[]},yAxis:{type:"value",max:""},series:[{data:[],type:"line",symbol:"circle",symbolSize:6,areaStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#d9ebfd"},{offset:.5,color:"#f6fafe"},{offset:.8,color:"#ffffff"}])}},itemStyle:{normal:{color:"#459df5"}}}]},option3={title:{text:"",textStyle:{color:"#3a3a3a",fontStyle:"normal",fontSize:16}},tooltip:{trigger:"axis"},legend:{data:["商务顾问业绩目标完成情况"]},xAxis:{type:"category",data:[]},yAxis:{type:"value",max:""},series:[{data:[],type:"line",symbol:"circle",symbolSize:6,areaStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#d9ebfd"},{offset:.5,color:"#f6fafe"},{offset:.8,color:"#ffffff"}])}},itemStyle:{normal:{color:"#459df5"}}}]},option4={title:{text:"",textStyle:{color:"#3a3a3a",fontStyle:"normal",fontSize:16}},tooltip:{trigger:"axis"},legend:{data:["商务顾问业绩目标完成情况"]},xAxis:{type:"category",data:[]},yAxis:{type:"value",max:""},series:[{data:[],type:"line",symbol:"circle",symbolSize:6,areaStyle:{normal:{color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#d9ebfd"},{offset:.5,color:"#f6fafe"},{offset:.8,color:"#ffffff"}])}},itemStyle:{normal:{color:"#459df5"}}}]};var labelTop={normal:{color:"#fdb54e",label:{show:!0,position:"center",formatter:"{b}",textStyle:{baseline:"top",fontSize:14}},labelLine:{show:!1}}},labelFromatter={normal:{label:{formatter:function(e){return 100-e.value+"%"},textStyle:{baseline:"top"}}}},labelBottom={normal:{color:"#d3d6da",label:{show:!0,position:"center",fontSize:12},labelLine:{show:!1}},emphasis:{color:"#d3d6da"}},radius=["80%","90%"],pieChartOption={title:{text:"",subtext:"",x:"center"},animation:!1,tooltip:{trigger:"axis",showDelay:0,hideDelay:50,transitionDuration:0,borderRadius:8,borderWidth:2,padding:10},series:[{type:"pie",center:["50%","55%"],radius:radius,x:"0%",itemStyle:labelTop,data:[{name:"0%",value:0,itemStyle:labelTop},{name:"到款金额进度",value:0,itemStyle:labelBottom}]}]},labelTop2={normal:{color:"#53c1a6",label:{show:!0,position:"center",formatter:"{b}",textStyle:{baseline:"top",fontSize:14}},labelLine:{show:!1}}},labelFromatter2={normal:{label:{formatter:function(e){return 100-e.value+"%"},textStyle:{baseline:"top"}}}},labelBottom2={normal:{color:"#d3d6da",label:{show:!0,position:"center",fontSize:12},labelLine:{show:!1}},emphasis:{color:"#d3d6da"}},radius2=["80%","90%"],pieChartOption2={title:{text:"",subtext:"",x:"center"},animation:!1,tooltip:{trigger:"axis",showDelay:0,hideDelay:50,transitionDuration:0,borderRadius:8,borderWidth:2,padding:10},series:[{type:"pie",center:["50%","55%"],radius:radius2,x:"0%",itemStyle:labelTop2,data:[{name:"0%",value:0,itemStyle:labelTop2},{name:"合同数量进度",value:0,itemStyle:labelBottom2}]}]},labelTop3={normal:{color:"#fdb54e",label:{show:!0,position:"center",formatter:"{b}",textStyle:{baseline:"top",fontSize:14}},labelLine:{show:!1}}},labelFromatter3={normal:{label:{formatter:function(e){return 100-e.value+"%"},textStyle:{baseline:"top"}}}},labelBottom3={normal:{color:"#d3d6da",label:{show:!0,position:"center",fontSize:12},labelLine:{show:!1}},emphasis:{color:"#d3d6da"}},radius3=["80%","90%"],pieChartOption3={title:{text:"",subtext:"",x:"center"},animation:!1,tooltip:{trigger:"axis",showDelay:0,hideDelay:50,transitionDuration:0,borderRadius:8,borderWidth:2,padding:10},series:[{type:"pie",center:["50%","55%"],radius:radius3,x:"0%",itemStyle:labelTop3,data:[{name:"0%",value:0,itemStyle:labelTop3},{name:"委案金额进度",value:0,itemStyle:labelBottom3}]}]},labelTop4={normal:{color:"#53c1a6",label:{show:!0,position:"center",formatter:"{b}",textStyle:{baseline:"top",fontSize:14}},labelLine:{show:!1}}},labelFromatter4={normal:{label:{formatter:function(e){return 100-e.value+"%"},textStyle:{baseline:"top"}}}},labelBottom4={normal:{color:"#d3d6da",label:{show:!0,position:"center",fontSize:12},labelLine:{show:!1}},emphasis:{color:"#d3d6da"}},radius4=["80%","90%"],pieChartOption4={title:{text:"",subtext:"",x:"center"},animation:!1,tooltip:{trigger:"axis",showDelay:0,hideDelay:50,transitionDuration:0,borderRadius:8,borderWidth:2,padding:10},series:[{type:"pie",center:["50%","55%"],radius:radius4,x:"0%",itemStyle:labelTop4,data:[{name:"0%",value:0,itemStyle:labelTop4},{name:"拜访量进度",value:0,itemStyle:labelBottom4}]}]};require(["select2"],function(e){window.app=new Vue({el:"#app",data:{dxmonth:(new Date).getFullYear().toString(),dxmonth2:(new Date).getFullYear().toString(),dxmonth3:(new Date).getFullYear().toString(),dxmonth4:(new Date).getFullYear().toString(),dx:{dkje:"",mbdkje:"",htsl:"",mbhtsl:"",ddje:"",mbddje:"",list:[],list2:[],list3:[],list4:[],idchange2:"",idchange3:"",gxtime:"",gxtime2:"",gxtime3:"",gxtime4:""},saleId:config.userId,listId:[]},watch:{dxmonth:function(e){this.getYjmb(this.dxmonth,0)},saleId:function(e){this.getYjmb(this.dxmonth,0)},dxmonth2:function(e){this.getYjmb2(this.dxmonth2,1,1)},dxmonth3:function(e){this.getYjmb3(this.dxmonth3,2,1)},dxmonth4:function(e){this.getYjmb4(this.dxmonth4,3)}},computed:{},created:function(){document.getElementById("app").classList.remove("hide")},mounted:function(){var a=this;laydate.render({elem:"#dxmonth",type:"year",done:function(e,t){a.dxmonth=e}}),laydate.render({elem:"#dxmonth2",type:"year",done:function(e,t){a.dxmonth2=e}}),laydate.render({elem:"#dxmonth3",type:"year",done:function(e,t){a.dxmonth3=e}}),laydate.render({elem:"#dxmonth4",type:"year",done:function(e,t){a.dxmonth4=e}}),this.getYjmb(a.dxmonth,0),this.getYjmb2(this.dxmonth2,1),this.getYjmb3(this.dxmonth3,2),this.getYjmb4(this.dxmonth4,3)},methods:{loading:function(e){"close"==e?layer.close(this.loadingSwitch):this.loadingSwitch=layer.load(3)},getYjmb:function(r,e){var d,s,m=this,t=r+"-04-01",a=Number(r)+1+"-03-31";$.ajax({type:"post",url:config.api_detail,async:!0,data:{startTime:t,endTime:a,type:e,saleId:m.saleId},success:function(t){if(m.loading("close"),"00"==t.error){for(var e=[],a=[],i=0;i<t.result.length;i++){var o=t.result[i];e.push(o.name),a.push(o.dkje)}m.dx.gxtime=0,m.dx.dkje=t.result[0].dkje||0,m.dx.mbdkje=t.result[0].mbdkje||0,"Infinity"==(d=Math.round(m.dx.dkje/m.dx.mbdkje*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx(d,s,r,m.dx.gxtime);var l=Number(Math.max.apply(null,a));l+=.2*l;var n=echarts.init(document.getElementById("main"));option.xAxis.data=["一季度","二季度","三季度","四季度"],option.yAxis.max=Math.ceil(l),option.series[0].data=a,n.setOption(option),n.off("click"),n.on("click",function(e){m.dx.gxtime=e.dataIndex,m.dx.dkje=t.result[e.dataIndex].dkje||0,m.dx.mbdkje=t.result[e.dataIndex].mbdkje||0,"Infinity"==(d=Math.round(m.dx.dkje/m.dx.mbdkje*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx(d,s,r,m.dx.gxtime)})}else layer.msg(t.msg)}})},getYjmb2:function(e,t,r){var d,s,m=this,x=m.nowMonth(),a=e+"-04-01",i=Number(e)+1+"-03-31";$.ajax({type:"post",url:config.api_detail,async:!0,data:{startTime:a,endTime:i,type:t,saleId:m.saleId},success:function(t){if(m.loading("close"),"00"==t.error){for(var e=[],a=[],i=0;i<t.result.length;i++){var o=t.result[i];e.push(o.name),a.push(o.htsl)}if(null==r){for(i=0;i<t.result.length;i++)x==t.result[i].time&&(m.dx.gxtime2=t.result[i].time,m.dx.idchange2=i,m.dx.htsl=t.result[i].htsl||0,m.dx.mbhtsl=t.result[i].mbhtsl||0,"Infinity"==(d=Math.round(m.dx.htsl/m.dx.mbhtsl*1e4)/100)?d=100:isNaN(d)&&(d=0));s=d+"%",m.dxhx2(d,s,m.dx.gxtime2)}else 1==r&&(m.dx.gxtime2=t.result[m.dx.idchange2].time,m.dx.gxtime2=t.result[m.dx.idchange2].time,m.dx.htsl=t.result[m.dx.idchange2].htsl||0,m.dx.mbhtsl=t.result[m.dx.idchange2].mbhtsl||0,"Infinity"==(d=Math.round(m.dx.htsl/m.dx.mbhtsl*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx2(d,s,m.dx.gxtime2));var l=Number(Math.max.apply(null,a));l+=.2*l;var n=echarts.init(document.getElementById("main2"));option2.xAxis.data=["四月份","五月份","六月份","七月份","八月份","九月份","十月份","十一月份","十二月份","一月份","二月份","三月份"],option2.yAxis.max=Math.ceil(l),option2.series[0].data=a,n.setOption(option2),n.off("click"),n.on("click",function(e){m.dx.gxtime2=t.result[e.dataIndex].time,m.dx.idchange2=e.dataIndex,m.dx.htsl=t.result[e.dataIndex].htsl||0,m.dx.mbhtsl=t.result[e.dataIndex].mbhtsl||0,"Infinity"==(d=Math.round(m.dx.htsl/m.dx.mbhtsl*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx2(d,s,m.dx.gxtime2)})}else layer.msg(t.msg)}})},getYjmb3:function(e,t,r){var d,s,m=this,x=m.nowMonth(),a=e+"-04-01",i=Number(e)+1+"-03-31";$.ajax({type:"post",url:config.api_detail,async:!0,data:{startTime:a,endTime:i,type:t,saleId:m.saleId},success:function(t){if(m.loading("close"),"00"==t.error){for(var e=[],a=[],i=0;i<t.result.length;i++){var o=t.result[i];e.push(o.name),a.push(o.ddje)}if(null==r){for(i=0;i<t.result.length;i++)x==t.result[i].time&&(m.dx.gxtime3=t.result[i].time,m.dx.idchange3=i,m.dx.ddje=t.result[i].ddje||0,m.dx.mbddje=t.result[i].mbddje||0,"Infinity"==(d=Math.round(m.dx.ddje/m.dx.mbddje*1e4)/100)?d=100:isNaN(d)&&(d=0));s=d+"%",m.dxhx3(d,s,m.dx.gxtime3)}else 1==r&&(m.dx.gxtime3=t.result[m.dx.idchange3].time,m.dx.ddje=t.result[m.dx.idchange3].ddje||0,m.dx.mbddje=t.result[m.dx.idchange3].mbddje||0,"Infinity"==(d=Math.round(m.dx.ddje/m.dx.mbddje*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx3(d,s,m.dx.gxtime3));var l=Number(Math.max.apply(null,a));l+=.2*l;var n=echarts.init(document.getElementById("main3"));option3.xAxis.data=["四月份","五月份","六月份","七月份","八月份","九月份","十月份","十一月份","十二月份","一月份","二月份","三月份"],option3.yAxis.max=Math.ceil(l),option3.series[0].data=a,n.setOption(option3),n.off("click"),n.on("click",function(e){m.dx.idchange3=e.dataIndex,m.dx.gxtime3=t.result[e.dataIndex].time,m.dx.ddje=t.result[e.dataIndex].ddje||0,m.dx.mbddje=t.result[e.dataIndex].mbddje||0,"Infinity"==(d=Math.round(m.dx.ddje/m.dx.mbddje*1e4)/100)?d=100:isNaN(d)&&(d=0),s=d+"%",m.dxhx3(d,s,m.dx.gxtime3)})}else layer.msg(t.msg)}})},getYjmb4:function(e,t){var a=this,i=(a.nowMonth(),e+"-04-01"),o=Number(e)+1+"-03-31";$.ajax({type:"post",url:config.api_detail,async:!0,data:{startTime:i,endTime:o,type:t,saleId:a.saleId},success:function(e){a.loading("close"),"00"==e.error||layer.msg(e.msg)}})},dxhx:function(e,t,a,i){var o,l=this;pieChartOption.series[0].data[0].name=t,pieChartOption.series[0].data[0].value=e,pieChartOption.series[0].data[1].value=100-e,0==i?o="一":1==i?o="二":2==i?o="三":3==i&&(o="四"),gxtime1=Number(i)+1,pieChartOption.title.text=a+"年"+o+"季度";var n=document.getElementById("pie"),r=echarts.init(n);r.setOption(pieChartOption),r.off("click"),r.on("click",function(e){var t="/static/page/index/saler_turnover_list.html?year="+a+"&gxtime="+gxtime1+"&USER_ID="+l.saleId+"&flag=3&htz=1";layer.open({type:2,title:"商务顾问业绩目标-到款金额完成情况",content:t,area:["100%","100%"]})})},dxhx2:function(e,t,a){var i=this;pieChartOption2.series[0].data[0].name=t,pieChartOption2.series[0].data[0].value=e,pieChartOption2.series[0].data[1].value=100-e,pieChartOption2.title.text=a+"月份";var o=document.getElementById("pie2"),l=echarts.init(o);l.setOption(pieChartOption2),l.off("click"),l.on("click",function(e){var t="/static/page/index/saler_hetong_list.html?gxtime="+a+"&saleId="+i.saleId+"&htz=1";layer.open({type:2,title:"商务顾问业绩目标-合同数量完成情况",content:t,area:["100%","100%"]})})},dxhx3:function(e,t,a){var i=this;pieChartOption3.series[0].data[0].name=t,pieChartOption3.series[0].data[0].value=e,pieChartOption3.series[0].data[1].value=100-e;var o=document.getElementById("pie3");pieChartOption3.title.text=a+"月份";var l=echarts.init(o);l.setOption(pieChartOption3),l.off("click"),l.on("click",function(e){var t="/static/page/index/saler_weian_list.html?gxtime="+a+"&saleId="+i.saleId+"&htz=1";layer.open({type:2,title:"商务顾问业绩目标-委案金额",content:t,area:["100%","100%"]})})},dxhx4:function(e,t){pieChartOption4.series[0].data[0].name=t,pieChartOption4.series[0].data[0].value=e,pieChartOption4.series[0].data[1].value=100-e;var a=document.getElementById("pie4"),i=echarts.init(a);i.setOption(pieChartOption4),i.off("click"),i.on("click",function(e){var t="/static/page/index/saler_follow_list.html?startTime="+t0+"&endTime="+t1+"&type=1&saleId="+id+"&saleName="+config.saleName;layer.open({type:2,title:"电话量",content:t,area:["100%","100%"]})})},nowMonth:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1;return a=a<10?"0"+a:a,t.toString()+"-"+a.toString()}}})}),window.parentFnc=function(e){layer.closeAll(),window.app.getCaseRecord(window.app.type)};