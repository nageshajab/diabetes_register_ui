$('#medicine').on('keypress', function (e) {
    var medicine = $("#medicine").val();
    var baseUri = $('#txtBaseUrl').val();

    if (e.which == 13) {
        getData(baseUri + '/medicine/list', medicine).then((data) => {
            localStorage.setItem('medicines', JSON.stringify(data));
            const medicines = [];
            for (let i = 0; i < data.length; i++) {
                medicines[i] = data[i].name;
            }
            $("#medicine").autocomplete({
                source: medicines
            });
        })

    }
});

function addmedicine() {
    var medicine = $("#medicine").val();
    var id = getIdfromText(medicine);

    if (typeof id == 'undefined' || id == '') {
//        console.log('id is undefined or empty');
        return;
    }

//    console.log('id is ' + id);
    var selectedmedicines = $('#selectedMedicines').val();

    if (!selectedmedicines.includes(id))
        addLiToUl(medicine, id);

    $("#medicine").val('');
    var existingmedicines = $('#selectedMedicines').val() + ',' + id;
    setSelectedMedicineTxt(existingmedicines);
}

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
//    console.log('wada'+$('#selectedMedicines').val());
}

function getIdfromText(name) {
 //   console.log('inside get id from text');

    var data = localStorage.getItem('medicines');

    if (typeof data == 'undefined' || data == null) {
 //       console.log('localstorage item medicines is empty');
        return;
    }
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
//        console.log(data[i].name + name);
        if (data[i].name == name) {
            return data[i]._id;
        }
    }
}