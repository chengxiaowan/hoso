const config = {
	isKhGh: yo.getQueryString("isKhGh") || 0, //0,客户公海,2潜在客户,3有意向公海,1无意向公海,4大客户公海
	role: localStorage.userRole,
	api_list: "/yjzb/showYgxzOrTc" //员工薪资列表

}

if(config.role == '销售精英' || config.role == '经理') {
	config.isKhGh = 4
}
require(['select2'], (select2) => {
	window.app = new Vue({
		el: '#app',
		data: {
			s: {
				lastSaleName: '',
				list: [],
			},
			postData: {},
			kind: '7d2f882f13ea48e0a4c8acaeea53b3a5,30b1487221464d369ca4c2462ccca920,01dc6d29f1704efeab0376d327f47d98'
		},

		computed: {},
		created() {
			const that = this;
			document.getElementById("app").classList.remove("hide")
		},

		mounted() {
			this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, this.kind)
			const that = this;
			//获取列表
			this.list_Get(0);
			lay('.test8').each(function() {
				laydate.render({
					elem: this,
					trigger: 'click',
					type: 'month',
					range: true
				});
			});
		},

		methods: {
			list_Get(a) {
				const that = this;
				that.postData.flag = a;
				$.get(config.api_list, that.postData, function(data) { // 回调函数
					if(data.error == '00') {
						that.s.list = data.result;
					} else {
						layer.msg(data.msg)
					}

				});
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
			//切换
			tab(num) {
				const that = this;
				if(num == 1) {
					$("#searchName2").val('');
					$(".t2").val('');
					$("#searchName3").val('');
					$(".t3").val('');
					$("#searchName4").val('');
					$(".t4").val('');
					$("#searchName5").val('');
					$(".t5").val('');
					$("#searchName6").val('');
					$(".t6").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "7d2f882f13ea48e0a4c8acaeea53b3a5,30b1487221464d369ca4c2462ccca920,01dc6d29f1704efeab0376d327f47d98"
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(0)
				}
				if(num == 2) {
					$("#searchName1").val('');
					$(".t1").val('');
					$("#searchName3").val('');
					$(".t3").val('');
					$("#searchName4").val('');
					$(".t4").val('');
					$("#searchName5").val('');
					$(".t5").val('');
					$("#searchName6").val('');
					$(".t6").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "b729e9334ad64c15a4e47d88b8c2638f,e350acd05a6244c79136616302b7dfd6,008615f04f39499fb73e5f323add988a,6f247fed28e94194ac66020e55957496,28f1842e2463492a9eb6ddf0def91658,73340766cf3d43af91daff3128adad84,b62d6d19bed64ee199f2c1a5b252b57b"
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(1);
				}
				if(num == 3) {
					$("#searchName1").val('');
					$(".t1").val('');
					$("#searchName2").val('');
					$(".t2").val('');
					$("#searchName4").val('');
					$(".t4").val('');
					$("#searchName5").val('');
					$(".t5").val('');
					$("#searchName6").val('');
					$(".t6").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "fbe6f2f9535c4fce9f024f6cb999b2bd";
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(2);
				}
				if(num == 4) {
					$("#searchName1").val('');
					$(".t1").val('');
					$("#searchName2").val('');
					$(".t2").val('');
					$("#searchName3").val('');
					$(".t3").val('');
					$("#searchName5").val('');
					$(".t5").val('');
					$("#searchName6").val('');
					$(".t6").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "04fe5e23842f4b998216080bc3b61821";
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(3);
				}
				if(num == 5) {
					$("#searchName1").val('');
					$(".t1").val('');
					$("#searchName2").val('');
					$(".t2").val('');
					$("#searchName3").val('');
					$(".t3").val('');
					$("#searchName4").val('');
					$(".t4").val('');
					$("#searchName6").val('');
					$(".t6").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "02178e62f17b4926bb7014f3ad5a1ebe,b729e9334ad64c15a4e47d88b8c2638f,e350acd05a6244c79136616302b7dfd6,008615f04f39499fb73e5f323add988a,6f247fed28e94194ac66020e55957496,28f1842e2463492a9eb6ddf0def91658,73340766cf3d43af91daff3128adad84,b62d6d19bed64ee199f2c1a5b252b57b";
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(4)
				}
				if(num == 6) {
					$("#searchName1").val('');
					$(".t1").val('');
					$("#searchName2").val('');
					$(".t2").val('');
					$("#searchName3").val('');
					$(".t3").val('');
					$("#searchName4").val('');
					$(".t4").val('');
					$("#searchName5").val('');
					$(".t5").val('');
					that.postData.USER_ID = '';
					that.postData.createTime = '';
					that.postData.endTime = '';
					that.kind = "02178e62f17b4926bb7014f3ad5a1ebe,b729e9334ad64c15a4e47d88b8c2638f,e350acd05a6244c79136616302b7dfd6,008615f04f39499fb73e5f323add988a,6f247fed28e94194ac66020e55957496,28f1842e2463492a9eb6ddf0def91658,73340766cf3d43af91daff3128adad84,b62d6d19bed64ee199f2c1a5b252b57b";
					this.s.lastSaleName = this.select_init('[name=saleName]', '请选择员工', 1, that.kind);
					that.list_Get(5)
				}
			},
			//搜索
			search1() {
				const that = this;
				that.postData.USER_ID = $("#searchName1").val();
				var t1 = $(".t1").val().split(' - ');
				that.postData.createTime = t1[0];
				that.postData.endTime = t1[1];
				that.list_Get(0)
			},
			search2() {
				const that = this;
				that.postData.USER_ID = $("#searchName2").val();
				var t2 = $(".t2").val().split(' - ');
				that.postData.createTime = t2[0];
				that.postData.endTime = t2[1];
				that.list_Get(1)
			},
			search3() {
				const that = this;
				that.postData.USER_ID = $("#searchName3").val();
				var t3 = $(".t3").val().split(' - ');
				that.postData.createTime = t3[0];
				that.postData.endTime = t3[1];
				that.list_Get(2)
			},
			search4() {
				const that = this;
				that.postData.USER_ID = $("#searchName4").val();
				var t4 = $(".t4").val().split(' - ');
				that.postData.createTime = t4[0];
				that.postData.endTime = t4[1];
				that.list_Get(3)
			},
			search5() {
				const that = this;
				that.postData.USER_ID = $("#searchName5").val();
				var t5 = $(".t5").val().split(' - ');
				that.postData.createTime = t5[0];
				that.postData.endTime = t5[1];
				that.list_Get(4)
			},
			search6() {
				const that = this;
				that.postData.USER_ID = $("#searchName6").val();
				var t5 = $(".t6").val().split(' - ');
				that.postData.createTime = t6[0];
				that.postData.endTime = t6[1];
				that.list_Get(5)
			},
			//销售select2
			/**
			 * @param {el} param_name
			 * @param {placeholder} param_name
			 * @param {clearbtn} param_name
			 * @param {roleId} aram_name
			 */
			select_init(el, placeholder, clearbtn, kind, roleId) {
				const that = this;
				return $(el).select2({
					placeholder: placeholder || "请选择",
					language: 'zh-CN',
					allowClear: clearbtn || false,
					ajax: {
						url: "/user/getUserInfo",
						dataType: 'json',
						type: "post",
						delay: 250,
						data: function(params) {
							return {
								page: params.page || 1,
								ROLE_ID: roleId || kind,
								data: {
									q: params.term || "", // search term
								}
							};
						},
						processResults: function(data, params) {
							params.page = params.page || 1;
							config.htz_gw = data;
							$.each(data, function() {
								this.id = this.USER_ID;
								this.text = this.NAME;
							})

							return {
								results: data,
								pagination: {
									more: data.length == 10
								},
							};
						},
						cache: true
					},
					minimumInputLength: 0
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