$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
            pagenum: 1, //页码  
            pagesize: 2, //每页显示个数
            cate_id: '', //文章分类ID
            state: '' //文章状态
        }
        //设置美化事件过滤器
    template.defaults.imports.dataFormat = function(data) {
            var dt = new Date(data);
            var n = dt.getFullYear()
            var m = padZero(dt.getMonth() + 1)
            var d = padZero(dt.getDate())
            var hh = padZero(dt.getHours())
            var mm = padZero(dt.getMinutes())
            var ss = padZero(dt.getSeconds())
            return n + '-' + m + '-' + d + '  ' + hh + ':' + mm + ':' + ss
        }
        //设置补零函数
    function padZero(n) {
        return n = n > 9 ? n : '0' + n
    }
    //初始化页面table中的数据
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取文章数据失败')
                }
                var HTMLStr = template('tpl-table', res)
                $('tbody').html(HTMLStr)
                renderPage(res.total)
            }
        })
    }
    //动态获取筛选菜单值
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('获取下拉菜单数据失败')
                }
                var HTMLStr = template('tpl-cate', res)
                $('[name=cate_id]').html(HTMLStr)
                form.render()
            }
        })
    }
    //点击筛选按钮实现筛选功能
    $('#form-search').on('submit', function(e) {
            e.preventDefault()
            q.cate_id = $('[name=cate_id]').val()
            q.state = $('[name=state]').val()
            initTable()
        })
        //渲染分页器
    function renderPage(data) {

        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: data, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                console.log();
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
                console.log(obj.curr);
            }
        });
    }
    //删除功能
    $('body').on('click', '.btn-delete', function() {
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id');
        console.log(len);
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            //do something

            console.log(id);
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    console.log(res);
                    if (res.status != 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len == 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})