$(document).ready(function() {
    $('#search-event-form').submit(function (e) {
        var name = $("#inputID").val($("#inputID").val().trim()).val();
        if (name) {
            window.location.href = "/search/"+name;
            $("#inputID").val(name);
        }
        return false;
    });
});