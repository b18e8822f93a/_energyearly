;//outages.js
const btId = 'Outages'
const getHeader = () => 'Outages';
const getTitle = () => 'EnergyEarly - Outages';

function getContent() {

  let html = `
    <div class="container p-1 mt-1 mb-2">
        <div id="dvMenuButtons" class="btn-group btn-group-lg btn-group-justified w-100" role="group">
        </div>
      </div>
    <div id="dvListings"></div>`
  console.log(html, "here html")
  return html;
}

function onPageLoaded() {
  getOutages()
    .then(res => {

      fuels = ['ALL', ...new Set(res.map(o => o[13]))]
      var radioButtons = fuels.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x, 'rbIndustry', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');

      document.getElementById('dvMenuButtons').innerHTML = radioButtons
      document.getElementById('dvListings').innerHTML = getContentWithJson(res)
      setupRadioButtonFilterHandlerWithClassTableRow('btn-check', 'card');
    })
    ;
}

function getContentWithJson(jsonIn) {

  let newHtml = EntsoeEmailModule.formatTable(jsonIn)
  return newHtml;
}