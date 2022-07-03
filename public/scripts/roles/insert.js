

function getAccessRights() {
    const accessRights = [];

    $('#checkboxes input:checked').each(function () {
        accessRights.push($(this).attr('value'));
    });

    return accessRights;
}

function insertRole(url) {
    var url = $('#apiurl').val() + url;
    $('.loader').show();
    var width = $(window).width();
    $('.loader').width(width / 4);
    $('.loader').height(width / 4);
    var accessRights=getAccessRights().toString();
    alert(accessRights);
    var request = $.ajax({
        url: url,
        type: "POST",
        data: {
            _id: $('#_id').val(),
            name: $('#name').val(),
            description: $('#description').val(),
            accessrights: accessRights
        },
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        }
    });
    request.done(function (data) {
        alert('success ' + JSON.stringify(data));
        $('.loader').hide();
        window.location = "/roles";
    });
    request.fail(function (jqXHR, textStatus) {
        alert('failure ' + JSON.stringify(jqXHR));
        $('.loader').hide();
    });

}