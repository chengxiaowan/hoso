/**
**工作台函数
**/

var WorkSpaceRow = function(){
    //基础数据
    this.page = 1;
    this.api = '';
    this.boxName = '.row-hook-1';
    this.loading = '<div class="spiner-example spiner-hook"><div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div></div>'
    this.loadingState = 0;
	}
    //渲染表格
    //@dataArray 表格json数据
	WorkSpaceRow.prototype.render = function (dataArray) { 
     };
    //分页
     WorkSpaceRow.prototype.nagivation = function (all) { 
    	 	var that = this;
            var nagiBox = this.container.find('.page-nagivation');
            if(all=='1'||all=='0') {
                nagiBox.html("")
                return
            };
            var html = '<div class="btn-group">';
            if(this.page>3){
                html +='<button class="btn btn-white btn-sm goToPrev-hook" type="button"><i class="fa fa-chevron-left"></i></button>'
            }
            if(this.page<3){
            for (var i = 1; i < all; i++) {
                if(i<4){
                if(i==this.page){
                html+='<button class="btn btn-white btn-sm goToPage-hook active">'+i+'</button>'
                }else{
                html+='<button class="btn btn-white btn-sm goToPage-hook">'+i+'</button>'
            }
                }
            }
            if(all>this.page&&all>3){
            html+='<button class="btn btn-white btn-sm" disabled>...</button>'
            if(this.page==all){
                    html+='<button class="btn btn-white btn-sm goToPage-hook active">'+all+'</button>'
            }else{
                    html+='<button class="btn btn-white btn-sm goToPage-hook">'+all+'</button><button class="btn btn-white btn-sm goToNext-hook" type="button"><i class="fa fa-chevron-right"></i></button>'
            }
            }else if(all==this.page){
                if(this.page==this.page){
                    html+='<button class="btn btn-white btn-sm goToPage-hook active">'+this.page+'</button>'
            }else{
                 html+='<button class="btn btn-white btn-sm goToPage-hook">'+this.page+'</button>'
            }
            }else{
                 html+='<button class="btn btn-white btn-sm goToPage-hook">'+all+'</button>'
            }
           // (this.page!=this.all)&&(html+='<button class="btn btn-white btn-sm goToNext-hook" type="button"><i class="fa fa-chevron-right"></i></button>')
        }
        else{
              html+='<button class="btn btn-white btn-sm goToPage-hook">1</button>';
              (this.page!=3) && (html+='<button class="btn btn-white btn-sm" disabled>...</button>'); 
              html+='<button class="btn btn-white btn-sm goToPage-hook">'+(this.page-1)+'</button>'; 
              html+='<button class="btn btn-white btn-sm goToPage-hook active">'+this.page+'</button>';
              if((this.page-0)==all){
                    html+='</div>'
              }else if((this.page-0)+1==all){
              html+='<button class="btn btn-white btn-sm goToPage-hook">'+(Number(this.page)+1)+'</button>';
            }else{
                    html+='<button class="btn btn-white btn-sm goToPage-hook">'+(Number(this.page)+1)+'</button>';
                    ((this.page-0)+1!=all)&&(html+='<button class="btn btn-white btn-sm" disabled>...</button>');
                    html+='<button class="btn btn-white btn-sm goToPage-hook">'+all+'</button>'; 
                    html+='<button class="btn btn-white btn-sm goToNext-hook" type="button"><i class="fa fa-chevron-right"></i></button>'
              }
        }
            nagiBox.html(html+'</div>')
            $(document).off('click',this.boxName+' .goToPage-hook');
            $(document).off('click',this.boxName+' .goToPrev-hook');
            $(document).off('click',this.boxName+' .goToNext-hook');
            $(document).on('click',this.boxName+' .goToPage-hook',function(){
                if(that.page==$(this).text()||that.loadingState) return;
                that.page = $(this).text();
                that.getList();
            });
            $(document).on('click',this.boxName+' .goToPrev-hook',function(){
                if(that.loadingState) return;
                that.page--
                that.getList();
            })
            $(document).on('click',this.boxName+' .goToNext-hook',function(){
                if(that.loadingState) return;
                that.page++
                that.getList();
            })
     };
    //开始请求之前
     WorkSpaceRow.prototype.beforeAjax = function(){
        this.container.find('.table').hide();
        this.container.find('.ibox-content').prepend(this.loading);
        this.loadingState = 1;
    }
    //请求结束
     WorkSpaceRow.prototype.afterAjax = function(){
        this.container.find('.table').show();
        this.container.find('.spiner-hook').remove();
        this.loadingState = 0;
    }
    //发起请求
     WorkSpaceRow.prototype.getList = function () {
    	 var that = this;
        this.beforeAjax();
        $.post(this.api,{
        	pageNo:this.page
        }).done(function(res){
             if(res.error=='00'){
            	 that.render(res.result.list);
                that.afterAjax();
                that.nagivation(res.result.pages);
             }
        });
    }

     WorkSpaceRow.prototype.init=function(page){
        this.container = $(this.boxName);
        this.page = page;
        this.getList();
    };

