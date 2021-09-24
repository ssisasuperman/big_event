$(function() {
    var form = layui.form;
    initUserInfo();
    // 获取用户信息渲染页面
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUSerInfo', res.data)
            }
        })
    }
    //自定义表单验证
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '请输入1-6位昵称'
            }
        }
    });
    //点击提交修改用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }
                window.parent.getUserInfo()
            }
        })
    });
    //点击重置按钮重置数据
    $('#resetInfo').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })
})