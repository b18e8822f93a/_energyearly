;//remits.js
const btId = 'Remits'
const getHeader = () => 'UK Remits - Today Only';
const getTitle = () => 'EnergyEarly - Remits';

function getContent() {

  let html = `
    <div class="container p-1 mt-1 mb-2">
        <div id="dvMenuButtons" class="btn-group btn-group-sm btn-group-justified w-100 d-flex flex-md-row flex-column w-100 p-1 " role="group">
        </div>
         <div id="dvMenuButtons2" class="btn-group btn-group-sm btn-group-justified w-100" role="group">
        </div>
      </div>
    <div id="dvListings"></div>`
  console.log(html, "here html")
  return html;
}

function link(mrid, id) {
  return `https://bmrs.elexon.co.uk/remit/details/${mrid}?messageId=${id}`
}

let jsonHold;

let func = isLandscape => {
  console.log("here in func")
  document.getElementById('dvListings').innerHTML = getContentWithJson(jsonHold, isLandscape);
  runTheFilter('card');
};

function onPageLoaded() {
  
  getRemits()
    .then(res => {
      jsonHold = res;
      fuels = ['ALL', ...new Set(res.map(o => o.fuelName).filter( x => x !== ""))]
      fuels2 = ['ALL', ...new Set(res.map(o => o.unavailabilityType).filter( x => x !== ""))]

      
      const subsetLabelColors = new Map(
        [...fuelColors].filter(([label, color]) => fuels.includes(label))
      );
      console.log(subsetLabelColors);
      console.log(fuels);
      let radioButtons = [['All', 'Blue'], ...subsetLabelColors].map((x, i) => radioButtonCreate.getAnRadioButtonColour(i, x[0], 'rbIndustry', i === 0 ? 'checked' : '', x[1])).join('');

      let radioButtons2 = fuels2.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x, 'rbIndustry2', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');

      document.getElementById('dvMenuButtons').innerHTML = radioButtons
      document.getElementById('dvMenuButtons2').innerHTML = radioButtons2
      document.getElementById('dvListings').innerHTML = getContentWithJson(res)
      setupRadioButtonFilterHandlerWithClassTableRowMultiple('rbIndustry', 'card');
      setupRadioButtonFilterHandlerWithClassTableRowMultiple('rbIndustry2', 'card');

      manageChangeInOrientation(func, '#dvHeader')
    })
}

function getContentWithJson(jsonIn, isLandscape = false) {
  return isLandscape ? OutageView.responsive(link).formatTable(jsonIn) : OutageView.responsive(link).formatLongTable(jsonIn);
}