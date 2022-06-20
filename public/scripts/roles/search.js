var carddiv = `<div id='div@id' class="col-lg-3 m-2 card">
<div class="row card-body">
  <h5 class="card-title">
    @name
  </h5>
  <div>
    <div>@description
    </div>
    <div class="pt-2"> <a class="btn btn-primary pr-2" href="/roles/update/@id">Update</a>
      <button class="btn btn-primary" type="button" id='btn@id'
        onclick="deleteme('@id','localhost:5001/roles/delete')">Delete</button>
    </div>
  </div>
</div>
</div>`;

$(document).ready(function () {
  getData($('#apiurl').val() + '/roles/list', '').then((data) => {
    BindData(data);
  });
});

$('#name').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode !== 13) {
    return;
  }
  var txtToSearch = $(this).val();
  getData($('#apiurl').val() + '/roles/list', txtToSearch).then((data) => {
    BindData(data);
  });
});
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
function BindData(data) {
//  console.log(`found ${ JSON.stringify( data)} elements`);
  $('#cardcontainer').empty();
  for (let i = 0; i < data.length; i++) {
    var card = carddiv.replaceAll('@id', data[i]._id).replace('@name', data[i].name).replaceAll('@description', data[i].description);

    $('#cardcontainer').append(card);
  }
}