/*
 * @Author: chengxiaowan(1045114585@qq.com) 
 * @Date: 2020-07-09 11:03:45 
 * @Last Modified by: chengxiaowan(1045114585@qq.com)
 * @Last Modified time: 2020-09-03 16:21:11
 */

var appId = parameter().appid
let config = {
    //在这里写接口和api_url拼接
    api_token: api_url + '/qiniu/getUpToken', //获取七牛的token
    api_save: api_url + '/wechat/getDetail' //获取信息
}

window.app = new Vue({
    el: "#app",
    data: {
       info:{},
    },
    methods: {
        //获取信息
       getdata(){
           const that = this
           $.ajax({
               url:config.api_save,
               type:"GET",
               data:{
                   appId:appId
               },
               success:res=>{
                   if(res.error == "00"){
                       that.info = res.result
                   }
               }
           })
       }
      

    },
    mounted() {
        this.getdata()
    },

})