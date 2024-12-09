;//outages.js
const btId = 'Remits'
const getHeader = () => 'UK Remits';
const getTitle = () => 'EnergyEarly - Remits';

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
  getRemits()
    .then(res => {

      fuels = ['ALL', ...new Set(res.map(o => o[16]).filter( x => x !== ""))]
      var radioButtons = fuels.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x, 'rbIndustry', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');

      document.getElementById('dvMenuButtons').innerHTML = radioButtons
      document.getElementById('dvListings').innerHTML = getContentWithJson(res)
      setupRadioButtonFilterHandlerWithClassTableRow('btn-check', 'card');
    })
    ;
}

function getContentWithJson(jsonIn) {

  let newHtml = RemitEmailModule.formatTable(jsonIn)
  return newHtml;
}