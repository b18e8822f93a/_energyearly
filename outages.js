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

function onPageLoaded() { getOutages()
    .then(res => {
 
  fuels = ['ALL',...new Set( res.map(o => o[13]))]
  var radioButtons = fuels.map((x, i) => radioButtonCreate.getAnRadioButtonLabelAsValue(i, x, 'rbIndustry', i === 0 ? 'checked' : '', 'btn-outline-success')).join('');
  
  document.getElementById('dvMenuButtons').innerHTML = radioButtons
  document.getElementById('dvListings').innerHTML = getContentWithJson(res)
  setupRadioButtonFilterHandlerWithClassTableRow('btn-check', 'card');
})
;
}


function card(seriesIn) {

  var extraRows = Object.entries(seriesIn.outagesKvps).map(o => {
    console.log(o)
    return `<li class="list-group-item"><span class="searchText">${o[1]}</span><span class="mr-1 text-muted" style="float: right">${o[0]}</span></li>`
  });

  console.log(extraRows)

  var card = ` <div class="card mb-3" data-all="card" data-unique="${seriesIn.fuelName.toLowerCase()}" style="border-color:#ee12cd">
            <div class="card-header d-flex flex-row justify-content-between align-items-center" style="border-color:#ee12cd">${seriesIn.title}<div class="mb-auto"><a class="btn btn-outline-secondary searchText" href="${seriesIn.href}" target="_blank" role="button">Visit Source</a></div></div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <span class="searchText">${seriesIn.plant}</span>
                <span class="mr-1 text-muted" style="float: right">Plant</span>
            </li>
            <li class="list-group-item">
                <span class="searchText">${seriesIn.company}</span>
                <span class="mr-1 text-muted" style="float: right">Company</span>
            </li>
              </ul>
            <div class="card-body">
              <p class="card-text">${seriesIn.description}</p>
            </div>
             <ul class="list-group list-group-flush">
             ${extraRows.join("")}
              </ul>
            <div class="card-footer text-muted d-flex flex-row  align-items-center">
              <span style="margin-right:auto">${seriesIn.publishedDate} (${seriesIn.age} days)</span>
             
              <span class="tagSpan" style="background-color:#ee12cd; margin-left:3px">${seriesIn.fuelName}</span>
              <span class="tagSpan" style="background-color:#5b73a3; margin-left:3px">${seriesIn.country}</span>
            </div>
          </div>`;

  return card
}

function compareEntries(a, b) {
  if (a.age < b.age) {
    return -1;
  }
  if (a.age > b.age) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

function getContentWithJson(jsonIn) {


  let newHtml = EntsoeEmailModule.formatTable(jsonIn)

  return newHtml;
}
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};


function getContentWithJsonTopOne(jsonIn) {

  var json2 = jsonIn.map(o => { return { ...o, age: datesModule.differenceFromNow(o.publishedDate) } });
  json2.sort(compareEntries);
  console.log(json2)
  const result = Object.values(groupBy(json2, 'id')).map(o => o[0]);

  let cards = result.map(x => card(x));
  let newHtml = cards.join('</br>');
  return newHtml;
}



const EntsoeEmailModule = {
  
  
  link(unit) {
    return `https://transparency.entsoe.eu/outage-domain/r2/unavailabilityOfProductionAndGenerationUnits/show?areaType=CTA&area.values=CTY|10YES-REE------0!CTA|10YES-REE------0&assetType.values=PU&assetType.values=GU&outageType.values=A54&outageType.values=A53&outageStatus.values=A05&masterDataFilterName=${unit}&dv-datatable_length=100`
  },
  formatTable(data) {
    let table = data.map(o => this.formatRow(o)).join('');
    let tb = `<table class="T2">  <thead>
      <tr>
      <th>UNIT NAME</th>
      <th>START</th>
      <th>END</th>
     
      <th>INSTALLED</th>
      <th>AVAILABLE</th>
      <th>UNIT TYPE</th>
      <th>OUTAGE TYPE</th>
      <th>FUEL TYPE</th>
      <th>TIMESTAMP UTC</th>
            </thead>
      </tr>${table}</table>`.split("\n").join('');
    return tb;
  },
  formatRow(o) {
    let outageType = o[10] === 'A54' ? "FORCED" : "SCHEDULED";
    let unitType = o[0] === ' A05' ? "PRODUCTION" : "GENERATION"
    let tr = `<tr data-unique="${o[13].replaceAll(' ', '_').toLowerCase()}" data-all="card">
      <td>
      <a href="${this.link(o[11])}" target="_blank">${o[11]}</a>
      </td>
      <td>${o[1]} CET</td>
      <td>${o[2]} CET</td>
      
      <td>${o[6]}</td>
      <td>${o[7]}</td>
      <td>${unitType}</td>
      <td>${outageType}</td>
      <td>${o[13].toUpperCase()}</td>
     
      <td>${new Date(o[12]).toUTCString()}</td>
      </tr>`.split("\n").join('')
    
    console.log(tr)
    return tr;
  }
}