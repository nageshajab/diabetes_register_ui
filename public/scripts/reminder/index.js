/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function addReminder(){
  var data={
    name: $('#name').val(),
    date: $('#date').val()
  };
  insert('/reminder/insert',data);
}

$(document).ready(() => {
  var d = new Date();
  var days = getDaysInMonth(d.getMonth(), d.getFullYear());

  for (let i = 0; i < days.length; i++) {
    console.log(days[i]);
    $('#cardcontainer').append(`<div class='col-md-2 calendar_div'>
   <b> ${days[i].toLocaleDateString()}</b>
    
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      +
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${days[i].toLocaleDateString()}</h5>
            <input type='text' value=${days[i].toLocaleDateString()} id='date'>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="form-group p-2">
          <label class="pb-2" for="name">Name</label>
          <input type="text" id="name" class="form-control" name="name" placeholder="Enter Name">
      </div>
      <div class="form-group p-2">
          <label class="pb-2" for="content"> <b>Repeat</b></label>
          
          <input type="radio" id="radiodaily" name="radiorepeat" value="Daily">
          <label for="radiodaily">Daily</label><br>
          
          <input type="radio" id="radioweekly" name="radiorepeat" value="Weekly">
          <label for="radioweekly">Weekly</label><br>

          <input type="radio" id="radiomonthly" name="radiorepeat" value="Monthly">
          <label for="radiomonthly">Monthly</label>

          <div id="days">
          <label for="monday">Monday</label> <input type='checkbox' value='monday' class='pr-1' id=chkMonday>
          <label for="chkTuesday">Tuesday</label><input type='checkbox'  value='Tuesday'  class='pr-1' id='chkTuesday'>
          <label for="chkWednesday">Wednesday</label><input type='checkbox'  value='Wednesday'  class='pr-1' id='chkWednesday'>
          <label for="chkThursday">Thursday</label><input type='checkbox' value='Thursday'  class='pr-1' id='chkThursday'>
          <label for="chkFriday">Friday</label><input type='checkbox'  value='Friday'  class='pr-1' id='chkFriday'>
          <label for="chkSaturday">Saturday</label><input type='checkbox'  value='Saturday'  class='pr-1' id='chkSaturday'>
          <label for="chkSunday">Sunday</label><input type='checkbox'  value='Sunday'  class='pr-1' id='chkSunday'>
          </days>
        
      </div>
          </div>
          <div class="modal-footer">
          <button type="submit" onclick='addReminder()' class="btn btn-primary">Submit</button>
          <a type="cancel" data-bs-dismiss="modal"  class="btn btn-primary" href="/medicine">Cancel</a>
          </div>
        </div>
      </div>
    </div>
    </div>`);
  }
});