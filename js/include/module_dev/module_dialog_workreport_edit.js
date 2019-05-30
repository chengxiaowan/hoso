define([
	'require', 'select2', 'yoValidate'
], function (require, select2,yoValidate) {
	'use strict';
	const module = Vue.component('report-edit', {
		template: `
		<form class="form form-horizontal" id="report_add">
	<div class="m-t-md">
		<div class="col-xs-10 col-xs-offset-1">
			<div class="form-group">
			<div class="row">
			<div class="col-xs-5">
				<label class="control-label"><span class="text-danger">*</span> 类型：</label>
				<select class="form-control" :disabled="status=='edit'" v-model="type">
					<option value="0">周报</option>
					<option value="1">月报</option>
				</select>
			</div>
			<div class="col-xs-7">
				<label class="control-label"><span class="text-danger">*</span> 日期：</label>
				<select class="form-control" :disabled="status=='edit'" v-model="c.time" >
					<option v-for="el in time" :value="el">{{el}}</option>
				</select>
			</div>
			</div>
			</div>
			<div class="form-group">
				<label class="control-label"><span class="text-danger">*</span> 批阅人：</label>
				<select class="form-control" id="readMan">
				</select>
			</div>
			<div class="form-group">
				<label class="control-label">抄送人：</label>
				<select class="form-control"  id="copyMan" multiple>
				</select>
			</div>
			<div class="form-group">
				<label class="control-label"><span class="text-danger">*</span> 总结：</label>
				<textarea style="height:120px" v-model="c.content" class="form-control" name="" rows="" cols=""></textarea>
			</div>
			<div class="form-group">
				<label class="control-label"><span class="text-danger">*</span> 计划：</label>
				<textarea style="height:120px" v-model="c.plan" class="form-control" name="" rows="" cols=""></textarea>
			</div>
			<div class="form-group">
				<label class="control-label">附件：</label>
				<div class="well well-sm">
					<div id="filesUploadBtn"></div>
				</div>
				<div class="form-group col-sm-12">

                <table v-if="c.files&&c.files.length" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>文件名</th>
                            <th width="180">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(el,index) of c.files">
                            <td>{{el.originalFilename}}</td>
                            <td><a target="_blank" :href="el.url" class="btn btn-primary btn-sm">
                            <i class="fa fa-eye"></i> 查看</a>
                            <a @click="files_del(index)" target="_blank" class="btn btn-danger btn-sm"><i class="fa fa-trash"></i> 删除</a></td>
                        </tr>
                    </tbody>
                </table>
                </div>
			</div>
		</div>
	</div>
</form>
  `,
		data() {
			return {
				//前置数据
				    api_saveReportData: '/report/saveReportData.do',//保存
				    api_showReportDate:'/report/showReportDate.do', //获取日期 
    				api_updateTasks: '/report/updateReportData.do',//编辑
				
				c:{
					type:0,
					files:[]
				},
				//新增
				open:0,
				dialog_init:0,
				uploadInit:0,
				status:'add',
				type:0,
				time:[],
				addBox: 'addBox' + (Math.random()).toString().split('.')[1],
				selectBox: 'selectBox' + (Math.random()).toString().split('.')[1],
				select2:{},
			}
		},
		created() {
			
		},
		watch:{
			type(n,o){
				const that = this;
				console.log(this.open)
				if(this.status=='add'&&this.open){
					$.post(that.api_showReportDate,{type:that.type}).done(res=>{
						that.time = res.result
					})
				}
			}
		},
		mounted() {
			
			//初始化全选
		//	this.select_init()
		},
		methods: {
			init(info){
				const that = this;
				if(!info&&!this.dialog_init&&this.type==0){
					$.post(that.api_showReportDate,{type:that.type}).done(res=>{
						that.time = res.result
					})
				}
				
				if(info){
					console.log(info)
					const json = JSON.parse(JSON.stringify(info))
					this.status = 'edit'
					for(let key in json){
						if(key =='content' || key== 'plan'){
						Vue.set(that.c,key,yo.str_textarea(json[key]))
						}else{
						Vue.set(that.c,key,json[key])
						}
					}
					this.c.files = json.attachs
					this.type = json.type
					if(json.type == 0){
						this.time = [json.zbtimeStart + '-' + json.zbtimeEnd]
					this.c.time = json.zbtimeStart + '-' + json.zbtimeEnd
					}else{
						this.time = [json.time]
						this.c.time = json.time
					}
					$("#readMan").html(`<option value="${json.readMan}" selected>${json.readManName}</option>`).val(json.readMan).trigger('change')
					var html = ''
					const copyManList = json.copyMan&&json.copyMan.split(',') || []
					const copyManNames = json.copyManName&&json.copyManName.split(',') || []
					$.each(copyManList,function(i){
						html+=`<option value="${this}" selected>${copyManNames[i]}</option>`
					})
					$("#copyMan").html(html).trigger('change')
				}
				
				const dialog = layer.open({
					type: 1,
					title: that.status=='add' ?  '新增工作计划' : '编辑工作计划',
					content: $("#report_add"),
					area: ['800px', '700px'],
					btn: ['保存'],
					btnAlign: 'c',
					success(){
						that.open = 1;
						if(!that.dialog_init){
							that.uploader_init()
							that.select_init()
							that.dialog_init=1
						}
					},
					yes() {
						that.save()
					},
					end() {
						that.clear()
					}
				});					
			},
			clear(){
				this.open = 0
				for(let key in this.c){
					Vue.set(this.c,key,"")
				}
				this.c.files = [];
				this.c.copyMan = [];
				this.c.copyManName = []
				this.status='add'
				this.type=0
			},
			select_init(){
							const that = this;
							if(this.select2.readMan){
								this.select2.readMan.select2('destroy');
								this.select2.copyMan.select2('destroy');
							}
							that.select2.readMan = $("#readMan").select2({
							placeholder: "请选择批阅人",
							language: 'zh-CN',
							ajax: {
								url: "/user/getUserInfo",
								dataType: 'json',
								type: "post",
								delay: 250,
								data: function (params) {
									return {
										page: params.page || 1,
										ROLE_ID: "01dc6d29f1704efeab0376d327f47d98,cf54c0b5567542e084778c3f5b230054,4cb60182bb294cfba622f951e390bc6f",
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
							that.c.readMan = this.value;
						})
						that.select2.copyMan = $("#copyMan").select2({
							placeholder: "请选择抄送人",
							language: 'zh-CN',
							ajax: {
								url: "/user/getUserInfo",
								dataType: 'json',
								type: "post",
								delay: 250,
								data: function (params) {
									return {
										page: params.page || 1,
										ROLE_ID: "cf54c0b5567542e084778c3f5b230054,b729e9334ad64c15a4e47d88b8c2638f,01dc6d29f1704efeab0376d327f47d98,30b1487221464d369ca4c2462ccca920,de9de2f006e145a29d52dfadda295353,4cb60182bb294cfba622f951e390bc6f,04fe5e23842f4b998216080bc3b61821,b693f826af0545b5a1c60447a27c3089,45efba0a0fa946aebf7befe614c74e55",
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
							that.c.copyMan = this.value;
						})
			},
			uploader_init(){
				const that  =this;
				if(this.uploadStatus) return;
				  require(['webuploader'], (WebUploader) => {
				  	that.uploadInit=1
				  	var loading;
                                        var uploader = WebUploader.create({
                                            server: "/contract/uploadAttachment.do",
                                            runtimeOrder: 'html5',
                                            pick: {
                                                id: '#filesUploadBtn',
                                                innerHTML: '上传附件'
                                            },
                                            resize: false,
                                            fileNumLimit: 10
                                        });

                                        //上传成功
                                        uploader.on('uploadSuccess', function (file, res) {
                                            that.c.files.push(res)
                                        });

                                        uploader.on('uploadStart', function () {
                                            loading = layer.load(3);
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
                                            layer.close(loading)
                                        });
                                        //文件加入队列
                                        uploader.on('fileQueued', function () {
                                            uploader.upload()
                                        })
                                    })
			},
			files_del(index){
				const that = this;
				const dialog = layer.confirm("确认删除此项?",()=>{
					that.c.files.splice(index,1);
					layer.close(dialog)
				})
			},
			save(cb) {
				const that = this;
				let postData = {
					time:this.c.time
				}
				if(!this.c.time){
					layer.msg('请选择时间')
					return
				}
				postData.readMan = $("#readMan").val()
				postData.readManName = $("#readMan").find("option:selected").text()
				
				if(!postData.readMan){
					layer.msg('请选择批阅人')
					return
				}
				postData.copyMan = []
				postData.copyManName = []
				
				$.each($("#copyMan").find('option:selected'),function(){
					postData.copyMan.push(this.value)
					postData.copyManName.push(this.innerHTML)
				})
				if(!this.c.content){
					layer.msg('请填写总结')
					return
				}
				postData.content = yo.textarea_str(this.c.content)
				if(!this.c.plan){
					layer.msg('请填写计划')
					return
				}
				postData.plan = yo.textarea_str(this.c.plan)
				postData.files = this.c.files 
				postData.type =this.type
				postData.id = this.c.id
				const loadingSwitch = layer.load(3);
				 const api = this.status=='edit' ? this.api_updateTasks : this.api_saveReportData
				yocto.json(api,postData,function(res){
					 layer.close(loadingSwitch)
						layer.msg('提交成功');
						setTimeout(function(){
							location.reload()
						},2000)
				})
			},
		}
	})
	return module
});


