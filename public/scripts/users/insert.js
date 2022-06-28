function insertUser() {
    $('#chkAdmin').val();

    const roles = [];

    if ($('#chkAdmin').prop('checked') == true)
        roles.push("admin");

    if ($('#chkBasic').prop('checked') == true)
        roles.push("basic");


    const data = {
        username: $('#username').val(),
        description: $('#description').val(),
        password: $('#password').val(),
        roles: roles
    };
    alert(JSON.stringify(data));
    return;
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
    });
    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
    });

}