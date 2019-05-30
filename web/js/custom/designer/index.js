//内容信息导航锚点
$('.nav-wrap').navScroll({
    mobileDropdown: true,
    mobileBreakpoint: 768,
    scrollSpy: true
});

//新增设计师
function add(id) {
    var index = layer
        .open({
            type : 2,
            title : '新增设计师',
            // content : '${pageContext.request.contextPath}/linkman/goEdit.do?id='+ id,
            content: 'add.html',
            area : [ '100%', '100%' ]
        });
}
// 保存商品类目
function save() {

}
// 取消商品类目
function cancle() {
    var index=parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

//查看商品详情
function view() {
    var index = layer.open({
        type : 2,
        title : '详情',
        content: 'detail.html',
        area : [ '100%', '100%' ]
    });
}

//编辑设计师
function edit(id) {
    var index = layer
        .open({
            type : 2,
            title : '编辑设计师',
            content: 'edit.html',
            area : [ '100%', '100%' ]
        });
}

// 删除设计师
function del(id, msg){
    layer.confirm(
        "确定要删除该销售订单?",
        function(result) {
            if (result) {
                // var url = "${pageContext.request.contextPath}/linkman/delete.do?ids="
                //     + id + "&tm=" + new Date().getTime();
                // $.get(url, function(data) {
                //     nextPage('${page.currentPage}');
                // });
            }
            ;
        });
}
