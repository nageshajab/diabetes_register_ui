function insert(url,data) {
    
    $('.loader').show();
    var width = $(window).width();
    $('.loader').width(width / 4);
    $('.loader').height(width / 4);
    var request = $.ajax({
        url: 'http://' + url,
        type: "POST",
        data: data,
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        },
    });

    request.done(function (msg) {
        $('.loader').hide();
        alert(JSON.stringify(msg));
        $('#' + 'div' + id).remove();
        $('#' + id).remove();
    });

    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
        alert("Request failed: " + jqXHR.responseText);
    });
}