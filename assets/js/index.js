$(function() {
    getInfo()
        //获取用户登录信息渲染头像和欢迎名字
    function getInfo() {
        console.log(localStorage.getItem('token'));
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            Headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function(res) {
                console.log(res);
            }
        });
    }

})