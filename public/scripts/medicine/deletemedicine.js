function deletemedicine(element) {
    var medicineid = $(element).parent().attr("data-id");
//    console.log('deleting medicine ' + medicineid);
    $(element).parent().remove();
    var selectedmedicines = $('#selectedMedicines').val();
//    console.log('all medicines before '+selectedmedicines);
    selectedmedicines = selectedmedicines.replace(medicineid, '');
 //   console.log('all medicines after '+selectedmedicines);
    setSelectedMedicineTxt(selectedmedicines);
}