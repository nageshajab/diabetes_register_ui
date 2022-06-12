$('#submitform').on('keyup keypress', function (e) {

    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) {
        console.log('form was submitted');
        e.preventDefault();
        return false;
    }
});