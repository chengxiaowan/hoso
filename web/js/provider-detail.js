//新增
function add(id) {
    var index = layer
        .open({
            type : 2,
            title : '新增联系人',
            // content : '${pageContext.request.contextPath}/linkman/goEdit.do?id='+ id,
            content: '../linkman/add.html',
            area : [ '80%', '80%' ]
        });
}
//编辑
function edit(id) {
    var index = layer
        .open({
            type : 2,
            title : '编辑联系人',
            // content : '${pageContext.request.contextPath}/linkman/goEdit.do?id='+ id,
            content: '../linkman/edit.html',
            area : [ '80%', '80%' ]
        });
}
// 删除联系人
function delLinkman(id, msg){
    layer.confirm(
            "确定要删除此列数据吗?",
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
// 查看合同详情页面
function view(id) {
    var index = layer.open({
        type : 2,
        title : '查看合同详情',
        // content : '${pageContext.request.contextPath}/linkman/goEdit.do?id='+ id,
        content: 'contract.html',
        area : [ '80%', '80%' ]
    });
}

// 删除附件
function delAttachment() {
    layer.confirm(
        "确定要删除此列数据吗?",
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