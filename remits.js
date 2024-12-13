;//outages.js
const btId = 'Remits'
const getHeader = () => 'UK Remits';
const getTitle = () => 'EnergyEarly - Remits';

function getContent() {

  let html = `
    <div class="container p-1 mt-1 mb-2">
        <div id="dvMenuButtons" class="btn-group btn-group-lg btn-group-justified w-100" role="group">
        </div>
         <div id="dvMenuButtons2" class="btn-group btn-group-lg btn-group-justified w-100" role="group">
        </div>
      </div>
    <div id="dvListings"></div>`
  console.log(html, "here html")
  return html;
}



let jsonHold;

let func = isLandscape => {
  console.log("here in func")
  document.getElementById('dvListings').innerHTML = getContentWithJson(jsonHold, isLandscape);
  // setupRadioButtonFilterHandlerWithClassTableRowMultiple('rbIndustry', 'card');
  runTheFilter('card');
};


function onPageLoaded() {
  
  getRemits()
    .then(res => {
      jsonHold = res;
      fuels = ['ALL', ...new Set(res.map(o => o[16]).filter( x => x !== ""))]
      fuels2 = ['ALL', ...new Set(res.map(o => o[4]).filter( x => x !== ""))]
      console.log(fuels);
      var radioButtons = fuels.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x,   'rbIndustry', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');
      var radioButtons2 = fuels2.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x, 'rbIndustry2', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');

      document.getElementById('dvMenuButtons').innerHTML = radioButtons
      //document.getElementById('dvMenuButtons2').innerHTML = radioButtons2
      document.getElementById('dvListings').innerHTML = getContentWithJson(res)
      // setupRadioButtonFilterHandlerWithClassTableRow('rbIndustry', 'card');
      // setupRadioButtonFilterHandlerWithClassTableRow('rbIndustry2', 'card');
      setupRadioButtonFilterHandlerWithClassTableRowMultiple('rbIndustry', 'card');
      //setupRadioButtonFilterHandlerWithClassTableRowMultiple('rbIndustry2', 'card');

      manageChangeInOrientation(func, '#dvHeader')
    })
  
   
   
}

function getContentWithJson(jsonIn, isLandscape = false) {

  let newHtml = RemitEmailModule.formatTable(jsonIn)
  return isLandscape ? RemitEmailModule.formatTable(jsonIn) : RemitEmailModule.formatLongTable(jsonIn);
}