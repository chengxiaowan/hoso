var shopsId = parameter().id;
console.log(shopsId)
console.log("这是addHouseCoupon")
var config = {
    role: localStorage.userRole,
    api_houseAdd: api_url + '/roomTicket/add' //房券新增
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
       options: [{
        value: 0,
        label: '购买房券'
      }, {
        value: 1,
        label: '第三方平台'
      }],
      
    },
    methods: {
        // 价格 (只能输入数字 + 最多2位小数)
        oninput(e) {
        // 通过正则过滤小数点后两位
          e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
            this.price = e.target.value
        },
        oninputPoint(e){
            e.target.value = (e.target.value.match(/^\d*(\.?\d{0,0})/g)[0]) || null
            this.countUsed = e.target.value
        },
        // 预付方式选择
        waySelect(val){
            console.log(val)
        },
       
        // 保存按钮 
        Save(){
            var that = this;
            // console.log(shopsId,typeof(shopsId))
            if(that.name.replace(/^\s*|\s*$/g,"") ==''){
              layer.msg("名称不能为空", {
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
            }else if(that.houseTips.replace(/^\s*|\s*$/g,"") ==''){
              layer.msg("说明不能为空", {
                  time: 2000
              })
            }
            
            else{
              $.ajax({
                url:config.api_houseAdd,         
                type:"post",
                async:true,
                data:{
                    shopsId:shopsId,
                    name:that.name,
                    type:that.valueWay,
                    countUsed:that.countUsed,
                    price:that.price,
                    time:that.expirationDate,
                    describes:that.houseTips,
                },
                success:function(res){
                  console.log(res)
                  if(res.error == '00'){
                    layer.msg("保存成功", {
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
    created: function() {
      var that = this;
      document.getElementById("app").classList.remove("hide");
  },
    mounted () {
        // this.expirationDate = this.getNowFormatDate()
        const that = this;
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
            console.log(that.expirationDate);
          }
        });
      });
    }
})


//输入框文本计数
// var user = document.getElementById("name")
// var username = document.getElementById("username")
// user.onkeyup = function(){
//     document.getElementById("count1").innerHTML = user.value.length;
// }


//校验手机号是否重复和正则校验格式
// var phone = document.getElementById("phone")
// phone.onblur = function(){
//     if(!(/^1[3456789]\d{9}$/.test(phone.value))){
//         layer.msg("您输入的手机号码格式错误，请核对")
//     }else{
//         $.ajax({
//             url:config.api_phone,
//             type:"post",
//             async:true,
//             data:{
//                 userName:phone.value
//             },
//             success:res=>{
//                 if(res.error == "01"){
//                     layer.msg("该手机号已被使用，请更换手机号后重试")
//                 }
//             }
//         })
//     }

// }

//end 2019年6月12日17:25:29