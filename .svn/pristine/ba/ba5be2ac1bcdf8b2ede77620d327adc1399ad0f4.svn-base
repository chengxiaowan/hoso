const config = {
	role: localStorage.userRole,
	userId:JSON.parse(localStorage.userInfo).list[0].USER_ID,
	api_showReportInfo : "/report/showReportInfo", //报告列表
	api_showReportInfoDetail : '/report/showReportInfoDetail',  //报告详情
	api_saveEvaluate : '/report/saveEvaluate',  //保存点评
	id : yo.getQueryString('id'),  //获取统计
	api_saveDpEvaluate :'/report/saveDpEvaluate.do'  //保存回复
	
}
	window.app = new Vue({
		el: '#app',
		data: {
			role:config.role,
			userId : config.userId,
			tabStatus : 1,
			c: {},
			d:{},
			commit:"",
			r: [],
			readId:"",
			user:'',
			type: 0, //0//周报//1//月报
			timeStart : "",
			isDo:'', //''//全部//1/已批阅//0//未批阅
			
						//回复评论
			commentReply:"",
			commentReplyBoxId:"",
			
			
			
			//载入
			loading:{
				loadingStatus:false,
				loadingShow:true,
			},
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			
		},
		mounted() {
			const that = this
			this.getReportDetail(config.id)
		},
		methods: {
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
			/*
			 * 批阅,点评
			 */
			submitCommit(id) {
				var that =this
				if(!this.commit){
					layer.msg('请填写内容后提交')
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
		}
	})

//子页面处理方法
window.parentFnc = function(params) {
	layer.closeAll();
	//更新记录
	window.app.getCaseRecord(window.app.type)
}