let config = {

}

window.app = new Vue({
    el:"#app",
    data:{
        keywords:"",
        type:"",
    },
    methods: {
        goAdd(){
            let inedx = layer.open({
                type:2,
                title:"添加房券",
                content:"addquan.html",
                area:["100%","100%"]
            })
        }
    },
    mounted() {
        
    },
})