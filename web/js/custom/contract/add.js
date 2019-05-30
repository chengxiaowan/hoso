var config = {
	role: localStorage.userRole,
	api_add: api_url + '/supplierContract/saveOrupdate', // 新增合同
	api_supplierList: api_url + '/supplier/supplierList', //获取供应商列表
	api_saveProductAttach:api_url + '/supplier/addAttach',
}
Vue.directive('select2', {
	inserted: function(el, binding, vnode) {
		let options = binding.value || {};
		$(el).select2(options).on("select2:select", (e) => {
			// v-model looks for
			//  - an event named "change"
			//  - a value with property path "$event.target.value"
			el.dispatchEvent(new Event('change', {
				target: e.target
			})); //说好的双向绑定，竟然不安套路
		});
	},
	update: function(el, binding, vnode) {
		for(var i = 0; i < vnode.data.directives.length; i++) {
			if(vnode.data.directives[i].name == "model") {
				$(el).val(vnode.data.directives[i].value);
			}
		}
		$(el).trigger("change");
	}
});
window.app = new Vue({
	el: '#app',
	data: {
		role: config.role,
		list: [], // 合同列表
		selectValue: '请选择',
		id: '', // 供应商id
		supplierName: '', // 供应商名称
		contractNo: '', // 合同编号
		signingTime: '', // 合同签订时间
		endTime: '', // 合同到期时间
		remark: '', // 备注
		supplierList: [], // 供应商列表
		supplierId: '', // 供应商id
		c: {
			attachs: [],
		},
		uploader: 0, //上传组件状态
	},
	computed: {
		//合成上传附件列表
		attachs() {
			const attachs = this.c.attachs
			let data = {
				"type": [],
			}
			$.each(attachs, function() {
				for(var i in this) {
					if(data[i] == undefined) {
						data[i] = []
					}
					data[i].push(this[i])
				}
			})
			for(var i in data) {
				data[i] = data[i].join(",")
			}
			//			data.contractId = config.customerId
			return data
		}
	},
	created: function() {
		const that = this;
		document.getElementById("app").classList.remove("hide");
	},
	mounted: function() {
		const that = this;
		layui.use('laydate', function() {
			var laydate = layui.laydate;
			var endDate = laydate.render({
				elem: '#end', //选择器结束时间
				format: 'yyyy-MM-dd', //可任意组合
				min: "1970-1-1", //设置min默认最小值
				done: function(value, date) {
					that.endTime = value;
					startDate.config.max = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					}
				}
			});
			//日期范围
			var startDate = laydate.render({
				elem: '#start',
				format: 'yyyy-MM-dd', //可任意组合
				max: "2099-12-31", //设置一个默认最大值
				done: function(value, date) {
					that.signingTime = value;
					// console.log(that.startDate);
					endDate.config.min = {
						year: date.year,
						month: date.month - 1, //关键
						date: date.date,
						hours: 0,
						minutes: 0,
						seconds: 0
					};
				}
			});
		});
		that.getSupplierList();
	},
	methods: {
		/**
		 * 载入中方法
		 *
		 * @param {string} s 是否关闭
		 */
		loading: function(s) {
			if(s == "close") layer.close(this.loadingSwitch)
			else this.loadingSwitch = layer.load(3);
		},
		// 获取供应商
		getSupplierList() {
			const that = this;
			$.ajax({
				url: config.api_supplierList,
				async: true,
				type: 'post',
				data: {
					keywords: ''
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var arr = [];
						for(var i in res.result) {
							var obj = {};
							obj.id = res.result[i].id;
							obj.text = res.result[i].name;
							arr.push(obj);
						}
						that.supplierList = arr;
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		// 保存合同操作 交验合同编号，供应商是否为空
		save() {
			const that = this;
			var supplierId = that.supplierId;
			var contractNo = that.contractNo;
			if(contractNo == "") {
				layer.msg("请填写合同编号");
				return;
			} else if(supplierId == "") {
				layer.msg("请选择供应商");
				return;
			} else {
				that.addContract();
			}
		},
		// 新增合同
		addContract() {
			const that = this;
			console.log(this.c.attachs)
			$.ajax({
				url: config.api_add,
				async: true,
				type: 'post',
				data: {
					contractNo: that.contractNo,
					signingTime: that.signingTime,
					endTime: that.endTime,
					remark: that.remark,
					supplierId: that.supplierId,
					attachList:JSON.stringify(this.c.attachs)
				},
				success: function(res) {
					that.loading('close')
					if(res.error == "00") {
						var index = parent.layer.getFrameIndex(window.name);
						layer.msg('合同添加成功！');
						setTimeout(function() {
							window.parent.location.reload();
							parent.layer.close(index);
						}, 1000);
					} else {
						layer.msg(res.msg)
					}
				}
			});
		},
		initUploader() {
			if(this.uploader) return;
			const that = this;
			that.uploader = 1

			var uploader = WebUploader.create({

				// 文件接收服务端。
				server: api_url + "/attach/upload",
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
			uploader.on('uploadSuccess', function(file, res) {
				that.c.attachs.push(res)
			});

			uploader.on('uploadStart', function() {
				that.loading()
			})
			//上传出错
			uploader.on('uploadError', function(file) {
				layer.msg('上传出错');
			});
			//出错
			uploader.on('error', function(res) {
				if(res == 'Q_TYPE_DENIED') {
					layer.msg('上传文件格式错误，请检查')
				}
			});
			//上传完成
			uploader.on('uploadFinished', function(file) {
				uploader.reset();
				that.loading("close")
			});
			//文件加入队列
			uploader.on('fileQueued', function() {
				uploader.upload()
			})
		},
		attachs_delete(i) {
			const that = this;
			const dialog = layer.confirm("确定删除此附件?", () => {
				that.c.attachs.splice(i, 1)
			})
		},
	}
})