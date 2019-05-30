const config = {
	role: localStorage.userRole,
	saleId:JSON.parse(localStorage.userInfo).list[0].USER_ID,
	api_showSaleFroecast: '/report/showSaleFroecast', //获取列表
	api_saveForecast: '/report/saveForecast', //保存信息
	api_getQzkh:'/report/getQzkh', //客户查询
	api_updateForecast:'/report/updateForecast'  //更新信息
}
	window.app = new Vue({
		el: '#app',
		data: {
			c: {},
			totalMoney:0,
			role: config.role,
			isKhGh: 2,
			postData: {},
			posting: false, //是否正在上传数据
			checkAll: 0,
			checks: [],
			callId: '',
			//搜索项
			s: {
				keywords: {},
				saleName: {},
				provinceName: "",
				cityName: "",
			},
			select2: {

			},
		},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
			//初始化城市数据
			if (localStorage.citys) {
				this.citys = JSON.parse(localStorage.citys)
			}



		},
		mounted() {
			const that = this;
			//弹出页查看状态
			if(yo.getQueryString("type")){  //检测查看状态
				$('[name=time]').val(yo.getQueryString("month"))
				var saleId = yo.getQueryString("saleId");
				var saleName = decodeURI(yo.getQueryString("saleName")) 
				if(saleId&&saleName) $('#saleId').html(`<option value="${saleId}" selected>${saleName}</option>`)
			}
			//时间选择初始化
			$('.date-picker').datepicker({
			autoclose : true,
			startView:3,
			minViewMode :'months',
		}) 
 
			//获取列表
			this.list_Get()

			this.salerId = that.select_init('#saleId')
			that.customer_init()
			
		},
		methods: {
			//重置
			clear(){
				this.salerId.val(null).trigger('change');
				$(".date-picker").val("")
			},
			/**
			 * 载入中方法
			 * 
			 * @param {string} s 是否关闭
			 */
			loading(s) {
				if (s == "close") layer.close(this.loadingSwitch)
				else this.loadingSwitch = layer.load(3);
				// else this.loadingSwitch = layer.load(3, { shade: [.6, "#fff"] });
			},
			//搜索
			search() {
				this.postData.saleId = $.trim($('[name=saleId]').val());
				this.postData.month = $.trim($('[name=time]').val());
				this.list_Get(1)
			},
			//获取列表数据
			list_Get(page) {
				$('body,html').scrollTop(0)
				const that = this;
				if (page) this.c.pageNum = page
				that.loading();
				that.postData.pageSize = this.c.pageSize;
				that.postData.pageNo = this.c.pageNum;
				that.postData.month = $('#time').val();
				that.postData.saleId = $('#saleId').val();
				$.ajax({
					url: config.api_showSaleFroecast,
					async: false,
					data: that.postData
				}).done((res) => {
					that.c = res.result;
					that.totalMoney = res.totalMoney;
					Vue.nextTick(()=>{
					   $('.tips-hook').hover(function(){
						   let text = $(this).find("div").text()
				layer.yoTips(`<span style="color:#337ab7">${text}</span>`,this,{
							tips: [3, '#fff'],
							})
						})
					})
					//分页
					if (that.pagi) {
						$('.pagi').pagination('updatePages', that.c.pages)
						if (page == 1) $('.pagi').pagination('goToPage', that.c.pageNum)
					} else {
							that.pagi = $('.pagi').pagination({
								pages: that.c.pages, //总页数
								showCtrl: true,
								displayPage: 6,
								currentPage: that.c.pageNum,
								onSelect: function (num) {
									that.c.pageNum = num
									that.list_Get()
								}
							})
					}
					that.loading('close');
				})
			},
			//新增
			add(el) {
				const that = this;
				var index = layer.open({
					type: 1,
					title: '编辑',
					content: $('#addBox'),
					area: ['600px', '500px'],
					btn:['保存'],
					yes(){
						require(['yoValidate'],()=>{
						if(!yoValidate("#addBox",1)) return;
						var data = {};
						$.each($('#addBox').find("select,input,textarea"),function(){
							data[this.name] = this.value;
						})
						data.saleId = config.saleId
						$.post(config.api_saveForecast,data,(res)=>{
						   if(res.error=="00"){
							layer.close(index)
							layer.msg("保存成功")
							that.list_Get(1)
						   }else{
							   layer.msg(res.msg)
						   }
						})
						})
					},
					end(){
						$('[name="date"]').datepicker('update', '');
						that.customer.val(null).trigger("change")
						$.each($('#addBox').find("select,input,textarea"),function(){
							this.value="";
						})
					}
				});

			},
			edit(el){
				const that = this;
						$('#customer').html(`<option value="${el.saleCustomerId}">${el.saleCustomerName}</option>`)
					that.customer.val(el.saleCustomerId).trigger("change")
						$.each($('#addBox').find("input,textarea"),function(){
							this.value = el[this.name];
						})
				var index = layer.open({
					type: 1,
					title: '编辑',
					content: $('#addBox'),
					area: ['600px', '500px'],
					btn:['保存'],
					btnAlign:'c',
					yes(){
						require(['yoValidate'],()=>{
						if(!yoValidate("#addBox",1)) return;
						var data = {};
						$.each($('#addBox').find("select,input,textarea"),function(){
							data[this.name] = this.value;
						})
						data.saleId = config.saleId
						data.id = el.id
						$.post(config.api_saveForecast,data,(res)=>{
						   if(res.error=="00"){
							   $.each($('#addBox').find("input,textarea"),function(){
							this.value = "";
						})
							that.customer.val(null).trigger("change")
							layer.close(index)
							layer.msg("保存成功")
							that.list_Get(1)
						   }else{
							   layer.msg(res.msg)
						   }
						})
						})
					}
				});

			},
			//销售select2
			select_init(el) {
				return $(el).select2({
					placeholder: "请选择销售",
					language: 'zh-CN',
					allowClear:1,
					ajax: {
						url: "/user/getUserInfo",
						dataType: 'json',
						type: "post",
						delay: 250,
						data: function (params) {
							return {
								page: params.page || 1,
								ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f",
								data: {
									q: params.term || "", // search term
								}
							};
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							$.each(data, function () {
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
				})


			},
			//初始化客户下拉框
			customer_init(){
				this.customer =  $('#customer').select2({
					placeholder: "请选择客户",
					language: 'zh-CN',
					ajax: {
						url: config.api_getQzkh,
						dataType: 'json',
						type: "post",
						delay: 250,
						data: function (params) {
							return {
								page: params.page || 1,
								saleId: config.saleId,
								data: {
									q: params.term || "", // search term
								}
							};
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							$.each(data, function () {
								this.id = this.id;
								this.text = this.name;
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
				})
			}
			
		}
	})

//子页面处理方法
window.parentFnc = function (params) {
	layer.closeAll();
	//更新记录
	window.app.list_Get()
}


