const config = {
	role: localStorage.userRole,
	userId:JSON.parse(localStorage.userInfo).list[0].USER_ID,
	api_showReportInfo : "/report/showReportInfo", //报告列表
	api_showReportInfoDetail : '/report/showReportInfoDetail',  //报告详情
	api_saveEvaluate : '/report/saveEvaluate',  //保存点评
	api_deleteSaleReport : '/report/deleteSaleReport',  //删除报告
	api_reportTj : '/report/reportTj',  //获取统计
	api_saveDpEvaluate :'/report/saveDpEvaluate.do'  //保存回复
	
}
require(['module_dialog_workreport_edit'], (dialog_follow) => {
	window.app = new Vue({
		el: '#app',
		data: {
			role:config.role,
			userId : config.userId,
			tabStatus : 1,
			c: {},
			d:{},
			commit:"",
			reply:"",
			r: [],
			readId:"",
			user:'',
			type: 0, //0//周报//1//月报
			timeStart : "",
			isDo:'', //''//全部//1/已批阅//0//未批阅
			
			
			//载入
			loading:{
				loadingStatus:false,
				loadingShow:true,
			},
			
			//回复评论
			commentReply:"",
			commentReplyBoxId:"",
			
			
			//统计报告
			statistics_type:0,
			statistics_list:[{
				data:[]
			}],
			statistics_time:'',
			statistics_now:'',
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			
			const loadingList = $(".workreport-list")
			
			if((this.role=='销售精英'||this.role=='电访销售')) this.tabStatus = 2
			
			that.getReportList()
			$(".workreport-list")[0].addEventListener('scroll', function() {
			        if(this.scrollTop + this.clientHeight >= (this.scrollHeight-50)) {
			        	if(that.loading.loadingStatus) return;
			        	that.getReportList()
			        }
			      })
		},
		watch : {
			type:function(n){
				this.detailReset()
			},
			isDo(){
				this.detailReset()
			},
			user(){
				this.detailReset()
			},
			statistics_type(){
				this.getStatistics(0,this.statistics_type)
			},
			commentReplyBoxId:function(){
				this.commentReply = ""
			}
		},
		mounted() {
			const that = this
			
			//解绑回复
			$(document).on('click',function(e){
				const r = $(e.target).closest(".comment-reply").length
				const b= $(e.target).closest(".btn-reply").length
				if(!r&&!b) that.commentReplyBoxId=""
			})
			
			
			//选择负责人
			$('#salerId').select2({
				placeholder: "请选择",
				language: 'zh-CN',
				allowClear: true,
				ajax: {
					url: "/user/getUserInfo",
					dataType: 'json',
					type: "post",
					delay: 250,
					data: function(params) {
						return {
							page: params.page || 1,
							ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
							data: {
								q: params.term || "", // search term
							}
						};
					},
					processResults: function(data, params) {
						params.page = params.page || 1;
						$.each(data, function() {
							this.id = this.USER_ID;
							this.text = this.NAME;
						})
						return {
							results: data,
							pagination: {
								more: data.length == 10
							}
						};
					},
					cache: true
				},
				minimumInputLength: 0
			}).on('change',function(){
				that.user = this.value;
			})
		},
		methods: {
			detailReset(){
				this.loading.loadingShow = true
				$("#report_detail").addClass('hide')
				this.timeStart = ""
				this.getReportList()
				this.readId = ""
			},
			tab(tab){
				const that = this
				this.tabStatus=tab || 1
				$("#salerId").val(null).trigger('change')
				this.type = 0
				this.isDo = ""
				Vue.nextTick(function(){
					that.getReportList(that.tabStatus)
				})
				if(tab==4) this.getStatistics(0,0)
			},
			/**
			 * 获取报告列表
			 * 
			 */
			getReportList(tab) {
				const that = this;
				that.loading.loadingStatus = true
				if(tab){   //如果是初始化tab
					that.tabStatus = tab
					that.timeStart = ""
				}else if(!that.timeStart){  //如果是选择了周报月报
					
				}else if(this.r&&this.r.length){  //如果是加载更多
						that.timeStart = this.type==0 ? this.r[this.r.length - 1].time.split('~')[0] : this.r[this.r.length - 1].time
				}
				$.post(config.api_showReportInfo, {
					type:that.type,
					tab:that.tabStatus,
					timeStart:that.timeStart,
					isDo:that.isDo,
					userId:that.user
				}).done(function(res) {
				that.loading.loadingStatus = false
				if(that.r&&that.r.length<10) {
					that.loading.loadingShow = false
				}
					if(that.timeStart) {
						that.r = that.r.concat(res.result) 
					}
					else {
						that.r = res.result
						if(that.r.length){
							that.timeStart = that.type==0 ? that.r[that.r.length - 1].time.split('~')[0] : that.r[that.r.length - 1].time
						}
					}
					if($(".fa-circle-o-notch.fa-spin").is(":visible")) that.getReportList()
				})
			},
			/**
			 * 获取报告详情
			 * 
			 */
			getReportDetail(id) {
				this.readId = id
				var that =this
					$("#report_detail").addClass('hide')
				$.post(config.api_showReportInfoDetail, {
					id:id
				}).done(function(res) {
					$("#report_detail").removeClass('hide')
					that.d = res.result
				})
			},
			/**
			 * 新增工作报告
			 * 
			 */
			reportAdd(){
				this.$refs.edit.init()
			},
			/**
			 * 编辑工作报告
			 * 
			 */
			reportEdit(info){
				this.$refs.edit.init(info)
			},
			/**
			 * 删除
			 * 
			 */
			reportDel(id){
				const that = this;
				let dialog = layer.confirm('确认删除此工作报告?',function(){
					$.post(config.api_deleteSaleReport,{
						id:id
					}).done(function(res){
						if(res.error=='00'){
							location.reload()
						}else{
							layer.msg(res.msg)
						}
					})
				})
			},
			/*
			 * 批阅,点评
			 */
			submitCommit(id) {
				var that =this
				if(!this.commit){
					layer.msg('请填写内容后提交')
					return;
				}
				$.post(config.api_saveEvaluate, {
					saleReportId:id,
					Content:that.commit
				}).done(function(res) {
					that.getReportDetail(id)
					that.commit =""
					if(!that.d.isDo&&that.userId==that.d.readMan){
						$.each(that.r,function(){
							$.each(this.reportInfo,function(){
								if(this.id == id){
									this.isDo = 1
								}
							})
						})
					}
					
				})
			},
						/*
			 * 回复
			 */
			submitReply(reportId,userId) {
				var that =this
				if(!that.commentReply){
					layer.msg('请填写内容后提交')
					return;
				}
				$.post(config.api_saveDpEvaluate, {
					reportUserId:that.d.userId,
					dpUserId:userId,
					 saleReportId:that.readId
					 ,Content:that.commentReply
				}).done(function(res) {
					that.getReportDetail(that.readId)
					that.commentReply =""
					that.commentReplyBoxId=""
				})
			},
			
			/**
			 * 获取报告统计
			 */
			getStatistics (param,type){
				const that = this;
					if(that.statistics_type==0){
						//设置当前时间
						let month = new Date().getMonth() + 1
						month = month < 10 ? '0' + month.toString() : month
						that.statistics_now = new Date().getFullYear()+'-'+month.toString()
						let ndate = that.statistics_time + '-' +'15'
				ndate = new Date(ndate).getTime()
				if(param==0){
					that.statistics_time = that.statistics_now
				}else if(param==1){
					ndate = ndate + 3600000*24*30
					let month = new Date(ndate).getMonth() + 1
					month = month < 10 ? '0' + month.toString() : month
					that.statistics_time = new Date(ndate).getFullYear()+'-'+month.toString()
				}else if(param==-1){
					ndate = ndate - 3600000*24*30
					let month = new Date(ndate).getMonth() + 1
					month = month < 10 ? '0' + month.toString() : month
					that.statistics_time = new Date(ndate).getFullYear()+'-'+month.toString()
				}
					}else{
						//设置当前时间
						that.statistics_now = new Date().getFullYear()
						if(param==0){
					that.statistics_time = that.statistics_now
				}else if(param==1){
					that.statistics_time = Number(that.statistics_time)+ 1
				}else if(param==-1){
					that.statistics_time = Number(that.statistics_time)- 1
				}
					}
				
				$.post(config.api_reportTj,{
					flag:that.statistics_type,
					time:that.statistics_time
				}).done((res)=>{
					that.statistics_list = res.result
				})
			},
			/**
			 * 载入中方法
			 * 
			 * @param {string} s 是否关闭
			 */
			loading(s) {
				if(s == "close") layer.close(this.loadingSwitch)
				else this.loadingSwitch = layer.load(3);
				// else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
			},
			showReportView(id){
				layer.open({
					type:2,
					title:"查看报告",
					area:["100%","100%"],
					content:'/static/page/workreport/workreport_view.html?id=' +id
				})
			},
			
		}
	})

})
//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}