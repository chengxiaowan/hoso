var shopsId = parameter().id;
console.log(shopsId)
console.log("这是editorHouseCoupon")
var config = {
    role: localStorage.userRole,
    api_houseEditor: api_url + '/roomTicket/update', //房券编辑
    api_houseDetail: api_url + '/roomTicket/detail', //房券详情
}
window.app = new Vue({
    el:"#app",
    data:{  
       name:'',          //名称
       countUsed:'',     //使用次数
       price:'',         //价格
       expirationDate:'',//过期时间
       houseTips: '',    //房券说明
       valueWay: 0,      //预付方式
       priceOne: '',     //满足抵用消费金额
       priceTwo: '',     //抵用金额
       options: [{
        value: 0,
        label: '购买房券'
      },
      //  {
      //   value: 1,
      //   label: '第三方平台'
      // },
      {
        value: 2,
        label: '抵用金'
      }],
      
    },
    methods: {
        //满足抵用消费金额 (只能输入数字 + 最多2位小数)
        oninputOne(e) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
            this.priceOne = e.target.value
        },
        //抵用金额 (只能输入数字 + 最多2位小数)
        oninputTwo(e) {
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
            this.priceTwo = e.target.value
        },
        // 价格 (只能输入数字 + 最多2位小数)
        oninput(e) {
        // 通过正则过滤小数点后两位
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
            this.price = e.target.value
        },
        // 使用次数 只能输入整数
        oninputPoint(e){
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,0})/g)[0]) || null
            this.countUsed = e.target.value
        },
        // 预付方式选择
        waySelect(val){
            console.log(val)
        },
        // 时间戳转年月日
        gettime(timestamp) {
            var d = new Date(timestamp)
            var year = d.getFullYear();
            var month = change(d.getMonth() + 1);
            var day = change(d.getDate());
            function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            }
            var time = year + '-' + month + '-' + day;
            return time;
        },
        //房券详情
        getData(){
          var that = this
          $.ajax({
              url:config.api_houseDetail,
              type:"post",
              async:true,
              data:{
                  id:Number(shopsId),
              },
              success:res=>{
                // console.log(res);
                // console.log(that.gettime(res.result.time))
                 if(res.error == "00"){
                  that.name = res.result.name
                  that.houseTips = res.result.describes
                  console.log(res.result)
                  that.price = res.result.price
                  that.valueWay = res.result.type
                  that.countUsed = res.result.countUsed
                  that.expirationDate = that.gettime(res.result.time)
                  that.priceOne = res.result.consumptionAmount
                  that.priceTwo = res.result.dAmount
                  $("#start").val(that.expirationDate)
                 }
              }
          })
      },
      // 保存按钮
      Save(){
        var that = this;
        // console.log(shopsId,typeof(shopsId))
        if(that.name.replace(/^\s*|\s*$/g,"") ==''){
          layer.msg("名称不能为空", {
              time: 2000
          })
        }else if(that.valueWay == 2 && that.priceOne == ''){
          layer.msg("满足抵用消费金额不能为空", {
              time: 2000
          })
        }else if(that.valueWay == 2 && that.priceTwo == ''){
          layer.msg("抵用金额不能为空", {
              time: 2000
          })
        }else if(that.countUsed==''){
          layer.msg("使用次数不能为空", {
              time: 2000
          })
        }else if(that.price==''){
          layer.msg("价格不能为空", {
              time: 2000
          })
        }else if(that.expirationDate ==''){
          layer.msg("过期日期不能为空", {
              time: 2000
          })
        }else if(that.editor.getContent() ==''){
          layer.msg("说明不能为空", {
              time: 2000
          })
        }else{
          // 判断是否为抵用金
          if(that.valueWay == 2){
            console.log(that.editor.getContent())
            var obj = {
                consumptionAmount:that.priceOne,
                dAmount:that.priceTwo,
                id:Number(shopsId),
                name:that.name,
                type:that.valueWay,
                countUsed:that.countUsed,
                price:that.price,
                time:that.expirationDate,
                describes:that.editor.getContent()
            }
          }else{
            var obj = {
                id:Number(shopsId),
                name:that.name,
                type:that.valueWay,
                countUsed:that.countUsed,
                price:that.price,
                time:that.expirationDate,
                describes:that.editor.getContent()
            }
          }
          $.ajax({
              url:config.api_houseEditor,         
              type:"post",
              async:true,
              data: obj,
              success:function(res){
                console.log(res)
                if(res.error == '00'){
                  layer.msg("修改成功", {
                      time: 2000
                  })
                  setTimeout(() => {
                    var closePage = parent.layer.getFrameIndex(window.name)
                    parent.layer.close(closePage)
                  }, 1500);
                
                }
                 
              }
          })
        }
      },
    },
    
    mounted () {
        const that = this;
        that.getData()
        layui.use('laydate', function() {
          var laydate = layui.laydate;
          //日期范围
          var startDate = laydate.render({
                elem: '#start',
                trigger: 'click',
                format: 'yyyy-MM-dd', //可任意组合
                max: "2099-12-31", //设置一个默认最大值
                done: function(value, date) {
                  that.expirationDate = value;
                  // console.log(that.expirationDate);
                }
            });
        });
        that.editor = UE.getEditor('container', {
          initialFrameHeight: 350,
          // initialContent: "请填写详细描述",
      });
      that.editor.addListener("ready", function () {
          // editor准备好之后才可以使用
          that.editor.setContent(that.houseTips);
        
          console.log(that.editor.getContent())
      });
        
    }
})

