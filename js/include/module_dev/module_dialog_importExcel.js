define([
	'require', 'select2', 'webuploader','yoValidate'
], function (require, select2, WebUploader,yoValidate) {
	'use strict';
	const module = Vue.component('import-excel', {
		template: `
		<div class="pull-right m-l-xs">
 <button class="btn btn-primary" @click="customerImport"><i class="fa fa-cloud-upload"></i> 导入客户</button>
 <button class="btn btn-success" @click="customerAdd"><i class="fa fa-plus"></i> 新增客户</button>
 <div style="height:0;overflow:hidden;width:0;">
        <div class="col-sm-12 form" :id="boxId">
            <div v-if="role=='经理'" class="form-group clearfix m-t-lg">
                <label class="col-sm-12" for="">负责人</label>
                <div class="col-sm-12">
                    <select :id="selectId" style="width:100%">
                    </select>
                </div>
            </div>
			<div class="form-group clearfix" :class="{'text-center m-t-lg' : (role!='经理')}">
                <label class="col-sm-12" for="">上传EXCEL</label>
                <div class="col-sm-12">
					<div v-if="saleId==''">请先选择负责人</div>
                    <div v-show="uploadBox" :id="btnId"></div>
                </div>
            </div>
        </div>

		<div class="col-sm-12 form form-horizontal m-t-sm" :id="addBox">
            <div class="row">
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">客户名称<span class="text-danger">*</span>：</label>
									<div class="col-sm-9">
										<input class="form-control" @blur="checkName" data-validate="require" placeholder="客户名称" type="text" v-model="c.name" value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">联系人：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="联系人名称" v-model="c.linkmanName"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">手机：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="手机号码" v-model="c.linkmanMobilePhone"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">电话：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="电话号码" v-model="c.linkmanLandline"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">邮箱：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="邮箱" v-model="c.email"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">微信号：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="微信号" v-model="c.weChat"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">QQ号：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="QQ号" v-model="c.qq"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">注册资本：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="注册资本" v-model="c.zczb"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">成立日期：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="成立日期" v-model="c.clrq"  type="text"  value="">
									</div>
								</div>
							</div>
							
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">所在省：</label>
									<div class="col-sm-9">
										 <select style="width:100%" v-model="c.province" :id="provinceBox">
												<option value="">请选择</option>
											<option v-for="el in citys['省份']"  :value="el.regionName">{{el.regionName}}</option>
										</select>
									</div>
								</div>
							</div><div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">所在市：</label>
									<div class="col-sm-9">
									<select style="width:100%" v-model="c.cityName" :id="cityBox">
											<option value="">请选择</option>
										<option v-for="el in citys_sub" :value="el.regionName">{{el.regionName}}</option>
									</select>
									</div>
								</div>
							</div>
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">所在区：</label>
									<div class="col-sm-9">
									<select style="width:100%" v-model="c.area" :id="cityBox">
											<option value="">请选择</option>
										<option v-for="el in citys_sub1" :value="el.regionName">{{el.regionName}}</option>
									</select>
									</div>
								</div>
							</div>
							
							<div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">具体地址：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="具体地址" v-model="c.address"  type="text"  value="">
									</div>
								</div>
							</div><div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">下次跟进时间：</label>
									<div class="col-sm-9">
									<input class="form-control" readonly="" @click="laydate($event)" placeholder="下次跟进时间" type="text"  value="">
									</div>
								</div>
							</div><div class="col-md-12">
								<div class="form-group">
									<label class="col-sm-3 control-label">备注：</label>
									<div class="col-sm-9">
										<input class="form-control" placeholder="备注" v-model="c.content"  type="text"  value="">
									</div>
								</div>
							</div>
							<div class="col-md-12" v-if="role=='经理'">
								<div class="form-group">
									<label class="col-sm-3 control-label">负责人<span class="text-danger">*</span>：</label>
									<div class="col-sm-9">
										<select :id="saleBox" class="form-control" v-model="saleId" data-validate="require">
											
										</select>
									</div>
								</div>
							</div>
						</div>
        </div>
    </div>
	</div>
  `,
		props: ['role'],
		data() {
			return {
				//前置数据
				citys:{},
				api_saveSaleCustomer:'/saleCustomer/saveSaleCustomer', //保存
				api_hasName:'/saleCustomer/hasName', //查重
				saleId: '',
				//导入
				init: 0,
				btnId: 'importExcelBtn' + (Math.random()).toString().split('.')[1],
				boxId: 'importExcelBox' + (Math.random()).toString().split('.')[1],
				selectId: 'selectBox' + (Math.random()).toString().split('.')[1],
				uploadBox: 1,

				//新增
				init_add:0,
				addBox: 'addBox' + (Math.random()).toString().split('.')[1],
				provinceBox: 'provinceBox' + (Math.random()).toString().split('.')[1],
				cityBox: 'cityBox' + (Math.random()).toString().split('.')[1],
				saleBox:'saleBox'+ (Math.random()).toString().split('.')[1],
				select2:{
					selectId:{},
					saleId:{},
					province:{},
					citye:{},
				},
				c:{
				"name": "",
				"linkmanName": "",
				"linkmanMobilePhone": "",
				"linkmanLandline": "",
				"email": "",
				"weChat": "",
				"qq": "",
				"province": "",
				"cityName": "",
				"address": "",
				"xcgetTime": "",
				"content": "",
				"zczb":"",
				"clrq":""
			}
			}
		},
		computed:{
			            //城市列表
            citys_sub() {
                const province = this.c.province;
                let city = [];
                let provinceId;
                $.each(this.citys['省份'], (i, el) => {
                    if (province == el.regionName) provinceId = el.id
                })
                $.each(this.citys['市区'], (i, el) => {
                    if (provinceId == el.parentId) city.push(el)
                })

                return city;
            },
            
            
             citys_sub1() {
                const province = this.c.province;
				const city_1 = this.c.cityName;
				let city = [];
				let area = [];
				let provinceId;
				let cityId;
				console.log(city_1);
				$.each(this.citys['省份'], (i, el) => {
					if(province == el.regionName) provinceId = el.id
				})
				$.each(this.citys['市区'], (i, el) => {
					if(provinceId == el.parentId && city_1 == el.regionName) {
						cityId = el.id
						console.log(cityId);
					}
				})
				$.each(this.citys['区'], (i, el) => {
					if(cityId == el.parentId) area.push(el)
				})

                return area;
            },
            
		},
		created() {
            //初始化城市数据
            if (localStorage.citys) {
                this.citys = JSON.parse(localStorage.citys)
            }
			if(localStorage.userInfo&&this.role!="经理"){
				this.saleId = JSON.parse(localStorage.userInfo).list[0].USER_ID
			}
		},
		mounted() {


		},
		methods: {
			//查重
			checkName(cb){
				const that = this;
				$.post(this.api_hasName,{
					name:that.c.name
				}).done((res)=>{
					if(res.result=='error'){
						layer.msg('客户名称已存在,请检查重试')
					}else{
						(typeof cb =='function')&&cb()
					}
				})
			}
			,
			//y导入
			customerImport() {
				const that = this;
				that.uploadBox = 1;
				if (this.role == "经理") {
					that.uploadBox = 0;
					if (!that.init) {
						that.init = 1
						that.select2.selectId = $("#" + this.selectId).select2({
							placeholder: "请选择负责人",
							language: 'zh-CN',
							ajax: {
								url: "/user/getUserInfo",
								dataType: 'json',
								type: "post",
								delay: 250,
								data: function (params) {
									return {
										page: params.page || 1,
										ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
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
						}).on("change", function () {
							that.saleId = this.value
							console.log(that.saleId);
							if (that.saleId) {
								that.uploadBox = 1;
								Vue.nextTick(() => {
									that.saleId = this.value
									that.initUploader(that.saleId)
								})
							}
						})
					}
					const dialog = layer.open({
						type: 1,
						title: '导入客户',
						content: $("#" + that.boxId),
						area: ['400px', '300px'],
						end() {
							that.saleId = "";
							that.select2.selectId.val(null).trigger('change');
							that.uploadBox = 0
						}
					});
				} else {
					const dialog = layer.open({
						type: 1,
						title: '导入客户',
						content: $("#" + that.boxId),
						area: ['400px', '180px'],
						success() {
							if (!that.init) {
								that.init = 1;
								that.initUploader()
							}
						}
					});

				}


			},
			//新增客户
			customerAdd(){
				const that = this;
				const dialog = layer.open({
						type: 1,
						title: '新增客户',
						content: $("#" + that.addBox),
						area: ['800px', '600px'],
						btnAlign:'c',
						btn:'保存',
						success(){
							if(that.init_add) return;
							that.init_add = 1;
							that.select2.province = $('#'+that.provinceBox).select2().on("change",function(){
								that.c.province  = this.value;
								Vue.nextTick(()=>{
								   that.select2.city.select2("destroy")
								   that.select2.city.select2().on("change",function(){
								that.c.cityName  = this.value
							})
								})
							})
							that.select2.city = $('#'+that.cityBox).select2().on("change",function(){
								that.c.cityName  = this.value
							})
							//初始化负责人
							if(that.role!="经理") return;
							that.select2.saleId = $("#" + that.saleBox).select2({
							placeholder: "请选择负责人",
							language: 'zh-CN',
							ajax: {
								url: "/user/getUserInfo",
								dataType: 'json',
								type: "post",
								delay: 250,
								data: function (params) {
									return {
										page: params.page || 1,
										ROLE_ID: "b729e9334ad64c15a4e47d88b8c2638f,30b1487221464d369ca4c2462ccca920",
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
						}).on("change", function () {
							that.saleId = this.value
							console.log(that.saleId);
						})
						},
						yes(){
							that.save(()=>{
							layer.close(dialog)
								window.parentFnc&&window.parentFnc()
							   layer.msg('新增客户成功')
							})
						},
						end() {
							if(that.role=='经理') that.saleId = "";
							that.select2.city.val(null).trigger('change');
							that.select2.province.val(null).trigger('change');
							for (var key in that.c) {
								Vue.set(that.c,key,"")
							}
						}
					});
			},
			initUploader(saleId) {
				const that = this;
				console.log(that.saleId);
				//初始化上传
				if (that.uploader) {
					that.uploader.option('formData',{
						isKhgh: 2,
						saleId: saleId || that.saleId ||  ""
					})
					return;
				}
				console.log(saleId);
				that.uploader = WebUploader.create({
					// 文件接收服务端。
					server: '/saleCustomer/importExcel.do',
					formData: {
						isKhgh: 2,
						saleId: saleId || that.saleId ||  ""
					},
					timeout: 0,
					runtimeOrder: 'html5',
					pick: {
						id: '#' + that.btnId,
						innerHTML: '导入客户'
					},
					resize: false,
					fileNumLimit: 10
				});

				//上传成功
				that.uploader.on('uploadSuccess', function (file, res) {
					that.uploader.reset();
					that.$parent.loading('close')
					if (res.result) {
						layer.alert("上传成功<br>以下项目有重复无法导入:<br>" + res.result, () => {
							window.parentFnc && window.parentFnc()
						})
					} else {
						layer.msg("上传成功")
						setTimeout(function () {
							window.parentFnc && window.parentFnc()
						}, 2000);
					}
				});

				that.uploader.on('uploadStart', function () {
					that.$parent.loading()
				})
				//上传出错
				that.uploader.on('uploadError', function (file) {
					layer.msg('上传出错');
				});
				//出错
				that.uploader.on('error', function (res) {
					if (res == 'Q_TYPE_DENIED') {
						layer.msg('上传文件格式错误，请检查')
					}
				});
				//上传完成
				that.uploader.on('uploadFinished', function (file, res) {

				});
				//文件加入队列
				that.uploader.on('fileQueued', function () {
					that.uploader.upload()
				})
			},
			save(cb) {
				this.checkName(()=>{
				const that = this;
				if(!that.c.name){
					layer.msg('请填写客户名称')
					return;
				}else if(!that.saleId){
					layer.msg('请选择负责人')
					return;
				}
					let data = that.c;
					data.saleId =  that.saleId
					$.post(that.api_saveSaleCustomer, data).done((res) => {
						cb && cb()
					})				   
				})
			},
			laydate(e,elm) {
				const that = this
				laydate({
					vEvent:e,
					format: 'YYYY-MM-DD', istime:true ,istoday: true, choose: function (data) {
						that.c.xcgetTime = data
					}
				})
			}
		}
	})
	return module
});


