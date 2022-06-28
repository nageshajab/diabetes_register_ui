var carddiv = `<div id='div@id' class="col-lg-3 m-2 card">
<div class="row card-body">
  <h5 class="card-title">
    @name
  </h5>
  <div>
    <div>@Content
    </div>
    <div class="pt-2"> <a class="btn btn-primary pr-2" href="/medicine/update/@id">Update</a>
      <button class="btn btn-primary" type="button" id='btn@id'
        onclick="deleteme('@id','localhost:5001/medicine/delete')">Delete</button>
    </div>
  </div>
</div>
</div>`;

$(document).ready(function () {
  getData($('#apiurl').val() + '/medicine/list', '').then((data, err) => {
    if (err) {
      alert(err);
      return;
    }
    BindData(data);
  });
});

$('#name').on('keypress', function (e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode !== 13) {
    return;
  }
  var txtToSearch = $(this).val();
  getData($('#apiurl').val() + '/medicine/list', txtToSearch).then((data, err) => {
    if (err) {
      alert(err);
      return;
    }
    BindData(data);
  });
});
String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

function BindData(data) {
  //  console.log(`found ${ JSON.stringify( data)} elements`);
  $('#cardcontainer').empty();
  for (let i = 0; i < data.length; i++) {
    var card = carddiv.replaceAll('@id', data[i]._id).replace('@name', data[i].name).replaceAll('@Content', data[i].content);

    $('#cardcontainer').append(card);
  }
}