$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);
    //点击上传按钮实现file的点击功能
    $('#btnChooseImage').on('click', function(e) {
            $('#file').click();
        })
        //上传文件替换裁剪区域图片的替换
    $('#file').on('change', function(e) {
        var file = e.target.files[0];
        if (file.length === 0) {
            return layer.msg('请长传图片')
        }
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });
    //点击上传按钮更换头像
    $('#btnUpLoad').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //上传服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('上传头像失败')
                };
                layer.msg('上传成功');
                window.parent.getUserInfo();
            }
        })
    })
})