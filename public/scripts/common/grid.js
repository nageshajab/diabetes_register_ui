$(document).ready(function (url) {
    $('.loader').hide();

    $("tr").hover(function () {
        $(this).css("background-color", "yellow");
    });
    $("tr").mouseout(function () {
        $(this).css("background-color", "white");
    });
});