$(document).ready(function () {
    $('.loader').hide();

    $("tr").hover(function () {
        $(this).css("background-color", "yellow");
    });
    $("tr").mouseout(function () {
        $(this).css("background-color", "white");
    });
    $("tr").click(function(){
        window.location.href ='/diabetic/update/'+ $(this).attr('id').replace('tr','');
    });
});