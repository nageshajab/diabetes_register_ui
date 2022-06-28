function getData(url, txtToSearch) {
    return new Promise(function (resolve, reject) {
        $('.loader').show();
        var width = $(window).width();
        $('.loader').width(width / 4);
        $('.loader').height(width / 4);
        var request = $.ajax({
            url: url,
            type: "POST",
            data: {
                data: txtToSearch
            },
            headers: {
                "Bearer": $('#sessiontoken').val(),
                "contentType": 'application/json; charset=utf-8'
            }
        });
        request.done(function (data) {
            $('.loader').hide();
            resolve(data);
        });
        request.fail(function (jqXHR, textStatus) {
            $('.loader').hide();
            reject(jqXHR.responseText, jqXHR);
        });
    });
}