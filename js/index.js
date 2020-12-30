$(function () {
    load();
    $("#title").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() !== '') {
                var data = dataGet();
                data.push({ title: $(this).val(), done: false });
                dataSave(data);
                $(this).val('')
                load();
            } else {
                alert('請輸入ToDo項目');
                load();
            }
        };
    });
    // 刪除數據
    $("ol , ul").on("click", "a", function () {
        var data = dataGet();
        var idGet = $(this).attr("id");
        data.splice(idGet, 1);
        dataSave(data);
        load();
    });
    // 判斷已完成或未完成
    $("ol , ul").on("click", "input", function () {
        var data = dataGet();
        data[$(this).siblings("a").attr("id")].done = $(this).prop("checked");
        dataSave(data);
        load();
    });

    // 提取數據
    function dataGet() {
        var data = localStorage.getItem("todo");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        };
    };
    // 存取數據
    function dataSave(resource) {
        localStorage.setItem("todo", JSON.stringify(resource));
    };
    // 渲染頁面
    function load() {
        var todolist = dataGet();
        var num = 0;
        $("ol, ul").children().remove();
        $.each(todolist, function (i, element) {
            if (element.done) {
                var li = $("<li><input type='checkbox' checked='checked'><p>" + element.title + "</p><a href='javascript:;' id='" + num + "'></a></li>");
                $("#donelist").prepend(li);
            } else {
                var li = $("<li><input type='checkbox'><p>" + element.title + "</p><a href='javascript:;' id='" + num + "'></a></li>");
                $("#todolist").prepend(li);
            }
            // 計算當前已完成數量
            var donelist = $("#donelist").children().length;
            $("#donecount").html(donelist);
            // 計算當尚未完成數量
            var todo = $("#todolist").children().length;
            $("#todocount").html(todo);
            num++;
        })
    };
});
