function getMedicineNameArray() {
    var allmedicines = JSON.parse($("#allmedicines").text());
    var medicines = '';
    allmedicines.filter(function (item) {
        medicines += "," + item.name;
    });
    console.log('filtered medicines ' + medicines);
    return medicines;
}

function searchMedicine() {
    var allmedicines = getMedicineNameArray();

    var availableMedicines = allmedicines.split(',');

    $("#medicine").autocomplete({
        source: availableMedicines
    });
}

function deletemedicine(element) {
    var medicineid = $(element).parent().attr("data-id");

    $(element).parent().remove();
    var selectedmedicines = $('#selectedMedicines').val();
    selectedmedicines = selectedmedicines.replace(medicineid, '');

    setSelectedMedicineTxt(selectedmedicines);
}

$('#medicine').on('keypress', function (e) {
    var medicine = $("#medicine").val();
    var id = getIdfromText(medicine);

    if (e.which == 13) {
        var selectedmedicines = $('#selectedMedicines').val();
    
        if (!selectedmedicines.includes(id))
            addLiToUl(medicine, id);

        $("#medicine").val('');
        var existingmedicines = $('#selectedMedicines').val() + ',' + id;
        setSelectedMedicineTxt(existingmedicines);
    }
});

function addLiToUl(medicine, id) {
    var id = getIdfromText(medicine);
    
    $("ul#medicinelist").append(`<li data-id='${id}'>${medicine} <a id='${id}' onclick='deletemedicine(this)'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg> </a>  </li>`);
}

function setSelectedMedicineTxt(selectedmedicines) {
    const arr = selectedmedicines.split(',');
    var parsedVal = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].trim() == '')
            continue;

        if (parsedVal.includes(arr[i])) {
            return;
        }

        if (parsedVal.length > 0) {
            parsedVal += ',' + arr[i].trim();
        } else {
            parsedVal += arr[i].trim();
        }
    }
    $('#selectedMedicines').val(parsedVal);
}

function getIdfromText(name) {
    var allmedicines = JSON.parse($("#allmedicines").text());
    var id;
    allmedicines.filter(function (item) {
        if (item.name == name) {
            id = item._id;
        }
    });
    return id;
}