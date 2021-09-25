$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList();
    //渲染页面
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                var tableHtml = template('tpl-table', res);
                $('tbody').html(tableHtml)
            }
        })
    };
    //点击弹出添加分类
    var indexAdd = null;
    var indexEdit = null;
    $('.art-add').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    });
    //点击确认添加按钮提交数据渲染页面
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg('添加文章分类失败')
                }
                layer.msg('添加文章分类成功')
                layer.close(indexAdd)
                initArtCateList()
            }
        })
    });
    //点击编辑按钮弹出编辑框
    $('body').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-Id');
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章分类列表失败')
                }
                form.val('form-edit', res.data)
            }
        })
    });
    //点击编辑弹出层的确认修改按钮修改数据
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('修改数据失败')
                }
                layer.msg('修改成功');
                layer.close(indexEdit);
                initArtCateList()
            }
        })
    });
    //点击删除按钮实现删除功能
    $('body').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg('删除失败')
                    }
                }
            })
            layer.msg('删除成功')
            layer.close(index);
            initArtCateList()
        });
    })
})