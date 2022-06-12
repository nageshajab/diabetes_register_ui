var carddiv=`<div id='div@id' class="col-lg-3 m-2 card">
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

$('#name').on('keypress', function (e) {
    var textValue = $(this).val();
    var apibaseurl = $('#apiurl').val();

    var keyCode = e.keyCode || e.which;
    if (keyCode !== 13) {
        return;
    }
    $('.loader').show();
    var width = $(window).width();
    $('.loader').width(width / 4);
    $('.loader').height(width / 4);

    var request = $.ajax({
        url: `${apibaseurl}/medicine/list`,
        type: "POST",
        data: {
            name: textValue
        },
        headers: {
            "Bearer": $('#sessiontoken').val(),
            "contentType": 'application/json; charset=utf-8'
        },
    });

    request.done(function (data) {
        console.log(`found ${data.length} elements`);
        $('.loader').hide();
        $('#cardcontainer').empty();
        for(let i=0;i<data.length;i++){
            var card=carddiv.replace('@id',data[i]._id).replace('@name',data[i].name).replace('@content',data[i].content);
            
           $('#cardcontainer').append(card); 
        }
    });

    request.fail(function (jqXHR, textStatus) {
        $('.loader').hide();
        
        alert("Request failed: " +JSON.stringify( jqXHR));
    });
});