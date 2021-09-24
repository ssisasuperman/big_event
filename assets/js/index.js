$(function() {
    getUserInfo()

    //获取用户登录信息
    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                renderAvatar(res)
            }

        });
    }
    //获取到信息后渲染头像和欢迎名字
    function renderAvatar(res) {
        //欢迎字段渲染
        var name = res.data.nickname || res.data.username;
        $('.welcom').html('&nbsp欢迎&nbsp' + name);
        //渲染头像
        if (res.data.user_pic == null) {
            $('.img-avatar').hide();
            $('.text-avatar').html(name[0]).show();
        } else {
            $('.img-avatar').attr('src', res.data.user_pic).show();
            $('.text-avatar').hide();
        }
    }
    //退出链接实现退出功能
    $('.logout').on('click', function() {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });
    })
})