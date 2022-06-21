$(document).ready(function () {

    $('#chkAdmin').change(function () {
        if (this.checked) {
            $('#chkBasic').prop("checked", true);
        }
    });

    // medicine checkboxes
    $('#chkCreateMedicine').change(function () {
        if (this.checked) {
            $('#chkReadMedicine').prop("checked", true);
        }
    });
    $('#chkUpdateMedicine').change(function () {
        if (this.checked) {
            $('#chkReadMedicine').prop("checked", true);
        }
    });
    $('#chkDeleteMedicine').change(function () {
        if (this.checked) {
            $('#chkReadMedicine').prop("checked", true);
        }
    });
    
    // visit checkboxes
    $('#chkCreateVisit').change(function () {
        if (this.checked) {
            $('#chkReadVisit').prop("checked", true);
        }
    });
    $('#chkUpdateVisit').change(function () {
        if (this.checked) {
            $('#chkReadVisit').prop("checked", true);
        }
    });
    $('#chkDeleteVisit').change(function () {
        if (this.checked) {
            $('#chkReadVisit').prop("checked", true);
        }
    });
});