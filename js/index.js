$(function () {
    // 輸入
    load();
    $("#search").on("keydown", function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() == '') {
                alert('請輸入ToDolist項目');
            } else {
                var data = dataGet();
                data.push({ todo: $(this).val(), done: false });
                dataSet(data);
                $(this).val('');
                load();
            }
        };
    });
    // 點擊close
    $(".todo_bd , .done_bd").on("click", ".close", function () {
        var data = dataGet();
        var idGet = $(this).attr("id");
        data.splice(idGet, 1);
        dataSet(data);
        load();
    })
    // 點擊checkbox
    $(".todo_bd , .done_bd").on("click", ".chose", function () {
        var data = dataGet();
        var idGet = $(this).siblings(".close").attr("id");
        data[idGet].done = $(this).prop("checked");
        dataSet(data);
    })
    // 獲取
    function dataGet() {
        var data = localStorage.getItem("todolist")
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        };
    };
    // 儲存
    function dataSet(resource) {
        localStorage.setItem("todolist", JSON.stringify(resource));
        load();
    };
    function load() {
        var data = dataGet();
        var num = 0;
        $(".todo_bd").children().remove();
        $(".done_bd").children().remove();
        $.each(data, function (i, element) {
            if (element.done !== true) {
                var li = $("<li><input type='checkbox' class='chose'><p>" + element.todo + "</p><a href='javascript:;' class = 'close' id='" + num + "'></a></li>");
                $(".todo_bd").prepend(li);
            } else {
                var li = $("<li><input type='checkbox' class='chose' checked='checked'><p>" + element.todo + "</p><a href='javascript:;' class = 'close' id='" + num + "'></a></li>");
                $(".done_bd").prepend(li);
            }
            num++;
        });
        // todo計算小框
        var todoTol = $(".todo_bd").children().length;
        $(".todotol").html(todoTol);
        // done計算小框
        var doneTol = $(".done_bd").children().length;
        $(".donetol").html(doneTol);

    };
});