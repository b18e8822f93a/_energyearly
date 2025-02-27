const btId = 'Subscribe'
const getHeader = () => 'Subscribe to Email Alerts'
const getTitle = () => 'EnergyEarly - Subscribe';
function getContent() {
  let html = `
  <div class="flexContainer">
    <div id='dv1'></div>
  </div>
  <div class="flexContainer2">
    <div>
      <br/><br/>
    </div>

<div style="  padding-left: 1rem; padding-right: 1rem;">
  <form id='fm1' style="flex-grow: 4;" class="form-group" onsubmit="rssUrlSubmission()">
    <fieldset>
      <legend>Please select from the above data sources and submit your email address to subscribe to email alerts</legend>
      <div class=" mb-3">
        <small id="emailHelp" class="form-text text-muted">We'll never share your this email with anyone else. When you deselect all options and submit we will delete your email address from our
          records.</small>
      </div>
      <div class="mb-3">
        <input type="email" class="form-control form-control-lg url-type-styled-input" id="fname" name="fname" required=""></input>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </fieldset>
    <br/>
    <div id='dvFeedback'></div>
  </form>
</div>
<div></div>
</div>
`;
  return html;
}



function feedbackUi(res) {

  var thanksBox = document.getElementById("dvFeedback");
  let isSuccessful = res.okay;
  let code = res.code;
  if (isSuccessful ) {
    if (code == 2)
    {
    thanksBox.innerHTML = "You have successfully subscribed to email alerts";
    thanksBox.classList.add('alert')
    thanksBox.classList.add('alert-secondary')
    document.getElementById('fm1').classList.add('was-validated')
  }
  else if (code == 1){
    thanksBox.innerHTML = "You have successfully updated your subscription to email alerts";
    thanksBox.classList.add('alert')
    thanksBox.classList.add('alert-primary')
    document.getElementById('fm1').classList.add('was-validated')
  }
  else if (code == 0){
    thanksBox.innerHTML = "You have successfully unsubscribed to email alerts";
    thanksBox.classList.add('alert')
    thanksBox.classList.add('alert-primary')
    document.getElementById('fm1').classList.add('was-validated')
  }
}
  else if (!isSuccessful) {
  

    thanksBox.innerHTML = "Sorry your subscription has not been successful please try again";
    thanksBox.classList.add('alert')
    thanksBox.classList.add('alert-danger')
  }
}

function rssUrlSubmission() {
  let email = document.getElementById('fname').value
  console.log(email);
  event.preventDefault()
  event.stopPropagation()
  let selected =  getSelected().join(',');
  postASubscription(email, selected)

  return false;
}

function getSelected() {
  var checkbox = document.querySelectorAll('input[name=cbIsNewOnly]:checked');

  var checkboxs = [...checkbox];
  for (x of checkboxs) {
    console.log(x.value)
  }
  console.log(checkbox);

  let ids = checkboxs.map(x => x.value);

  return ids
}

function addContentToPage(jsonIn) {
  
  var table = tablesModule.addTableWithRadio(jsonIn, [ 'Company', 'Type', 'Country', 'Tier']);
  document.getElementById('dv1').innerHTML = table;
}

function onPageLoaded() {getSources().then(res => addContentToPage(res))}

function loadData(e) {
  console.log(e);
}
