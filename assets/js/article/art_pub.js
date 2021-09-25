$(function() {
    var layer = layui.layer
    var form = layui.form
        //初始化文章类别选择框
    initSelect()
        // 初始化富文本编辑器
    initEditor()

    function initSelect() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('文章类别初始化失败')
                }
                var HTMLStr = template('tpl-cate', res);
                $('[name=cate_id]').html(HTMLStr)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //点击选择封面按钮实现上传图片
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click()
    })

    //监听coverFile的change事件将图片上传到裁剪区域中
    $('#coverFile').on('change', function(e) {
        var files = e.target.files;
        if (files.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file[0])
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var cate_state = '已发布'
    $('#btnSave2').on('click', function() {
            cate_state = '草稿'
        })
        // 点击按钮监听form表单的提交事件
    $('#form_pub').on('submit', function(e) {
            e.preventDefault();
            var fd = new FormData($(this)[0]);
            fd.append('state', cate_state);
            $image
                .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                    // 得到文件对象后，进行后续的操作
                    fd.append('cover_img', blob);
                    publishArticle(fd)
                })
        })
        //发布文章
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                location.href = '/assets/article/art_list.html'
            }
        })
    }
})