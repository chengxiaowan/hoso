let confing = {
    api_list: api_url + ''
}

window.app = new Vue({
    el:"#app",
    data(){
        return{
            starttime:"",
            endtime:"",
            list:"",
            pageNo:"1",
            keywords:""
        }
    },
    methods:{
        getdata(){
            console.log("1")
        }
    },
    mounted() {
        console.log("Vue is ok")
    },

})