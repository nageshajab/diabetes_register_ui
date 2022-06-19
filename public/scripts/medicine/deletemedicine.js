function deletemedicine(element) {
    var medicineid = $(element).parent().attr("data-id");

    $(element).parent().remove();
    var selectedmedicines = $('#selectedMedicines').val();
    selectedmedicines = selectedmedicines.replace(medicineid, '');

    setSelectedMedicineTxt(selectedmedicines);
}