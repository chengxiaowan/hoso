define([
	'require'
], function(require) {
	'use strict';
	const module = Vue.component('sale-follow', {
		template: `<div class="col-sm-12 form" id="follow-box">
            <form class="m-t-sm row">
                <div class="form-group col-sm-4">
                    <select style="width:100%" v-model="type" class="form-control">
                    <option v-if="dialogMode==1" selected value="">请选择跟进方式</option>
                   <option  selected value="0">电话</option>
                   
               	   <option v-if="dialogMode==1" value="1">QQ</option>
                   <option v-if="dialogMode==1" value="2">微信</option>
                   <option v-if="dialogMode==1" value="3">拜访</option>
                   <option v-if="dialogMode==1" value="4">邮件</option>
                   <option v-if="dialogMode==1" value="5">短信</option>
                   <option v-if="dialogMode==1" value="6">其他</option>
               </select>
                </div>
                <div class="form-group col-sm-12">
                    <textarea class="form-control" style="resize:none" v-model="content" placeholder="跟进详情" rows="6" cols=""></textarea>
                </div>
                <div class="form-group col-sm-12">
                    <div id="followFilesUploadBtn"></div>
                </div>
                <div class="form-group col-sm-12">

                <table v-if="files.length" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>文件名</th>
                            <th width="180">操作</th>
</tr>
                    </thead>
                    <tbody>
                        <tr v-for="(el,index) of files">
                            <td>{{el.originalFilename}}</td>
                            <td><a target="_blank" :href="el.url" class="btn btn-primary btn-sm">
                            <i class="fa fa-eye"></i> 查看</a>
                            <a @click="files_del(index)" target="_blank" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> 删除</a></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div class="form-group col-sm-12"> 
                    <label class="control-label col-xs-2 p-l-0 p-r-0" for="">提醒谁看 : </label>
                    <div class="col-xs-10">
                    <select style="width:100%" v-model="remind" multiple class="form-control input-sm" id="remindWho">
                    </select>
                    </div>
                </div>

                <div class="form-group col-sm-6"> 
                    <label class="control-label col-xs-4 p-l-0 p-r-0" for="">联系人 : </label>
                    <div class="col-xs-8">
                    <input v-if="dialogMode==0" type="text" readonly v-model="linkmanName" class="form-control input-sm  p-r-0"  name="" value="">   
                    <div v-show="dialogMode==1">
                     <select style="width:100%" v-model="linkmanId" multiple class="form-control input-sm" id="linkmanId"></select>
                    </div>
                    </div>
                </div>
                <div class="form-group col-sm-6"> 
                    <label class="control-label col-xs-4 p-l-0 p-r-0" for="">下次跟进时间 : </label>
                    <div class="col-xs-8">
                    <input type="text" @click="laydate($event)" readonly placeholder="选择下次跟进时间" v-model="nextTime" class="form-control input-sm  p-r-0"  name="" value="">     
                    </div>
                </div>
            </form>
        </div>
 				 `,
		props: ['dialogMode', 'callId'],
		data() {
			return {
				role: localStorage.userRole || "",
				type: 0,
				time: '',
				content: '',
				files: [],
				remind: [],
				status: '',
				customerId: '',
				customerName: '',
				linkmanName: '',
				linkmanId: [],
				nextTime: '',

				select_init: 0
			}
		},
		created() {
			//	this.type =this.dialogMode
		},
		mounted() {
			// dialogMode ==0 /拨打电话时弹出
			//dialogMode==1  /自行选择
			const that = this;
			that.$watch('callId', (n, o) => {
				if(n) {
					that.time = laydate.now(new Date().getTime(), 'YYYY-MM-DD hh:mm')
				}
			})

		},
		methods: {
			init(customerInfo, linkmanName) {
				console.log(this.dialogMode);
				if(this.dialogMode == 1) {
					this.type = ""
				} else {
					this.type = 0
				}
				if(customerInfo) {
					this.customerId = customerInfo.id || "";
					this.customerName = customerInfo.name || "";
					this.linkmanName = linkmanName || customerInfo.linkmanName || "";
				}
				const that = this;
				const dialog = layer.open({
					scrollbar: true,
					type: "1",
					title: '写跟进',
					content: $("#follow-box"),
					area: ['700px', '620px'],
					btn: ['保存'],
					btnAlign: 'c',
					yes() {
						that.save()
					},
					end() {
						that.remindWhoBox.val(null).trigger('change')
						that.linkmanBox.val(null).trigger('change')
						that.content = '';
						window.callId = '';
						that.files = [];
						that.remind = [];
						that.status = '';
						that.customerId = '';
						that.customerName = '';
						that.linkmanName = '';
						that.linkmanId = [];
						that.nextTime = '';
					},
					success() {
						if(!that.select_init) {
							//提醒谁看
							that.remindWhoBox = $('#remindWho').select2({
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
											ROLE_ID: "cf54c0b5567542e084778c3f5b230054,b729e9334ad64c15a4e47d88b8c2638f,01dc6d29f1704efeab0376d327f47d98,30b1487221464d369ca4c2462ccca920,04fe5e23842f4b998216080bc3b61821,b693f826af0545b5a1c60447a27c3089,45efba0a0fa946aebf7befe614c74e55,4cb60182bb294cfba622f951e390bc6f",
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
							}).on("change", function() {
								that.remind = [];
								for(var i = 0; i < this.children.length; i++) {
									if(this.children[i].selected) that.remind.push(this.children[i].value)
								}
							})
							//联系人
							that.linkmanBox = $('#linkmanId').select2({
								placeholder: "请选择",
								language: 'zh-CN',
								allowClear: true,
								ajax: {
									url: "/linkman/getLinkmanInfo",
									dataType: 'json',
									type: "post",
									delay: 250,
									data: function(params) {
										return {
											page: params.page || 1,
											data: {
												q: params.term || "" // search term
											},
											id: that.customerId,
											type:0
										};
									},
									processResults: function(data, params) {
										params.page = params.page || 1;
										$.each(data, function() {
											this.id = this.linkmanName;
											this.text = this.linkmanName;
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
							}).on("change", function() {
								that.linkmanId = [];
								for(var i = 0; i < this.children.length; i++) {
									if(this.children[i].selected) that.linkmanId.push(this.children[i].value)
								}

							})
							that.select_init = 1
							that.$parent.loading();
							require(['webuploader'], (WebUploader) => {
								app.loading("close")
								var uploader = WebUploader.create({
									server: "/contract/uploadAttachment.do",
									runtimeOrder: 'html5',
									pick: {
										id: '#followFilesUploadBtn',
										innerHTML: '上传附件'
									},
									resize: false,
									fileNumLimit: 10
								});

								//上传成功
								uploader.on('uploadSuccess', function(file, res) {
									that.files.push(res)
								});

								uploader.on('uploadStart', function() {
									that.$parent.loading()
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
									that.$parent.loading('close')
								});
								//文件加入队列
								uploader.on('fileQueued', function() {
									uploader.upload()
								})
							})
						}
					}
				});

			},
			save() {
				const that = this;
				if(!top.callId && this.dialogMode == 0) {
					layer.msg('请挂断电话之后再保存记录');
					return;
				} else if(this.type === "") {
					layer.msg('请选择跟进方式');
					return;
				}
				let data = {
					content: this.content,
					files: this.files,
					remind: this.remind,
					customerId: this.customerId,
					nextTime: this.nextTime,
					customerName: this.customerName
				}
				if(this.dialogMode == 0) {
					data.callId = top.callId
				}
				if(this.linkmanName) {
					data.linkmanId = []
					data.linkmanId.push(this.linkmanName);
				} else {
					data.linkmanId = this.linkmanId
				}
				data.type = this.type;
				yocto.json('/customer/saveProcessInfo', data, (res) => {
					layer.closeAll();
					layer.msg("商务顾问动态保存成功")
					that.$parent && that.$parent.getCaseRecord && that.$parent.getCaseRecord()
					window.parentFnc && window.parentFnc()
				})
			},
			files_del(index) {
				const that = this;
				const dialog = layer.confirm("确认删除此项?", () => {
					that.files.splice(index, 1);
					layer.close(dialog)
				})
			},
			laydate(e, elm, flag) {
				const that = this
				laydate({
					vEvent: e,
					format: 'YYYY-MM-DD hh:mm:ss',
					istime: true,
					istoday: true,
					choose: function(data) {
						if(!flag) {
							that.nextTime = data
						} else {
							that.time = data
						}
					}
				})
			}
		}
	})
	return module
});