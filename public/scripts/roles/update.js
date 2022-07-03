$(document).ready(() => {
    const accessRights = $('#accessrights').val();
    const arr=accessRights.split(',');
    for(let i=0;i<arr.length;i++){
        $(`:checkbox[value='${arr[i]}']`).prop("checked","true");
    }
});