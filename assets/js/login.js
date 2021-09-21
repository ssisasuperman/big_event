$(function() {
    // 登录和注册链接点击切换功能
    $('#link-reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    $('#link-login').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show()
    });
    // 表单验证功能
    var form = layui.form;
    var token = null;
    form.verify({
        password: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repassword: function(value) {
            var pwd = $('#form_reg [name=password]').val()
            if (value !== pwd) {
                return '两次输入不一致'
            }
        }
    });
    //利用ajax向服务器发送请求
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('注册失败' + res.message)
                }
                layer.msg('注册成功,请登录');
                $('#link-login').click()
            }
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                token = res.token;
                localStorage.setItem('token', token)
                location.href = '/index.html'
            }
        })
    })

})