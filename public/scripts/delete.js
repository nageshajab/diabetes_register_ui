

function deleteme(id) {
    $('.loader').show();
    var width = $(window).width();
    $('.loader').width(width / 4);
    $('.loader').height(width / 4);
    var request = $.ajax({
        url: "http://localhost:5001/diabetic/delete",
        type: "POST",
        data: {
            id: id
        },
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        },
        //dataType: 'json',

    });

    request.done(function (msg) {
        $('.loader').hide();
        alert(JSON.stringify(msg));
        $('#' + id).closest("tr").remove();
    });

    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
        alert("Request failed: " + jqXHR.responseText);        
    });
}