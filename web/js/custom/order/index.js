//查看订单详情
function view() {
    var index = layer.open({
        type : 2,
        title : '详情',
        content: 'detail.html',
        // content : '${pageContext.request.contextPath}/customer/view.do?id='+id,
        area : [ '100%', '100%' ]
    });
}

