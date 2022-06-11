function searchMedicine() {
    var allmedicines = $("#allmedicines").text();

    var availableMedicines = allmedicines.split(',');

    $("#medicine").autocomplete({
        source: availableMedicines
    });
}

$('#medicine').on('keypress', function (e) {
    if (e.which == 13) {
        
        alert($("#medicine").val());
    }
});