function getRoles() {
    const roles = [];

    if ($('#chkAdmin').prop('checked') == true)
        roles.push("admin");

    if ($('#chkBasic').prop('checked') == true)
        roles.push("basic");

    return roles;
}

function insertUser(url) {
    var url = $('#apiurl').val() + url;
    $('.loader').show();
    var width = $(window).width();
    $('.loader').width(width / 4);
    $('.loader').height(width / 4);
    var request = $.ajax({
        url: url,
        type: "POST",
        data: {
            _id: $('#_id').val(),
            username: $('#username').val(),
            description: $('#description').val(),
            password: $('#password').val(),
            roles: getRoles().toString(),
            isActive: $('#chkAdmin').prop('checked'),
            activationDate: new Date()
        },
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        }
    });
    request.done(function (data) {
        alert('success ' + JSON.stringify(data));
        $('.loader').hide();
        window.location = "/users";
    });
    request.fail(function (jqXHR, textStatus) {
        alert('failure ' + JSON.stringify(jqXHR));
        $('.loader').hide();
    });

}